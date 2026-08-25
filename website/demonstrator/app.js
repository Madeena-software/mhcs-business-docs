(() => {
  const stages = [
    { label: "Screening / Finding", state: "Finding identified", next: "Acquire fictional image" },
    { label: "Imaging acquisition", state: "Image acquisition pending", next: "Confirm image acquisition" },
    { label: "AI capability", state: "External capability available", next: "Review AI-assisted capability" },
    { label: "Human clinical review", state: "Professional review pending", next: "Complete human clinical review" },
    { label: "Required action", state: "Required healthcare action pending", next: "Create required referral" },
    { label: "Referral / handoff", state: "Referral created — completion pending", next: "Complete referral" },
    { label: "Follow-up", state: "Referral completed — follow-up pending", next: "Complete follow-up" },
    { label: "Intended outcome", state: "Outcome update pending", next: "Record intended outcome" },
    { label: "Continued Monitoring", state: "Monitoring loop active", next: "Continue monitoring" },
  ];

  const views = [...document.querySelectorAll(".view-panel")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const timelineItems = [...document.querySelectorAll("[data-stage-index]")];
  const state = { step: 0, imageSelected: false, imageLabel: "", aiOpened: false };
  const aiUrl = typeof window.MHCS_DEMO_CONFIG?.aiDemoUrl === "string" ? window.MHCS_DEMO_CONFIG.aiDemoUrl.trim() : "";

  const byId = (id) => document.getElementById(id);
  const elements = {
    notice: byId("demo-notice"),
    currentStage: byId("current-stage"),
    nextActionLabel: byId("next-action-label"),
    caseStatus: byId("case-status"),
    progressCount: byId("progress-count"),
    journeyChip: byId("journey-state-chip"),
    journeyIcon: byId("journey-state-icon"),
    journeyTitle: byId("journey-state-title"),
    journeyCopy: byId("journey-state-copy"),
    metricState: byId("metric-state"),
    metricCapability: byId("metric-capability"),
    metricIncomplete: byId("metric-incomplete"),
    nextTitle: byId("next-action-title"),
    nextCopy: byId("next-action-copy"),
    primaryAction: byId("primary-action"),
    aiCard: byId("ai-capability-card"),
    aiLink: byId("ai-link"),
    aiLinkStatus: byId("ai-link-status"),
    continueReview: byId("continue-review"),
    scanPreview: byId("scan-preview"),
    scanTitle: byId("scan-preview-title"),
    scanCopy: byId("scan-preview-copy"),
    selectedFile: byId("selected-file"),
    confirmImage: byId("confirm-image"),
    imagingStatus: byId("imaging-status"),
    clinicalStatus: byId("clinical-status"),
    humanReviewState: byId("human-review-state"),
    clinicalActionTitle: byId("clinical-action-title"),
    clinicalActionCopy: byId("clinical-action-copy"),
    completeReview: byId("complete-review"),
    referralStatus: byId("referral-status"),
    referralNextEyebrow: byId("referral-next-eyebrow"),
    referralActionTitle: byId("referral-action-title"),
    referralActionCopy: byId("referral-action-copy"),
    referralActionButton: byId("referral-action-button"),
    referralActionStep: byId("referral-action-step"),
    referralCreatedStep: byId("referral-created-step"),
    referralCompletedStep: byId("referral-completed-step"),
    followupState: byId("followup-state"),
    outcomeState: byId("outcome-state"),
    monitoringState: byId("monitoring-state"),
    summaryClinicalStatus: byId("summary-clinical-status"),
  };

  function showView(name) {
    const target = byId(`view-${name}`);
    if (!target) return;

    views.forEach((view) => view.classList.toggle("is-hidden", view !== target));
    viewControls.forEach((control) => {
      const active = control.dataset.view === name;
      control.classList.toggle("is-active", active);
      if (control.matches(".side-nav-item")) control.setAttribute("aria-current", active ? "page" : "false");
    });
    if (name !== "journey") target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function announce(message) {
    elements.notice.textContent = message;
    elements.notice.hidden = false;
  }

  function setProgress() {
    timelineItems.forEach((item) => {
      const index = Number(item.dataset.stageIndex);
      item.classList.toggle("is-complete", index < state.step);
      item.classList.toggle("is-current", index === state.step);
      item.classList.toggle("is-pending", index > state.step);
      const node = item.querySelector(".timeline-node");
      if (index < state.step) node.textContent = "✓";
      else node.textContent = String(index + 1).padStart(2, "0");
    });
    elements.progressCount.textContent = `${state.step + 1} / ${stages.length} current`;
  }

  function renderJourney() {
    const stage = stages[state.step];
    const incomplete = [
      "Image acquisition and clinical pathway",
      "Image confirmation and AI capability",
      "Human clinical review and required action",
      "Required healthcare action and referral",
      "Referral completion, follow-up, and outcome",
      "Follow-up and intended outcome",
      "Outcome update and continued monitoring",
      "Continued monitoring",
      "Longitudinal monitoring as needed",
    ][state.step];
    const copy = [
      "A screening finding is present. The next required capability is imaging; the journey must continue beyond the finding.",
      "The fictional image is ready to be confirmed. Completion of acquisition exposes the next required capability; it does not complete care.",
      "Image acquisition is complete. An external AI-assisted capability is available, but opening it does not send the image or complete clinical review.",
      "A human clinical/radiologist review remains required before the next healthcare action is determined.",
      "The illustrative result has been reviewed. MHCS now keeps the required healthcare action visible until the handoff is completed.",
      "Referral created is not referral completed. The required service still needs to happen before follow-up can begin.",
      "The referral is completed. MHCS keeps the follow-up step visible so the pathway returns with a status update.",
      "The follow-up is complete. The intended outcome is now recorded for this fictional demonstration case.",
      "The intended outcome has been reached, and continued monitoring remains visible where continuity of care is needed.",
    ][state.step];
    elements.currentStage.textContent = stage.label;
    elements.nextActionLabel.textContent = stage.next;
    elements.caseStatus.textContent = state.step === stages.length - 1 ? "Monitoring active" : state.step === 0 ? "Action required" : "Journey in progress";
    elements.journeyTitle.textContent = stage.label;
    elements.journeyCopy.textContent = copy;
    elements.metricState.textContent = stage.state;
    elements.metricCapability.textContent = ["Operator / imaging", "Operator / imaging", "External AI Capability — Demo", "Human clinical review", "Referral / specialist service", "Receiving service", "Follow-up channel", "Care team / outcome update", "Monitoring loop"][state.step];
    elements.metricIncomplete.textContent = incomplete;
    elements.nextTitle.textContent = stage.next;
    elements.nextCopy.textContent = [
      "Open the bounded operator task and use a safe demo image or choose a local image file.",
      "Select an image source, then explicitly confirm image acquisition.",
      "Review the external capability when configured, then use the local control to continue to human clinical review.",
      "Simulate a human professional reviewing the illustrative result before a required action is created.",
      "Create the fictional referral so the handoff becomes visible as a separate state.",
      "Explicitly mark the referral completed; creation alone does not mean care happened.",
      "Record follow-up so the outcome can be updated.",
      "Record the intended outcome, then keep the monitoring loop visible.",
      "Use the monitoring view to narrate continued coordination over time.",
    ][state.step];
    elements.journeyChip.textContent = state.step === 8 ? "Monitoring remains active" : state.step === 0 ? "Finding requires action" : "Journey in progress";
    elements.journeyChip.className = `state-chip ${state.step === 8 ? "state-chip-green" : state.step === 0 ? "state-chip-amber" : "state-chip-blue"}`;
    elements.journeyIcon.textContent = state.step === 8 ? "↺" : state.step === 0 ? "!" : "✓";
    elements.journeyIcon.style.background = state.step === 8 ? "var(--green)" : state.step === 0 ? "var(--amber)" : "var(--blue)";
    elements.primaryAction.textContent = `${state.step === 0 ? "Open Imaging Task" : state.step === 1 ? "Open Imaging Task" : state.step === 2 ? "Review AI Capability" : state.step === 3 ? "Open Clinical Review" : "Open Referral & Follow-up"} →`;
    elements.primaryAction.disabled = false;
    elements.summaryClinicalStatus.textContent = state.step < 3 ? "No clinical decision recorded" : state.step < 8 ? "Illustrative review and action path" : "Intended outcome recorded; monitoring active";
    elements.aiCard.classList.toggle("is-hidden", state.step !== 2);
  }

  function renderImaging() {
    const complete = state.step > 1;
    elements.confirmImage.disabled = complete || !state.imageSelected;
    elements.imagingStatus.textContent = complete ? "Imaging acquired / completed" : state.imageSelected ? "Ready to confirm" : "Pending task";
    elements.imagingStatus.className = `state-chip ${complete ? "state-chip-green" : "state-chip-amber"}`;
    elements.scanPreview.classList.toggle("is-ready", state.imageSelected);
    elements.scanTitle.textContent = state.imageSelected ? state.imageLabel : "No image selected";
    elements.scanCopy.textContent = complete ? "Acquisition confirmed · local demo state" : state.imageSelected ? "Ready for explicit acquisition confirmation." : "Use Demo Image for a reliable live presentation.";
    elements.selectedFile.textContent = state.imageSelected ? `Selected source: ${state.imageLabel}` : "No image source selected.";
  }

  function renderClinical() {
    const ready = state.step >= 2;
    const complete = state.step > 3;
    elements.clinicalStatus.textContent = complete ? "Review completed" : ready ? "Review pending" : "Waiting for AI capability";
    elements.clinicalStatus.className = `state-chip ${complete ? "state-chip-green" : "state-chip-blue"}`;
    elements.humanReviewState.textContent = complete ? "Completed for this fictional case" : "Required before action";
    elements.clinicalActionTitle.textContent = complete ? "Human clinical review completed" : "Complete human clinical review";
    elements.clinicalActionCopy.textContent = complete ? "The fictional professional review is recorded. The next required healthcare action remains separate from the result." : ready ? "Use this control to simulate a clinician/radiologist reviewing the illustrative result and determining the required next healthcare action." : "Complete image acquisition and expose the external AI-assisted capability first. Opening an external link does not complete this review.";
    elements.completeReview.disabled = !ready || complete;
  }

  function renderReferral() {
    const actionReady = state.step >= 4;
    const created = state.step >= 5;
    const completed = state.step >= 6;
    elements.referralStatus.textContent = completed ? "Referral completed" : created ? "Referral created" : actionReady ? "Action ready" : "Not yet ready";
    elements.referralStatus.className = `state-chip ${completed ? "state-chip-green" : actionReady ? "state-chip-blue" : "state-chip-amber"}`;
    elements.referralActionStep.classList.toggle("is-complete", actionReady);
    elements.referralActionStep.classList.toggle("is-current", state.step === 4);
    elements.referralCreatedStep.classList.toggle("is-complete", created);
    elements.referralCreatedStep.classList.toggle("is-current", state.step === 5);
    elements.referralCompletedStep.classList.toggle("is-complete", completed);
    elements.referralCompletedStep.classList.toggle("is-current", state.step === 6);
    elements.followupState.textContent = completed ? state.step >= 7 ? "Completed" : "Ready to record" : "Pending referral completion";
    elements.outcomeState.textContent = state.step >= 8 ? "Intended outcome reached" : "Not yet recorded";
    elements.monitoringState.textContent = state.step >= 8 ? "Active continuation loop" : "Will remain visible where needed";

    if (!actionReady) {
      elements.referralNextEyebrow.textContent = "NEXT REQUIRED ACTION";
      elements.referralActionTitle.textContent = "Human review must happen first";
      elements.referralActionCopy.textContent = "The referral action stays unavailable until human clinical review has been completed.";
      elements.referralActionButton.textContent = "Complete Human Review First →";
      elements.referralActionButton.disabled = true;
    } else if (!created) {
      elements.referralNextEyebrow.textContent = "REQUIRED HEALTHCARE ACTION";
      elements.referralActionTitle.textContent = "Create the referral handoff";
      elements.referralActionCopy.textContent = "This creates a visible referral state. It does not automatically imply that the receiving service has completed the required action.";
      elements.referralActionButton.textContent = "Create Referral →";
      elements.referralActionButton.disabled = false;
    } else if (!completed) {
      elements.referralNextEyebrow.textContent = "REFERRAL CREATED · ACTION STILL PENDING";
      elements.referralActionTitle.textContent = "Complete the referral";
      elements.referralActionCopy.textContent = "Move the fictional case from Referral created to Referral completed only when the required service is explicitly recorded as delivered.";
      elements.referralActionButton.textContent = "Mark Referral Completed →";
      elements.referralActionButton.disabled = false;
    } else if (state.step === 6) {
      elements.referralNextEyebrow.textContent = "NEXT REQUIRED ACTION";
      elements.referralActionTitle.textContent = "Complete follow-up";
      elements.referralActionCopy.textContent = "The handoff happened, but MHCS continues to coordinate follow-up and return the result to the pathway.";
      elements.referralActionButton.textContent = "Complete Follow-up →";
      elements.referralActionButton.disabled = false;
    } else if (state.step === 7) {
      elements.referralNextEyebrow.textContent = "OUTCOME UPDATE";
      elements.referralActionTitle.textContent = "Record the intended outcome";
      elements.referralActionCopy.textContent = "The outcome is the point of the journey. Continued monitoring remains visible after it is reached.";
      elements.referralActionButton.textContent = "Record Intended Outcome →";
      elements.referralActionButton.disabled = false;
    } else {
      elements.referralNextEyebrow.textContent = "CONTINUED MONITORING";
      elements.referralActionTitle.textContent = "Monitoring loop remains active";
      elements.referralActionCopy.textContent = "The intended outcome is reached for this fictional case, while MHCS keeps the next monitoring touchpoint visible where needed.";
      elements.referralActionButton.textContent = "Restart Journey ↺";
      elements.referralActionButton.disabled = false;
    }
  }

  function configureAiLink() {
    if (aiUrl) {
      elements.aiLink.href = aiUrl;
      elements.aiLink.classList.remove("is-disabled");
      elements.aiLink.removeAttribute("aria-disabled");
      elements.aiLinkStatus.textContent = "Configured for this deployment · opens by explicit user navigation.";
    } else {
      elements.aiLink.removeAttribute("href");
      elements.aiLink.classList.add("is-disabled");
      elements.aiLink.setAttribute("aria-disabled", "true");
      elements.aiLinkStatus.textContent = "Not configured for local preview; deployment must provide AI_DEMO_URL.";
    }
  }

  function render() {
    setProgress();
    renderJourney();
    renderImaging();
    renderClinical();
    renderReferral();
    configureAiLink();
  }

  function goToNextView() {
    if (state.step <= 1) showView("imaging");
    else if (state.step === 2) elements.aiLink.focus();
    else if (state.step === 3) showView("clinical");
    else showView("referral");
  }

  function resetDemo() {
    state.step = 0;
    state.imageSelected = false;
    state.imageLabel = "";
    state.aiOpened = false;
    byId("image-input").value = "";
    elements.notice.hidden = true;
    showView("journey");
    render();
  }

  viewControls.forEach((control) => control.addEventListener("click", () => showView(control.dataset.view)));
  byId("reset-top").addEventListener("click", resetDemo);
  byId("reset-main").addEventListener("click", resetDemo);
  elements.primaryAction.addEventListener("click", goToNextView);
  byId("image-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    state.imageSelected = true;
    state.imageLabel = file.name || "Local image selected";
    announce("Local image selected. It remains in this browser session until the demo is reset.");
    renderImaging();
  });
  byId("demo-image").addEventListener("click", () => {
    state.imageSelected = true;
    state.imageLabel = "Safe fictional demo image";
    announce("Safe fictional demo image selected. Confirm acquisition to continue the journey.");
    renderImaging();
  });
  elements.confirmImage.addEventListener("click", () => {
    if (!state.imageSelected || state.step > 1) return;
    state.step = 2;
    showView("journey");
    announce("Image acquired / completed. MHCS now exposes the next required external AI-assisted capability; no image was transmitted.");
    render();
  });
  elements.aiLink.addEventListener("click", (event) => {
    if (!aiUrl) {
      event.preventDefault();
      announce("AI demo link is unavailable in this local preview. The deployed demonstrator receives it from AI_DEMO_URL.");
      return;
    }
    state.aiOpened = true;
    elements.aiLinkStatus.textContent = "External capability opened by explicit user navigation; no result was imported automatically.";
  });
  elements.continueReview.addEventListener("click", () => {
    if (state.step !== 2) return;
    state.step = 3;
    showView("clinical");
    announce("Presentation step advanced to Human Clinical Review. This does not imply that MHCS received or verified an external AI result.");
    render();
  });
  elements.completeReview.addEventListener("click", () => {
    if (state.step !== 3) return;
    state.step = 4;
    showView("referral");
    announce("Human clinical review completed for the fictional case. The required healthcare action is now visible.");
    render();
  });
  elements.referralActionButton.addEventListener("click", () => {
    if (state.step < 4) return;
    if (state.step === 4) {
      state.step = 5;
      announce("Referral created. Referral created ≠ Referral completed; the receiving service still needs to act.");
    } else if (state.step === 5) {
      state.step = 6;
      announce("Referral completed. The required service happened; follow-up remains visible.");
    } else if (state.step === 6) {
      state.step = 7;
      announce("Follow-up completed. The fictional outcome can now be updated.");
    } else if (state.step === 7) {
      state.step = 8;
      announce("Intended outcome reached. Continued Monitoring remains active where continuity of care is needed.");
    } else {
      resetDemo();
      return;
    }
    render();
  });

  render();
})();
