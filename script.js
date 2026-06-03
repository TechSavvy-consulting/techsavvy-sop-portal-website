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
const demoImagePrev = document.querySelector("[data-demo-image-prev]");
const demoImageNext = document.querySelector("[data-demo-image-next]");
const demoImageCount = document.querySelector("[data-demo-image-count]");
const demoDots = document.querySelector("[data-demo-dots]");
const demoMobileList = document.querySelector("[data-demo-mobile-list]");
let lastTrigger = null;
let activeDemoIndex = 0;
let activeDemoImageIndex = 0;

const demoTourSteps = [
  {
    group: "Staff portal",
    title: "Staff dashboard",
    images: ["./assets/demo/01-staff-dashboard-2.png", "./assets/demo/01-staff-dashboard-3.png"],
    text: "Employees start in a branded portal with searchable SOPs, section filters, pinned items, and quick access to approved procedures."
  },
  {
    group: "Staff portal",
    title: "SOP detail view",
    images: ["./assets/demo/02-staff-sop-detail-1.png", "./assets/demo/02-staff-sop-detail-2.png"],
    text: "Each SOP shows ownership, review timing, attachments, export options, change suggestions, read confirmation, checklist runs, and training actions."
  },
  {
    group: "Mobile access",
    title: "QR code access",
    images: ["./assets/demo/03-staff-qr-code-2.png", "./assets/demo/03-staff-qr-code-3.png"],
    text: "QR codes let staff open the right procedure from a phone or tablet at the workstation, office area, or point of work."
  },
  {
    group: "Staff portal",
    title: "Checklist run",
    images: ["./assets/demo/04-staff-checklist-1.png", "./assets/demo/04-staff-checklist-2.png"],
    text: "Checklist-style SOPs turn repeatable work into guided task runs with a completion trail."
  },
  {
    group: "Training",
    title: "Training quiz",
    images: ["./assets/demo/05-staff-training-2.png"],
    text: "Training questions confirm understanding and help managers create a repeatable onboarding path."
  },
  {
    group: "Support",
    title: "Support request",
    images: ["./assets/demo/06-support-request-1.png", "./assets/demo/06-support-request-2.png"],
    text: "Staff and managers can request help from the portal instead of chasing support through scattered messages."
  },
  {
    group: "Help",
    title: "Portal guide",
    images: ["./assets/demo/07-help-guide-1.png", "./assets/demo/07-help-guide-2.png", "./assets/demo/07-help-guide-3.png"],
    text: "The help guide explains common portal workflows so users can find their way without extra training material."
  },
  {
    group: "Admin portal",
    title: "Health dashboard",
    images: ["./assets/demo/08-admin-dashboard-1.png", "./assets/demo/08-admin-dashboard-2.png"],
    text: "Managers see portal health, SOP counts, approvals, drafts, user status, and items needing attention."
  },
  {
    group: "Admin portal",
    title: "SOP editor",
    images: ["./assets/demo/09-admin-sop-editor-1.png", "./assets/demo/09-admin-sop-editor-2.png", "./assets/demo/09-admin-sop-editor-3.png"],
    text: "Managers can create, edit, duplicate, approve, archive, attach files, and maintain procedure content from one place."
  },
  {
    group: "Admin portal",
    title: "Sections",
    images: ["./assets/demo/10-admin-sections-1.png", "./assets/demo/10-admin-sections-2.png"],
    text: "Sections organize SOPs around departments, responsibilities, or business workflows so staff can browse naturally."
  },
  {
    group: "Training",
    title: "Training and runs",
    images: ["./assets/demo/11-admin-training-runs-1.png", "./assets/demo/11-admin-training-runs-2.png", "./assets/demo/11-admin-training-runs-3.png"],
    text: "Training and run history help managers track completion and follow up when procedures need accountability."
  },
  {
    group: "AI setup",
    title: "SOP generator",
    images: ["./assets/demo/12-admin-generator-1.png", "./assets/demo/12-admin-generator-2.png", "./assets/demo/12-admin-generator-3.png"],
    text: "The generator helps turn a rough description into a structured SOP draft that managers review before publishing."
  },
  {
    group: "AI setup",
    title: "SOP import",
    images: ["./assets/demo/13-admin-import-1.png", "./assets/demo/13-admin-import-2.png", "./assets/demo/13-admin-import-3.png"],
    text: "Existing SOP content can be imported and reshaped into the portal instead of starting from an empty library."
  },
  {
    group: "Improvement",
    title: "Change requests",
    images: ["./assets/demo/14-admin-change-requests-1.png"],
    text: "Staff suggestions flow to managers for review, helping procedures stay current without losing approval control."
  },
  {
    group: "Admin portal",
    title: "Users and logins",
    images: ["./assets/demo/15-admin-users-1.png", "./assets/demo/15-admin-users-2.png", "./assets/demo/15-admin-users-3.png", "./assets/demo/15-admin-users-4.png"],
    text: "User controls keep access organized for admins, managers, staff, and training workflows."
  },
  {
    group: "Branding",
    title: "Brand settings",
    images: ["./assets/demo/16-admin-branding-1.png", "./assets/demo/16-admin-branding-3.png", "./assets/demo/16-admin-branding-4.png"],
    text: "The portal can be branded with the customer's company name, colors, logo, support details, and portal identity."
  },
  {
    group: "Support",
    title: "Support requests",
    images: ["./assets/demo/17-admin-support-requests-1.png"],
    text: "Managers can review support requests from the portal and keep operational issues connected to the SOP system."
  },
  {
    group: "Admin portal",
    title: "Backup and restore",
    images: ["./assets/demo/18-admin-backup-restore-1.png", "./assets/demo/18-admin-backup-restore-2.png", "./assets/demo/18-admin-backup-restore-3.png", "./assets/demo/18-admin-backup-restore-4.png"],
    text: "Backup and restore tools help protect the SOP library during rollout, updates, and maintenance."
  },
  {
    group: "Admin portal",
    title: "Advanced tools",
    images: ["./assets/demo/19-admin-advanced-1.png", "./assets/demo/19-admin-advanced-2.png", "./assets/demo/19-admin-advanced-3.png", "./assets/demo/19-admin-advanced-4.png"],
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

function renderDemoImage() {
  if (!demoImage || !demoKicker || !demoTitle || !demoText) return;
  const step = demoTourSteps[activeDemoIndex];
  const images = step.images || [];
  activeDemoImageIndex = Math.min(Math.max(activeDemoImageIndex, 0), Math.max(images.length - 1, 0));
  demoImage.src = images[activeDemoImageIndex] || "";
  demoImage.alt = `${step.title} screenshot ${activeDemoImageIndex + 1} from the SOP Portal demo`;
  demoKicker.textContent = step.group;
  demoTitle.textContent = step.title;
  demoText.textContent = step.text;
  if (demoImageCount) demoImageCount.textContent = `View ${activeDemoImageIndex + 1} of ${images.length}`;
  if (demoImagePrev) demoImagePrev.disabled = activeDemoImageIndex === 0;
  if (demoImageNext) demoImageNext.disabled = activeDemoImageIndex >= images.length - 1;
  if (demoDots) {
    demoDots.innerHTML = "";
    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "demo-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Show screenshot ${index + 1}`);
      dot.classList.toggle("is-active", index === activeDemoImageIndex);
      dot.addEventListener("click", () => {
        activeDemoImageIndex = index;
        renderDemoImage();
      });
      demoDots.appendChild(dot);
    });
  }
}

function renderDemoStep(index) {
  activeDemoIndex = (index + demoTourSteps.length) % demoTourSteps.length;
  activeDemoImageIndex = 0;
  renderDemoImage();
  document.querySelectorAll("[data-demo-step]").forEach((button) => {
    const isActive = Number(button.getAttribute("data-demo-step")) === activeDemoIndex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "step" : "false");
  });
}

function buildMobileDemoList() {
  if (!demoMobileList || demoMobileList.children.length) return;
  demoTourSteps.forEach((step, stepIndex) => {
    const section = document.createElement("section");
    section.className = "demo-mobile-section";

    const label = document.createElement("span");
    label.className = "mini-label";
    label.textContent = step.group;

    const title = document.createElement("h3");
    title.textContent = step.title;

    const text = document.createElement("p");
    text.textContent = step.text;

    section.append(label, title, text);

    step.images.forEach((image, imageIndex) => {
      const shot = document.createElement("figure");
      shot.className = "demo-mobile-shot";

      const img = document.createElement("img");
      img.src = image;
      img.loading = "lazy";
      img.alt = `${step.title} screenshot ${imageIndex + 1}`;

      const caption = document.createElement("span");
      caption.textContent = `${stepIndex + 1}.${imageIndex + 1}`;

      shot.append(img, caption);
      section.appendChild(shot);
    });

    demoMobileList.appendChild(section);
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
  buildMobileDemoList();
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
if (demoImagePrev) demoImagePrev.addEventListener("click", () => {
  activeDemoImageIndex = Math.max(0, activeDemoImageIndex - 1);
  renderDemoImage();
});
if (demoImageNext) demoImageNext.addEventListener("click", () => {
  const images = demoTourSteps[activeDemoIndex].images || [];
  activeDemoImageIndex = Math.min(images.length - 1, activeDemoImageIndex + 1);
  renderDemoImage();
});

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
