const menuToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#primary-navigation");

if (menuToggle && mainNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mainNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Node &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");

if (enquiryForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    formStatus.removeAttribute("data-state");

    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const consent = formData.get("consent") === "on";

    if (!consent) {
      formStatus.textContent = "Please confirm before continuing to WhatsApp.";
      formStatus.dataset.state = "error";
      document.querySelector("#consent")?.focus();
      return;
    }

    const message = [
      "Hello ATHINET, I would like to enquire about a technology service.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company || "Not provided"}`,
      `Service required: ${service}`,
      `Project description: ${description}`,
      `Estimated budget: ${budget || "Not provided"}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/254705605922?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    formStatus.textContent = "If WhatsApp opened, review the draft there and press Send. If it did not, use the WhatsApp link above or call +254 705 605 922.";
    formStatus.dataset.state = "success";
  });
}
