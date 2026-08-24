(() => {
  const views = [...document.querySelectorAll(".view")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const languageControls = [...document.querySelectorAll("[data-lang]")];

  function showView(name) {
    const target = document.getElementById(`screen-${name}`);
    if (!target) return;

    views.forEach((view) => {
      view.hidden = view !== target;
    });

    viewControls.forEach((control) => {
      if (control.matches(".main-nav button")) {
        const active = control.dataset.view === name;
        control.setAttribute("aria-current", active ? "page" : "false");
      }
    });

    window.scrollTo(0, 0);
  }

  function setLanguage(language) {
    const key = language === "id" ? "id" : "en";
    document.documentElement.lang = key;

    document.querySelectorAll("[data-en][data-id]").forEach((element) => {
      element.textContent = element.dataset[key];
    });

    document.querySelectorAll("[data-aria-en][data-aria-id]").forEach((element) => {
      element.setAttribute("aria-label", element.getAttribute(`data-aria-${key}`));
    });

    languageControls.forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.lang === key));
    });
  }

  viewControls.forEach((control) => {
    control.addEventListener("click", () => showView(control.dataset.view));
  });

  languageControls.forEach((control) => {
    control.addEventListener("click", () => setLanguage(control.dataset.lang));
  });

  setLanguage("en");
})();
