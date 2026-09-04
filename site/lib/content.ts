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

/* /eventscalendar/*, re-read 2026-09-03. Dates are theirs. The movie
   night, "TBD" in August, is now dated. The Evangelism & Discipleship
   class is a real dated event but a ministry page on their site, so its
   row links there. Detail copy is verbatim; the movie night's emoji are
   dropped. Past events keep their facts for the "past" list and get no
   page. */
export type EventItem = {
  month: string;
  day: string;
  name: string;
  detail: string;
  href: string;
  page?: {
    slug: string;
    image?: string;
    paragraphs: string[];
    facts: Fact[];
    register?: { label: string; href: string };
  };
};

export const EVENTS: EventItem[] = [
  {
    month: "Sep",
    day: "11",
    name: "2026 Women's Retreat",
    detail: "September 11–13, 2026 · Camper Daley, Calabasas",
    href: "/events/2026-womens-retreat",
    page: {
      slug: "2026-womens-retreat",
      image: "/events/2026-womens-retreat.webp",
      paragraphs: [
        "Phillip told Nathanael with an excited heart, “Come and see!” He wanted his friend to have an encounter with the Jesus! And this is what I’m telling you... Come and see that you might have a personal encounter with Jesus. This retreat is going to be a time for you to get away with the Lord, reconnect with friends, meet new friends and relax. I hope that you will come and see what the Lord has in store for you!",
        "This year’s theme is One Obsession. Taken from Phillipians 3:1-15. Our very special guest speaker is Karyn Johnson from Calvary Chapel Downey. As Karyn and I were talking and praying about this she said, women’s retreats are our special date with the Jesus! Register today for your date is waiting for you!",
      ],
      facts: [
        { label: "When", value: "September 11–13, 2026" },
        { label: "Where", value: "Camper Daley, 26801 Dorothy Dr., Calabasas, CA 91302" },
        { label: "Speaker", value: "Karyn Johnson, Calvary Chapel Downey" },
        { label: "Theme", value: "One Obsession — Philippians 3:1–15" },
      ],
      register: {
        label: "Register now",
        href: "https://www.ccsantaclarita.com/upcoming-events?sapurl=Lyt4M3N0L2xiL2V2Lyt2cGQyZ244L3JlZ2lzdGVyP2JyYW5kaW5nPXRydWUmZW1iZWQ9dHJ1ZSZyZWNlbnRSb3V0ZT1hcHAud2ViLWFwcC5saWJyYXJ5LmNhbGVuZGFyJnJlY2VudFJvdXRlU2x1Zz0lMkJ3cTU0eWd3",
      },
    },
  },
  {
    month: "Sep",
    day: "11",
    name: "Family Movie Night",
    detail: "September 11 · 7:00 pm · Popcorn will be provided",
    href: "/events/family-movie",
    page: {
      slug: "family-movie",
      image: "/events/family-movie.webp",
      paragraphs: [
        "Grab the family and join us for a fun night together!",
        "Bring your family, invite a friend, and come enjoy a great movie and fellowship together! We can’t wait to see you there!",
      ],
      facts: [
        { label: "Date", value: "September 11, 2026" },
        { label: "Time", value: "7:00 PM" },
        { label: "Where", value: "Calvary Chapel Conejo Valley" },
        { label: "Movie", value: "David" },
        { label: "Popcorn", value: "Popcorn will be provided!" },
      ],
    },
  },
  {
    month: "Sep",
    day: "25",
    name: "Evangelism & Discipleship Class",
    detail: "September 25 · 6:30–7:30 pm · No need to sign up",
    href: "/ministries/evangelism-discipleship",
  },
];

/* Already happened, kept as a record on /events. Verbatim facts. */
export const PAST_EVENTS: { date: string; name: string; detail: string }[] = [
  {
    date: "August 15, 2026",
    name: "Night of Worship",
    detail: "5:00–7:00 PM · Calvary Chapel Reason For Hope, 3001 S. Rose Ave, Oxnard",
  },
  {
    date: "July 25, 2026",
    name: "Women's Breakfast",
    detail: "Saturday at 9:00 AM · Calvary Chapel Conejo Valley",
  },
  {
    date: "May 15–17, 2026",
    name: "2026 Men's Retreat — “Walk in the Spirit”",
    detail: "Santa Barbara Christian Camp · Galatians 5:16–26",
  },
];

/* /about/about-us, verbatim: the statement of faith, Pastor Dave's bio,
   the team. /about carries an older version of the team blurbs; the
   about-us text is used because it is the fuller and more recent one.
   Photos are being replaced (docs/00-START-HERE.md), so there are none. */
export const BELIEFS = {
  intro: [
    "The Calvary Chapel Church has been formed as a fellowship of believers in the Lordship of Jesus Christ. Our supreme desire is to know Christ and be conformed into His image by the power of the Holy Spirit.",
    "We are not a denominational church. We are not opposed to denominations as such, only their over-emphasis of doctrinal differences that have led to the division of the body of Christ. We believe that the only true basis of Christian fellowship is His (Agape) love, which is greater than any differences we possess and without which we have no right to claim ourselves as Christians.",
  ],
  worship: [
    { we: "We believe worship of God should be Spiritual.", therefore: "We remain flexible and yielded to the Holy Spirit to direct our worship." },
    { we: "We believe worship of God should be Inspirational.", therefore: "We give a great place to music in our worship." },
    { we: "We believe worship of God should be Intelligent.", therefore: "Our services are designed with great emphasis upon teaching of the Word of God that He might instruct us how He should be worshipped." },
    { we: "We believe worship of God is Fruitful.", therefore: "We look for His Love in our lives as the supreme manifestation that we have truly been worshipping Him. We Seek to teach the Word of God in such a way that its message can be applied to an individual’s life, leading that person to greater maturity in Christ." },
  ],
};

/* /home: "Who We Are", "What We Do", "WHY WE'RE HERE". Verbatim. */
export const WHO_WE_ARE = [
  {
    title: "Who we are",
    text: "Located in the city of Thousand Oaks, California, Calvary Chapel Conejo Valley has been formed as a fellowship of believers in the Lordship of Jesus Christ. Our supreme desire is to know Christ and be conformed to His image.",
  },
  {
    title: "What we do",
    text: "At Calvary Chapel Conejo Valley, we study the Bible verse by verse, chapter by chapter, book by book, because God wants us to receive the whole of His counsel (Acts 20:27). As we study this way, the Lord reveals all of His will and His love for us. We don’t just teach from the Bible as much as we teach through the Bible.",
  },
  {
    title: "Why we’re here",
    text: "The heart of the body is to reach our community with the Gospel. Feeding the flock of God by consistently accurately teaching His Word is the primary focus of Calvary Chapel. It’s also our heart concerning evangelism, that “healthy sheep beget healthy sheep” and that as God’s people are fed the Word, they will naturally share the Good News of Jesus with others, leading them to Christ.",
  },
];

export const PASTOR = {
  name: "David Johnston",
  paragraphs: [
    "Having served in ministry for over 35 years, First as Youth and Men’s ministry Pastor at Calvary Chapel Antelope Valley and Calvary Chapel San Jose. Then, in July of 2000, Pastor Dave and his wife planted Calvary Chapel Santa Cruz where Dave served as Senior Pastor for 10 years. Pastor Dave has a passion for God’s people, and for seeing them grow to maturity in and through His Word.",
    "A builder at heart, and dedicated to the spread of the Gospel, Pastor Dave planted Calvary Chapel Calabasas in April of 2013, not long after transitioning out of the Senior Pastor role in Santa Cruz, leaving a ministry which continues to thrive and serve the community there. In March of 2021, CC Calabasas officially became CC Conejo Valley for the next chapter in the ministry of this growing church.",
    "Dave was born and raised as a “preacher’s kid,” giving his life to the Lord at the early age of four in Mrs. Green’s Sunday School class. In his early 20’s the Lord clearly called Dave into pastoral ministry, and over the past 35 years he has had the privilege of responding to the Lord’s call on his life to simply “Preach the Word, Love the People.”",
    "To that end, he has served tirelessly preaching faithfully and without compromise the truths of the Word of God, the passion of his life. He and his wonderful wife, Lynette, have four beautiful children, Ashley, Johnny, David, and Mark.",
    "In all things, Pastor Dave’s heart is to live as did the Apostle Paul, that “For to me, to live is Christ, and to die is gain.” (Phil. 1:21)",
  ],
};

export const TEAM: { names: string; text: string; portrait: "couple" | "male" | "female" }[] = [
  {
    names: "Dave and Lynette Johnston",
    portrait: "couple",
    text: "Pastor Dave serves as the Senior Pastor at Calvary Chapel Conejo Valley. As the overseer of the flock, he leads the fellowship with pastoral care and love. His wife, Lynette, is actively involved in the Children’s Ministry, where she joyfully shares the love of Jesus with the little ones.",
  },
  {
    names: "Joshua and Jennifer Camper",
    portrait: "couple",
    text: "Pastor Joshua serves as an Associate Pastor, overseeing both the Youth Ministry and the Marriage Ministry alongside his wife, Jennifer. Jennifer also plays an active role in the church administration and contributes to the Children’s Ministry.",
  },
  {
    names: "Tim and Kathy Hutchinson",
    portrait: "couple",
    text: "Pastor Tim serves as an Associate Pastor. In addition to his pastoral responsibilities, he leads our worship services and co-teaches the Men’s Bible Study group. His wife, Kathy, is actively involved in the Hospitality Ministry and also supports the fellowship through various other roles.",
  },
  {
    names: "Mark and Irina Swartz",
    portrait: "couple",
    text: "Pastor Mark serves as an Associate Pastor. He teaches the Foundations of Faith class and helps manage video content for the fellowship.",
  },
  {
    names: "Brent and Carrie Hebert",
    portrait: "couple",
    text: "Pastor Brent and his wife, Carrie, are valued members of our leadership team. In addition, Pastor Brent plays an active role in teaching during the Men’s Bible Study.",
  },
];

/* /about/who-we-support and /give/buyumba, verbatim. */
export const SUPPORT = {
  intro:
    "Here at Calvary Chapel Conejo Valley, in addition to our internal ministries, we support several ministry and community outreach programs. Please take a look at some of them below. God Bless!",
  orgs: [
    {
      name: "Buyamba Ministry in Uganda",
      paragraphs: [
        "Buyamba, a non-profit 501(c)3 corporation, was founded in the U.S. in 1999, to support the Dongos’ efforts with Buyamba Orphan Outreach in Uganda. Buyamba supported them through a child sponsorship program and provision of needed resources. As a result, God Cares Nursery and Primary School opened in 2002 with 97 children, in the basement of the church where The Dongo family continues to serve. Currently, Buyamba financially supports the education and care of over 1800 children through our sponsorship programs.",
        "For a gift of $20.00, you can feed a family for two-three weeks! The family will receive 22lbs of posho, 4.5lbs of sugar, 11lbs of rice and 2 bars of soap. Or send a check by mail, in the memo write “Buyumba feed a Family”.",
      ],
      links: [
        { label: "Learn more at ugandabuyamba.com", href: "https://www.ugandabuyamba.com/" },
        { label: "Feed a family: donate online", href: "https://interland3.donorperfect.net/weblink/weblink.aspx?name=E116403&id=1" },
      ],
    },
    {
      name: "Ohana Health",
      paragraphs: [
        "Ohana helps out newly pregnant women navigate unplanned pregnancies with ultrasounds, supplies, and general support.",
      ],
      links: [{ label: "Visit ohanahealthclinic.com", href: "https://ohanahealthclinic.com/" }],
    },
  ],
};

/* /give, verbatim. PayPal and the Newbury Park mailing address still
   carry the Calabasas identity and are an open question for Dave
   (docs/00-START-HERE.md); they are carried over as they stand. */
export const GIVE = {
  thanks:
    "Thank you for your partnership in ministry with us. We’re so grateful for the financial gifts given to allow us to continue the work of accomplishing God’s mission and vision for our church. Please know your generous giving is making a difference for the glory of God at our church.",
  paypal: "cccalabasas@gmx.com",
  checks: {
    payee: "Calvary Chapel Conejo Valley",
    address: "668 Cayo Grande Ct. Newbury Park, CA 91320",
  },
  questions:
    "If you have any questions or are running into difficulties with online giving, please reach out to Pastor Dave Johnston. God Bless!",
  amplifyFormId: "3e927587-cc4a-4508-ba6b-9bebe7030fea",
};

/* /memorials, verbatim. */
export const MEMORIALS = [
  {
    title: "Memorial for Mark Andrew Johnston",
    text: "Please join the Johnston family in remembering the wonderful & beautiful life of our beloved Mark Johnston.",
    facts: [
      { label: "When", value: "Saturday September 25, 2021" },
      { label: "Time", value: "11am" },
      { label: "Where", value: "Godspeak Church, 320 Via Las Brisas, Newbury Park, CA, 91320" },
    ],
    verse: "2 Corinthians 5:8",
    giving:
      "The family has not asked for donations but many have wanted to give towards the memorial service, so, if you feel led to give we have made it possible, just click the button below.",
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
