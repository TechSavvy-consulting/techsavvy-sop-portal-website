const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const header = document.querySelector("[data-header]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxKicker = document.querySelector("[data-lightbox-kicker]");
const lightboxDetail = document.querySelector("[data-lightbox-detail]");
const videos = Array.from(document.querySelectorAll("video"));
const demoForm = document.querySelector("[data-demo-form]");
const demoSubmit = document.querySelector("[data-demo-submit]");
const demoStatus = document.querySelector("[data-demo-status]");
let lastTrigger = null;

if (year) year.textContent = new Date().getFullYear();

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function pauseOtherVideos(activeVideo = null) {
  videos.forEach((video) => {
    if (video !== activeVideo && !video.paused) video.pause();
  });
}

videos.forEach((video) => {
  video.addEventListener("play", () => pauseOtherVideos(video));
});

document.querySelectorAll('a[href="#video"]').forEach((link) => {
  link.addEventListener("click", () => pauseOtherVideos());
});

function setDemoStatus(message, type = "success") {
  if (!demoStatus) return;
  demoStatus.textContent = message;
  demoStatus.hidden = false;
  demoStatus.classList.toggle("is-error", type === "error");
}

if (demoForm) {
  demoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!demoForm.checkValidity()) {
      demoForm.reportValidity();
      return;
    }

    const originalLabel = demoSubmit ? demoSubmit.textContent : "";
    demoForm.classList.add("is-sending");
    if (demoSubmit) {
      demoSubmit.disabled = true;
      demoSubmit.textContent = "Sending request...";
    }
    if (demoStatus) demoStatus.hidden = true;

    try {
      const response = await fetch(demoForm.action, {
        method: demoForm.method,
        body: new FormData(demoForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Formspree rejected the request.");
      demoForm.reset();
      setDemoStatus("Thanks, your demo request was sent. TechSavvy will follow up soon.");
    } catch (error) {
      setDemoStatus("The form could not send right now. Please email sales@techsavvy.consulting or call 918.400.2424.", "error");
    } finally {
      demoForm.classList.remove("is-sending");
      if (demoSubmit) {
        demoSubmit.disabled = false;
        demoSubmit.textContent = originalLabel || "Request demo";
      }
    }
  });
}

function openLightbox(trigger) {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxKicker || !lightboxDetail) return;
  lastTrigger = trigger;
  const img = trigger.getAttribute("data-img") || "";
  const title = trigger.getAttribute("data-title") || "Portal screenshot";
  const kicker = trigger.getAttribute("data-kicker") || "Highlight";
  const detail = trigger.getAttribute("data-detail") || "";
  lightboxImage.src = img;
  lightboxImage.alt = `${title} screenshot`;
  lightboxTitle.textContent = title;
  lightboxKicker.textContent = kicker;
  lightboxDetail.textContent = detail;
  if (typeof lightbox.showModal === "function") lightbox.showModal();
  else lightbox.setAttribute("open", "");
}

function closeLightbox() {
  if (!lightbox) return;
  if (typeof lightbox.close === "function") lightbox.close();
  else lightbox.removeAttribute("open");
  if (lightboxImage) lightboxImage.src = "";
  if (lastTrigger) lastTrigger.focus();
}

document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});

document.querySelectorAll("[data-lightbox-close], [data-lightbox-close-secondary]").forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    const rect = lightbox.getBoundingClientRect();
    const inDialog = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inDialog) closeLightbox();
  });
}
