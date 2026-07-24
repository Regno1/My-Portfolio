const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navbar")) {
      menuButton.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    }
  });
}

const updateHeader = () => {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

// ---------- Floating icon parallax on mouse move ----------
const heroVisual = document.querySelector(".hero-visual");
const floatIcons = document.querySelectorAll(".float-icon");

if (heroVisual && floatIcons.length) {
  const intensities = Array.from(floatIcons, () => 0.6 + Math.random() * 1.4);
  let rafId = null;

  heroVisual.addEventListener("mousemove", (e) => {
    if (rafId) return; // throttle to 1 per frame
    rafId = requestAnimationFrame(() => {
      const rect = heroVisual.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      floatIcons.forEach((icon, i) => {
        const s = intensities[i];
        icon.style.transform = `translate3d(${nx * 12 * s}px, ${ny * 8 * s}px, 0)`;
      });
      rafId = null;
    });
  });

  heroVisual.addEventListener("mouseleave", () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    floatIcons.forEach((icon) => { icon.style.transform = ""; });
  });
}
