(function () {
  const items = Array.from(document.querySelectorAll("[data-parallax]"));
  const panels = Array.from(document.querySelectorAll(".scene-panel"));
  const meterFill = document.querySelector(".scroll-meter-fill");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const enableParallax = items.length > 0 && !reducedMotion;

  let ticking = false;

  function render() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    for (const item of items) {
      const speed = Number(item.dataset.speed || 0);
      const axis = item.dataset.axis === "x" ? "x" : "y";
      const offset = Number(item.dataset.offset || 0);
      const shift = offset - scrollY * speed;

      if (axis === "x") {
        item.style.transform = "translate3d(" + shift + "px, 0, 0)";
      } else {
        item.style.transform = "translate3d(0, " + shift + "px, 0)";
      }
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(render);
      ticking = true;
    }
  }

  if (enableParallax) {
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  if (panels.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            panels.forEach((panel) => panel.classList.remove("active"));
            entry.target.classList.add("active");

            const theme = entry.target.getAttribute("data-scene-theme");
            if (theme) {
              document.body.setAttribute("data-scene-theme", theme);
            }
          }
        }
      },
      {
        root: null,
        threshold: 0.55
      }
    );

    panels.forEach((panel) => observer.observe(panel));

    const initialTheme = panels[0].getAttribute("data-scene-theme");
    if (initialTheme) {
      document.body.setAttribute("data-scene-theme", initialTheme);
    }
  }

  if (meterFill) {
    const updateMeter = function () {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const top = window.pageYOffset || document.documentElement.scrollTop || 0;
      const progress = maxScroll > 0 ? Math.min(100, (top / maxScroll) * 100) : 0;
      meterFill.style.height = progress + "%";
    };

    updateMeter();
    window.addEventListener("scroll", updateMeter, { passive: true });
    window.addEventListener("resize", updateMeter);
  }
})();
