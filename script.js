const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
  function setNavigationOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setNavigationOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (event.key === "Escape" && isOpen) {
      setNavigationOpen(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setNavigationOpen(false);
    }
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(contactForm).get("name").trim();
    formStatus.textContent = `Thank you, ${name}. This demo form is not connected, so your message was not sent. Please email gabrielgabriel9727@gmail.com directly.`;
    contactForm.reset();
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const versionTwoFrame = document.querySelector("#version-2-frame");
if (versionTwoFrame) {
  window.addEventListener("message", (event) => {
    if (event.source !== versionTwoFrame.contentWindow || event.data?.type !== "bit-version-2-height") {
      return;
    }

    const frameHeight = Number(event.data.height);
    if (Number.isFinite(frameHeight) && frameHeight > 0) {
      versionTwoFrame.style.height = `${Math.ceil(frameHeight)}px`;
    }
  });
}
