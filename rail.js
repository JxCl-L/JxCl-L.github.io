// Horizontal rails on the home page: ‹ › buttons scroll by one card, and are
// disabled at either end. Swiping and trackpad scrolling work natively.
(function () {
  document.querySelectorAll(".rail-head").forEach((head) => {
    const rail = head.parentElement.querySelector(".rail");
    if (!rail) return;
    const [prev, next] = head.querySelectorAll("[data-rail-dir]");

    function step() {
      const card = rail.firstElementChild;
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 16;
      return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    }

    function update() {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= max;
      // Hide the controls entirely when everything already fits.
      head.querySelector(".rail-ctrl").hidden = max <= 0;
    }

    head.querySelectorAll("[data-rail-dir]").forEach((btn) => {
      btn.addEventListener("click", () => {
        rail.scrollBy({ left: Number(btn.dataset.railDir) * step(), behavior: "smooth" });
      });
    });

    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
})();
