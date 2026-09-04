#!/usr/bin/env bash
# CCCV sermon archive capture
#
# Pulls the complete Calvary Chapel Conejo Valley sermon library off Clover's
# public S3 bucket before the Clover account is cancelled.
#
# Everything is resumable. Re-running skips files already complete. Safe to
# Ctrl-C and restart. Written for stock macOS bash 3.2, no Homebrew bash needed.
#
# Usage:
#   ./cccv-archive.sh manifest    Catalog + per-item sources. Run this first.
#   ./cccv-archive.sh notes       Sermon outline PDFs. Tiny.
#   ./cccv-archive.sh speaker N   Everything by one speaker. Run this first if
#                                 a particular person's sermons are the priority.
#   ./cccv-archive.sh audio       Every sermon as mp3. ~155 GB.
#   ./cccv-archive.sh video       Every sermon as 1080p mp4. ~930 GB.
#   ./cccv-archive.sh youtube     The 142 items Clover never hosted. Needs yt-dlp.
#   ./cccv-archive.sh channel     List the church YouTube channel and report how
#                                 much of it exists nowhere else. No downloads.
#   ./cccv-archive.sh channel-pull  Download everything only on YouTube.
#   ./cccv-archive.sh verify      Compare local sizes against remote. No download.
#   ./cccv-archive.sh deep        Compare md5 against recorded S3 ETags. Local only.
#   ./cccv-archive.sh report      What is done, what is missing.
#   ./cccv-archive.sh all         audio, notes, video, channel, channel-pull,
#                                 deep, report, in that order. One command.
#
# Environment:
#   CCCV_DEST      where the media goes   (default ~/cccv-sermon-archive)
#   CCCV_MANIFEST  where the catalog is   (default $CCCV_DEST/manifest)
#   CCCV_JOBS      parallel downloads     (default 4)
#
# To send the terabyte straight to an external drive while the catalog stays
# in the git repo at home:
#   CCCV_DEST=/Volumes/CCCV/cccv-sermon-archive \
#   CCCV_MANIFEST=~/cccv-sermon-archive/manifest \
#   caffeinate -i ./cccv-archive.sh all
#
# Requires: curl and python3 (both present on a stock Mac with Xcode command
# line tools). yt-dlp only for the youtube stage. No Homebrew needed.

set -uo pipefail

PLAYER_ID="${CCCV_PLAYER_ID:-f2f307bb-d127-4365-8e1e-4459a0a3c8f8}"
API="${CCCV_API:-https://mediaplayer.cloversites.com}"
DEST="${CCCV_DEST:-$HOME/cccv-sermon-archive}"
JOBS="${CCCV_JOBS:-4}"

# The catalog may live apart from the media, so the git repo at home stays the
# manifest's home while the files go to an external drive.
MDIR="${CCCV_MANIFEST:-$DEST/manifest}"
MANIFEST="$MDIR/player.json"
SRCDIR="$MDIR/sources"
INDEX="$MDIR/index.tsv"
LOG="$MDIR/archive.log"

mkdir -p "$MDIR" "$SRCDIR" "$DEST/media"

say()  { printf '%s  %s\n' "$(date '+%H:%M:%S')" "$*" | tee -a "$LOG"; }
die()  { printf 'ERROR: %s\n' "$*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || die "$1 is required but not installed"; }

need curl
need python3

filesize() { wc -c < "$1" 2>/dev/null | tr -d " " || echo 0; }

# Header matching must not rely on awk IGNORECASE: that is a gawk extension and
# both mawk and the macOS awk silently ignore it, which made every size check
# pass vacuously. Lowercase the headers first instead.
remote_size() {
  curl -fsSLI "$1" 2>/dev/null | tr -d '\r' | tr 'A-Z' 'a-z' \
    | awk -F': *' '/^content-length:/ {v=$2} END {print v}'
}
remote_etag() {
  curl -fsSLI "$1" 2>/dev/null | tr -d '\r' | tr 'A-Z' 'a-z' \
    | awk -F': *' '/^etag:/ {v=$2} END {gsub(/"/,"",v); print v}'
}

# ---------------------------------------------------------------------------
# Worker. Invoked by xargs as: cccv-archive.sh __get <url> <destpath>
# Kept as a subcommand so xargs can call back into this same script.
# ---------------------------------------------------------------------------
cmd__get() {
  url="${1:-}"; out="${2:-}"
  [ -z "$url" ] && return 0
  [ -z "$out" ] && { printf 'FAIL no destination for %s\n' "$url" >&2; return 1; }
  mkdir -p "$(dirname "$out")"

  want=$(remote_size "$url")

  # A file at the final path is only ever put there complete, so if it is there
  # and the right size, it is done.
  if [ -f "$out" ]; then
    have=$(filesize "$out")
    if [ -n "$want" ] && [ "$want" = "$have" ]; then
      printf 'skip %s\n' "$(basename "$out")"
      return 0
    fi
    # Wrong size means the remote changed or an old run wrote junk. Start clean.
    rm -f "$out"
  fi

  part="$out.part"
  meta="$out.part.meta"

  # Only resume a .part whose provenance we know. Resuming an unknown partial
  # file appends the remainder onto foreign bytes and yields a file of exactly
  # the right size that is silently corrupt, which no size check can catch.
  if [ -f "$part" ]; then
    if [ -f "$meta" ] && [ "$(cat "$meta" 2>/dev/null)" = "$url|$want" ]; then
      :   # ours, same URL, same expected size: safe to continue
    else
      rm -f "$part" "$meta"
    fi
  fi
  printf '%s|%s' "$url" "$want" > "$meta"

  # Resume into .part if a previous run was interrupted mid-transfer.
  curl -fsSL --retry 5 --retry-delay 3 -C - -o "$part" "$url" 2>>"$LOG"
  rc=$?
  if [ $rc -ne 0 ]; then
    # Range refused, or the transfer failed outright. Restart clean.
    rm -f "$part"
    curl -fsSL --retry 5 --retry-delay 3 -o "$part" "$url" 2>>"$LOG" || {
      rm -f "$part" "$meta"
      printf 'FAIL\t%s\t%s\n' "$url" "$out" | tee -a "$MDIR/failures.tsv" >&2
      return 1
    }
  fi

  got=$(filesize "$part")
  if [ -n "$want" ] && [ "$want" != "$got" ]; then
    # Short or over-long transfer. One clean retry, then give up loudly.
    rm -f "$part"
    curl -fsSL --retry 5 --retry-delay 3 -o "$part" "$url" 2>>"$LOG"
    got=$(filesize "$part")
    if [ -n "$want" ] && [ "$want" != "$got" ]; then
      rm -f "$part" "$meta"
      printf 'FAIL\tsize %s expected %s\t%s\t%s\n' "$got" "$want" "$url" "$out" \
        | tee -a "$MDIR/failures.tsv" >&2
      return 1
    fi
  fi

  mv -f "$part" "$out"
  rm -f "$meta"
  # Record the S3 ETag so a later deep verify can check content, not just size.
  et=$(remote_etag "$url")
  # Relative to DEST: absolute paths would break every integrity check the
  # moment the archive is copied to another drive, which is the whole plan.
  rel="${out#$DEST/}"
  [ -n "$et" ] && printf '%s\t%s\t%s\n' "$et" "$got" "$rel" >> "$MDIR/etags.tsv"
  printf 'ok   %s\n' "$(basename "$out")"
  return 0
}

# ---------------------------------------------------------------------------
# manifest
# ---------------------------------------------------------------------------
cmd_manifest() {
  say "Fetching catalog"
  curl -fsSL "$API/players/$PLAYER_ID?draft=0" -o "$MANIFEST" || die "catalog fetch failed"
  count=$(python3 -c 'import json,sys; print(len(json.load(open(sys.argv[1]))["media"]))' "$MANIFEST" 2>/dev/null)
  [ -z "$count" ] || [ "$count" = "0" ] && die "catalog looks empty or malformed"
  say "Catalog: $count items"

  say "Fetching per-item sources"
  # Thousands of small requests: run them in parallel or this stage alone takes
  # longer than every download combined.
  python3 -c 'import json,sys
for m in json.load(open(sys.argv[1]))["media"]:
    print(m["id"])' "$MANIFEST" \
  | while read -r id; do
      [ -s "$SRCDIR/$id.json" ] || printf '%s\n' "$id"
    done \
  | xargs -P 12 -n 1 -I{} sh -c \
      'curl -fsSL --retry 3 --max-time 30 "$1/media/{}/sources?draft=0" -o "$2/{}.json" \
         || echo "no sources for {}" >> "$3"' _ "$API" "$SRCDIR" "$LOG"
  say "Sources: $(find "$SRCDIR" -name '*.json' | wc -l | tr -d ' ') files"

  say "Building index"
  # One python pass produces every derived file. Emitting TSV here and joining
  # in awk avoids `while IFS=$'\t' read` entirely: tab is IFS whitespace in
  # bash, so runs of tabs collapse and one null field shifts every column after
  # it. That bug silently corrupts any row with a missing value.
  PY_MDIR="$MDIR" PY_SRCDIR="$SRCDIR" PY_MANIFEST="$MANIFEST" python3 - <<'PYEOF'
import json, os, glob, csv, sys

mdir = os.environ['PY_MDIR']
srcdir = os.environ['PY_SRCDIR']

with open(os.environ['PY_MANIFEST'], encoding='utf-8') as f:
    media = json.load(f)['media']

def clean(v):
    # Strip tabs, newlines and control chars: they would break the TSV format.
    if v is None:
        return ''
    return ''.join(c for c in str(v) if c >= ' ' or c == '')

# id -> best audio url, best video url, from the per-item sources files
srcmap = {}
attachments = []
for path in glob.glob(os.path.join(srcdir, '*.json')):
    try:
        with open(path, encoding='utf-8') as f:
            d = json.load(f)
    except Exception:
        continue
    if d.get('id') is None:
        continue
    mid = str(d['id'])
    srcs = d.get('sources') or []
    audio = next((x['url'] for x in srcs
                  if x.get('url') and 'audio.mp3' in x['url']), '')
    vids = [x for x in srcs if x.get('height') is not None and x.get('url')]
    video = max(vids, key=lambda x: x['height'])['url'] if vids else ''
    srcmap[mid] = (audio, video)
    for a in (d.get('attachments') or []):
        if a.get('url'):
            attachments.append((mid, a['url'], clean(a.get('filename') or 'attachment')))

rows = []
for m in media:
    mid = str(m.get('id'))
    date = clean(m.get('date'))
    year = date[:4] if date else '0000'
    kind = 'video' if m.get('video') else ('audio' if m.get('audio') else 'other')
    dl = clean(m.get('download_url'))
    a, v = srcmap.get(mid, ('', ''))
    if not a and kind == 'audio':
        a = dl
    if not v and kind == 'video':
        v = dl
    rows.append([
        mid, date, year,
        clean(m.get('speaker')) or 'Unknown',
        clean(m.get('series')) or 'Uncategorized',
        clean(m.get('title')) or 'Untitled',
        kind, a, v,
        clean(m.get('upload_type')),
        clean(m.get('third_party_id')),
    ])

hdr = ['id','date','year','speaker','series','title','kind',
       'audio_url','video_url','upload_type','third_party_id']
with open(os.path.join(mdir, 'index.tsv'), 'w', encoding='utf-8') as f:
    f.write('\t'.join(hdr) + '\n')
    for r in rows:
        f.write('\t'.join(r) + '\n')

with open(os.path.join(mdir, 'attachments.tsv'), 'w', encoding='utf-8') as f:
    for r in attachments:
        f.write('\t'.join(r) + '\n')

# Readable catalog for Dave and Danilo.
with open(os.path.join(mdir, 'sermons.csv'), 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['id','date','speaker','series','title','type','has_audio','has_video'])
    for r in rows:
        w.writerow([r[0], r[1][:10], r[3], r[4], r[5], r[6],
                    'yes' if r[7] else 'no', 'yes' if r[8] else 'no'])

# Per-speaker counts, so the priority call is obvious at a glance.
counts = {}
for r in rows:
    counts[r[3]] = counts.get(r[3], 0) + 1
with open(os.path.join(mdir, 'speakers.txt'), 'w', encoding='utf-8') as f:
    for k, n in sorted(counts.items(), key=lambda kv: -kv[1]):
        f.write('%6d  %s\n' % (n, k))

print('rows=%d attachments=%d speakers=%d' % (len(rows), len(attachments), len(counts)))
PYEOF

  rows=$(( $(wc -l < "$INDEX") - 1 ))
  say "Index written: $INDEX ($rows rows)"
  cp "$INDEX" "$MDIR/index-$(date +%Y%m%d).tsv"
  cp "$MANIFEST" "$MDIR/player-$(date +%Y%m%d).json"
  say "Readable catalog: $MDIR/sermons.csv"
}

require_index() { [ -s "$INDEX" ] || die "run '$0 manifest' first"; }

# Build the download job list for a stage into a TSV of: url <TAB> destpath
# Filenames are sanitised here, in awk, so bash never has to.
build_jobs() { # <url_column> <extension>
  col="$1"; ext="$2"
  awk -F'\t' -v col="$col" -v ext="$ext" -v dest="$DEST" '
    NR == 1 { next }
    $col == "" { next }
    {
      year = ($3 == "" ? "0000" : $3)
      series = clean($5); if (series == "") series = "Uncategorized"
      title  = clean($6); if (title  == "") title = "Untitled"
      printf "%s\t%s/media/%s/%s/%s [%s].%s\n", $col, dest, year, series, title, $1, ext
    }
    function clean(s,   t) {
      t = s
      gsub(/[\/\\:*?"<>|]/, " ", t)          # illegal on macOS and Windows
      gsub(/[\x01-\x1f]/, "", t)             # control characters. \x00 in a class breaks macOS awk under UTF-8
      gsub(/  +/, " ", t)
      sub(/^ +/, "", t); sub(/ +$/, "", t)
      sub(/\.+$/, "", t)                     # no trailing dots
      return substr(t, 1, 120)
    }
  ' "$INDEX"
}

run_stage() { # <stage name> <url_column> <ext>
  require_index
  name="$1"; col="$2"; ext="$3"
  jobs_file="$MDIR/jobs-$name.tsv"
  build_jobs "$col" "$ext" > "$jobs_file"
  total=$(wc -l < "$jobs_file" | tr -d ' ')
  say "Stage $name: $total files, $JOBS parallel, into $DEST"
  [ "$total" -eq 0 ] && { say "nothing to do"; return 0; }

  # xargs calls this script back per job. -P gives portable parallelism.
  # NUL-delimit: xargs -n2 on whitespace would shred filenames containing spaces.
  tr '\t\n' '\0\0' < "$jobs_file" \
    | xargs -0 -P "$JOBS" -n 2 "$SELF" __get

  say "Stage $name finished. Failures: $( [ -f "$MDIR/failures.tsv" ] && wc -l < "$MDIR/failures.tsv" | tr -d ' ' || echo 0 )"
}

cmd_audio() { run_stage audio 8 mp3; }

# Everything by one speaker: audio, video and outline PDFs, in one pass.
# Matching is case-insensitive and substring, so "johnny" is enough.
cmd_speaker() {
  require_index
  who="${1:-}"
  [ -z "$who" ] && die 'usage: '"$0"' speaker "Johnny Johnston"'

  matched=$(awk -F'\t' -v w="$who" '
    NR>1 && index(tolower($4), tolower(w)) {n++} END {print n+0}' "$INDEX")
  [ "$matched" -eq 0 ] && die "no sermons matched speaker \"$who\""
  say "Speaker \"$who\": $matched sermons"

  # Restrict the index to this speaker for the duration of the stage.
  scoped="$MDIR/index-speaker.tsv"
  head -1 "$INDEX" > "$scoped"
  awk -F'\t' -v w="$who" 'NR>1 && index(tolower($4), tolower(w))' "$INDEX" >> "$scoped"

  real_index="$INDEX"
  INDEX="$scoped"
  run_stage "speaker-audio" 8 mp3
  run_stage "speaker-video" 9 mp4
  cmd_notes
  INDEX="$real_index"

  say "Speaker capture complete. Files are filed under $DEST/media/<year>/<series>/"
  awk -F'\t' 'NR>1 {printf "  %s  %s  (%s)\n", $2, $6, $5}' "$scoped" | sort
}
cmd_video() { run_stage video 9 mp4; }

# ---------------------------------------------------------------------------
# notes: sermon outline PDFs, pulled from the per-item sources files
# ---------------------------------------------------------------------------
cmd_notes() {
  require_index
  jobs_file="$MDIR/jobs-notes.tsv"

  [ -s "$MDIR/attachments.tsv" ] || { say "no attachments recorded; re-run manifest"; return 0; }

  # Join to the index for year/series/title, and build url<TAB>destpath.
  awk -F'\t' -v OFS='\t' -v dest="$DEST" '
    function clean(s,   t) {
      t = s
      gsub(/[\/\\:*?"<>|]/, " ", t); gsub(/[\x01-\x1f]/, "", t)
      gsub(/  +/, " ", t); sub(/^ +/, "", t); sub(/ +$/, "", t); sub(/\.+$/, "", t)
      return substr(t, 1, 120)
    }
    NR == FNR { if (FNR > 1) { yr[$1]=$3; se[$1]=$5; ti[$1]=$6 } ; next }
    {
      id = $1; url = $2; fn = $3
      if (!(id in yr) || url == "") next
      y = (yr[id] == "" ? "0000" : yr[id])
      s = clean(se[id]); if (s == "") s = "Uncategorized"
      t = clean(ti[id]); if (t == "") t = "Untitled"
      print url, dest "/media/" y "/" s "/" t " [" id "] - " fn
    }
  ' "$INDEX" "$MDIR/attachments.tsv" > "$jobs_file"

  total=$(wc -l < "$jobs_file" | tr -d ' ')
  say "Stage notes: $total PDFs"
  [ "$total" -eq 0 ] && return 0
  tr '\t\n' '\0\0' < "$jobs_file" | xargs -0 -P "$JOBS" -n 2 "$SELF" __get
  say "Notes finished"
}

# ---------------------------------------------------------------------------
# youtube: the 142 items Clover never hosted a file for
# ---------------------------------------------------------------------------
cmd_youtube() {
  require_index
  need yt-dlp
  say "Downloading YouTube-hosted items"
  # Unit separator, not tab: tab is IFS whitespace and would collapse empty fields.
  US=$(printf '\037')
  awk -F'\t' -v OFS="$US" '
    function clean(s,   t) {
      t = s; gsub(/[\/\\:*?"<>|]/, " ", t); gsub(/[\x01-\x1f]/, "", t)
      gsub(/  +/, " ", t); sub(/^ +/, "", t); sub(/ +$/, "", t); sub(/\.+$/, "", t)
      return substr(t, 1, 120)
    }
    NR > 1 && $10 == "youtube" && $11 != "" {
      y = ($3 == "" ? "0000" : $3)
      s = clean($5); if (s == "") s = "Uncategorized"
      t = clean($6); if (t == "") t = "Untitled"
      print $11, y, s, t, $1
    }' "$INDEX" \
  | while IFS="$US" read -r vid year safe_series safe_title id; do
      out="$DEST/media/$year/$safe_series"
      mkdir -p "$out"
      base="$out/$safe_title [$id]"
      if ls "$base".* >/dev/null 2>&1; then
        printf 'skip %s\n' "$safe_title"; continue
      fi
      yt-dlp -f 'bv*+ba/b' --merge-output-format mp4 \
             --write-info-json --write-thumbnail \
             --write-subs --write-auto-subs --sub-langs en \
             --retries 5 --fragment-retries 10 \
             -o "$base.%(ext)s" "https://www.youtube.com/watch?v=$vid" 2>>"$LOG" \
        && printf 'ok   %s\n' "$safe_title" \
        || { printf 'FAIL yt %s\t%s\n' "$vid" "$safe_title" | tee -a "$MDIR/failures.tsv" >&2; }
    done
  say "YouTube stage finished"
}


# ---------------------------------------------------------------------------
# channel: enumerate the church's YouTube channel and work out how much of it
# exists nowhere else. Dave's concern is the right one: for anything whose only
# copy is the channel, a strike or a closure is permanent loss.
# ---------------------------------------------------------------------------
CHANNEL="${CCCV_CHANNEL:-https://www.youtube.com/channel/UC3Uw5Cc9fEd5v724Xr6E1KQ}"
CHANTSV="$MDIR/channel.tsv"

cmd_channel() {
  require_index
  need yt-dlp
  say "Enumerating $CHANNEL (no downloads, just the listing)"
  # --flat-playlist avoids fetching each video page: minutes instead of hours.
  : > "$CHANTSV.tmp"
  for tab in videos streams; do
    yt-dlp --flat-playlist --ignore-errors --no-warnings \
           --print "%(id)s\t%(title)s\t%(upload_date)s\t%(duration)s" \
           "$CHANNEL/$tab" >> "$CHANTSV.tmp" 2>>"$LOG" || say "tab $tab returned nothing"
  done
  sort -u "$CHANTSV.tmp" > "$CHANTSV"; rm -f "$CHANTSV.tmp"
  total=$(wc -l < "$CHANTSV" | tr -d ' ')
  say "Channel holds $total videos"

  # Classify against the Clover catalog:
  #   embed   - catalog references this exact video id (the 142). No Clover file.
  #   dated   - catalog has a sermon on the same date, so a Clover master very
  #             likely exists and the channel copy is redundant.
  #   only    - neither. The channel is the only known copy.
  awk -F'\t' -v OFS='\t' '
    NR == FNR {
      if (FNR > 1) {
        if ($11 != "") embed[$11] = 1
        if ($2 != "")  dated[substr($2, 1, 10)] = 1
        if ($9 != "")  hasvid[substr($2, 1, 10)] = 1
      }
      next
    }
    {
      d = ($3 != "" && $3 != "NA") ? substr($3,1,4) "-" substr($3,5,2) "-" substr($3,7,2) : ""
      if ($1 in embed)        cls = "embed"
      else if (d in hasvid)   cls = "dated"
      else if (d in dated)    cls = "dated"
      else                    cls = "only"
      print cls, $1, d, $2
    }
  ' "$INDEX" "$CHANTSV" > "$MDIR/channel-classified.tsv"

  e=$(awk -F'\t' '$1=="embed"' "$MDIR/channel-classified.tsv" | wc -l | tr -d ' ')
  r=$(awk -F'\t' '$1=="dated"' "$MDIR/channel-classified.tsv" | wc -l | tr -d ' ')
  o=$(awk -F'\t' '$1=="only"'  "$MDIR/channel-classified.tsv" | wc -l | tr -d ' ')
  cat <<SUMMARY

  Channel videos                      $total
    referenced by the catalog,
    with no Clover file (the 142)     $e   <- irreplaceable, pull these first
    same date as a catalogued sermon
    (Clover master probably exists)   $r
    not in the catalog at all         $o   <- also only on YouTube

  Irreplaceable if the channel goes:  $(( e + o ))

  Detail: $MDIR/channel-classified.tsv
  Next:   $0 youtube        # the $e embeds
          $0 channel-pull   # the $(( e + o )) that exist nowhere else

SUMMARY
}

# Download everything whose only known copy is the channel.
cmd_channel_pull() {
  [ -s "$MDIR/channel-classified.tsv" ] || die "run '$0 channel' first"
  need yt-dlp
  out="$DEST/media/_youtube-only"
  mkdir -p "$out"
  n=$(awk -F'\t' '$1=="embed" || $1=="only"' "$MDIR/channel-classified.tsv" | wc -l | tr -d ' ')
  say "Pulling $n videos that exist only on YouTube, into $out"
  # yt-dlp's own archive file makes this resumable across runs.
  awk -F'\t' '$1=="embed" || $1=="only" {print "https://www.youtube.com/watch?v=" $2}' \
    "$MDIR/channel-classified.tsv" \
  | yt-dlp -a - \
      --download-archive "$MDIR/yt-archive.txt" \
      --ignore-errors --no-warnings \
      -f 'bv*+ba/b' --merge-output-format mp4 \
      --write-info-json --write-thumbnail --write-subs --write-auto-subs --sub-langs en \
      --retries 5 --fragment-retries 10 \
      -o "$out/%(upload_date)s - %(title).120B [%(id)s].%(ext)s" 2>>"$LOG"
  say "Done. $(find "$out" -name '*.mp4' 2>/dev/null | wc -l | tr -d ' ') mp4 files in $out"
}

# ---------------------------------------------------------------------------
# verify / report
# ---------------------------------------------------------------------------
cmd_verify() {
  require_index
  say "Verifying against remote sizes"
  ok=0; bad=0; missing=0
  for stage in "audio 8 mp3" "video 9 mp4"; do
    set -- $stage
    build_jobs "$2" "$3" | while IFS="$(printf '\t')" read -r url out; do
      if [ ! -f "$out" ]; then printf 'MISSING\t%s\n' "$out"; continue; fi
      remote=$(remote_size "$url")
      local_sz=$(filesize "$out")
      if [ -z "$remote" ]; then
        printf 'UNCHECKED\t%s\n' "$out"; continue
      fi
      if [ "$remote" != "$local_sz" ]; then
        printf 'MISMATCH\t%s\tlocal=%s\tremote=%s\n' "$out" "$local_sz" "$remote"
      else
        printf 'OK\t%s\n' "$out"
      fi
    done
  done > "$MDIR/verify.tsv"
  ok=$(grep -c '^OK' "$MDIR/verify.tsv" || true)
  unchecked=$(grep -c '^UNCHECKED' "$MDIR/verify.tsv" || true)
  bad=$(grep -c '^MISMATCH' "$MDIR/verify.tsv" || true)
  missing=$(grep -c '^MISSING' "$MDIR/verify.tsv" || true)
  say "verify: $ok ok, $bad mismatched, $missing missing, $unchecked unreachable. Detail in $MDIR/verify.tsv"
}

# Content-level check, not just size. S3 gives a plain md5 as the ETag for
# single-part uploads and "<md5>-<partcount>" for multipart ones; only the
# former can be compared locally, so multipart objects are reported separately.
cmd_deepverify() {
  [ -s "$MDIR/etags.tsv" ] || die "no etags recorded yet; run a download stage first"
  # macOS ships `md5`, Linux ships `md5sum`. `need a || need b` does not fall
  # through, because need() exits on failure.
  if command -v md5sum >/dev/null 2>&1; then
    hash_of() { md5sum "$1" | cut -d' ' -f1; }
  elif command -v md5 >/dev/null 2>&1; then
    hash_of() { md5 -q "$1"; }
  else
    die "need md5sum or md5 to verify content"
  fi

  # Normalise any absolute paths written by an earlier version of this script.
  # Do not strip an exact $DEST prefix: the archive may have been written under
  # one path and be read under another (moved to a drive, or reached through a
  # different mount). Everything lives under <dest>/media/, so anchor on that.
  if grep -q "$(printf '\t')/" "$MDIR/etags.tsv" 2>/dev/null; then
    say "Normalising absolute paths in etags.tsv"
    awk -F'\t' -v OFS='\t' '{
      if ($3 ~ /^\//) {
        i = index($3, "/media/")
        if (i > 0) $3 = substr($3, i + 1)
      }
      print
    }' "$MDIR/etags.tsv" > "$MDIR/etags.tsv.new" && mv "$MDIR/etags.tsv.new" "$MDIR/etags.tsv"
  fi

  say "Deep verify (md5 against recorded S3 ETags)"
  ok=0; bad=0; skipped=0; gone=0
  # Last recorded etag per path wins.
  awk -F'\t' '{e[$3]=$1} END {for (p in e) printf "%s\t%s\n", e[p], p}' "$MDIR/etags.tsv" > "$MDIR/etags-latest.tsv"
  while IFS=$(printf '\t') read -r et relpath; do
    [ -z "${relpath:-}" ] && continue
    case "$relpath" in
      /*) path="$relpath" ;;
      *)  path="$DEST/$relpath" ;;
    esac
    case "$et" in
      *-*) printf 'MULTIPART\t%s\n' "$path"; continue ;;
    esac
    if [ ! -f "$path" ]; then printf 'MISSING\t%s\n' "$path"; continue; fi
    h=$(hash_of "$path")
    if [ "$h" = "$et" ]; then printf 'OK\t%s\n' "$path"
    else printf 'CORRUPT\t%s\tlocal=%s\tetag=%s\n' "$path" "$h" "$et"; fi
  done < "$MDIR/etags-latest.tsv" > "$MDIR/deepverify.tsv"
  say "deep: $(grep -c '^OK' "$MDIR/deepverify.tsv" || true) ok, $(grep -c '^CORRUPT' "$MDIR/deepverify.tsv" || true) corrupt, $(grep -c '^MULTIPART' "$MDIR/deepverify.tsv" || true) multipart (size-checked only), $(grep -c '^MISSING' "$MDIR/deepverify.tsv" || true) missing"
}

# Everything, in order. Each stage is resumable, so re-running after an
# interruption or an unplugged drive picks up where it stopped.
cmd_all() {
  require_index
  cmd_audio
  cmd_notes
  cmd_video
  if command -v yt-dlp >/dev/null 2>&1; then
    cmd_channel
    cmd_channel_pull
  else
    say "yt-dlp is not installed, skipping the YouTube-only stage. Install it, then run '$0 channel' and '$0 channel-pull'"
  fi
  cmd_deepverify
  cmd_report
}

cmd_report() {
  require_index
  printf '\nCCCV sermon archive\n  %s\n\n' "$DEST"
  printf '  catalog rows   %s\n' "$(( $(wc -l < "$INDEX") - 1 ))"
  printf '  files on disk  %s\n' "$(find "$DEST/media" -type f 2>/dev/null | wc -l | tr -d ' ')"
  printf '    mp3          %s of %s\n' \
    "$(find "$DEST/media" -name '*.mp3' 2>/dev/null | wc -l | tr -d ' ')" \
    "$(awk -F'\t' 'NR>1 && $8!=""' "$INDEX" | wc -l | tr -d ' ')"
  printf '    mp4          %s of %s\n' \
    "$(find "$DEST/media" -name '*.mp4' 2>/dev/null | wc -l | tr -d ' ')" \
    "$(awk -F'\t' 'NR>1 && $9!=""' "$INDEX" | wc -l | tr -d ' ')"
  printf '    pdf          %s\n' "$(find "$DEST/media" -name '*.pdf' 2>/dev/null | wc -l | tr -d ' ')"
  printf '  size on disk   %s\n' "$(du -sh "$DEST" 2>/dev/null | cut -f1)"
  printf '  failures       %s\n\n' "$( [ -f "$MDIR/failures.tsv" ] && wc -l < "$MDIR/failures.tsv" | tr -d ' ' || echo 0 )"
}

# ---------------------------------------------------------------------------
SELF="$(cd "$(dirname "$0")" && pwd)/$(basename "$0")"
export SELF LOG MDIR DEST

case "${1:-}" in
  manifest) cmd_manifest ;;
  notes)    cmd_notes ;;
  audio)    cmd_audio ;;
  speaker)  shift; cmd_speaker "${1:-}" ;;
  video)    cmd_video ;;
  youtube)  cmd_youtube ;;
  channel)  cmd_channel ;;
  channel-pull) cmd_channel_pull ;;
  verify)   cmd_verify ;;
  deep)     cmd_deepverify ;;
  report)   cmd_report ;;
  all)      cmd_all ;;
  __get)    shift; cmd__get "$@" ;;
  *)        sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//' ;;
esac
