#!/usr/bin/env python3
"""Generate the v3 pages for lawrencetotimeh.com from shared parts."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Poppins:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">'
ICONS = '<link rel="icon" href="favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"><link rel="apple-touch-icon" href="apple-touch-icon.png">'

def head(title, desc, canon, og="img/hero/image.jpg"):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="https://lawrencetotimeh.com/{canon}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:image" content="https://lawrencetotimeh.com/{og}"><meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
{ICONS}
{FONTS}
<link rel="stylesheet" href="v3.css">
</head><body>'''

def nav(active=""):
    def a(href, label, key):
        on = ' class="on"' if key == active else ""
        return f'<li><a{on} href="{href}">{label}</a></li>'
    return f'''<nav><div class="wrap"><a class="brand" href="index.html">LAWRENCE TOTIMEH <b>JR.</b></a>
<ul>{a("class/","Classroom","class")}{a("speaking.html","Speaking","speaking")}{a("about.html","About","about")}{a("events.html","Events","events")}{a("follow-the-money.html","Follow the Money","ftm")}</ul>
<a class="btn red" href="contact.html">Book Lawrence</a></div></nav>'''

FOOT = '''<footer><div class="wrap"><div><div class="mono"><a href="https://www.youtube.com/@AgentKodak" target="_blank" rel="noopener">YouTube</a> · <a href="https://www.instagram.com/AgentKodak" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.tiktok.com/@AgentKodak" target="_blank" rel="noopener">TikTok</a> · <a href="https://www.facebook.com/AgentKodak" target="_blank" rel="noopener">Facebook</a> · @AgentKodak</div><div style="margin-top:8px">I'm an educator, not an attorney. Nothing here is legal advice. · <a href="mailto:hello@lawrencetotimeh.com">hello@lawrencetotimeh.com</a></div></div><div class="mono">© <span id="yr">2026</span> Lawrence Totimeh Jr.</div></div></footer>
<script>
document.getElementById('yr').textContent=new Date().getFullYear();
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.rev').forEach(function(el){io.observe(el)});
var cf=document.getElementById('bookForm');
if(cf){cf.addEventListener('submit',function(e){e.preventDefault();var g=function(id){var el=document.getElementById(id);return el?el.value.trim():''};
var subject='Booking: '+g('etype')+(g('name')?' — '+g('name'):'');
var body='Name: '+g('name')+'\\nOrganization: '+g('org')+'\\nEmail: '+g('email')+'\\nEvent type: '+g('etype')+'\\nDate: '+g('date')+'\\nAudience size: '+g('size')+'\\n\\n'+g('message');
window.location.href='mailto:hello@lawrencetotimeh.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)})}
</script>
</body></html>'''

JOIN = '''<section class="dark join"><div class="wrap rev">
<div class="eyebrow">Join the community</div>
<h2 style="margin-top:12px">Agents of Change,<br>fighting for human rights.</h2>
<p class="lede muted">Learn the law. Document. Vote. Follow up. Never harass. Every like, every repost, every comment helps educate our community.</p>
<div class="socials"><a href="https://www.youtube.com/@AgentKodak" target="_blank" rel="noopener">YouTube</a><a href="https://www.instagram.com/AgentKodak" target="_blank" rel="noopener">Instagram</a><a href="https://www.tiktok.com/@AgentKodak" target="_blank" rel="noopener">TikTok</a><a href="https://www.facebook.com/AgentKodak" target="_blank" rel="noopener">Facebook</a></div>
</div></section>'''

def yt(id_, title):
    return f'<iframe src="https://www.youtube-nocookie.com/embed/{id_}" title="{title}" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>'

# ---------------- HOME ----------------
home = head("Lawrence Totimeh Jr. · Agent Kodak · Learn the law. Apply it as citizens.",
            "Civic education that turns theory into practice. The School of Law lessons, the Classroom map, talks and workshops, and Follow the Money LIB.", "") + nav("home") + f'''
<section class="hero dark"><div class="wrap">
<div>
<div class="eyebrow">Agent Kodak · Civic educator · Combat veteran</div>
<h1 style="margin-top:14px">Learn the law.<br>Apply it as <span>citizens.</span></h1>
<p class="lede">Civic education that turns theory into practice in your own community. We learn the rules. Then we change them.</p>
<div class="cta"><a class="btn red" href="class/">Enter the Classroom</a><a class="btn ghost" href="contact.html">Book a Talk</a></div>
<div class="chips"><span class="chip">U.S. Army · Iraq</span><span class="chip">M.S. Project Mgmt, VSU</span><span class="chip">10+ yrs educator</span><span class="chip">TEDx speaker</span></div>
</div>
<div class="photo"><img src="img/hero/image.jpg" alt="Lawrence Totimeh Jr. in a gray suit with a Liberian flag lapel pin" width="1200" height="1465"><div class="tag">Lawrence Totimeh Jr.</div></div>
</div></section>

<section class="light"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Theory to practice</div><h2 style="margin-top:8px">How this works</h2></div></div>
<div class="steps rev">
<div class="step"><div class="n">01</div><h3>Learn the law</h3><p class="muted">Plain-language lessons on the justice system, taught from the public record. Probable cause, grand juries, civil suits, discovery.</p></div>
<div class="step"><div class="n">02</div><h3>Document</h3><p class="muted">Records, receipts, and a paper trail. Transparency creates accountability.</p></div>
<div class="step"><div class="n">03</div><h3>Act</h3><p class="muted">Vote. Follow up. Teach somebody else. Our enemy is injustice, not people.</p></div>
</div></div></section>

<section class="dark" id="lessons"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">The School of Law · on YouTube at @AgentKodak</div><h2 style="margin-top:8px">Real cases. Real law.</h2></div><a class="btn ghost" href="https://www.youtube.com/@AgentKodak" target="_blank" rel="noopener">Watch the series</a></div>
<p class="lede muted rev">A real Mississippi case, taught one lesson at a time: civil lawsuits, discovery, probable cause, new evidence, and the federal path. Lawrence is an educator, not an attorney. These lessons are not legal advice.</p>
<div class="lessons rev" style="margin-top:36px">
<div class="lesson"><div class="shell">{yt("oriWYFQN414","Lesson 1: Where we are")}</div><div class="t">Lesson 1<b>Where we are</b></div></div>
<div class="lesson"><div class="shell">{yt("DJh7g3wODFE","Lesson 2: No charges doesn't mean no court. The civil lawsuit")}</div><div class="t">Lesson 2<b>No charges doesn't mean no court</b></div></div>
<div class="lesson"><div class="shell">{yt("YhJ-_J3wDDs","Lesson 3: Discovery")}</div><div class="t">Lesson 3<b>Discovery</b></div></div>
</div>
<div class="stats rev"><div class="stat"><div class="v">600K+</div><div class="l">views across Facebook, Instagram, TikTok and YouTube in the past year</div></div><div class="stat"><div class="v">1,040+</div><div class="l">subscribers on @AgentKodak, and growing</div></div><div class="stat"><div class="v">Free</div><div class="l">every lesson, every document, no email gate</div></div></div>
</div></section>

<section class="dark classroom panelbg" id="class" style="border-top:1px solid var(--line)"><div class="wrap">
<a class="shot rev" href="class/"><img src="img/classroom.jpg" alt="The Classroom: Who Holds the Levers in Jackson County, MS" loading="lazy"></a>
<div class="rev">
<div class="eyebrow">The Classroom · <span class="gold">civic education and tools for teachers</span></div>
<h2 style="margin:10px 0 18px">See who holds the levers</h2>
<p class="lede muted">Every office, every connection, every source. An interactive map of one Mississippi county, six lessons, the timeline and the gaps. Free, for everyone. Lesson kits for teachers.</p>
<div class="cta" style="margin-top:30px"><a class="btn red" href="class/">Explore the map</a></div>
</div>
</div></section>

<section class="light"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Proof · verified numbers only</div><h2 style="margin-top:8px">Over 600,000 views in the past year</h2></div></div>
<div class="proof rev" style="grid-template-columns:1.6fr 1fr 1fr">
<div class="card"><div class="v">600K+</div><div class="l">views across Facebook, Instagram, TikTok and YouTube in the past year</div></div>
<div class="card"><div class="v">1,040+</div><div class="l">subscribers on YouTube, and growing</div></div>
<div class="card"><div class="v">Free</div><div class="l">every lesson, every document, no email gate</div></div>
</div>
<p class="muted" style="font-size:12px;margin-top:14px">Combined platform insights, 12 months to Oct. 6, 2026.</p>
</div></section>

<section class="dark action" id="action"><div class="wrap">
<div class="cols rev">
<div><div class="eyebrow">Agent Kodak in action</div>
<p class="lineage" style="margin-top:12px">From Trayvon Martin to Breonna Taylor to George Floyd to Nolan Xavier Wells. <span>The fight has stayed the same. The tools have grown.</span></p></div>
<div><p class="muted">Lawrence has stood up for civil and human rights for more than a decade. In the classroom, he teaches his students what injustice looks like and equips them to push back: writing, data collection, storytelling, photography, videography, civic apparel, and more.</p>
<p class="muted" style="margin-top:14px">On the street, he documents. Los Angeles, May 29, 2020: his photo led the <a href="https://enewspaper.latimes.com/infinity/article_share.aspx?guid=488bfc92-522a-47c3-af19-0da51f0909b4" target="_blank" rel="noopener">Los Angeles Times investigation</a> into police tactics at the George Floyd protests. The New York Times ran images of him marching. ESPN aired the footage.</p></div>
</div>
<div class="grid rev">
<div class="frame"><img src="img/action1/image.png" alt="Lawrence face to face with a police line at the 2020 protests in Los Angeles" loading="lazy"><div class="cap">LA Times lead photo · May 29, 2020</div></div>
<div class="frame"><img src="img/action2/image.jpg" alt="Lawrence marching with a raised fist, as posted by The New York Times" style="object-position:50% 38%" loading="lazy"><div class="cap">The New York Times · 2020</div></div>
<div class="frame"><img src="img/action3/image.jpg" alt="Lawrence at a police line, as aired on ESPN's First Take" style="object-position:50% 40%" loading="lazy"><div class="cap">ESPN First Take · 2020</div></div>
</div>
</div></section>

<section class="light lt" id="speaking"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Speaking &amp; workshops</div><h2 style="margin-top:8px">Four talks. Every one ends with a documentation exercise.</h2></div><a class="btn red" href="contact.html">Book Lawrence</a></div>
<div class="talks rev">
<div class="talk"><h3>Transparency Creates Accountability</h3><p>Public records, documentation and holding officials accountable.</p><p class="leave"><b>You leave with:</b> a template to start a paper trail in your community.</p></div>
<div class="talk"><h3>Learn the Law</h3><p>The basic rights every student is supposed to know, and how to use them: at a traffic stop, at school, online, and in a courtroom.</p><p class="leave"><b>You leave with:</b> a one-page "your rights and how to use them" card.</p></div>
<div class="talk"><h3>Who Holds the Levers</h3><p>How the justice system is structured, using the interactive map.</p><p class="leave"><b>You leave with:</b> a filled-in chart of who decides what in your county.</p></div>
<div class="talk"><h3>From the Front Line</h3><p>Civic power from Fannie Lou Hamer to today. Nonpartisan voter education option.</p><p class="leave"><b>You leave with:</b> the civic power timeline and a voter-ready checklist.</p></div>
</div>
<p class="muted rev" style="margin-top:22px;font-size:14px">For HBCUs, high schools, middle schools, churches, veteran groups and community organizations. Keynote, workshop, or classroom series. <a href="speaking.html">Full details and the speaker sheet</a>.</p>
</div></section>

<section class="light two-sec"><div class="wrap two">
<div class="rev"><div class="eyebrow">Follow the Money LIB · Liberia</div>
<h2 style="margin:10px 0 18px">Transparency creates accountability. In Liberia too.</h2>
<p class="lede muted">A platform Lawrence launched to educate Liberians about the ongoing mismanagement of their public funds, and to teach them how to hold their government accountable.</p>
<div class="cta" style="margin-top:30px"><a class="btn ghost" href="follow-the-money.html">About Follow the Money LIB</a></div></div>
<div class="photo rev"><img src="img/about-teaching-liberia.jpg" alt="Lawrence teaching a digital skills session in Monrovia" loading="lazy"></div>
</div></section>

<section class="dark" id="events"><div class="wrap two">
<div class="photo rev"><img src="img/events-panel.jpg" alt="Lawrence speaking on a panel" style="object-position:50% 30%" loading="lazy"></div>
<div class="rev"><div class="eyebrow">Events &amp; entertainment</div>
<h2 style="margin:10px 0 18px">The host who runs the room</h2>
<p class="muted">Across the DMV, Lawrence hosts festivals, conferences, panels and community events. He also performs with DMV City Slickerz.</p>
<ul class="list"><li>Festivals, conferences, school events</li><li>Panels and moderated conversations</li><li>DMV City Slickerz, available to perform</li></ul>
<div class="cta" style="margin-top:30px"><a class="btn red" href="events.html">Hosting packages</a></div></div>
</div></section>

{JOIN}

<section class="light contact" id="contact"><div class="wrap">
<div class="rev"><div class="eyebrow">Book Lawrence</div><h2 style="margin:10px 0 18px">Bring this to your room</h2>
<p class="muted">Schools, colleges, churches, veteran groups, community organizations. Or email directly:</p>
<p style="font-family:var(--mono);font-size:15px;margin-top:10px"><b><a href="mailto:hello@lawrencetotimeh.com" style="text-decoration:none">hello@lawrencetotimeh.com</a></b></p>
<p class="muted" style="font-size:13px;margin-top:30px">Everything here is free. If the work has been useful to you or your community, you can <a href="contact.html#support">back it directly</a>.</p></div>
<form class="form rev" id="bookForm">
<div class="pair"><div><label for="name">Name</label><input id="name" required></div><div><label for="org">Organization</label><input id="org"></div></div>
<div class="pair"><div><label for="email">Email</label><input id="email" type="email" required></div><div><label for="etype">Event type</label><select id="etype"><option>Talk or workshop</option><option>Classroom series</option><option>Event hosting</option><option>Panel</option><option>Press</option><option>Something else</option></select></div></div>
<div class="pair"><div><label for="date">Date</label><input id="date"></div><div><label for="size">Audience size</label><input id="size"></div></div>
<div><label for="message">Message</label><textarea id="message" required></textarea></div>
<div><button class="btn red" type="submit">Send</button></div>
</form>
</div></section>
''' + FOOT

# ---------------- SPEAKING ----------------
speaking = head("Speaking & Workshops · Lawrence Totimeh Jr.", "Civic education for schools, colleges, churches, veterans and community groups. Four talks, each ending with a documentation exercise.", "speaking.html") + nav("speaking") + f'''
<section class="dark pagehero"><div class="wrap">
<div class="eyebrow">Speaking &amp; workshops</div>
<h1>Civic education for the rooms that need it</h1>
<p class="lede">Schools, colleges, churches, veterans and community groups. Lawrence teaches how the justice system is built, in plain language, from the public record, so audiences leave knowing the rules and the next move. He is an educator, not an attorney.</p>
<div class="cta" style="margin-top:30px"><a class="btn red" href="contact.html">Book Lawrence</a><a class="btn ghost" href="speaker-sheet.pdf">Speaker sheet (PDF)</a></div>
</div></section>

<section class="light lt"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Four talks</div><h2 style="margin-top:8px">Every one ends with a documentation exercise, not a Q&amp;A</h2></div></div>
<div class="talks rev">
<div class="talk"><h3>Transparency Creates Accountability</h3><p>Public records, documentation and holding officials accountable. How a paper trail wins.</p><p class="leave"><b>You leave with:</b> a template to start building a paper trail in your community.</p></div>
<div class="talk"><h3>Learn the Law</h3><p>The basic rights every student is supposed to know, and how to use them. What to say at a traffic stop, what a school can and cannot search, what you sign online, and what happens from probable cause to a courtroom. Taught in plain language, with practice.</p><p class="leave"><b>You leave with:</b> a one-page "your rights and how to use them" card, and a script for the moments that matter.</p></div>
<div class="talk"><h3>Who Holds the Levers</h3><p>How the justice system is structured, taught with the interactive map from the Classroom.</p><p class="leave"><b>You leave with:</b> a filled-in chart of who decides what in your county, and where pressure actually lands.</p></div>
<div class="talk"><h3>From the Front Line</h3><p>Civic power from Fannie Lou Hamer to today. Available with a nonpartisan voter education workshop built on official state resources.</p><p class="leave"><b>You leave with:</b> the civic power timeline and a voter-ready checklist.</p></div>
</div>
</div></section>

<section class="dark"><div class="wrap">
<div class="cards3 rev">
<div class="pkg"><div class="eyebrow">Audiences</div><h3 style="margin:10px 0 12px">Who this is for</h3><ul class="list" style="margin-top:0"><li>HBCUs and colleges</li><li>High schools</li><li>Middle schools</li><li>Churches</li><li>Veteran groups</li><li>Community organizations</li></ul></div>
<div class="pkg"><div class="eyebrow">Formats</div><h3 style="margin:10px 0 12px">How it runs</h3><ul class="list" style="margin-top:0"><li>Keynote, 45 to 60 minutes</li><li>Workshop, 90 minutes to half a day</li><li>Classroom series, multiple sessions</li><li>Virtual or in person</li></ul></div>
<div class="pkg"><div class="eyebrow">Past stages</div><h3 style="margin:10px 0 12px">Where he's spoken</h3><ul class="list" style="margin-top:0"><li>TEDxSinkor, Monrovia</li><li>Smithsonian NMAAHC</li><li>Virginia State University</li><li>Marymount University, Northern Virginia</li><li>Graduation speaker, Alain LeRoy Locke High School, 2020</li></ul></div>
</div>
<div class="cta rev" style="margin-top:40px"><a class="btn red" href="contact.html">Book Lawrence</a></div>
</div></section>

<section class="light"><div class="wrap two">
<div class="photo rev"><img src="img/action1/image.png" alt="Lawrence face to face with a police line at the 2020 protests in Los Angeles" loading="lazy"></div>
<div class="rev"><div class="eyebrow">Why him</div><h2 style="margin:10px 0 18px">He's been on the front line</h2>
<p class="muted">Combat veteran. More than ten years in classrooms from DC to Los Angeles. A decade of civil and human rights work, from Trayvon Martin to today. His 2020 photo led the Los Angeles Times investigation into police tactics at the George Floyd protests. He teaches what he has lived, and he teaches it from the record.</p>
<div class="cta" style="margin-top:30px"><a class="btn ghost" href="about.html">About Lawrence</a></div></div>
</div></section>
''' + JOIN + FOOT

# ---------------- EVENTS ----------------
events = head("Events & Hosting · Agent Kodak", "Agent Kodak hosts festivals, conferences, panels, weddings and community events across the DMV, and performs with DMV City Slickerz.", "events.html", "img/events-panel.jpg") + nav("events") + f'''
<section class="dark pagehero"><div class="wrap two">
<div><div class="eyebrow">Events &amp; entertainment · Agent Kodak</div>
<h1>The host who runs the room</h1>
<p class="lede">The DJ runs the music. He runs the room. Grand entrances, toasts, transitions, timelines, and the energy in between. Festivals, conferences, panels, weddings, banquets and community events across the DMV and beyond.</p>
<div class="cta" style="margin-top:30px"><a class="btn red" href="contact.html">Book for an event</a></div></div>
<div class="photo"><img src="img/events-panel.jpg" alt="Lawrence speaking on a panel" style="object-position:50% 30%"></div>
</div></section>

<section class="dark panelbg" style="border-top:1px solid var(--line)"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Hosting packages</div><h2 style="margin-top:8px">Pick the room</h2></div></div>
<div class="cards3 rev">
<div class="pkg"><div class="eyebrow">The Host</div><div class="price">$350</div><ul class="list" style="margin-top:0"><li>Private parties, banquets and community events</li><li>One prep call before the event</li><li>Up to 3 hours of coverage</li><li>He runs the mic, the timeline, and the energy</li></ul></div>
<div class="pkg hot"><div class="tagline">Most booked</div><div class="eyebrow" style="margin-top:6px">The Wedding Host</div><div class="price">$500</div><ul class="list" style="margin-top:0"><li>Planning call with the couple</li><li>Full run of show and timeline</li><li>Name pronunciations, grand entrance, toasts and transitions</li><li>Hand-in-hand coordination with your DJ</li><li>Up to 5 hours of reception coverage</li></ul></div>
<div class="pkg"><div class="eyebrow">The Full Day</div><div class="price">$800</div><ul class="list" style="margin-top:0"><li>Everything in The Wedding Host</li><li>Rehearsal attendance and ceremony support</li><li>Extended coverage into the after-party</li><li>Your day, carried start to finish</li></ul></div>
</div>
<p class="muted rev" style="font-size:13px;margin-top:22px">Travel: first 30 miles included · $75 up to 60 miles · $150 beyond. Booking: a deposit locks your date, balance due one week out, simple one-page agreement.</p>
</div></section>

<section class="light"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Stages he's rocked</div><h2 style="margin-top:8px">As host and performer, solo and with DMV City Slickerz</h2></div></div>
<div class="stages rev"><span>Smithsonian NMAAHC</span><span>George Mason University</span><span>Woolly Mammoth Theatre Co.</span><span>National Harbor</span><span>H Street Festival</span><span>DC Dept. of Human Services</span><span>Chocolate City Lit Fest</span><span>Virginia State University · PG Alumni</span><span>Edith P. Wright Breast Cancer Foundation</span><span>Ivy Vine Charities</span><span>WO-BE-CO</span><span>Boots in the Building</span><span>SAILS</span><span>EPW Golf Classic</span><span>BARD DC</span><span>Love On The Lot</span><span>NE Summer Nights · Langdon Park</span><span>Art All Night</span></div>
<div class="cta rev" style="margin-top:40px"><a class="btn red" href="contact.html">Book for an event</a><a class="btn ghost" href="https://www.instagram.com/AgentKodak" target="_blank" rel="noopener">See him on Instagram</a></div>
</div></section>
''' + JOIN + FOOT

# ---------------- FOLLOW THE MONEY ----------------
ftm = head("Follow the Money LIB · Lawrence Totimeh Jr.", "A platform that educates Liberians about the mismanagement of their public funds and teaches them how to hold their government accountable.", "follow-the-money.html", "img/about-teaching-liberia.jpg") + nav("ftm") + f'''
<section class="dark pagehero"><div class="wrap">
<div class="eyebrow">Follow the Money LIB · Liberia</div>
<h1>Transparency creates accountability. In Liberia too.</h1>
<p class="lede">In his parents' homeland, the same lesson applies. Follow the Money LIB is a platform Lawrence launched to educate Liberians about the ongoing mismanagement of their public funds, and to teach them how to hold their government accountable.</p>
<div class="cta" style="margin-top:30px"><a class="btn red" href="https://followthemoneylib.com" target="_blank" rel="noopener">followthemoneylib.com</a></div>
</div></section>

<section class="light"><div class="wrap">
<div class="steps rev">
<div class="step"><div class="n">01</div><h3>Track</h3><p class="muted">How public officials spend public money, from the budget to the receipt.</p></div>
<div class="step"><div class="n">02</div><h3>Explain</h3><p class="muted">In plain language, so a citizen without a law degree can follow it.</p></div>
<div class="step"><div class="n">03</div><h3>Act</h3><p class="muted">The steps to demand answers. Learn the rules. Then change them.</p></div>
</div></div></section>

<section class="dark"><div class="wrap two">
<div class="photo rev"><img src="img/about-teaching-liberia.jpg" alt="Lawrence teaching a digital skills session to young people in Monrovia" loading="lazy"></div>
<div class="rev"><div class="eyebrow">On the ground</div><h2 style="margin:10px 0 18px">Teaching in Monrovia</h2>
<p class="muted">Lawrence has worked in Liberia since 2020: digital skills sessions, agriculture, infrastructure, and civic education. In December 2021 the City Government of Monrovia recognized that work with a Certificate of Recognition for services to the Liberian society.</p>
<div class="cta" style="margin-top:30px"><a class="btn ghost" href="about.html">The full story</a></div></div>
</div></section>
''' + JOIN + FOOT

# ---------------- CONTACT ----------------
contact = head("Book Lawrence · Contact", "Book Lawrence Totimeh Jr. for a talk, workshop, classroom series, panel or event. hello@lawrencetotimeh.com", "contact.html") + nav("contact") + f'''
<section class="dark pagehero"><div class="wrap">
<div class="eyebrow">Contact · Book</div>
<h1>Bring this to your room</h1>
<p class="lede">Talks, workshops, classroom series, panels, hosting. Fill in the form or email directly: <a href="mailto:hello@lawrencetotimeh.com" style="color:var(--paper)">hello@lawrencetotimeh.com</a></p>
</div></section>

<section class="light contact"><div class="wrap">
<div class="rev"><div class="eyebrow">What to include</div><h2 style="margin:10px 0 18px">The basics</h2>
<p class="muted">Your organization, the date, the audience and what you want them to leave with. Lawrence replies from hello@lawrencetotimeh.com. Press and media requests use the same form.</p>
<p class="muted" style="margin-top:20px;font-size:14px">I'm an educator, not an attorney. Nothing here is legal advice.</p></div>
<form class="form rev" id="bookForm">
<div class="pair"><div><label for="name">Name</label><input id="name" required></div><div><label for="org">Organization</label><input id="org"></div></div>
<div class="pair"><div><label for="email">Email</label><input id="email" type="email" required></div><div><label for="etype">Event type</label><select id="etype"><option>Talk or workshop</option><option>Classroom series</option><option>Event hosting</option><option>Panel</option><option>Press</option><option>Something else</option></select></div></div>
<div class="pair"><div><label for="date">Date</label><input id="date"></div><div><label for="size">Audience size</label><input id="size"></div></div>
<div><label for="message">Message</label><textarea id="message" required></textarea></div>
<div><button class="btn red" type="submit">Send</button></div>
</form>
</div></section>

<section class="light lt" id="support"><div class="wrap">
<div class="sec-head rev"><div><div class="eyebrow">Support the work</div><h2 style="margin-top:8px">Everything here is free. This is how it stays that way.</h2></div></div>
<p class="muted rev" style="max-width:60ch">The lessons, the Classroom, the templates. None of it is behind a paywall and none of it will be. If the work has been useful to you or your community, you can back it directly. Other ways to help: book a talk, or share a lesson with someone who needs it.</p>
<div class="qr rev"><div><img src="img/qr-cashapp.png" alt="Cash App QR code"><span>Cash App</span></div><div><img src="img/qr-paypal.png" alt="PayPal QR code"><span>PayPal</span></div><div><img src="img/qr-zelle.png" alt="Zelle QR code"><span>Zelle</span></div></div>
</div></section>
''' + JOIN + FOOT

def redirect(to):
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting</title><meta http-equiv="refresh" content="0; url={to}"><link rel="canonical" href="https://lawrencetotimeh.com/{to}"><script>location.replace("{to}")</script></head><body><p>Moved. <a href="{to}">Continue</a></p></body></html>'

pages = {"index.html": home, "speaking.html": speaking, "events.html": events, "follow-the-money.html": ftm, "contact.html": contact,
         "community.html": redirect("index.html"), "support.html": redirect("contact.html#support"), "systems.html": redirect("index.html"), "booking.html": redirect("events.html")}
for name, html in pages.items():
    with open(os.path.join(ROOT, name), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", name)
