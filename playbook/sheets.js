/* The Teen Playbook: sheet content.
   Each sheet is a function of the state record S (from states.json) and returns:
   {title, why, facts:[[label,value]], steps:[], bring:[], parent:[], watch:[], links:[[label,url]]}
   Federal facts checked Oct 30, 2026. State facts come from each state's official sites (see states.json). */
(function () {
  var CHECKED = "October 30, 2026";
  function v(x) { return x !== null && x !== undefined && String(x).trim() !== ""; }
  function or(x, fb) { return v(x) ? x : fb; }
  var CONSUMER = "https://www.usa.gov/state-consumer";
  var DOL_STATE_CHILD = "https://www.dol.gov/agencies/whd/state/child-labor";
  var NAIC = "https://content.naic.org/state-insurance-departments";

  var GROUPS = [
    ["move", "Get moving"],
    ["paid", "Get paid"],
    ["ready", "Get ready"],
    ["heard", "Get heard"]
  ];

  var SHEETS = [
  /* 1 */ {id: "license", group: "move", title: "Get your driver's license", blurb: "Permit, practice hours, road test.", state: true, build: function (S) {
    var L = S.license || {}, D = S.dmv || {};
    var facts = [];
    facts.push(["Learner permit", or(L.permit_min_age, "See your state's teen driver page")]);
    facts.push(["First license (with rules)", or(L.provisional_min_age, "See your state's teen driver page")]);
    facts.push(["Rules end", or(L.full_age, "See your state's teen driver page")]);
    facts.push(["Practice hours", or(L.supervised_hours, "See your state's teen driver page")]);
    if (v(L.notes)) facts.push(["Also", L.notes]);
    return {
      why: "Every state uses steps. You start with a learner permit, practice with an adult, then get a license with rules for new drivers. The rules come off as you get older and keep a clean record.",
      facts: facts,
      steps: [
        "Read your state's teen driver page (link below). Write down the age for each step.",
        "Get the driver's manual from " + or(D.name, "your DMV") + " and study it. The permit test comes from it.",
        "Gather your documents (list below). Most offices want originals, not copies.",
        "Book your permit visit or test. You'll take a knowledge test and an eye test.",
        "Sign up for driver's ed if your state requires it. Ask your school first. Some programs are free or cheaper through school.",
        "Practice with a licensed adult and log every drive: date, minutes, day or night.",
        "Book your road test once you meet the age and hours.",
        "Follow the new driver rules: passenger limits, night limits, no phone. Breaking them can cost you the license."
      ],
      bring: [
        "Proof of who you are: certified birth certificate or U.S. passport",
        "Your Social Security number (some states want the card)",
        "Two proofs of where you live (a parent's bill or bank statement often works for minors; check your state's list)",
        "A parent or guardian, and their ID, if you're under 18",
        "Money for fees (check the amount on your state's page)",
        "Glasses or contacts if you wear them"
      ],
      parent: [
        "Can you come with me to sign the permit application?",
        "Can we schedule practice drives each week until I hit the hours?",
        "Will I be added to our car insurance? How much will it cost, and who pays?",
        "Which car will I practice in and take the road test in?"
      ],
      watch: [
        "Rules change often. Confirm ages, hours and fees on the official page before you go."
      ],
      links: [["Teen driver page: " + or(D.name, "DMV"), or(D.teen_url, D.url)], ["Where this info comes from", L.source]]
    };
  }},

  /* 2 */ {id: "first-job", group: "paid", title: "Get your first job", blurb: "Work permit, hiring paperwork, the W-4.", state: true, build: function (S) {
    var W = S.work_permit || {}, M = S.min_wage || {}, Y = S.youth_labor || {};
    var permit = or(W.required, "Check your state's labor department");
    var facts = [["Work permit needed?", permit]];
    if (v(W.issuer)) facts.push(["Who gives it", W.issuer]);
    if (v(W.notes)) facts.push(["How", W.notes]);
    facts.push(["State minimum wage", or(M.amount, "Federal $7.25 unless your state is higher") + (v(M.notes) ? " " + M.notes : "")]);
    facts.push(["Youngest age for most jobs", "14 (federal law). Some jobs, like babysitting and newspaper delivery, have no minimum age."]);
    return {
      why: "Most jobs start at 14. Before your first day, your employer has to see proof you can work, and you fill out a tax form. Some states also want a work permit for teens.",
      facts: facts,
      steps: [
        "Make a short resume (see the resume sheet). Even school, sports and volunteering count.",
        "Apply. Ask about the schedule and say you're in school.",
        "When you get an offer, check if you need a work permit (above). If you do, get it before your first shift.",
        "Fill out Form I-9. You show either one List A document (like a passport) or one List B document (like a school ID with photo or state ID) plus one List C document (like your Social Security card or certified birth certificate).",
        "Under 18 with no photo ID? A school record or report card can count as List B. A parent can also fill out a section for you, unless the job uses E-Verify.",
        "Fill out Form W-4 so the right amount of tax comes out of your check (see below).",
        "Set up direct deposit (see the bank account sheet) and keep your first pay stub."
      ],
      bring: [
        "Social Security card or certified birth certificate",
        "Photo ID (state ID, school ID with photo, or passport)",
        "Your work permit, if your state requires one",
        "Bank account and routing numbers, if you want direct deposit",
        "A parent's phone number for emergency contact"
      ],
      parent: [
        "Can you help me get my documents together before my first day?",
        "Can you sign my work permit if I need one?",
        "How will I get to and from work?",
        "Do you plan to claim me as a dependent on your taxes this year? (This changes how I file.)"
      ],
      watch: [
        "W-4 tip: you can write 'Exempt' only if you owed no federal income tax last year and expect to owe none this year. It lasts one year. Social Security and Medicare still come out.",
        "Ages 14 and 15 have hour limits under federal law: 3 hours on a school day, 18 hours in a school week, 7 a.m. to 7 p.m. (9 p.m. from June 1 to Labor Day). Your state may be stricter. The stricter rule wins.",
        "Employers may pay workers under 20 a youth wage of $4.25 an hour for the first 90 days, unless your state doesn't allow it."
      ],
      links: [["Work permit / youth rules for your state", or(W.url, or(Y.url, DOL_STATE_CHILD))], ["Federal teen job rules (YouthRules)", "https://www.dol.gov/agencies/whd/youthrules"], ["I-9 rules for minors", "https://www.uscis.gov/i-9-central/complete-correct-form-i-9/minors"], ["Form W-4", "https://www.irs.gov/pub/irs-pdf/fw4.pdf"]]
    };
  }},

  /* 3 */ {id: "documents", group: "ready", title: "Your important documents", blurb: "What to have, where to get it, how to store it.", state: false, build: function (S) {
    return {
      why: "Jobs, licenses, school, banks and passports all ask for the same few documents. If you know where they are before you need them, everything moves faster.",
      facts: [["Birth certificate", "Order a certified copy from the state where you were born, not where you live now."], ["Social Security card", "Replacing it is free. Anyone who charges you is a scam."], ["REAL ID", "Since May 7, 2025, adults need a REAL ID or passport to fly in the U.S."]],
      steps: [
        "Make a list with your parent: which of these do you have, and where are they?",
        "Certified birth certificate. Order from the vital records office in your birth state. The CDC page below lists every state's office and fee.",
        "Social Security card. A parent applies for a minor with Form SS-5. It's free.",
        "State ID or driver's license (see those sheets).",
        "Passport (see that sheet). It's the strongest ID there is.",
        "Shot records, school transcripts and health insurance card. Ask the school and doctor's office for copies.",
        "Store the originals in one folder in a safe, dry place at home. Don't carry your Social Security card in your wallet.",
        "Take a photo of each one and keep it in a private, locked folder. A photo is not a legal copy, but it helps if something gets lost."
      ],
      bring: [
        "Certified birth certificate",
        "Social Security card",
        "State ID or driver's license",
        "Passport (if you have one)",
        "Shot (immunization) records",
        "School transcript and report cards",
        "Health insurance card"
      ],
      parent: [
        "Where are my birth certificate and Social Security card right now?",
        "Can we order a certified birth certificate if we don't have one?",
        "When I turn 18, can I keep my own copies?"
      ],
      watch: [
        "Never send photos of your Social Security card or ID to anyone who messages you first.",
        "Lost or stolen? Report identity theft at IdentityTheft.gov."
      ],
      links: [["Where to get a birth certificate (CDC)", "https://www.cdc.gov/nchs/w2w/index.htm"], ["Social Security card", "https://www.ssa.gov/number-card"], ["Form SS-5", "https://www.ssa.gov/forms/ss-5.pdf"]]
    };
  }},

  /* 4 */ {id: "state-id", group: "move", title: "Get a state ID", blurb: "Photo ID without a driver's license.", state: true, build: function (S) {
    var I = S.state_id || {}, D = S.dmv || {};
    return {
      why: "A state ID card is official photo ID for people who don't drive. You'll need photo ID for jobs, banks, travel and, at 18, flying.",
      facts: [["Who issues it", or(I.issuer, or(D.name, "Your state's DMV"))], ["Minimum age", or(I.min_age, "Not stated on the official page. Ask the office.")]],
      steps: [
        "Open your state's ID card page (link below) and read the document list.",
        "Ask for a REAL ID-marked card if you can. It takes more documents but saves a trip later.",
        "Gather originals: proof of who you are, your Social Security number, and proof of where you live.",
        "Book an appointment if your office uses them.",
        "Bring a parent if you're under 18.",
        "Pay the fee and take your photo. Some states mail the card later."
      ],
      bring: [
        "Certified birth certificate or U.S. passport",
        "Social Security card or number",
        "Two proofs of where you live (often a parent's document plus a letter or form; check your state's list)",
        "Parent or guardian and their ID, if under 18",
        "Fee"
      ],
      parent: [
        "Can you come with me and bring your ID?",
        "Which of our bills or papers can prove where I live?"
      ],
      watch: ["If you'll get a driver's license soon, ask whether it makes sense to wait. Some states don't let you hold both."],
      links: [["State ID page", or(I.url, D.url)]]
    };
  }},

  /* 5 */ {id: "bank", group: "paid", title: "Open a bank account", blurb: "Where your paycheck goes. How not to get burned.", state: false, build: function (S) {
    return {
      why: "A bank account keeps your money safe, gets your pay faster through direct deposit, and starts your record with a bank.",
      facts: [["Can I open one alone?", "Usually not until 18. Most banks need a parent on the account first. Rules vary by bank and state."], ["Is my money safe?", "At an FDIC-insured bank or NCUA-insured credit union, yes, up to $250,000."], ["Credit card?", "Under 21, you need your own income or a co-signer who is 21+."]],
      steps: [
        "Pick a bank or credit union. Look for no monthly fee and no minimum balance. Ask about student or teen accounts.",
        "Go with your parent. Ask what you'll need before you go.",
        "Open a checking account (for spending) and a savings account (for saving).",
        "Get your debit card and set a PIN only you know.",
        "Download the app and turn on alerts for every purchase.",
        "Give your job the account and routing numbers for direct deposit.",
        "Move some of every check into savings. Even 10% adds up."
      ],
      bring: ["Photo ID", "Social Security card or number", "Parent and their ID", "Money to deposit (some accounts need $25 or more)"],
      parent: ["Will you be on my account with me until I'm 18?", "Can you show me how you track your spending?", "Which bank or credit union do you trust?"],
      watch: ["Overdraft fees: if you spend more than you have, banks may charge a fee. Ask to turn overdraft off.", "Never give your PIN or a code from your bank to anyone. The bank will never ask."],
      links: [["CFPB: savings accounts for kids", "https://consumerfinance.gov/about-us/blog/heres-why-you-should-open-a-savings-account-for-your-kids"], ["CFPB: credit cards under 21", "https://www.consumerfinance.gov/ask-cfpb/can-a-card-issuer-consider-my-age-when-deciding-whether-to-issue-a-credit-card-to-me-en-20/"]]
    };
  }},

  /* 6 */ {id: "taxes", group: "paid", title: "File your taxes (first job)", blurb: "Your W-2, the dependent box, and getting your money back.", state: false, build: function (S) {
    return {
      why: "If tax came out of your paycheck, filing is how you get it back. Many teens with a first job get most or all of it returned.",
      facts: [
        ["Deadline", "April 15, 2027 (for money you earned in 2026)"],
        ["Your W-2", "Your job must give it to you by February 1, 2027"],
        ["Dependent?", "Parents can usually claim you if you're under 19 at the end of the year, or under 24 if you're a full-time student"],
        ["Your standard deduction if you're a dependent", "The bigger of $1,350 or your earned income plus $450 (2026)"],
        ["Must you file?", "If your job pay was over $16,100, or you made $400+ from your own side work. Otherwise it's optional, but filing gets withheld tax back."]
      ],
      steps: [
        "Wait for your W-2 (late January). Check your name and Social Security number are right.",
        "Read the key boxes: Box 1 is your pay for federal tax. Box 2 is federal tax already taken out (what you may get back). Box 4 and 6 are Social Security and Medicare (you don't get these back). Box 16 and 17 are your state pay and state tax.",
        "Ask your parent: are you claiming me as a dependent? If yes, you check the box 'Someone can claim you as a dependent' on your Form 1040. Both of you must get this right.",
        "Choose a free way to file: IRS Free File software, Free File Fillable Forms, or a free VITA tax help site near you.",
        "File your federal return. Have your bank info ready so a refund goes straight to your account.",
        "Check if your state has its own return. If Box 17 shows state tax, you probably want to file it to get that back too.",
        "Save a copy of your returns and W-2 in your documents folder."
      ],
      bring: ["Your W-2 from every job", "Your Social Security number", "Your bank account and routing numbers (for a direct deposit refund)", "Last year's return, if you filed one", "Any 1099 forms (if you did side work)"],
      parent: ["Are you claiming me as a dependent this year?", "Can we sit down together when I file?", "Do you know a free tax help site near us?"],
      watch: [
        "IRS Direct File is no longer offered. Use Free File, Fillable Forms or VITA instead.",
        "The IRS will never text, DM or call you first asking for money or gift cards.",
        "Line numbers change some years. Use the form for the year you're filing."
      ],
      links: [["Do I need to file?", "https://www.irs.gov/individuals/check-if-you-need-to-file-a-tax-return"], ["IRS Free File", "https://www.irs.gov/filing/irs-free-file-do-your-taxes-for-free"], ["Free tax help (VITA)", "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers"], ["Form 1040", "https://www.irs.gov/pub/irs-pdf/f1040.pdf"]]
    };
  }},

  /* 7 */ {id: "turning-18", group: "ready", title: "Turning 18 checklist", blurb: "Vote, Selective Service, health privacy.", state: true, build: function (S) {
    var V = S.voting || {};
    return {
      why: "At 18 the law treats you as an adult. A few things become your job, and a few doors close to your parents unless you open them.",
      facts: [["Pre-register to vote in " + S.name, or(V.preregister_age, "Check your state election office")], ["Vote", "Must be 18 by Election Day"], ["Selective Service", "Men ages 18 to 25. Register within 30 days of turning 18."]],
      steps: [
        "Register (or pre-register) to vote. Link below.",
        "Young men: register with Selective Service at sss.gov within 30 days of your 18th birthday. It's free and takes minutes. A new law will make this automatic, but until sss.gov says it's live, do it yourself.",
        "Health privacy: at 18, doctors generally can't share your info with your parents unless you say so. If you want a parent involved, sign a HIPAA authorization at your doctor's office.",
        "Think about a health care power of attorney. It names who can make medical decisions if you can't. Forms are state-specific.",
        "You can stay on a parent's health insurance until 26.",
        "Get copies of your important documents (see that sheet).",
        "Credit: you can now get a credit report. Check it free at AnnualCreditReport.com."
      ],
      bring: ["State ID or license", "Social Security number", "Address where you live"],
      parent: ["Do you want me to sign a form so my doctor can talk to you?", "Can I keep my own documents now?", "Will I stay on your health insurance?"],
      watch: ["Not registering with Selective Service can block federal jobs and student aid in some states."],
      links: [["Register to vote", or(V.register_url, "https://vote.gov")], ["Selective Service", "https://www.sss.gov"], ["HIPAA at 18 (HHS)", "https://www.hhs.gov/hipaa/for-professionals/faq/is-parent-rep-once-child-reaches-age-maturity/index.html"], ["Staying on a parent's plan to 26", "https://www.healthcare.gov/young-adults/children-under-26/"]]
    };
  }},

  /* 8 */ {id: "after-high-school", group: "ready", title: "College, military or trade school", blurb: "FAFSA, the ASVAB, apprenticeships.", state: false, build: function (S) {
    return {
      why: "There's more than one good road after high school. Each one has a front door, and most of them are free to open.",
      facts: [["FAFSA (2027-28)", "Open since September 23, 2026. Free. Uses 2025 tax info."], ["ASVAB", "The military entry test. Free through a recruiter or your school."], ["Apprenticeships", "Paid jobs with training. You earn from day one."]],
      steps: [
        "College: file the FAFSA at StudentAid.gov. You and your parent each make an account and give consent. File early, since states and schools have earlier deadlines.",
        "Look at community college too. It's often the cheapest way to start.",
        "Military: talk to recruiters from more than one branch. Take the ASVAB through a recruiter or your school's ASVAB Career Exploration Program.",
        "Trade school or apprenticeship: search apprenticeship.gov for paid programs near you. Ask your counselor about career and technical programs.",
        "Whatever you pick, ask your counselor about service hours or other graduation requirements in your state.",
        "Make a plan with dates: tests, applications, aid deadlines."
      ],
      bring: ["Social Security number", "Parent's tax info (for FAFSA)", "Transcript", "A list of schools or programs you're interested in"],
      parent: ["Can you make your StudentAid.gov account so we can do the FAFSA together?", "What do you think fits me: college, military or trade?", "Can we visit one campus or program this semester?"],
      watch: ["The FAFSA is free. Never pay to file it.", "Never share your StudentAid.gov login with anyone."],
      links: [["FAFSA", "https://studentaid.gov"], ["ASVAB", "https://www.officialasvab.com"], ["Apprenticeship finder", "https://www.apprenticeship.gov/apprenticeship-job-finder"]]
    };
  }},

  /* 9 */ {id: "health", group: "ready", title: "Take charge of your health", blurb: "Your insurance card, your appointments, your records.", state: false, build: function (S) {
    return {
      why: "Soon you'll book your own appointments and answer your own medical questions. Learning now makes it easy later.",
      facts: [["Insurance", "You can usually stay on a parent's plan until 26."], ["Privacy at 18", "Your parents don't automatically get your health info once you're 18."]],
      steps: [
        "Get a photo of your insurance card (front and back). Learn the plan name, member ID and the phone number on the back.",
        "Know your doctor's name and number, and your pharmacy.",
        "Practice: call and book your next checkup yourself.",
        "Write down your allergies, medicines and family health history.",
        "Ask for your shot records and keep a copy with your documents.",
        "Learn the difference: primary doctor for checkups, urgent care for things that can't wait, emergency room for life-threatening problems."
      ],
      bring: ["Insurance card", "List of medicines and allergies", "Photo ID"],
      parent: ["What insurance am I on, and what does it cover?", "What health conditions run in our family?", "Can I start booking my own appointments?"],
      watch: ["In a mental health crisis, call or text 988."],
      links: [["Staying on a parent's plan", "https://www.healthcare.gov/young-adults/children-under-26/"]]
    };
  }},

  /* 10 */ {id: "police-stop", group: "heard", title: "Know your rights in a police stop", blurb: "Stay safe. Stay calm. Write it down after.", state: false, build: function (S) {
    return {
      why: "The goal of a stop is to get home safe. Arguing on the street doesn't win. The complaint and the record are how you push back, later.",
      facts: [["Full kit", "lawrencetotimeh.com/class/stop/"]],
      steps: [
        "Stay calm. Keep your hands where they can be seen.",
        "Don't run, argue, or resist, even if you think the stop is wrong.",
        "You can ask: 'Officer, am I free to go?' If yes, leave calmly.",
        "You have the right to stay silent. You can say: 'I'm going to remain silent.'",
        "You don't have to agree to a search. Say clearly: 'I don't consent to a search.' Don't physically stop them.",
        "If you're driving, show your license, registration and insurance when asked. Tell the officer before you reach for them.",
        "Get the officer's name and badge number if you can do it safely.",
        "Afterward, write down everything: time, place, what was said, names, badge numbers, witnesses. Tell a parent or trusted adult."
      ],
      bring: ["ID", "In a car: license, registration, insurance card"],
      parent: ["If I get stopped, who should I call first?", "Can we practice what I'd say?"],
      watch: ["Rules differ by state and situation. This is education, not legal advice."],
      links: [["Stop kit", "https://lawrencetotimeh.com/class/stop/"]]
    };
  }},

  /* 11 */ {id: "passport", group: "move", title: "Get a passport", blurb: "Travel, study abroad, strongest ID.", state: false, build: function (S) {
    return {
      why: "A passport is the strongest ID you can have. It counts for jobs (I-9 List A) and you need it to leave the country.",
      facts: [["Under 16", "Apply in person. Both parents must agree. Good for 5 years."], ["16 or 17", "Apply in person. At least one parent must know. Good for 10 years."], ["Cost at 16 or 17", "$130 book + $35 acceptance fee = $165 (first passport). Under 16 costs less. See the fee chart."]],
      steps: [
        "Fill out Form DS-11. Don't sign it until the agent tells you to.",
        "Find an acceptance facility (often a post office or library) and book an appointment.",
        "Under 16: both parents come. If one can't, bring their signed, notarized Form DS-3053 and a copy of their ID.",
        "Bring proof of citizenship (certified birth certificate) and a photocopy of it.",
        "Bring photo ID for you (or your parent's ID if you don't have one) plus photocopies.",
        "Get a passport photo. Many acceptance facilities take them.",
        "Pay the two fees: one to the State Department, one to the facility.",
        "Track your application online. Apply months before any trip."
      ],
      bring: ["Form DS-11 (unsigned)", "Certified birth certificate + photocopy", "Photo ID + photocopy", "Parent(s) and their ID", "Passport photo", "Two separate payments"],
      parent: ["Can both of you come to the appointment?", "Do we have a trip coming up that needs a deadline?"],
      watch: ["Fees change. Check the official fee chart before you go."],
      links: [["Passports for minors", "https://travel.state.gov/en/passports/apply/child.html"], ["Ages 16 and 17", "https://travel.state.gov/content/travel/en/passports/need-passport/16-17.html"], ["Fees", "https://travel.state.gov/passportfees"]]
    };
  }},

  /* 12 */ {id: "resume", group: "ready", title: "Build a resume and get references", blurb: "Even with no job history.", state: false, build: function (S) {
    return {
      why: "A resume is one page that shows you show up, work hard and get along with people. School, sports, church and volunteering all prove that.",
      facts: [["Length", "One page."], ["Format", "Simple. Easy to read. Save it as a PDF."]],
      steps: [
        "Top: your name, phone, a professional email, city and state.",
        "Skills: things you can do (bilingual, cash handling, social media, childcare, lifting, computers).",
        "Experience: jobs, babysitting, lawn care, volunteering, church, clubs, sports. For each: what you did and anything you're proud of.",
        "Education: school, grade, and honors.",
        "Ask two or three adults to be references: a teacher, coach, pastor or boss. Not family.",
        "Ask first: 'Would you be willing to be a reference for me?' Get their best phone and email.",
        "Have an adult read it for mistakes. Then save it as a PDF."
      ],
      bring: ["Printed copies for in-person applications"],
      parent: ["Can you read my resume and tell me what's missing?", "Who do you think would give me a strong reference?"],
      watch: ["Use an email with your name in it. Save the funny one for friends."],
      links: [["Find jobs and training (CareerOneStop)", "https://www.careeronestop.org"]]
    };
  }},

  /* 13 */ {id: "rights-at-work", group: "paid", title: "Know your rights at work", blurb: "Pay, hours, safety, and what to do if something's wrong.", state: true, build: function (S) {
    var M = S.min_wage || {}, Y = S.youth_labor || {}, W = S.work_permit || {};
    var facts = [["Minimum wage in " + S.name, or(M.amount, "$7.25 federal unless your state is higher") + (v(M.notes) ? " " + M.notes : "")]];
    if (v(Y.notes)) facts.push([S.name + " youth rules", Y.notes]);
    facts.push(["Ages 14-15 (federal)", "3 hours on a school day, 18 a school week, 8 on a non-school day, 40 a non-school week. 7 a.m. to 7 p.m. (9 p.m. June 1 to Labor Day)."]);
    facts.push(["Ages 16-17 (federal)", "No federal hour limit, but no hazardous jobs."]);
    return {
      why: "Being young doesn't mean you can be underpaid or overworked. The law protects teen workers, and the stricter rule (state or federal) wins.",
      facts: facts,
      steps: [
        "Know your pay rate and get it in writing.",
        "Keep your own record of the hours you work. A notes app is fine.",
        "Check every pay stub against your hours.",
        "You should not do dangerous work: driving for the job under 17, power-driven machines like meat slicers, roofing, and more.",
        "If something's wrong, talk to your manager first, in writing if you can.",
        "If it isn't fixed, contact your state labor department or the U.S. Department of Labor. It's free and you can ask questions without giving your name.",
        "Your employer can't punish you for asking about your rights or reporting a problem."
      ],
      bring: ["Your own hours log", "Pay stubs"],
      parent: ["Can you look over my schedule with me to make sure it's legal?", "If my boss doesn't pay me right, will you help me report it?"],
      watch: ["Harassment at work is never part of the job. Tell a trusted adult."],
      links: [["Youth rules for your state", or(Y.url, or(W.url, DOL_STATE_CHILD))], ["Federal YouthRules", "https://www.dol.gov/agencies/whd/youthrules"], ["Federal hour limits for 14-15", "https://webapps.dol.gov/elaws/whd/flsa/docs/hours.asp"], ["State minimum wage source", or(M.source, "https://www.dol.gov/agencies/whd/minimum-wage/state")]]
    };
  }},

  /* 14 */ {id: "pay-stub", group: "paid", title: "Read your pay stub and make a budget", blurb: "Why the check is smaller. Save, spend, give.", state: false, build: function (S) {
    return {
      why: "Your paycheck is smaller than hours times pay because taxes come out first. Knowing what's on the stub helps you catch mistakes and plan.",
      facts: [["Social Security", "6.2% of your pay"], ["Medicare", "1.45% of your pay"], ["Federal income tax", "Depends on your W-4. You may get it back when you file."], ["State tax", "Depends on your state."]],
      steps: [
        "Find gross pay (before taxes) and net pay (what you actually get).",
        "Check the hours and rate match what you worked.",
        "Find each tax: federal, Social Security, Medicare, state.",
        "Look at year-to-date totals. They add up across the year.",
        "Make a simple plan for each check: save some, spend some, give some.",
        "Start with a goal: a phone, a car, college, or an emergency fund.",
        "Track your spending for one month. Most people are surprised."
      ],
      bring: ["Your last pay stub"],
      parent: ["Can you show me how you budget?", "What should I pay for myself now?"],
      watch: ["If the hours on your stub are wrong, tell your manager in writing right away."],
      links: [["CFPB money tools for young people", "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/"]]
    };
  }},

  /* 15 */ {id: "side-hustle", group: "paid", title: "Side hustles and gig work", blurb: "Hair, lawn care, delivery, selling online. Taxes work differently.", state: false, build: function (S) {
    return {
      why: "Money you make on your own is still income. No one takes taxes out for you, so you plan for them yourself.",
      facts: [["Must file?", "Yes, if you made $400 or more after expenses, even as a dependent."], ["Self-employment tax", "15.3% (Social Security and Medicare) on your profit."], ["1099-NEC", "A business that pays you $2,000+ (2026) sends one. Smaller amounts are still taxable."], ["1099-K", "Payment apps send one over $20,000 and 200 sales. Smaller amounts are still taxable."]],
      steps: [
        "Check the rules first: age limits for apps, permits for some work (like hair), and a parent's OK.",
        "Track every dollar in and out. Keep receipts for supplies.",
        "Profit = money in minus business costs.",
        "Put about 15% to 25% of profit aside for taxes. Keep it in savings.",
        "If your profit hits $400 for the year, you'll file a return with a Schedule C and Schedule SE.",
        "Use free help (VITA) the first time."
      ],
      bring: ["Income log", "Receipts", "Any 1099 forms"],
      parent: ["Can you help me set up a simple money log?", "Can I use your account for an app, and how do we track it?"],
      watch: ["All income is taxable, even if you never get a form."],
      links: [["Self-employment tax", "https://www.irs.gov/taxtopics/tc554"], ["1099-K FAQs", "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"]]
    };
  }},

  /* 16 */ {id: "identity", group: "ready", title: "Protect your identity", blurb: "Passwords, scams, and freezing your credit.", state: false, build: function (S) {
    return {
      why: "Kids' Social Security numbers get stolen because nobody checks them. Some teens find out at 18 that someone already opened accounts in their name.",
      facts: [["Credit freeze", "Free. A parent can freeze a child's credit under 16. At 16 or 17 you can do it yourself."], ["Normal for kids", "Having no credit report. If one exists, that's a warning sign."]],
      steps: [
        "Use a different strong password for each important account. Turn on two-step login.",
        "Never share codes texted to you. Real companies don't ask for them.",
        "Ask a parent to check whether you have a credit report with Equifax, Experian and TransUnion.",
        "Freeze your credit at all three. It's free and you can lift it when you need credit.",
        "Watch for signs: bills or collection calls in your name, an IRS letter about you, or a loan denied for credit you never had.",
        "If it happened: report at IdentityTheft.gov and freeze your credit."
      ],
      bring: ["Birth certificate and Social Security card (the bureaus may ask for proof)", "Parent's ID and proof of address"],
      parent: ["Can we check my credit and freeze it this week?", "What should I do if someone asks for my info online?"],
      watch: ["Scammers pretend to be banks, schools, jobs and the IRS. When in doubt, hang up and call the real number."],
      links: [["FTC: protect your child's identity", "https://consumer.ftc.gov/articles/how-protect-your-child-identity-theft"], ["Report identity theft", "https://www.identitytheft.gov"], ["Free credit reports", "https://www.annualcreditreport.com"]]
    };
  }},

  /* 17 */ {id: "car-basics", group: "move", title: "Car basics", blurb: "Insurance, registration, accidents, tickets.", state: true, build: function (S) {
    var C = S.car_insurance || {}, D = S.dmv || {};
    return {
      why: "Driving comes with paperwork. Knowing it keeps you legal, protects your money, and keeps a small problem from becoming a court date.",
      facts: [["Minimum insurance in " + S.name, or(C.minimum, "Check your state insurance department")], ["What the numbers mean", "Like 25/50/25: $25,000 for one person hurt, $50,000 for everyone hurt, $25,000 for damage. These are minimums. More is safer."]],
      steps: [
        "Always keep in the car: your license, the registration, and proof of insurance.",
        "Insurance: you'll usually be added to a parent's policy. Ask about good student and driver's ed discounts.",
        "After an accident: stop. Check for injuries and call 911 if anyone is hurt. Move to safety if you can.",
        "Swap names, phone numbers, insurance and plate numbers. Take photos. Don't argue about fault.",
        "Call your parent and your insurance company.",
        "Ticket: read it closely for the deadline and court date. Never ignore it. Missing it can cost your license.",
        "Ask about options like traffic school. A parent should go with you to court if you're under 18."
      ],
      bring: ["License", "Registration", "Insurance card"],
      parent: ["Where do we keep the registration and insurance card?", "What should I do first if I'm in an accident?", "Will you go to court with me if I get a ticket?"],
      watch: ["Never drive without insurance. It can mean fines and losing your license."],
      links: [["State minimum insurance source", or(C.source, NAIC)], ["Your DMV", or(D.url, NAIC)]]
    };
  }},

  /* 18 */ {id: "first-apartment", group: "ready", title: "Your first apartment", blurb: "Leases, deposits, renters insurance, your rights.", state: true, build: function (S) {
    var T = S.tenant || {};
    return {
      why: "A lease is a legal contract. Reading it before you sign can save you hundreds of dollars and a lot of stress.",
      facts: [["Who sets the rules", "Your state (and sometimes your city). Deposit limits and return deadlines differ."], ["Age to sign", "Usually 18. Before that, a parent signs or co-signs."]],
      steps: [
        "Set a budget. A common rule is rent at no more than about a third of your take-home pay.",
        "Visit in person. Never send money for a place you haven't seen. That's a common scam.",
        "Read the whole lease: rent, due date, late fees, length, who fixes what, guests, pets, how to end it.",
        "Before you move in, walk through and take dated photos and video of every problem. Send them to the landlord in writing.",
        "Pay the deposit and rent in a way that gives you a receipt. No cash without a receipt.",
        "Get renters insurance. It's usually cheap and covers your stuff.",
        "Put repair requests in writing and keep copies.",
        "When you move out, clean, take photos again, and give your new address for the deposit."
      ],
      bring: ["Photo ID", "Proof of income (pay stubs)", "References", "Co-signer, if needed"],
      parent: ["Will you co-sign my first lease?", "Can you read the lease with me before I sign?"],
      watch: ["If a landlord won't make repairs or keeps your deposit unfairly, your state's tenant resources (below) explain your options."],
      links: [["Tenant rights in " + S.name, or(T.url, CONSUMER)]]
    };
  }},

  /* 19 */ {id: "scholarships", group: "ready", title: "Find scholarships and free money", blurb: "Where to look, and how to spot scams.", state: false, build: function (S) {
    return {
      why: "Scholarships and grants are money you don't pay back. Small local ones get fewer applicants, so your odds are better.",
      facts: [["Cost to apply", "Real scholarships are free to apply for."], ["Start with", "The FAFSA. It unlocks federal and many state and school grants."]],
      steps: [
        "File the FAFSA (see the college, military or trade sheet).",
        "Ask your counselor for the local scholarship list.",
        "Check your parents' jobs, unions, churches, and community groups. Many have scholarships.",
        "Use the free Scholarship Finder on CareerOneStop (run by the U.S. Department of Labor).",
        "Make a tracker: name, amount, deadline, what's needed, done or not.",
        "Write one strong personal essay you can adjust for each application.",
        "Ask for recommendation letters at least three weeks ahead."
      ],
      bring: ["Transcript", "Resume", "Essay", "Recommendation letters"],
      parent: ["Does your job, union or church offer scholarships?", "Can you help me keep track of deadlines?"],
      watch: ["Scam signs: a fee to apply, a 'guarantee', pressure to pay now, asking for your bank info or FSA ID, or you 'won' something you never entered. Report at ReportFraud.ftc.gov."],
      links: [["CareerOneStop: use its free Scholarship Finder", "https://www.careeronestop.org"], ["FTC: scholarship scams", "https://consumer.ftc.gov/articles/how-avoid-scholarship-and-financial-aid-scams"], ["FAFSA", "https://studentaid.gov"]]
    };
  }},

  /* 20 */ {id: "use-your-voice", group: "heard", title: "Use your voice", blurb: "Find your representatives. Contact them. Show up.", state: true, build: function (S) {
    var V = S.voting || {};
    return {
      why: "Laws about your school, your neighborhood and your future are made by people you can call, email and visit. You don't have to be 18 to speak up.",
      facts: [["Pre-register to vote in " + S.name, or(V.preregister_age, "Check your state election office")], ["U.S. Capitol switchboard", "(202) 224-3121"]],
      steps: [
        "Find who represents you: city or county council, school board, state legislators, and Congress.",
        "Pick one issue you care about. Learn the basics and one fact you can share.",
        "Call or email. Say your name, that you're a constituent, your issue, and one clear question or ask.",
        "Ask: 'Where do you stand on this, and what will you do about it?' Write down the answer.",
        "Go to a city council or school board meeting. Most have time for public comment.",
        "Follow up. Thank them, or ask again if you didn't get an answer.",
        "Pre-register to vote as soon as your state allows."
      ],
      bring: ["Your address (to find your district)", "Your one-paragraph message"],
      parent: ["Will you come with me to a school board or council meeting?", "What issues do you care about?"],
      watch: ["Be respectful. Never threaten or harass. Stick to facts and questions."],
      links: [["Know Your Public Servants", "https://lawrencetotimeh.com/publicservants/"], ["All your elected officials (USAGov)", "https://www.usa.gov/elected-officials"], ["Find your U.S. Representative", "https://www.house.gov/representatives/find-your-representative"], ["Find your U.S. Senators", "https://www.senate.gov/senators/senators-contact.htm"], ["Register to vote", or(V.register_url, "https://vote.gov")]]
    };
  }}
  ];

  window.PLAYBOOK = {sheets: SHEETS, groups: GROUPS, checked: CHECKED};
})();
