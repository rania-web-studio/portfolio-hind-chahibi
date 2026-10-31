(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EMAIL = "chahibihind948@gmail.com";

  /* ---------- translations (French lives in the HTML) ---------- */
  const EN = {
    "nav.profil": "Profile",
    "nav.skills": "Skills",
    "nav.exp": "Experience",
    "nav.edu": "Education",
    "nav.contact": "Contact",
    "hero.status": "Looking for a final-year internship · pre-hire",
    "hero.lead": "<strong>Materials &amp; Process Engineering</strong> student at FSTG Marrakech. I'm drawn to transformation processes, quality and continuous improvement in the automotive, aerospace and metallurgy industries.",
    "hero.cta1": "See my journey",
    "hero.cta2": "Contact me",
    "profil.k": "profile",
    "profil.title": "Rigour, curiosity and team spirit",
    "profil.p1": "Rigorous and motivated, I rely on a solid foundation in <strong>materials science and engineering</strong> that lets me adapt to different industrial environments.",
    "profil.p2": "I enjoy teamwork, project management, and monitoring and optimising industrial processes. My goal: contribute to continuous improvement and to concrete industrial solutions.",
    "sec.auto": "Automotive",
    "sec.aero": "Aerospace",
    "sec.metal": "Metallurgy",
    "sec.proc": "Transformation processes",
    "stat.1": "industrial internships",
    "stat.2": "industrial groups",
    "stat.3": "degrees (DUT + engineering)",
    "stat.4": "target sectors: auto, aero, metallurgy",
    "skills.k": "skills",
    "skills.title": "My engineering toolbox",
    "skills.c1": "Materials &amp; processes",
    "skills.c2": "Quality &amp; analysis",
    "skills.c3": "Management &amp; data",
    "skills.c4": "Soft skills",
    "t.mat": "Materials science",
    "t.met": "Metallurgy",
    "t.trans": "Transformation processes",
    "t.gp": "Process engineering",
    "t.adj": "Building materials &amp; admixtures",
    "t.rca": "Root cause analysis",
    "t.msp": "Statistical process control (SPC)",
    "t.cq": "Quality control",
    "t.pm": "Project management",
    "t.data": "Data management &amp; analysis",
    "t.opt": "Process optimisation",
    "t.ac": "Continuous improvement",
    "t.team": "Team spirit",
    "t.lead": "Leadership",
    "t.rig": "Rigour",
    "t.adapt": "Adaptability",
    "t.form": "Running training sessions",
    "fish.k": "favourite method",
    "fish.title": "Getting to the root cause",
    "fish.p": "When facing a defect or a loss, I structure the analysis with the Ishikawa diagram and FMEA, then track the process over time with SPC to make sure the improvement holds.",
    "exp.k": "experience",
    "exp.title": "Hands-on, in industry",
    "exp.d0": "Jan 2026 — present",
    "exp.t0": "Head of the training unit",
    "exp.b0": "Student life",
    "exp.p0": "I organise and coordinate the training sessions offered to Materials &amp; Process Engineering students.",
    "exp.d1": "Jul — Aug 2026",
    "exp.t1": "Year-end project internship (PFA)",
    "exp.b1": "Year-end project",
    "exp.p1": "Year-end project at a world leader in phosphates and their derivatives.",
    "exp.d2": "Jul — Aug 2025",
    "exp.t2": "Observation internship",
    "exp.p2a": "Quality control tests on raw materials, semi-finished and finished products.",
    "exp.p2b": "Studied the role of each raw material and its influence on the quality of the final product.",
    "exp.p2c": "Studied the different admixtures used and their impact on product properties.",
    "exp.d3": "Apr — Jun 2024",
    "exp.t3": "Technical internship",
    "exp.b3": "3 months",
    "exp.p3": "Reducing diffusion losses by applying statistical process control (SPC).",
    "exp.d4": "Jul 2023",
    "exp.t4": "Introductory internship",
    "exp.p4": "Observed the manufacturing stages of building materials and product quality control.",
    "edu.k": "education",
    "edu.title": "Education &amp; certifications",
    "edu.d1": "2024 — present",
    "edu.t1": "Engineering degree — Materials &amp; Process Engineering",
    "edu.t2": "DUT (2-year technical degree) — Process Engineering",
    "edu.k2": "Certifications",
    "cert.1": "Project Management Foundations",
    "cert.2": "Project Management Foundations: Teams",
    "cert.3": "Soft skills learning path",
    "contact.title": "Let's work together",
    "contact.p": "I'm looking for a <strong>final-year internship (PFE)</strong>, with a possible pre-hire, at an industrial company: automotive, aerospace, metallurgy or transformation processes.",
    "contact.copy": "Copy email",
    "footer": "Materials &amp; Process Engineering",
  };

  const ROLES = {
    fr: ["Génie des Matériaux et Procédés", "Métallurgie & Automobile", "Procédés de transformation", "Qualité & amélioration continue", "Gestion et analyse des données"],
    en: ["Materials & Process Engineering", "Metallurgy & Automotive", "Transformation processes", "Quality & continuous improvement", "Data management & analysis"],
  };
  const MSG = { fr: "E-mail copié ✓", en: "Email copied ✓" };

  const i18nEls = [...document.querySelectorAll("[data-i18n]")];
  const FR = {};
  i18nEls.forEach((el) => { FR[el.dataset.i18n] = el.innerHTML; });

  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (_) {}
  let lang = saved === "en" ? "en" : "fr";

  const langBtn = document.getElementById("langBtn");
  let roleIdx = 0, charIdx = 0, deleting = false;

  function applyLang(l) {
    lang = l;
    const dict = l === "en" ? EN : FR;
    i18nEls.forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    document.documentElement.lang = l;
    langBtn.textContent = l === "en" ? "FR" : "EN";
    try { localStorage.setItem("lang", l); } catch (_) {}
    roleIdx = 0; charIdx = 0; deleting = false;
  }
  langBtn.addEventListener("click", () => applyLang(lang === "fr" ? "en" : "fr"));

  /* ---------- typing effect ---------- */
  const typed = document.getElementById("typed");
  function tick() {
    const word = ROLES[lang][roleIdx % ROLES[lang].length];
    if (reduceMotion) { typed.textContent = word; roleIdx++; return setTimeout(tick, 2600); }
    charIdx += deleting ? -1 : 1;
    typed.textContent = word.slice(0, charIdx);
    let delay = deleting ? 30 : 70;
    if (!deleting && charIdx >= word.length) { deleting = true; delay = 1900; }
    else if (deleting && charIdx <= 0) { deleting = false; roleIdx++; delay = 350; }
    setTimeout(tick, delay);
  }
  applyLang(lang);
  tick();

  /* ---------- nav ---------- */
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- reveal + counters ---------- */
  const countUp = (el) => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1100;
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const revealer = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      obs.unobserve(e.target);
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    revealer.observe(el);
  });

  /* ---------- copy email ---------- */
  const toast = document.getElementById("toast");
  document.getElementById("copyBtn").addEventListener("click", async () => {
    let msg = MSG[lang];
    try { await navigator.clipboard.writeText(EMAIL); } catch (_) { msg = EMAIL; }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => toast.classList.remove("show"), 2200);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- crystal lattice background ---------- */
  const canvas = document.getElementById("lattice");
  const ctx = canvas.getContext("2d");
  let w, h, atoms = [];
  const mouse = { x: -9999, y: -9999 };
  const SPACING = 64;

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    atoms = [];
    const rowH = SPACING * 0.866;
    for (let r = -1, y = -rowH; y < h + rowH; r++, y += rowH) {
      const off = r % 2 ? SPACING / 2 : 0;
      for (let x = -SPACING + off; x < w + SPACING; x += SPACING) {
        atoms.push({ ox: x, oy: y, x, y, phase: Math.random() * Math.PI * 2 });
      }
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    const time = t / 1000;
    for (const a of atoms) {
      const vib = reduceMotion ? 0 : 1.6;
      let x = a.ox + Math.sin(time * 1.3 + a.phase) * vib;
      let y = a.oy + Math.cos(time * 1.1 + a.phase) * vib;
      const dx = x - mouse.x, dy = y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < 150 && d > 0) {
        const push = (1 - d / 150) * 16;
        x += (dx / d) * push;
        y += (dy / d) * push;
      }
      a.x = x; a.y = y;
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < atoms.length; i++) {
      const a = atoms[i];
      for (let j = i + 1; j < atoms.length; j++) {
        const b = atoms[j];
        if (Math.abs(b.oy - a.oy) > SPACING) break;
        const d = Math.hypot(a.ox - b.ox, a.oy - b.oy);
        if (d > SPACING * 1.05) continue;
        const md = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
        const hot = md < 170 ? 1 - md / 170 : 0;
        ctx.strokeStyle = hot
          ? `rgba(227, 164, 107, ${0.06 + hot * 0.4})`
          : "rgba(169, 182, 198, 0.055)";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    for (const a of atoms) {
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      const hot = md < 170 ? 1 - md / 170 : 0;
      ctx.fillStyle = hot ? `rgba(246, 211, 174, ${0.25 + hot * 0.65})` : "rgba(169, 182, 198, 0.16)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.6 + hot * 2.2, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => { build(); if (reduceMotion) frame(0); });
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
  build();
  requestAnimationFrame(frame);
})();
