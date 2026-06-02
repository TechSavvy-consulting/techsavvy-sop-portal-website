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
const demoDialog = document.querySelector("[data-demo-dialog]");
const demoOpenButtons = document.querySelectorAll("[data-demo-open]");
const demoClose = document.querySelector("[data-demo-close]");
const demoSteps = document.querySelector("[data-demo-steps]");
const demoImage = document.querySelector("[data-demo-image]");
const demoKicker = document.querySelector("[data-demo-kicker]");
const demoTitle = document.querySelector("[data-demo-title]");
const demoText = document.querySelector("[data-demo-text]");
const demoPrev = document.querySelector("[data-demo-prev]");
const demoNext = document.querySelector("[data-demo-next]");
let lastTrigger = null;
let activeDemoIndex = 0;

const demoTourSteps = [
  {
    group: "Staff portal",
    title: "Staff dashboard",
    image: "./assets/demo/01-staff-dashboard.png",
    text: "Employees start in a branded portal with searchable SOPs, section filters, pinned items, and quick access to approved procedures."
  },
  {
    group: "Staff portal",
    title: "SOP detail view",
    image: "./assets/demo/02-staff-sop-detail.png",
    text: "Each SOP shows ownership, review timing, attachments, export options, change suggestions, read confirmation, checklist runs, and training actions."
  },
  {
    group: "Mobile access",
    title: "QR code access",
    image: "./assets/demo/03-staff-qr-code.png",
    text: "QR codes let staff open the right procedure from a phone or tablet at the workstation, office area, or point of work."
  },
  {
    group: "Staff portal",
    title: "Checklist run",
    image: "./assets/demo/04-staff-checklist.png",
    text: "Checklist-style SOPs turn repeatable work into guided task runs with a completion trail."
  },
  {
    group: "Training",
    title: "Training quiz",
    image: "./assets/demo/05-staff-training.png",
    text: "Training questions confirm understanding and help managers create a repeatable onboarding path."
  },
  {
    group: "Support",
    title: "Support request",
    image: "./assets/demo/06-support-request.png",
    text: "Staff and managers can request help from the portal instead of chasing support through scattered messages."
  },
  {
    group: "Help",
    title: "Portal guide",
    image: "./assets/demo/07-help-guide.png",
    text: "The help guide explains common portal workflows so users can find their way without extra training material."
  },
  {
    group: "Admin portal",
    title: "Health dashboard",
    image: "./assets/demo/08-admin-dashboard.png",
    text: "Managers see portal health, SOP counts, approvals, drafts, user status, and items needing attention."
  },
  {
    group: "Admin portal",
    title: "SOP editor",
    image: "./assets/demo/09-admin-sop-editor.png",
    text: "Managers can create, edit, duplicate, approve, archive, attach files, and maintain procedure content from one place."
  },
  {
    group: "Admin portal",
    title: "Sections",
    image: "./assets/demo/10-admin-sections.png",
    text: "Sections organize SOPs around departments, responsibilities, or business workflows so staff can browse naturally."
  },
  {
    group: "Training",
    title: "Training and runs",
    image: "./assets/demo/11-admin-training-runs.png",
    text: "Training and run history help managers track completion and follow up when procedures need accountability."
  },
  {
    group: "AI setup",
    title: "SOP generator",
    image: "./assets/demo/12-admin-generator.png",
    text: "The generator helps turn a rough description into a structured SOP draft that managers review before publishing."
  },
  {
    group: "AI setup",
    title: "SOP import",
    image: "./assets/demo/13-admin-import.png",
    text: "Existing SOP content can be imported and reshaped into the portal instead of starting from an empty library."
  },
  {
    group: "Improvement",
    title: "Change requests",
    image: "./assets/demo/14-admin-change-requests.png",
    text: "Staff suggestions flow to managers for review, helping procedures stay current without losing approval control."
  },
  {
    group: "Admin portal",
    title: "Users and logins",
    image: "./assets/demo/15-admin-users.png",
    text: "User controls keep access organized for admins, managers, staff, and training workflows."
  },
  {
    group: "Branding",
    title: "Brand settings",
    image: "./assets/demo/16-admin-branding.png",
    text: "The portal can be branded with the customer's company name, colors, logo, support details, and portal identity."
  },
  {
    group: "Support",
    title: "Support requests",
    image: "./assets/demo/17-admin-support-requests.png",
    text: "Managers can review support requests from the portal and keep operational issues connected to the SOP system."
  },
  {
    group: "Admin portal",
    title: "Backup and restore",
    image: "./assets/demo/18-admin-backup-restore.png",
    text: "Backup and restore tools help protect the SOP library during rollout, updates, and maintenance."
  },
  {
    group: "Admin portal",
    title: "Advanced tools",
    image: "./assets/demo/19-admin-advanced.png",
    text: "Advanced controls support maintenance tasks for a managed portal without exposing the real production environment in this demo."
  }
];

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

function renderDemoStep(index) {
  if (!demoImage || !demoKicker || !demoTitle || !demoText) return;
  activeDemoIndex = (index + demoTourSteps.length) % demoTourSteps.length;
  const step = demoTourSteps[activeDemoIndex];
  demoImage.src = step.image;
  demoImage.alt = `${step.title} screenshot from the SOP Portal demo`;
  demoKicker.textContent = step.group;
  demoTitle.textContent = step.title;
  demoText.textContent = step.text;
  if (demoPrev) demoPrev.disabled = activeDemoIndex === 0;
  if (demoNext) demoNext.textContent = activeDemoIndex === demoTourSteps.length - 1 ? "Start over" : "Next";
  document.querySelectorAll("[data-demo-step]").forEach((button) => {
    const isActive = Number(button.getAttribute("data-demo-step")) === activeDemoIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "step" : "false");
  });
}

function buildDemoSteps() {
  if (!demoSteps || demoSteps.children.length) return;
  demoTourSteps.forEach((step, index) => {
    const button = document.createElement("button");
    button.className = "demo-step";
    button.type = "button";
    button.setAttribute("data-demo-step", String(index));
    button.innerHTML = `<span>${step.group}</span><strong>${step.title}</strong>`;
    button.addEventListener("click", () => renderDemoStep(index));
    demoSteps.appendChild(button);
  });
}

function openDemo() {
  if (!demoDialog) return;
  pauseOtherVideos();
  buildDemoSteps();
  renderDemoStep(activeDemoIndex);
  if (typeof demoDialog.showModal === "function") demoDialog.showModal();
  else demoDialog.setAttribute("open", "");
}

function closeDemo() {
  if (!demoDialog) return;
  if (typeof demoDialog.close === "function") demoDialog.close();
  else demoDialog.removeAttribute("open");
}

demoOpenButtons.forEach((button) => button.addEventListener("click", openDemo));
if (demoClose) demoClose.addEventListener("click", closeDemo);
if (demoPrev) demoPrev.addEventListener("click", () => renderDemoStep(Math.max(0, activeDemoIndex - 1)));
if (demoNext) demoNext.addEventListener("click", () => renderDemoStep(activeDemoIndex === demoTourSteps.length - 1 ? 0 : activeDemoIndex + 1));

if (demoDialog) {
  demoDialog.addEventListener("click", (event) => {
    const rect = demoDialog.getBoundingClientRect();
    const inDialog = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inDialog) closeDemo();
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
