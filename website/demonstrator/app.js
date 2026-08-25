(() => {
  const stages = [
    { label: "Screening / Finding", state: "Finding identified", next: "Open imaging task" },
    { label: "Imaging Acquisition", state: "Image acquisition in progress", next: "Confirm image acquisition" },
    { label: "External AI Capability", state: "External capability available", next: "Continue to Doctor (Radiologist) review" },
    { label: "Human Clinical Review", state: "Professional review pending", next: "Complete Human Clinical Review" },
    { label: "Required Healthcare Action", state: "Required healthcare action pending", next: "Create referral" },
    { label: "Referral Created", state: "Referral created — completion pending", next: "Complete referral" },
    { label: "Referral Completed", state: "Referral completed — follow-up pending", next: "Complete follow-up" },
    { label: "Follow-up / Intended Outcome", state: "Outcome update pending", next: "Record intended outcome" },
    { label: "Continued Monitoring", state: "Monitoring loop active", next: "Continue routine monitoring" },
  ];

  const views = [...document.querySelectorAll(".view-panel")];
  const viewControls = [...document.querySelectorAll("[data-view]")];
  const progressItems = [...document.querySelectorAll("[data-progress-stage]")];
  const overviewItems = [...document.querySelectorAll("#overview-timeline [data-stage-index]")];
  const memberItems = [...document.querySelectorAll("[data-member-stage]")];
  const state = { step: 0, imageSelected: false, imageLabel: "", aiOpened: false, taskOpened: false, doctorCaseOpen: false };
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
    operatorExamStatus: byId("operator-exam-status"),
    operatorTaskDetail: byId("operator-task-detail"),
    operatorCompleteCard: byId("operator-complete-card"),
    operatorCompleteCopy: byId("operator-complete-copy"),
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
    doctorEmptyState: byId("doctor-empty-state"),
    doctorCasePanel: byId("doctor-case-panel"),
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
    imageInput: byId("image-input"),
  };

  const viewLabels = {
    member: "Member (Patient)",
    operator: "Operator (Radiographer)",
    doctor: "Doctor (Radiologist)",
    journey: "Journey Overview",
  };

  function showView(name) {
    const target = byId(`view-${name}`);
    if (!target) return;

    views.forEach((view) => view.classList.toggle("is-hidden", view !== target));
    viewControls.forEach((control) => {
      const active = control.dataset.view === name;
      if (control.matches(".actor-tab")) {
        control.classList.toggle("is-active", active);
        control.setAttribute("aria-current", active ? "page" : "false");
      }
    });
    elements.activeWorkspace.textContent = viewLabels[name];
    elements.overviewActiveActor.textContent = viewLabels[name];
  }

  function announce(message) {
    elements.notice.textContent = message;
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
    const content = [
      {
        icon: "!",
        status: "Action required",
        title: "Further examination required",
        copy: "Your health screening is complete. A fictional chest X-ray examination is the next step in this demonstration.",
        next: "Imaging examination",
        action: "View Next Step",
        view: "operator",
        note: "This screen uses fictional information to show how a care journey continues beyond a screening result.",
      },
      {
        icon: "◌",
        status: "Imaging in progress",
        title: "Imaging examination",
        copy: "Your chest X-ray examination is being prepared. The imaging team will confirm the image before clinical review.",
        next: "Complete imaging examination",
        action: "View Imaging Step",
        view: "operator",
        note: "The selected image stays in the demonstration browser session until the demo is reset.",
      },
      {
        icon: "✓",
        status: "Clinical review pending",
        title: "Your examination is being reviewed",
        copy: "Your imaging examination is complete. A Doctor (Radiologist) will review the information next.",
        next: "Clinical review",
        action: "View Clinical Review",
        view: "doctor",
        note: "A supporting capability may assist the care team, but a Doctor (Radiologist) remains responsible for review.",
      },
      {
        icon: "◌",
        status: "Clinical review in progress",
        title: "Your examination is being reviewed",
        copy: "A Doctor (Radiologist) is reviewing your examination. The next care step will be recorded after professional review.",
        next: "Professional review",
        action: "View Clinical Review",
        view: "doctor",
        note: "Professional review is still required before any next care step is created.",
      },
      {
        icon: "→",
        status: "Next care step",
        title: "Referral arranged",
        copy: "A referral has been arranged for the next required service. It is awaiting completion.",
        next: "Referral awaiting completion",
        action: "View Care Progress",
        view: "doctor",
        note: "A referral being arranged does not mean that the required service has already been delivered.",
      },
      {
        icon: "→",
        status: "Referral created",
        title: "Referral arranged",
        copy: "Your referral is recorded and the receiving service still needs to complete the next step.",
        next: "Referral completion",
        action: "View Care Progress",
        view: "doctor",
        note: "The referral remains separate from completion of the required service.",
      },
      {
        icon: "✓",
        status: "Follow-up required",
        title: "Referral completed",
        copy: "The referral has been completed. A follow-up is still needed to keep your care journey moving.",
        next: "Follow-up",
        action: "View Follow-up",
        view: "doctor",
        note: "Your care journey continues after referral completion so the next update is not lost.",
      },
      {
        icon: "✓",
        status: "Follow-up completed",
        title: "Follow-up completed",
        copy: "Your follow-up is complete. The fictional intended outcome can now be recorded.",
        next: "Intended outcome",
        action: "View Outcome",
        view: "doctor",
        note: "This is a fictional status update, not a clinical result or medical recommendation.",
      },
      {
        icon: "↺",
        status: "Continued Monitoring",
        title: "Required care completed",
        copy: "The required care in this demonstration is completed. Continue routine monitoring at the next planned touchpoint.",
        next: "Continue routine monitoring",
        action: "View Journey Overview",
        view: "journey",
        note: "The immediate care step is complete, while continued monitoring remains part of the journey.",
      },
    ][state.step];

    elements.memberStatusIcon.textContent = content.icon;
    elements.memberStatus.textContent = content.status;
    elements.memberStatusTitle.textContent = content.title;
    elements.memberStatusCopy.textContent = content.copy;
    elements.memberNextLabel.textContent = content.next;
    elements.memberNextAction.textContent = `${content.action} →`;
    elements.memberNextAction.dataset.view = content.view;
    elements.memberNoteCopy.textContent = content.note;

    const memberStages = [
      { key: "screening", complete: true, current: state.step === 0, status: "Completed" },
      { key: "imaging", complete: state.step >= 2, current: state.step === 1, status: state.step >= 2 ? "Completed ✓" : state.step === 1 ? "In progress" : "Next step" },
      { key: "review", complete: state.step >= 4, current: state.step === 2 || state.step === 3, status: state.step >= 4 ? "Completed ✓" : state.step === 3 ? "In progress" : state.step === 2 ? "Ready for review" : "Waiting" },
      { key: "referral", complete: state.step >= 6, current: state.step === 4 || state.step === 5, status: state.step >= 6 ? "Completed ✓" : state.step === 5 ? "Created · awaiting completion" : state.step === 4 ? "Next step" : "Not started" },
      { key: "followup", complete: state.step >= 7, current: state.step === 6, status: state.step >= 7 ? "Completed ✓" : state.step === 6 ? "Required next" : "Will be shown here" },
      { key: "outcome", complete: state.step >= 8, current: state.step === 7, status: state.step >= 8 ? "Recorded ✓" : state.step === 7 ? "Ready to record" : "Will be updated here" },
      { key: "monitoring", complete: state.step >= 8, current: state.step === 8, status: state.step >= 8 ? "Active" : "Remains visible" },
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
    elements.operatorTaskSummary.textContent = complete ? "Image acquisition completed" : taskOpened ? "Ready for image source" : "Further examination required";
    elements.operatorTaskStatus.textContent = complete ? "Completed" : taskOpened ? "In progress" : "Waiting";
    elements.operatorTaskStatus.className = `queue-badge ${complete ? "queue-badge-green" : taskOpened ? "queue-badge-blue" : "queue-badge-amber"}`;
    elements.openImagingTask.hidden = taskOpened;
    elements.operatorExamStatus.textContent = complete ? "Completed" : taskOpened ? "In progress" : "Waiting";
    elements.operatorExamStatus.className = `state-chip ${complete ? "state-chip-green" : taskOpened ? "state-chip-blue" : "state-chip-amber"}`;
    elements.operatorTaskDetail.hidden = !taskOpened || complete;
    elements.operatorCompleteCard.hidden = !complete;
    elements.operatorCompleteCopy.textContent = state.step >= 3 ? "The case has been handed to the Doctor (Radiologist) for explicit human clinical review." : "The image is confirmed for this fictional case. The next review step is now available.";
    elements.scanPreview.classList.toggle("is-ready", state.imageSelected);
    elements.scanPreviewTitle.textContent = state.imageSelected ? state.imageLabel : "No image selected";
    elements.scanPreviewCopy.textContent = complete ? "Acquisition confirmed · local demo state" : state.imageSelected ? "Ready for explicit acquisition confirmation." : "Use Demo Image for a reliable presentation.";
    elements.selectedFile.textContent = state.imageSelected ? `Selected source: ${state.imageLabel}` : "No image source selected.";
    elements.confirmImage.disabled = complete || !state.imageSelected || state.step !== 1;
    elements.aiCard.hidden = state.step < 2;
    elements.continueReview.hidden = state.step !== 2;
    if (state.step >= 3) elements.aiCard.querySelector(".ai-copy p").textContent = "The external capability remains illustrative. The case is now with the Doctor (Radiologist) for human clinical review.";
  }

  function renderDoctor() {
    const capabilityAvailable = state.step >= 2;
    const reviewReady = state.step === 3;
    const caseReady = state.step >= 3;
    const caseOpen = caseReady && state.doctorCaseOpen;
    elements.doctorQueueCount.textContent = caseReady ? "01" : "00";
    elements.doctorQueueSummary.textContent = caseReady ? "Imaging available · review required" : "No review case ready yet";
    elements.doctorQueueStatus.textContent = caseReady ? "Ready" : "Waiting";
    elements.doctorQueueStatus.className = `queue-badge ${caseReady ? "queue-badge-green" : "queue-badge-blue"}`;
    elements.openDoctorCase.hidden = !caseReady || caseOpen;
    elements.doctorEmptyState.hidden = caseOpen;
    elements.doctorCasePanel.hidden = !caseOpen;

    const emptyHeading = elements.doctorEmptyState.querySelector("h2");
    const emptyCopy = elements.doctorEmptyState.querySelector("p");
    const emptyEyebrow = elements.doctorEmptyState.querySelector(".eyebrow");
    emptyEyebrow.textContent = caseReady ? "CASE READY" : "NO CASE READY";
    emptyHeading.textContent = caseReady ? "Open the review case" : "Review case not available yet";
    emptyCopy.textContent = caseReady ? "The imaging examination is available. Open the case to perform the explicit professional review." : "Complete image acquisition in the Operator (Radiographer) workspace, then continue to this queue.";

    elements.doctorReviewStatus.textContent = state.step >= 4 ? "Review completed" : "Review required";
    elements.doctorReviewStatus.className = `state-chip ${state.step >= 4 ? "state-chip-green" : "state-chip-blue"}`;
    elements.doctorImagingStatus.textContent = capabilityAvailable ? "Completed ✓" : "Pending";
    elements.doctorSupportStatus.textContent = capabilityAvailable ? "External Demo Capability" : "Not yet available";
    elements.doctorProfessionalStatus.textContent = state.step >= 4 ? "Completed ✓" : "Required";
    elements.doctorActionButton.hidden = !caseOpen || state.step >= 8;

    const actions = {
      3: ["HUMAN CLINICAL REVIEW", "Complete Human Clinical Review", "Use this explicit control to record a fictional professional review. AI-assisted support does not determine the next step by itself."],
      4: ["REQUIRED HEALTHCARE ACTION", "Create Referral", "The professional review is complete. Create the illustrative referral so the required service becomes a separate, visible handoff."],
      5: ["REFERRAL CREATED · SERVICE PENDING", "Complete Referral", "Referral created is not referral completed. Record completion only when the fictional receiving service has happened."],
      6: ["FOLLOW-UP", "Complete Follow-up", "The referral is complete, but the care journey continues. Record the fictional follow-up explicitly."],
      7: ["INTENDED OUTCOME", "Record Intended Outcome", "Record the illustrative intended outcome, then keep Continued Monitoring visible."],
      8: ["CONTINUED MONITORING", "Continued Monitoring", "The required care is complete for this fictional case. Routine monitoring remains visible over time."],
    };
    const action = actions[state.step] || ["NEXT REQUIRED ACTION", "Open the review case", "Open the case when it becomes available after image acquisition."];
    if (reviewReady) elements.doctorActionEyebrow.textContent = "HUMAN CLINICAL REVIEW";
    elements.doctorActionEyebrow.textContent = action[0];
    elements.doctorActionTitle.textContent = action[1];
    elements.doctorActionCopy.textContent = action[2];
    elements.doctorActionButton.textContent = `${action[1]} →`;
  }

  function renderJourney() {
    const current = stages[state.step];
    const copies = [
      "Further examination is required. The next action is visible to the Operator (Radiographer).",
      "The Operator (Radiographer) is preparing the fictional image. Confirmation is still required.",
      "Imaging is complete. An external capability is available as support; a Doctor (Radiologist) must still review the case.",
      "The case is ready for explicit human clinical review by the Doctor (Radiologist).",
      "Professional review is complete. The required healthcare action remains separate from the review result.",
      "Referral created is not referral completed. The receiving service still needs to deliver the required care.",
      "Referral completed. Follow-up remains visible so the care journey can continue.",
      "Follow-up is complete. Record the intended outcome, then keep Continued Monitoring visible.",
      "The intended outcome is reached for this fictional case. Continued Monitoring remains active.",
    ];
    const nextActions = [
      "Open imaging task",
      "Confirm image acquisition",
      "Continue to Doctor (Radiologist) review",
      "Complete Human Clinical Review",
      "Create referral",
      "Complete referral",
      "Complete follow-up",
      "Record intended outcome",
      "Continue routine monitoring",
    ];
    elements.overviewStatus.textContent = state.step === 0 ? "Action required" : state.step === 8 ? "Monitoring active" : "Journey in progress";
    elements.overviewStatus.className = `state-chip ${state.step === 0 ? "state-chip-amber" : state.step === 8 ? "state-chip-green" : "state-chip-blue"}`;
    elements.overviewCurrentIcon.textContent = state.step === 0 ? "!" : state.step === 8 ? "↺" : "✓";
    elements.overviewCurrentTitle.textContent = current.label;
    elements.overviewCurrentCopy.textContent = copies[state.step];
    elements.overviewNextCopy.textContent = `Next: ${current.next}. ${copies[state.step]}`;
    elements.overviewNextAction.textContent = nextActions[state.step];
  }

  function configureAiLink() {
    if (aiUrl) {
      elements.aiLink.href = aiUrl;
      elements.aiLink.classList.remove("is-disabled");
      elements.aiLink.removeAttribute("aria-disabled");
      elements.aiLinkStatus.textContent = "Configured for this deployment · opens only by explicit user navigation.";
    } else {
      elements.aiLink.removeAttribute("href");
      elements.aiLink.classList.add("is-disabled");
      elements.aiLink.setAttribute("aria-disabled", "true");
      elements.aiLinkStatus.textContent = "Not configured for local preview; deployment must provide AI_DEMO_URL.";
    }
  }

  function render() {
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
    state.imageSelected = false;
    state.imageLabel = "";
    state.aiOpened = false;
    state.taskOpened = false;
    state.doctorCaseOpen = false;
    elements.imageInput.value = "";
    elements.notice.hidden = true;
    showView("member");
    render();
  }

  viewControls.forEach((control) => control.addEventListener("click", (event) => {
    if (control.matches("a")) event.preventDefault();
    showView(control.dataset.view);
  }));
  byId("reset-top").addEventListener("click", resetDemo);
  byId("reset-main").addEventListener("click", resetDemo);
  elements.openImagingTask.addEventListener("click", () => {
    if (!beginImagingTask()) return;
    announce("Imaging task opened. Image acquisition is now the current step for the Operator (Radiographer).");
    render();
  });
  elements.imageInput.addEventListener("change", (event) => {
    if (state.step !== 1) return;
    const file = event.target.files[0];
    if (!file) return;
    state.imageSelected = true;
    state.imageLabel = file.name || "Local image selected";
    announce("Local image selected. It remains in this browser session until the demo is reset.");
    render();
  });
  byId("demo-image").addEventListener("click", () => {
    if (state.step !== 1) return;
    state.imageSelected = true;
    state.imageLabel = "Safe fictional demo image";
    announce("Safe fictional demo image selected. Confirm acquisition to continue the journey.");
    render();
  });
  elements.confirmImage.addEventListener("click", () => {
    if (!state.imageSelected || state.step !== 1) return;
    state.step = 2;
    announce("Image acquisition completed. An external AI-assisted capability is now available; no image was transmitted.");
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
    state.doctorCaseOpen = true;
    showView("doctor");
    announce("Presentation step advanced to Doctor (Radiologist) review. This does not imply that an external AI result was received or verified.");
    render();
  });
  elements.openDoctorCase.addEventListener("click", () => {
    if (state.step < 3) return;
    state.doctorCaseOpen = true;
    render();
  });
  elements.doctorActionButton.addEventListener("click", () => {
    if (!state.doctorCaseOpen || state.step < 3 || state.step >= 8) return;
    if (state.step === 3) {
      state.step = 4;
      announce("Human clinical review completed for the fictional case. The required healthcare action is now visible.");
    } else if (state.step === 4) {
      state.step = 5;
      announce("Referral created. Referral created ≠ Referral completed; the receiving service still needs to act.");
    } else if (state.step === 5) {
      state.step = 6;
      announce("Referral completed. The required service happened; follow-up remains visible.");
    } else if (state.step === 6) {
      state.step = 7;
      announce("Follow-up completed. The fictional intended outcome can now be recorded.");
    } else if (state.step === 7) {
      state.step = 8;
      announce("Intended outcome reached. Continued Monitoring remains active where continuity of care is needed.");
    } else {
      return;
    }
    render();
  });

  showView("member");
  render();
})();
