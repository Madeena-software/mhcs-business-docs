(() => {
  const translations = window.MHCS_LOCALES || {};
  let currentLanguage = "id";
  let currentView = "member";
  let currentAnnouncementKey = "";
  const journeyStageKeys = Array.from({ length: 9 }, (_, index) => index);

  const views = [...document.querySelectorAll(".view-panel")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const languageControls = [...document.querySelectorAll("[data-language]")];
  const progressItems = [...document.querySelectorAll("[data-progress-stage]")];
  const overviewItems = [...document.querySelectorAll("#overview-timeline [data-stage-index]")];
  const memberItems = [...document.querySelectorAll("[data-member-stage]")];
  const demoImageLabelKey = "operator.safeDemoImage";
  const localImageLabelKey = "operator.localImage";
  const state = { step: 0, surface: "messaging", imageSelected: false, imageLabel: "", aiOpened: false, taskOpened: false, doctorCaseOpen: false };
  const aiUrl = typeof window.MHCS_DEMO_CONFIG?.aiDemoUrl === "string" ? window.MHCS_DEMO_CONFIG.aiDemoUrl.trim() : "";

  const byId = (id) => document.getElementById(id);
  const elements = {
    notice: byId("demo-notice"),
    activeWorkspace: byId("active-workspace"),
    overviewActiveActor: byId("overview-active-actor"),
    memberStatusIcon: byId("member-status-icon"),
    memberStatus: byId("member-status"),
    memberStatusTitle: byId("member-status-title"),
    memberStatusCopy: byId("member-status-copy"),
    memberNextLabel: byId("member-next-label"),
    memberNextAction: byId("member-next-action"),
    memberOpenResult: byId("member-open-result"),
    memberLayout: document.querySelector(".member-layout"),
    memberNextDetails: byId("member-next-details"),
    memberResultSurface: byId("member-result-surface"),
    memberBackMessaging: byId("member-back-messaging"),
    memberScreeningState: byId("member-screening-state"),
    memberImagingState: byId("member-imaging-state"),
    memberReviewState: byId("member-review-state"),
    memberReferralState: byId("member-referral-state"),
    memberFollowupState: byId("member-followup-state"),
    memberOutcomeState: byId("member-outcome-state"),
    memberMonitoringState: byId("member-monitoring-state"),
    memberNoteCopy: byId("member-note-copy"),
    operatorWaitingCount: byId("operator-waiting-count"),
    operatorActiveCount: byId("operator-active-count"),
    operatorDoneCount: byId("operator-done-count"),
    operatorTaskSummary: byId("operator-task-summary"),
    operatorTaskStatus: byId("operator-task-status"),
    openImagingTask: byId("open-imaging-task"),
    declineWork: byId("decline-work"),
    operatorMessaging: byId("operator-messaging-state"),
    operatorHeader: byId("view-operator").querySelector(".operator-header"),
    operatorLayout: byId("view-operator").querySelector(".operator-layout"),
    operatorOpenWorkspace: byId("operator-open-workspace"),
    operatorDeclineMessage: byId("operator-decline-message"),
    operatorExamStatus: byId("operator-exam-status"),
    operatorTaskDetail: byId("operator-task-detail"),
    operatorCompleteCard: byId("operator-complete-card"),
    operatorCompleteCopy: byId("operator-complete-copy"),
    operatorBackMessaging: byId("operator-back-messaging"),
    scanPreview: byId("scan-preview"),
    scanPreviewTitle: byId("scan-preview-title"),
    scanPreviewCopy: byId("scan-preview-copy"),
    selectedFile: byId("selected-file"),
    confirmImage: byId("confirm-image"),
    aiCard: byId("ai-capability-card"),
    aiLink: byId("ai-link"),
    aiLinkStatus: byId("ai-link-status"),
    continueReview: byId("continue-review"),
    doctorQueueCount: byId("doctor-queue-count"),
    doctorQueueSummary: byId("doctor-queue-summary"),
    doctorQueueStatus: byId("doctor-queue-status"),
    openDoctorCase: byId("open-doctor-case"),
    declineDoctorCase: byId("decline-doctor-case"),
    doctorMessaging: byId("doctor-messaging-state"),
    doctorHeader: byId("view-doctor").querySelector(".doctor-header"),
    doctorLayout: byId("view-doctor").querySelector(".doctor-layout"),
    doctorOpenCaseMessage: byId("doctor-open-case-message"),
    doctorDeclineMessage: byId("doctor-decline-message"),
    doctorEmptyState: byId("doctor-empty-state"),
    doctorCasePanel: byId("doctor-case-panel"),
    doctorBackMessaging: byId("doctor-back-messaging"),
    doctorReviewStatus: byId("doctor-review-status"),
    doctorImagingStatus: byId("doctor-imaging-status"),
    doctorSupportStatus: byId("doctor-support-status"),
    doctorProfessionalStatus: byId("doctor-professional-status"),
    doctorActionEyebrow: byId("doctor-action-eyebrow"),
    doctorActionTitle: byId("doctor-action-title"),
    doctorActionCopy: byId("doctor-action-copy"),
    doctorActionButton: byId("doctor-action-button"),
    overviewStatus: byId("overview-status"),
    overviewCurrentIcon: byId("overview-current-icon"),
    overviewCurrentTitle: byId("overview-current-title"),
    overviewCurrentCopy: byId("overview-current-copy"),
    overviewNextCopy: byId("overview-next-copy"),
    overviewNextAction: byId("overview-next-action"),
    demoProgressionStatus: byId("demo-progression-status"),
    simulateReferralCompletion: byId("simulate-referral-completion"),
    simulateFollowupCompletion: byId("simulate-followup-completion"),
    simulateIntendedOutcome: byId("simulate-intended-outcome"),
    imageInput: byId("image-input"),
  };

  const viewLabelKeys = {
    member: "view.member",
    operator: "view.operator",
    doctor: "view.doctor",
    journey: "view.journey",
  };

  const text = (key) => translations[currentLanguage][key] ?? translations.en[key] ?? key;
  const format = (key, values) => text(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");

  function localize() {
    document.documentElement.lang = currentLanguage;
    document.title = text("shell.pageTitle");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", text("shell.metaDescription"));
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = text(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", text(element.dataset.i18nAriaLabel));
    });
    languageControls.forEach((control) => {
      const active = control.dataset.language === currentLanguage;
      control.classList.toggle("is-active", active);
      control.setAttribute("aria-pressed", String(active));
    });
    elements.activeWorkspace.textContent = text(viewLabelKeys[currentView]);
    elements.overviewActiveActor.textContent = text(viewLabelKeys[currentView]);
    if (currentAnnouncementKey && !elements.notice.hidden) {
      elements.notice.textContent = text(currentAnnouncementKey);
    }
  }

  function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    render();
  }

  function showView(name) {
    const target = byId(`view-${name}`);
    if (!target) return;

    currentView = name;
    if (["member", "operator", "doctor"].includes(name)) setSurface("messaging");
    views.forEach((view) => view.classList.toggle("is-hidden", view !== target));
    viewControls.forEach((control) => {
      const active = control.dataset.view === name;
      if (control.matches(".actor-tab")) {
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-current", active ? "page" : "false");
      }
    });
    elements.activeWorkspace.textContent = text(viewLabelKeys[name]);
    elements.overviewActiveActor.textContent = text(viewLabelKeys[name]);
  }

  function setSurface(surface) {
    state.surface = surface;
    document.querySelectorAll("[data-surface-state]").forEach((element) => {
      element.hidden = element.dataset.surfaceState !== surface;
    });
  }

  function announce(key) {
    currentAnnouncementKey = key;
    elements.notice.textContent = text(key);
    elements.notice.hidden = false;
  }

  function setProgress() {
    const progressStates = [
      { complete: true, current: state.step === 0 },
      { complete: state.step >= 2, current: state.step === 1 },
      { complete: state.step >= 4, current: state.step === 2 || state.step === 3 },
      { complete: state.step >= 6, current: state.step === 4 || state.step === 5 },
      { complete: state.step >= 8, current: state.step === 6 || state.step === 7 },
      { complete: state.step >= 8, current: state.step === 8 },
    ];

    progressItems.forEach((item, index) => {
      const status = progressStates[index];
      item.classList.toggle("is-complete", status.complete);
      item.classList.toggle("is-current", status.current);
      item.classList.toggle("is-pending", !status.complete && !status.current);
      item.querySelector(".progress-node").textContent = status.complete ? "✓" : String(index + 2).padStart(2, "0");
    });

    overviewItems.forEach((item) => {
      const index = Number(item.dataset.stageIndex);
      item.classList.toggle("is-complete", index < state.step);
      item.classList.toggle("is-current", index === state.step);
      item.classList.toggle("is-pending", index > state.step);
      item.querySelector("span").textContent = index < state.step ? "✓" : index === 8 ? "↺" : String(index + 1).padStart(2, "0");
    });
  }

  function renderMember() {
    const content = {
      icon: ["!", "◌", "✓", "◌", "→", "→", "✓", "✓", "↺"][state.step],
      status: text(`member.state.${state.step}.status`),
      title: text(`member.state.${state.step}.title`),
      copy: text(`member.state.${state.step}.copy`),
      next: text(`member.state.${state.step}.next`),
      actor: text(`member.state.${state.step}.actor`),
      note: text(`member.state.${state.step}.note`),
    };

    elements.memberStatusIcon.textContent = content.icon;
    elements.memberStatus.textContent = content.status;
    elements.memberStatusTitle.textContent = content.title;
    elements.memberStatusCopy.textContent = content.copy;
    elements.memberNextLabel.textContent = content.next;
    elements.memberNextAction.querySelector("[data-i18n]").textContent = text("member.viewPatientUpdate");
    elements.memberNextDetails.textContent = format("member.nextDetails", { actor: content.actor, note: content.note });
    elements.memberNoteCopy.textContent = content.note;
    elements.memberOpenResult.hidden = state.step < 2;
    elements.memberLayout.hidden = state.surface === "result";
    elements.memberResultSurface.hidden = state.surface !== "result";

    const memberStages = [
      { key: "screening", complete: true, current: state.step === 0, status: text("member.status.completed") },
      { key: "imaging", complete: state.step >= 2, current: state.step === 1, status: state.step >= 2 ? `${text("member.status.completed")} ✓` : state.step === 1 ? text("member.status.inProgress") : text("member.status.nextStep") },
      { key: "review", complete: state.step >= 4, current: state.step === 2 || state.step === 3, status: state.step >= 4 ? `${text("member.status.completed")} ✓` : state.step === 3 ? text("member.status.inProgress") : state.step === 2 ? text("member.status.readyReview") : text("member.status.waiting") },
      { key: "referral", complete: state.step >= 6, current: state.step === 4 || state.step === 5, status: state.step >= 6 ? `${text("member.status.completed")} ✓` : state.step === 5 ? text("member.status.createdAwaitingCompletion") : state.step === 4 ? text("member.status.nextStep") : text("member.status.notStarted") },
      { key: "followup", complete: state.step >= 7, current: state.step === 6, status: state.step >= 7 ? `${text("member.status.completed")} ✓` : state.step === 6 ? text("member.status.requiredNext") : text("member.status.willBeShown") },
      { key: "outcome", complete: state.step >= 8, current: state.step === 7, status: state.step >= 8 ? `${text("member.status.recorded")} ✓` : state.step === 7 ? text("member.status.readyToRecord") : text("member.status.willBeUpdated") },
      { key: "monitoring", complete: state.step >= 8, current: state.step === 8, status: state.step >= 8 ? text("member.status.active") : text("member.status.remainsVisible") },
    ];
    memberStages.forEach((stage) => {
      const item = memberItems.find((candidate) => candidate.dataset.memberStage === stage.key);
      item.classList.toggle("is-complete", stage.complete);
      item.classList.toggle("is-current", stage.current);
      item.classList.toggle("is-pending", !stage.complete && !stage.current);
      item.querySelector(".member-step-node").textContent = stage.complete ? "✓" : stage.key === "monitoring" ? "↺" : String(memberStages.indexOf(stage) + 1).padStart(2, "0");
      byId(`member-${stage.key === "screening" ? "screening" : stage.key}-state`).textContent = stage.status;
    });
  }

  function renderOperator() {
    const taskOpened = state.step >= 1 || state.taskOpened;
    const complete = state.step >= 2;
    elements.operatorWaitingCount.textContent = state.step === 0 ? "01" : "00";
    elements.operatorActiveCount.textContent = state.step === 1 ? "01" : "00";
    elements.operatorDoneCount.textContent = complete ? "01" : "00";
    elements.operatorTaskSummary.textContent = text(complete ? "operator.taskSummary.completed" : taskOpened ? "operator.taskSummary.ready" : "operator.taskSummary.waiting");
    elements.operatorTaskStatus.textContent = text(complete ? "operator.status.completed" : taskOpened ? "operator.status.inProgress" : "operator.status.waiting");
    elements.operatorTaskStatus.className = `queue-badge ${complete ? "queue-badge-green" : taskOpened ? "queue-badge-blue" : "queue-badge-amber"}`;
    elements.openImagingTask.hidden = taskOpened;
    elements.operatorExamStatus.textContent = text(complete ? "operator.status.completed" : taskOpened ? "operator.status.inProgress" : "operator.status.waiting");
    elements.operatorExamStatus.className = `state-chip ${complete ? "state-chip-green" : taskOpened ? "state-chip-blue" : "state-chip-amber"}`;
    elements.operatorTaskDetail.hidden = !taskOpened || complete;
    elements.operatorCompleteCard.hidden = !complete;
    elements.operatorCompleteCopy.textContent = text(state.step >= 3 ? "operator.completeAfterHandoffCopy" : "operator.completeInitialCopy");
    elements.scanPreview.classList.toggle("is-ready", state.imageSelected);
    const imageLabel = state.imageLabel === demoImageLabelKey || state.imageLabel === localImageLabelKey
      ? text(state.imageLabel)
      : state.imageLabel;
    elements.scanPreviewTitle.textContent = state.imageSelected ? imageLabel : text("operator.noImageSelected");
    elements.scanPreviewCopy.textContent = text(complete ? "operator.preview.confirmed" : state.imageSelected ? "operator.preview.ready" : "operator.preview.useDemo");
    elements.selectedFile.textContent = state.imageSelected ? format("operator.selectedSource", { source: imageLabel }) : text("operator.noImageSourceSelected");
    elements.confirmImage.disabled = complete || !state.imageSelected || state.step !== 1;
    elements.aiCard.hidden = state.step < 2;
    elements.continueReview.hidden = state.step !== 2;
    if (state.step >= 3) elements.aiCard.querySelector(".ai-copy p").textContent = text("operator.externalCapabilityAfterReview");
    elements.operatorBackMessaging.hidden = state.surface !== "site";
    elements.operatorMessaging.hidden = state.surface === "site";
    elements.operatorHeader.hidden = state.surface !== "site";
    elements.operatorLayout.hidden = state.surface !== "site";
  }

  function renderDoctor() {
    const capabilityAvailable = state.step >= 2;
    const reviewReady = state.step === 3;
    const caseReady = state.step >= 3;
    const caseOpen = caseReady && state.doctorCaseOpen;
    const queueState = state.step < 3
      ? { count: "00", summary: text("doctor.queue.noCase.summary"), status: text("doctor.queue.noCase.status"), badge: "queue-badge-blue" }
      : state.step === 3
        ? { count: "01", summary: text("doctor.queue.ready.summary"), status: text("doctor.queue.ready.status"), badge: "queue-badge-green" }
        : state.step === 4
          ? { count: "00", summary: text("doctor.queue.reviewed.summary"), status: text("doctor.queue.reviewed.status"), badge: "queue-badge-blue" }
          : state.step >= 5
            ? { count: "00", summary: text("doctor.queue.completed.summary"), status: text("doctor.queue.completed.status"), badge: "queue-badge-green" }
            : { count: "00", summary: text("doctor.queue.noCase.summary"), status: text("doctor.queue.noCase.status"), badge: "queue-badge-blue" };
    elements.doctorQueueCount.textContent = queueState.count;
    elements.doctorQueueSummary.textContent = queueState.summary;
    elements.doctorQueueStatus.textContent = queueState.status;
    elements.doctorQueueStatus.className = `queue-badge ${queueState.badge}`;
    elements.openDoctorCase.hidden = !caseReady || caseOpen;
    elements.declineDoctorCase.hidden = !caseReady || caseOpen;
    elements.doctorEmptyState.hidden = caseOpen;
    elements.doctorCasePanel.hidden = !caseOpen;

    const emptyHeading = elements.doctorEmptyState.querySelector("h2");
    const emptyCopy = elements.doctorEmptyState.querySelector("p");
    const emptyEyebrow = elements.doctorEmptyState.querySelector(".eyebrow");
    emptyEyebrow.textContent = text(reviewReady ? "doctor.empty.ready.eyebrow" : caseReady ? "doctor.empty.complete.eyebrow" : "doctor.empty.none.eyebrow");
    emptyHeading.textContent = text(reviewReady ? "doctor.empty.ready.title" : caseReady ? "doctor.empty.complete.title" : "doctor.empty.none.title");
    emptyCopy.textContent = text(reviewReady ? "doctor.empty.ready.copy" : caseReady ? "doctor.empty.complete.copy" : "doctor.empty.none.copy");

    elements.doctorReviewStatus.textContent = text(state.step >= 4 ? "doctor.reviewStatus.completed" : "doctor.reviewStatus.required");
    elements.doctorReviewStatus.className = `state-chip ${state.step >= 4 ? "state-chip-green" : "state-chip-blue"}`;
    elements.doctorImagingStatus.textContent = text(capabilityAvailable ? "doctor.imagingStatus.completed" : "doctor.imagingStatus.pending");
    elements.doctorSupportStatus.textContent = text(capabilityAvailable ? "doctor.supportStatus.available" : "doctor.supportStatus.unavailable");
    elements.doctorProfessionalStatus.textContent = text(state.step >= 4 ? "doctor.professionalStatus.completed" : "doctor.professionalStatus.required");
    elements.doctorActionButton.hidden = !caseOpen || (!reviewReady && state.step !== 4) || state.step >= 5;

    const actions = {
      3: ["doctor.action.review.eyebrow", "doctor.action.review.title", "doctor.action.review.copy"],
      4: ["doctor.action.referral.eyebrow", "doctor.action.referral.title", "doctor.action.referral.copy"],
    };
    const actionKeys = state.step >= 5
      ? ["doctor.action.created.eyebrow", "doctor.action.created.title", "doctor.action.created.copy"]
      : actions[state.step] || ["doctor.action.next.eyebrow", "doctor.action.next.title", "doctor.action.next.copy"];
    const action = actionKeys.map(text);
    elements.doctorActionEyebrow.textContent = action[0];
    elements.doctorActionTitle.textContent = action[1];
    elements.doctorActionCopy.textContent = action[2];
    elements.doctorActionButton.textContent = `${action[1]} →`;
    elements.doctorBackMessaging.hidden = state.surface !== "clinical";
    elements.doctorMessaging.hidden = state.surface === "clinical";
    elements.doctorHeader.hidden = state.surface !== "clinical";
    elements.doctorLayout.hidden = state.surface !== "clinical";
  }

  function renderJourney() {
    const current = {
      label: text(`journey.stage.${state.step}.label`),
      state: text(`journey.stage.${state.step}.state`),
      next: text(`journey.stage.${state.step}.next`),
    };
    const copy = text(`journey.copy.${state.step}`);
    const nextActions = journeyStageKeys.map((index) => text(`journey.stage.${index}.next`));
    elements.overviewStatus.textContent = text(state.step === 0 ? "journey.status.actionRequired" : state.step === 8 ? "journey.status.monitoringActive" : "journey.status.inProgress");
    elements.overviewStatus.className = `state-chip ${state.step === 0 ? "state-chip-amber" : state.step === 8 ? "state-chip-green" : "state-chip-blue"}`;
    elements.overviewCurrentIcon.textContent = state.step === 0 ? "!" : state.step === 8 ? "↺" : "✓";
    elements.overviewCurrentTitle.textContent = current.label;
    elements.overviewCurrentCopy.textContent = copy;
    elements.overviewNextCopy.textContent = `${text("journey.nextPrefix")} ${current.next}. ${copy}`;
    elements.overviewNextAction.textContent = nextActions[state.step];
    elements.demoProgressionStatus.textContent = text(`journey.progression.${state.step}`);
    elements.simulateReferralCompletion.hidden = state.step !== 5;
    elements.simulateFollowupCompletion.hidden = state.step !== 6;
    elements.simulateIntendedOutcome.hidden = state.step !== 7;
  }

  function configureAiLink() {
    if (aiUrl) {
      elements.aiLink.href = aiUrl;
      elements.aiLink.classList.remove("is-disabled");
      elements.aiLink.removeAttribute("aria-disabled");
      elements.aiLinkStatus.textContent = text(state.aiOpened ? "operator.aiStatus.opened" : "operator.aiStatus.configured");
    } else {
      elements.aiLink.removeAttribute("href");
      elements.aiLink.classList.add("is-disabled");
      elements.aiLink.setAttribute("aria-disabled", "true");
      elements.aiLinkStatus.textContent = text("operator.aiStatus.notConfigured");
    }
  }

  function render() {
    localize();
    setProgress();
    renderMember();
    renderOperator();
    renderDoctor();
    renderJourney();
    configureAiLink();
  }

  function beginImagingTask() {
    if (state.step !== 0) return false;
    state.step = 1;
    state.taskOpened = true;
    return true;
  }

  function resetDemo() {
    state.step = 0;
    state.surface = "messaging";
    state.imageSelected = false;
    state.imageLabel = "";
    state.aiOpened = false;
    state.taskOpened = false;
    state.doctorCaseOpen = false;
    elements.imageInput.value = "";
    currentAnnouncementKey = "";
    elements.notice.hidden = true;
    elements.memberNextDetails.hidden = true;
    elements.memberNextAction.setAttribute("aria-expanded", "false");
    showView("member");
    setSurface("messaging");
    render();
  }

  elements.memberNextAction.addEventListener("click", () => {
    const expanded = elements.memberNextDetails.hidden;
    elements.memberNextDetails.hidden = !expanded;
    elements.memberNextAction.setAttribute("aria-expanded", String(expanded));
  });
  byId("member-open-result")?.addEventListener("click", () => { setSurface("result"); render(); });
  elements.memberBackMessaging.addEventListener("click", () => { setSurface("messaging"); render(); });
  viewControls.forEach((control) => control.addEventListener("click", (event) => {
    if (control.matches("a")) event.preventDefault();
    showView(control.dataset.view);
  }));
  languageControls.forEach((control) => control.addEventListener("click", () => setLanguage(control.dataset.language)));
  byId("reset-top").addEventListener("click", resetDemo);
  byId("reset-main").addEventListener("click", resetDemo);
  elements.openImagingTask.addEventListener("click", () => {
    if (!beginImagingTask()) return;
    announce("announcement.imagingOpened");
    setSurface("site");
    render();
  });
  elements.declineWork.addEventListener("click", () => announce("announcement.workDeclined"));
  elements.operatorOpenWorkspace.addEventListener("click", () => elements.openImagingTask.click());
  elements.operatorDeclineMessage.addEventListener("click", () => announce("announcement.workDeclined"));
  elements.operatorBackMessaging.addEventListener("click", () => { setSurface("messaging"); render(); });
  elements.imageInput.addEventListener("change", (event) => {
    if (state.step !== 1) return;
    const file = event.target.files[0];
    if (!file) return;
    state.imageSelected = true;
    state.imageLabel = file.name || localImageLabelKey;
    announce("announcement.localImageSelected");
    render();
  });
  byId("demo-image").addEventListener("click", () => {
    if (state.step !== 1) return;
    state.imageSelected = true;
    state.imageLabel = demoImageLabelKey;
    announce("announcement.demoImageSelected");
    render();
  });
  elements.confirmImage.addEventListener("click", () => {
    if (!state.imageSelected || state.step !== 1) return;
    state.step = 2;
    announce("announcement.imageCompleted");
    render();
  });
  elements.aiLink.addEventListener("click", (event) => {
    if (!aiUrl) {
      event.preventDefault();
      announce("announcement.aiUnavailable");
      return;
    }
    state.aiOpened = true;
    elements.aiLinkStatus.textContent = text("operator.aiStatus.opened");
  });
  elements.continueReview.addEventListener("click", () => {
    if (state.step !== 2) return;
    state.step = 3;
    state.doctorCaseOpen = false;
    showView("doctor");
    setSurface("messaging");
    announce("announcement.doctorReview");
    render();
  });
  elements.openDoctorCase.addEventListener("click", () => {
    if (state.step < 3) return;
    state.doctorCaseOpen = true;
    setSurface("clinical");
    render();
  });
  elements.declineDoctorCase.addEventListener("click", () => announce("announcement.caseDeclined"));
  elements.doctorOpenCaseMessage.addEventListener("click", () => elements.openDoctorCase.click());
  elements.doctorDeclineMessage.addEventListener("click", () => announce("announcement.caseDeclined"));
  elements.doctorBackMessaging.addEventListener("click", () => { setSurface("messaging"); render(); });
  elements.doctorActionButton.addEventListener("click", () => {
    if (!state.doctorCaseOpen || state.step < 3 || state.step >= 5) return;
    if (state.step === 3) {
      state.step = 4;
      announce("announcement.reviewCompleted");
    } else if (state.step === 4) {
      state.step = 5;
      announce("announcement.referralCreated");
    } else {
      return;
    }
    render();
  });

  elements.simulateReferralCompletion.addEventListener("click", () => {
    if (state.step !== 5) return;
    state.step = 6;
    announce("announcement.referralCompleted");
    render();
  });
  elements.simulateFollowupCompletion.addEventListener("click", () => {
    if (state.step !== 6) return;
    state.step = 7;
    announce("announcement.followupCompleted");
    render();
  });
  elements.simulateIntendedOutcome.addEventListener("click", () => {
    if (state.step !== 7) return;
    state.step = 8;
    announce("announcement.outcomeCompleted");
    render();
  });

  showView("member");
  setSurface("messaging");
  render();
})();
