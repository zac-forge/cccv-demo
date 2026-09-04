/* ------------------------------------------------------------------
   Every string in this file is either verbatim from ccconejovalley.com
   or a tightened version of their copy. Anything I wrote is marked
   AUTHORED. Anything with no source is marked PLACEHOLDER.
   Source page is noted on each block.
   ------------------------------------------------------------------ */

import { CHURCH } from "./site";

/* /services — "When we Meet", "Where We Mee t", and the homepage
   livestream block. Verbatim. The address links to their own Google
   Maps pin (/services, "CLICK HERE FOR DETAILS AND DIRECTIONS"). */
export const TIMES: {
  label: string;
  value: string;
  detail: string;
  href?: string;
  external?: boolean;
}[] = [
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
    href: CHURCH.directions,
    external: true,
  },
  {
    label: "Watch live",
    value: "Live online",
    detail: "Sundays 11 am & Wednesdays 7 pm on YouTube, Facebook and Rumble",
    href: "/watch/live",
  },
];

/* /services "WHAT TO EXPECT" and /ministries/children. `body` is their
   copy tightened for the homepage; `full` is the same paragraph in full,
   for /new. `when` is the children's page's own "When:" line. The order
   is the actual order of a Sunday morning, which is why it is numbered.
   Step titles and link labels are AUTHORED. */
export const SUNDAY_STEPS: {
  title: string;
  body: string;
  full: string;
  when?: string;
  link?: { label: string; href: string };
}[] = [
  {
    title: "Come as you are",
    body: "You'll find folks comfortable and casual. Some will be in shorts, while others may be a bit more dressed-up. What matters most is the inside of an individual rather than the outside.",
    full: "When you visit us at Calvary Conejo Valley you'll find folks comfortable and casual. Some will be in shorts, while others may be a bit more dressed-up. What matters most is the inside of an individual rather than the outside. Feel free to come comfortable, yet modest.",
  },
  {
    title: "Your kids are looked after",
    body: "Child care and Children's Ministry are provided at both Sunday morning and Wednesday night services, ministering to your children and teaching them the Bible at their level.",
    full: "We here at Calvary Conejo Valley understand the Lord's heart for His precious lambs, and we place a high priority on ministering to the children He has entrusted into our care. Child care and Children's Ministry are provided at both Sunday morning and Wednesday night services, ministering to your children and teaching them the Bible at their level, so it's easy for them to understand.",
    when: "Sundays during the 11 AM service and Wednesdays evenings during service.",
    link: { label: "Children's ministry", href: "/ministries/children" },
  },
  {
    title: "Worship together",
    body: "A mixture of contemporary praise and worship along with some traditional hymns. Our Worship is not a concert, but a combined choir of all who attend, singing to an audience of One.",
    full: "The Worship time will be a mixture of contemporary praise and worship along with some traditional hymns. Some songs will be fast and maybe a little loud while others will be soft and meditative – we find all of this in the Psalms! Our Worship is not a concert, but a combined choir of all who attend, singing to an audience of One.",
  },
  {
    title: "Through the Word",
    body: "Primarily a teaching time through the Word of God. Calvary Chapels are known worldwide for their style of teaching that is verse-by-verse through every book of the Bible.",
    full: "The preaching time is primarily a teaching time through the Word of God. Calvary Chapels are known worldwide for their style of teaching that is verse-by-verse through every book of the Bible. Although there may be times that we have a topical study, the primary focus is to give the whole counsel of God’s Word in a way that can be understood, is applicable to where you are, and will be challenging you to grow in the grace and in the knowledge of our Lord and Savior Jesus Christ.",
    link: { label: "Watch a recent message", href: "/watch" },
  },
];

/* /ministries/* — one page each, re-read 2026-09-03. Card blurbs are
   their copy, tightened; `meta` is their stated meeting time. `detail`
   is the page: paragraphs verbatim, facts as they label them, leaders
   as named. Dates already past (Foundations "on break until January 25,
   2026", Marriage "August 14, 2026", E&D "Aug. 28") are left off; a
   leader's personal phone number on /young-adults is not carried over.
   `slug` names the illustration in /public/ministries; `href` keeps the
   church's own /ministries/* URL, so none of these eight ever needs a
   redirect. Middle School folds into Youth (docs/01-build-plan.md §3). */
export type Fact = { label: string; value: string };
export type MinistrySection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  facts?: Fact[];
};
export type Ministry = {
  slug: string;
  href: string;
  wide: boolean;
  ratio: string;
  field: "field-stock" | "field-salt" | "field-blue";
  name: string;
  blurb: string;
  meta: string;
  detail: {
    title?: string;
    intro: string[];
    facts: Fact[];
    leaders?: string;
    verse?: string;
    note?: string;
    sections?: MinistrySection[];
  };
};

export const MINISTRIES: Ministry[] = [
  {
    slug: "01-foundations",
    href: "/ministries/foundations-of-faith",
    wide: true, ratio: "16/10", field: "field-stock",
    name: "Foundations of Faith",
    blurb:
      "For new believers and those who want to understand and study the Word more deeply.",
    meta: "Sundays at 10 am",
    detail: {
      intro: [
        "Come join us at the church for our new “Foundations of Faith Class.”",
        "A class by Pastor Mark Swartz for new believers and those who want to understand and study the Word more deeply.",
      ],
      facts: [
        { label: "When", value: "Sundays at 10 AM, before our 11 AM Church Service" },
        { label: "Where", value: "In classroom at CCCV" },
      ],
      leaders: "Pastor Mark Swartz",
    },
  },
  {
    slug: "02-evangelism",
    href: "/ministries/evangelism-discipleship",
    wide: false, ratio: "4/5", field: "field-salt",
    name: "Evangelism & Discipleship",
    blurb:
      "Learn to share the gospel of grace, and how to grow in the grace of God.",
    meta: "6:30–7:30 pm · Sept 25, Oct 23, Nov 27",
    detail: {
      intro: [
        "Join us for our Evangelism & Discipleship Class—a great opportunity to grow in your faith and be equipped to share it with others.",
        "All are welcome! No need to sign up. We’d love to have you join us!",
      ],
      facts: [
        { label: "Evangelism", value: "Learn to share the gospel of grace" },
        { label: "Discipleship", value: "Learn about how to grow in the grace of God." },
        { label: "Time", value: "6:30 – 7:30 PM" },
        { label: "Dates", value: "Sept. 25, Oct. 23 and Nov. 27, 2026" },
      ],
    },
  },
  {
    slug: "03-men",
    href: "/ministries/men",
    wide: false, ratio: "4/5", field: "field-blue",
    name: "Men",
    blurb:
      "Pray, eat, worship, study, and enjoy table discussion. Open to the young and not so young.",
    meta: "Every other Tuesday · On break",
    detail: {
      title: "Men’s Study",
      intro: [
        "Please come join us as we pray, eat, worship, study, and enjoy table discussion.",
        "Come be a part of this life changing fellowship!",
      ],
      facts: [
        { label: "Starts", value: "On Break" },
        { label: "When", value: "Every other Tuesday" },
        { label: "Time", value: "6:30 – 8:00 PM" },
        { label: "Where", value: "Classroom 6" },
        { label: "Who", value: "Primarily for adult men ages 18 and up, but study is open to the young and not so young" },
        { label: "Food", value: "We will serve dinner" },
        { label: "Study", value: "(Praying over our next study)" },
      ],
      note: "Kickoff & Dates: We’ll be kicking off a new session Soon!",
      leaders: "Pastor Tim Hutchinson",
    },
  },
  {
    slug: "04-women",
    href: "/ministries/women",
    wide: false, ratio: "4/5", field: "field-salt",
    name: "Women",
    blurb:
      "A journey through The Gospel of John by Melissa Spoelstra — who Jesus is, what He came to do, and how His life and words invite us into a closer relationship with Him.",
    meta: "Mondays from Sept. 21 · 6:00–8:15 pm",
    detail: {
      title: "Women’s Fall Study",
      intro: [
        "Come join us as we journey through The Gospel of John by Melissa Spoelstra! Together, we’ll dive deeper into who Jesus is, what He came to do, and how His life and words invite us into a closer relationship with Him.",
        "No matter where you are in your faith journey, you’re welcome!",
        "Come ready to learn, grow, and connect with one another. We’d love to have you join us!",
      ],
      facts: [
        { label: "When", value: "Monday (starting Sept. 21st)" },
        { label: "Time", value: "6:00 – 8:15 PM" },
        { label: "Where", value: "Calvary Chapel Conejo Valley" },
        { label: "Dinner", value: "Dinner will be provided each week!" },
        { label: "Childcare", value: "Childcare is available, please include on registration!" },
      ],
    },
  },
  {
    slug: "05-children",
    href: "/ministries/children",
    wide: false, ratio: "4/5", field: "field-stock",
    name: "Children",
    blurb:
      "Teaching them the Bible at their level, so it's easy for them to understand.",
    meta: "Sundays 11 am & Wednesday evenings",
    detail: {
      title: "Children’s Ministry",
      intro: [
        "We here at Calvary Conejo Valley understand the Lord’s heart for His precious lambs, and we place a high priority on ministering to the children He has entrusted into our care.",
        "Child care and Children’s Ministry are provided at both Sunday morning and Wednesday night services, ministering to your children and teaching them the Bible at their level, so it’s easy for them to understand.",
      ],
      facts: [
        { label: "When", value: "Sundays during the 11 AM service and Wednesdays evenings during service." },
      ],
      verse: "Matthew 19:14",
      sections: [
        {
          // /childrens/sick-policy, verbatim.
          title: "Sick child policy",
          paragraphs: [
            "Thank you for allowing us to care for and teach your children each week. We would like to do everything we can to keep a healthy and safe environment for your child. One way for you to help us and other families is by complying with a few health guidelines.",
            "Your child should not attend Children’s Ministry if they have the following symptoms:",
          ],
          list: [
            "A fever currently or within the last 24 hours.",
            "An unidentified rash, any open sores or oozing wounds.",
            "A persistent cough or exhibits yellow/green nasal discharge.",
            "Lethargic behavior (parents usually know when their child isn’t feeling well).",
            "Diarrhea or loose stools currently or within the last 24 hours.",
            "Vomiting currently or within the last 24 hours.",
            "The presence of head lice, pinworms, pinkeye, ringworm, chickenpox etc.",
            "Any symptoms that they would usually stay home from school with.",
          ],
        },
        {
          title: "If your child is unwell",
          paragraphs: [
            "You may watch the service from the lobby or live streaming on Facebook from home.",
            "We appreciate your cooperation and understanding that your health and the health of others is of our highest concern.",
          ],
        },
      ],
    },
  },
  {
    slug: "06-youth",
    href: "/ministries/youth",
    wide: true, ratio: "16/10", field: "field-blue",
    name: "Youth",
    blurb:
      "Food, worship, prayer, Bible study and fellowship for 6th–12th graders.",
    meta: "Sundays, except the 1st of the month",
    detail: {
      title: "Youth Ministry",
      intro: [
        "Grades 6th–12th, please join us for food, worship, prayer, bible study and fellowship.",
      ],
      facts: [
        { label: "When", value: "Every Sunday, except 1st Sunday of the month. Held during the 11 AM service." },
        { label: "Who", value: "6th – 12th Graders" },
        { label: "What", value: "We will be reading and studying through the bible book by book, chapter by chapter, and verse by verse." },
        { label: "Bring", value: "Your Bibles (If you don’t have one we will have extra Bibles for you to use and keep)" },
      ],
      leaders: "Adam Terrazas and Pastor Brent Hebert",
      sections: [
        {
          title: "Our Youth Mission",
          paragraphs: [
            "Jesus commands ALL believers to go out and make disciples (Followers, Learners/Students of Jesus) of all people groups baptizing them in the name of the Father, Son and Holy Spirit, teaching them to observe all things that Jesus himself has taught (Matthew 28:19-20). In humble obedience to God’s word, making disciples of the Lord Jesus is exactly our mission. In accordance to the Word of God we aim to teach the next generation the praises of the Lord, his wonderful works, as well as coming alongside Parents in co-laboring with them to help them equip and disciple their children (Psalms 78,145, 1 Cor.3:6-9).",
            "We earnestly pray that the next generation would have their own personal relationship with the Lord Jesus and would be confident in sharing the good news of the Lord Jesus Christ with the boldness of the Holy Spirit and the love of our Savior Jesus Christ to everyone.",
            "Please be praying for us in this mission.",
            "Parents if you have any questions please feel free to contact us.",
          ],
        },
        {
          // /ministries/middle-school, folded in here.
          title: "Middle school",
          facts: [
            { label: "Who", value: "6th, 7th, and 8th graders welcome!" },
            { label: "What", value: "Bible Study and Fellowship" },
            { label: "When", value: "Sunday Morning during 11 AM service" },
            { label: "Where", value: "Meet at the back of the Sanctuary after worship. Class is held in the upper room." },
            { label: "Questions?", value: "Please reach out to Pastor Joshua Camper or Chris Ramirez." },
          ],
        },
      ],
    },
  },
  {
    slug: "07-young-adults",
    href: "/ministries/young-adults",
    wide: true, ratio: "16/9", field: "field-salt",
    name: "Young Adults",
    blurb:
      "Growing in spiritual maturity by pursuing God, trusting His pursuit of us, and knowing Him more through studying His word.",
    meta: "1st & 3rd Friday, 6:30–8:30 pm · Ages 18–30",
    detail: {
      title: "Young Adults Ministry",
      intro: [
        "To help young adults understand how to grow in spiritual maturity by pursuing God, trusting His pursuit of us, and knowing Him more through studying His word, thought provoking questions, activities, and specific life application.",
      ],
      facts: [
        { label: "When", value: "1st & 3rd Friday of each month." },
        { label: "Time", value: "6:30pm–8:30pm" },
        { label: "Age", value: "18–30" },
        { label: "Where", value: "Calvary Chapel Conejo Valley" },
      ],
      leaders: "Adam Terrazas and Chris Ramirez",
    },
  },
  {
    slug: "08-marriage",
    href: "/ministries/marriage",
    wide: true, ratio: "16/9", field: "field-stock",
    name: "Marriage",
    blurb:
      "Whether you're newly married, preparing for marriage, or growing together through the seasons of life.",
    meta: "Led by Juston & Chrissy Peloquin",
    detail: {
      title: "Marriage Ministry",
      intro: [
        "Whether you’re newly married, preparing for marriage, or growing together through the seasons of life, this ministry is designed to strengthen your bond, deepen your faith, and connect with others.",
      ],
      facts: [
        { label: "Time", value: "6:30 PM" },
        { label: "Where", value: "CC Conejo Valley" },
      ],
      leaders: "Juston & Chrissy Peloquin",
    },
  },
];

/* /eventscalendar/* and /ministries/evangelism-discipleship.
   Dates are theirs, including the movie night's "TBD". The retreat and
   the movie night keep their live-site slugs; the class is a ministry
   page on their site, not an event page, and links there.
   NOTE: DEMO.md asked for a Men's Breakfast. There is no such event
   anywhere on their site, so I did not invent one — the Evangelism &
   Discipleship class is a real dated event and takes the third slot. */
export const EVENTS = [
  {
    month: "Sep",
    day: "11",
    name: "2026 Women's Retreat",
    detail: "September 11–13, 2026 · Camper Daley, Calabasas",
    href: "/events/2026-womens-retreat",
  },
  {
    month: "Sep",
    day: "25",
    name: "Evangelism & Discipleship Class",
    detail: "September 25 · 6:30–7:30 pm · No need to sign up",
    href: "/ministries/evangelism-discipleship",
  },
  {
    month: "TBD",
    day: "",
    name: "Family Movie Night",
    detail: "Date to be announced · 7:00 pm · Popcorn will be provided",
    href: "/events/family-movie",
  },
];

/* IA: 23 Clover nav links collapsed into three footer groups. Labels are
   mine; targets are the routes in docs/01-build-plan.md §3. The three
   external links are the church's own, from /home. */
export const FOOTER_LINKS: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    heading: "Church",
    links: [
      { label: "About Us", href: "/about" },
      { label: "What We Believe", href: "/about#beliefs" },
      { label: "Who We Support", href: "/about/who-we-support" },
      { label: "Ministries", href: "/ministries" },
      { label: "Memorials", href: "/memorials" },
    ],
  },
  {
    heading: "Watch & Listen",
    links: [
      { label: "Livestream", href: "/watch/live" },
      { label: "Sermons", href: "/watch" },
      { label: "Radio", href: "/watch/radio" },
      { label: "YouTube", href: CHURCH.social.youtube, external: true },
      { label: "Facebook", href: CHURCH.social.facebook, external: true },
      { label: "Rumble", href: CHURCH.social.rumble, external: true },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Know Jesus", href: "/new/know-jesus" },
      { label: "Service times", href: "/new" },
      { label: "Prayer", href: "/connect#prayer" },
      { label: "Serve", href: "/connect#serve" },
      { label: "Directory", href: "/connect#directory" },
      { label: "Give", href: "/give" },
    ],
  },
];

/* The homepage hero, one entry per slide. Slide 1 is the approved hero:
   "Faith Comes By Hearing" is the title of their daily radio broadcast
   (/radio), set in sentence case, with Romans 10:17 (NKJV) beneath it.
   Slide 2 is the /new/know-jesus title and that page's first sentence.
   Button labels are mine. `art` picks the background in Hero.tsx. */
export const HERO_SLIDES: {
  id: string;
  art: "sunrise" | "rays";
  title: string;
  quote?: string;
  lede?: string;
  ctas: { label: string; href: string; variant: "sun" | "outline" }[];
}[] = [
  {
    id: "faith",
    art: "sunrise",
    title: "Faith comes by hearing.",
    quote: "Romans 10:17",
    ctas: [
      { label: "Plan your visit", href: "/new", variant: "sun" },
      { label: "Watch a message", href: "#message", variant: "outline" },
    ],
  },
  {
    id: "know-jesus",
    art: "rays",
    title: "How can I know Jesus?",
    lede:
      "Our greatest desire is for people to know God personally through Jesus Christ.",
    ctas: [
      { label: "Start here", href: "/new/know-jesus", variant: "sun" },
      { label: "Send a prayer request", href: "/connect#prayer", variant: "outline" },
    ],
  },
];

/* The current message on their YouTube channel. Title, passage and series
   name are theirs, taken from the video and its playlist.
   https://www.youtube.com/watch?v=NvkGG0jTnyI */
export const SERMON = {
  videoId: "NvkGG0jTnyI",
  title: "Losing Sight Of What Really Matters",
  // The same title, broken by hand so it sets as one shape at every
  // width rather than rewrapping arbitrarily per breakpoint. A line
  // too long for a narrow phone simply wraps within itself.
  titleLines: ["Losing Sight", "Of What Really", "Matters"],
  passage: "Luke 7:36-50, 8:1-21",
  tags: ["The Book of Luke", "Verse by verse"],
};
