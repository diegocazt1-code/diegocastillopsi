const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// Eventos de interacción para GA4. Si gtag no está disponible, no interfiere con la navegación.
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-track]");
  if (!target || typeof window.gtag !== "function") return;

  const params = {
    link_text: (target.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
    link_url: target.href || undefined,
  };

  if (target.dataset.resourceName) params.resource_name = target.dataset.resourceName;
  if (target.dataset.resourceType) params.resource_type = target.dataset.resourceType;
  if (target.dataset.resourceLocation) params.resource_location = target.dataset.resourceLocation;

  window.gtag("event", target.dataset.track, params);
});

// Vista explícita de un recurso editorial.
if (document.body?.dataset.resourceView && typeof window.gtag === "function") {
  window.gtag("event", "resource_view", {
    resource_name: document.body.dataset.resourceView,
    resource_type: document.body.dataset.resourceType || "resource",
    resource_location: "landing",
  });
}
