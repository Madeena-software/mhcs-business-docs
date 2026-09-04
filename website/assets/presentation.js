(() => {
  const languageControls = [...document.querySelectorAll("[data-lang-btn]")];
  const stepPills = [...document.querySelectorAll(".step-pill")];
  const sections = [...document.querySelectorAll(".pres-section")];

  function setLanguage(language) {
    const key = language === "id" ? "id" : "en";
    document.documentElement.lang = key;

    document.querySelectorAll("[data-en][data-id]").forEach((element) => {
      const text = element.getAttribute(`data-${key}`);
      if (text !== null) {
        if (element.hasAttribute("data-html")) {
          element.innerHTML = text;
        } else {
          element.textContent = text;
        }
      }
    });

    document.querySelectorAll("[data-aria-en][data-aria-id]").forEach((element) => {
      const aria = element.getAttribute(`data-aria-${key}`);
      if (aria) {
        element.setAttribute("aria-label", aria);
      }
    });

    languageControls.forEach((control) => {
      const active = control.dataset.langBtn === key;
      control.classList.toggle("active", active);
      control.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem("mhcs_pres_lang", key);
    } catch (e) {
      // safe fallback if storage unavailable
    }
  }

  // Setup language listeners
  languageControls.forEach((control) => {
    control.addEventListener("click", () => {
      setLanguage(control.dataset.langBtn);
    });
  });

  // Intersection Observer for Presentation Stepper
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            stepPills.forEach((pill) => {
              const href = pill.getAttribute("href");
              const active = href === `#${id}`;
              pill.classList.toggle("active", active);
              if (active) {
                // Ensure active pill is visible in horizontally scrolled stepper
                pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
              }
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Initialize language: English default as required by specification
  let savedLang = "en";
  try {
    savedLang = localStorage.getItem("mhcs_pres_lang") || "en";
  } catch (e) {
    savedLang = "en";
  }
  setLanguage(savedLang);
})();
