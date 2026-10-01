document.addEventListener("DOMContentLoaded", () => {

  // Mobile navigation
  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(item => observer.observe(item));

  // Snow animation
  const snowLayer = document.querySelector(".snow-layer");

  if (
    snowLayer &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const symbols = ["❄", "✦", "❅"];

    for (let i = 0; i < 42; i++) {
      const snow = document.createElement("span");

      snow.className = "snowflake";
      snow.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      snow.style.left = Math.random() * 100 + "%";
      snow.style.fontSize = (8 + Math.random() * 14) + "px";
      snow.style.opacity = (0.25 + Math.random() * 0.6).toFixed(2);
      snow.style.animationDuration =
        (7 + Math.random() * 12) + "s, " +
        (2 + Math.random() * 4) + "s";

      snow.style.animationDelay =
        (-Math.random() * 15) + "s, " +
        (-Math.random() * 5) + "s";

      snowLayer.appendChild(snow);
    }
  }

});
