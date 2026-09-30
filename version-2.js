const studioMenuToggle = document.querySelector(".studio-menu-toggle");
const studioNavigation = document.querySelector("#studio-navigation");

if (studioMenuToggle && studioNavigation) {
  const setMenuOpen = (isOpen) => {
    studioMenuToggle.setAttribute("aria-expanded", String(isOpen));
    studioMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    studioNavigation.classList.toggle("is-open", isOpen);
  };

  studioMenuToggle.addEventListener("click", () => {
    setMenuOpen(studioMenuToggle.getAttribute("aria-expanded") !== "true");
  });

  studioNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a[href^='#']")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && studioMenuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      studioMenuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setMenuOpen(false);
    }
  });
}

const studioYear = document.querySelector("#studio-year");
if (studioYear) {
  studioYear.textContent = new Date().getFullYear();
}

if (window.parent !== window) {
  let previousHeight = 0;

  const publishFrameHeight = () => {
    const frameHeight = Math.ceil(document.documentElement.scrollHeight);
    if (frameHeight !== previousHeight) {
      previousHeight = frameHeight;
      window.parent.postMessage({ type: "bit-version-2-height", height: frameHeight }, "*");
    }
  };

  window.addEventListener("load", publishFrameHeight);
  window.addEventListener("resize", publishFrameHeight);

  if ("ResizeObserver" in window) {
    new ResizeObserver(publishFrameHeight).observe(document.documentElement);
  }
}
