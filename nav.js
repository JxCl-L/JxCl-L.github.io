// Highlight the nav link for the section currently being read.
// A section counts as "current" once its top scrolls past the sticky nav.
(function () {
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  const pairs = links
    .map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) }))
    .filter((p) => p.target);
  if (!pairs.length) return;

  const OFFSET = 90; // sticky nav height + a little breathing room

  function update() {
    let current = null;
    for (const p of pairs) {
      if (p.target.getBoundingClientRect().top - OFFSET <= 0) current = p;
    }
    // The last section may be too short to reach the top; treat page bottom as it.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = pairs[pairs.length - 1];

    for (const p of pairs) {
      const active = p === current;
      p.link.classList.toggle("is-active", active);
      if (active) p.link.setAttribute("aria-current", "true");
      else p.link.removeAttribute("aria-current");
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
})();
