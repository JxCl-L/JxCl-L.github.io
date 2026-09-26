// Click a .screen thumbnail to view it full size. Without JS the link simply
// opens the image, so this is purely an enhancement.
(function () {
  const links = document.querySelectorAll("a.screen");
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = '<img alt="" /><p></p>';
  document.body.appendChild(dialog);
  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("p");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const thumb = link.querySelector("img");
      img.src = link.href;
      img.alt = thumb ? thumb.alt : "";
      caption.textContent = link.querySelector("span")?.textContent ?? "";
      dialog.showModal();
    });
  });

  // Click anywhere (image or backdrop) to close; Esc is handled by <dialog>.
  dialog.addEventListener("click", () => dialog.close());
})();
