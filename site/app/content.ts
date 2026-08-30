/* ------------------------------------------------------------------
   Every string in this file is either verbatim from ccconejovalley.com
   or a tightened version of their copy. Anything I wrote is marked
   AUTHORED. Anything with no source is marked PLACEHOLDER.
   Source page is noted on each block.
   ------------------------------------------------------------------ */

/* /services — "When we Meet", "Where We Mee t", and the homepage
   livestream block. Verbatim. */
export const TIMES = [
  {
    label: "Sunday",
    value: "9:00 & 11:00\u00a0am",
    detail: "Worship & New Testament Through The Bible Teaching",
  },
  {
    label: "Wednesday",
    value: "7:00 pm",
    detail: "Worship & Old Testament Through The Bible Teaching",
  },
  {
    label: "Where",
    value: "101 N. Skyline Dr.",
    detail: "Thousand Oaks, CA 91362",
  },
  {
    label: "Watch live",
    value: "Live online",
    detail: "Sundays 11 am & Wednesdays 7 pm on YouTube, Facebook and Rumble",
  },
];

/* /services "WHAT TO EXPECT" and /ministries/children. Their words,
   tightened. The order is the actual order of a Sunday morning, which
   is why it is numbered. Step titles are AUTHORED. */
export const SUNDAY_STEPS = [
  {
    title: "Come as you are",
    body: "You'll find folks comfortable and casual. Some will be in shorts, while others may be a bit more dressed-up. What matters most is the inside of an individual rather than the outside.",
  },
  {
    title: "Your kids are looked after",
    body: "Child care and Children's Ministry are provided at both Sunday morning and Wednesday night services, ministering to your children and teaching them the Bible at their level.",
  },
  {
    title: "Worship together",
    body: "A mixture of contemporary praise and worship along with some traditional hymns. Our Worship is not a concert, but a combined choir of all who attend, singing to an audience of One.",
  },
  {
    title: "Through the Word",
    body: "Primarily a teaching time through the Word of God. Calvary Chapels are known worldwide for their style of teaching that is verse-by-verse through every book of the Bible.",
  },
];

/* /ministries/* — one page each. Blurbs are their copy, tightened.
   Meta lines are their stated meeting times, verbatim. */
export const MINISTRIES = [
  {
    slug: "01-foundations",
    wide: true, ratio: "16/10", field: "field-stock",
    name: "Foundations of Faith",
    blurb:
      "For new believers and those who want to understand and study the Word more deeply.",
    meta: "Sundays at 10 am",
  },
  {
    slug: "02-evangelism",
    wide: false, ratio: "4/5", field: "field-salt",
    name: "Evangelism & Discipleship",
    blurb:
      "Learn to share the gospel of grace, and how to grow in the grace of God.",
    meta: "6:30–7:30 pm · Sept 25, Oct 23, Nov 27",
  },
  {
    slug: "03-men",
    wide: false, ratio: "4/5", field: "field-blue",
    name: "Men",
    blurb:
      "Pray, eat, worship, study, and enjoy table discussion. Open to the young and not so young.",
    meta: "Every other Tuesday · On break",
  },
  {
    slug: "04-women",
    wide: false, ratio: "4/5", field: "field-salt",
    name: "Women",
    blurb:
      "Priscilla Shirer's The Armor of God study — standing strong in faith and putting on the full armor of God.",
    meta: "Mondays, 6:00–8:15 pm",
  },
  {
    slug: "05-children",
    wide: false, ratio: "4/5", field: "field-stock",
    name: "Children",
    blurb:
      "Teaching them the Bible at their level, so it's easy for them to understand.",
    meta: "Sundays 11 am & Wednesday evenings",
  },
  {
    slug: "06-youth",
    wide: true, ratio: "16/10", field: "field-blue",
    name: "Youth",
    blurb:
      "Food, worship, prayer, Bible study and fellowship for 6th–12th graders.",
    meta: "Sundays, except the 1st of the month",
  },
  {
    slug: "07-young-adults",
    wide: true, ratio: "16/9", field: "field-salt",
    name: "Young Adults",
    blurb:
      "Growing in spiritual maturity by pursuing God, trusting His pursuit of us, and knowing Him more through studying His word.",
    meta: "1st & 3rd Friday, 6:30–8:30 pm · Ages 18–30",
  },
  {
    slug: "08-marriage",
    wide: true, ratio: "16/9", field: "field-stock",
    name: "Marriage",
    blurb:
      "Whether you're newly married, preparing for marriage, or growing together through the seasons of life.",
    meta: "Led by Juston & Chrissy Peloquin",
  },
];

/* /eventscalendar/* and /ministries/evangelism-discipleship.
   Dates are theirs, including the movie night's "TBD".
   NOTE: DEMO.md asked for a Men's Breakfast. There is no such event
   anywhere on their site, so I did not invent one — the Evangelism &
   Discipleship class is a real dated event and takes the third slot. */
export const EVENTS = [
  {
    month: "Sep",
    day: "11",
    name: "2026 Women's Retreat",
    detail: "September 11–13, 2026 · Camper Daley, Calabasas",
  },
  {
    month: "Sep",
    day: "25",
    name: "Evangelism & Discipleship Class",
    detail: "September 25 · 6:30–7:30 pm · No need to sign up",
  },
  {
    month: "TBD",
    day: "",
    name: "Family Movie Night",
    detail: "Date to be announced · 7:00 pm · Popcorn will be provided",
  },
];

/* IA: 23 Clover nav links collapsed into three footer groups. */
export const FOOTER_LINKS = [
  {
    heading: "Church",
    links: ["About Us", "What We Believe", "Who We Support", "Ministries"],
  },
  {
    heading: "Watch & Listen",
    links: ["Livestream", "Sermons", "YouTube", "Facebook", "Rumble", "Radio"],
  },
  {
    heading: "Connect",
    links: ["Services", "Prayer", "Serve", "Invite", "Give"],
  },
];

/* The current message on their YouTube channel. Title, passage and series
   name are theirs, taken from the video and its playlist.
   https://www.youtube.com/watch?v=NvkGG0jTnyI */
export const SERMON = {
  videoId: "NvkGG0jTnyI",
  title: "Losing Sight Of What Really Matters",
  // The same title, broken by hand for the desktop column so it sets as
  // one typographic shape instead of an arbitrary browser wrap. Joined
  // back into a single line below lg.
  titleLines: ["Losing Sight", "Of What Really", "Matters"],
  passage: "Luke 7:36-50, 8:1-21",
  tags: ["The Book of Luke", "Verse by verse"],
};
