(() => {
  const views = [...document.querySelectorAll(".view")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const languageControls = [...document.querySelectorAll("[data-lang]")];
  const journeySteps = [...document.querySelectorAll("[data-stage]")];
  const journeyPanels = [...document.querySelectorAll("[data-stage-panel]")];

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

  function showStage(name, shouldFocus = false) {
    journeySteps.forEach((step) => {
      const active = step.dataset.stage === name;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-selected", String(active));
      step.tabIndex = active ? 0 : -1;
      if (active && shouldFocus) step.focus();
    });

    journeyPanels.forEach((panel) => {
      panel.hidden = panel.dataset.stagePanel !== name;
    });
  }

  viewControls.forEach((control) => {
    control.addEventListener("click", () => showView(control.dataset.view));
  });

  languageControls.forEach((control) => {
    control.addEventListener("click", () => setLanguage(control.dataset.lang));
  });

  journeySteps.forEach((step) => {
    step.addEventListener("click", () => showStage(step.dataset.stage));
    step.addEventListener("keydown", (event) => {
      const current = journeySteps.indexOf(step);
      let next = current;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % journeySteps.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + journeySteps.length) % journeySteps.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = journeySteps.length - 1;
      if (next === current) return;

      event.preventDefault();
      showStage(journeySteps[next].dataset.stage, true);
    });
  });

  showStage("prevention");
  setLanguage("en");
})();
