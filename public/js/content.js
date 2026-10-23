/* ==========================================================================
   CONFLUENCE — CONTENT & CONFIGURATION  (the only file you need to edit)
   --------------------------------------------------------------------------
   Everything marked  null  or  placeholder: true  is NOT official information.
   The site shows "To be announced" for null values. Replace them when the
   organisers confirm the details. Nothing here comes from the 2025 event.
   ========================================================================== */
window.CONFLUENCE = {

  /* >>> 1. REGISTRATION LINK — replace this with the official Google Form URL.
         While it still contains "REPLACE-WITH", the Register buttons show a
         reminder instead of navigating anywhere.                              */
  REGISTRATION_URL: "https://REPLACE-WITH-OFFICIAL-GOOGLE-FORM-URL",

  /* >>> 2. Basics (confirm before launch) */
  YEAR: "2026",
  LOCATION: "Bengaluru, India",          // shown bottom-left of the hero. Confirm or set to "" to hide.
  CONTACT_EMAIL: null,                   // e.g. "confluence@example.org"
  SOCIAL_LINKS: [],                      // e.g. [{ label: "Instagram", url: "https://..." }]

  /* >>> 3. About copy (generic wording — edit freely) */
  ABOUT_LEAD: "Confluence is a national level hackathon presented by IEEE CS PESU. It is built around one idea: that better work happens when ideas, people and technology meet in the same place.",
  ABOUT_TEXT: "Teams come together to build, test and present solutions. Full details about the event will be published here as the organisers confirm them.",

  /* Event facts — null = "To be announced" */
  FACTS: [
    { label: "Format",      value: "National level hackathon" },
    { label: "Dates",       value: null },
    { label: "Venue",       value: null },
    { label: "Eligibility", value: null },
    { label: "Team size",   value: null }
  ],

  /* >>> 4. Themes — placeholders until the official themes are announced */
  THEMES_INTRO: "Choose a theme to see what it covers. Official themes will appear here once they are announced.",
  THEMES: [
    { name: "Theme one",   placeholder: true, description: "The official name and description of this theme will be added here." },
    { name: "Theme two",   placeholder: true, description: "The official name and description of this theme will be added here." },
    { name: "Theme three", placeholder: true, description: "The official name and description of this theme will be added here." },
    { name: "Theme four",  placeholder: true, description: "The official name and description of this theme will be added here." }
  ],

  /* >>> 5. Roadmap — generic stages with no dates. Set real titles and dates. */
  ROADMAP_INTRO: "Select a stage to read more. Dates will be added once they are confirmed.",
  ROADMAP: [
    { title: "Registrations", date: null, placeholder: true, detail: "When registration opens and closes, and what you need to register, will be added here." },
    { title: "Selection",     date: null, placeholder: true, detail: "How teams are selected, if at all, and when results are shared will be added here." },
    { title: "Hackathon",     date: null, placeholder: true, detail: "The schedule of the hackathon itself will be added here." },
    { title: "Results",       date: null, placeholder: true, detail: "Judging, results and closing details will be added here." }
  ],

  /* >>> 6. FAQs — placeholders. Replace answers with official ones. */
  FAQS: [
    { q: "Who can participate?",           a: "Eligibility rules have not been announced yet. They will be published here." },
    { q: "How big can a team be?",         a: "Team size has not been announced yet. It will be published here." },
    { q: "Does it cost anything to take part?", a: "Fee details have not been announced yet. They will be published here." },
    { q: "Where and when does it happen?", a: "The dates and venue have not been announced yet. They will be published here." },
    { q: "How do I register?",             a: "Use any Register now button on this page. It will open the official registration form once the organisers add its link." }
  ],

  CLOSING_TEXT: "Registration happens through the official form. Dates, venue and themes will be shared here as they are confirmed."
};
