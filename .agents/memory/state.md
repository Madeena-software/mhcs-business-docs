<!-- antigravity-code-agent-template:managed -->
# Project Handoff

**Last updated:** 2026-07-23 02:12 WIB
**Last verified:** 2026-07-23 02:12 WIB

## Active goal

Continue the staged MHCS technical-specification audit after the completed
Member Core and Operator Core reviews. The next bounded review is Doctor Core,
including its new image-quality decision and doctor-only repeat handoff.

## Active task

None.

## Selected runtime

Unknown. The next session must reverify its runtime, tools, permissions, and
repository instructions.

## Repository checkpoint

- Root: `/var/www/mhcs-business-docs`
- Branch: `main`
- HEAD and `origin/main`: `1a0174f77216acfa3422b0e0bdf6a0347749c0ba`
- HEAD subject: `Refine operator earning eligibility and clarify responsibilities across services`
- HEAD contains the approved Operator Core rewrite and direct cross-document
  consistency updates.
- Pre-existing dirty state at handoff start: deleted
  `.agents/memory/.gitignore`. It was not restored or otherwise modified.
- This handoff adds `.agents/memory/state.md`; no commit or branch was created.

## Evidence provenance

- Repository instructions: `.agents/AGENTS.md` and
  `.agents/skills/project-handoff/SKILL.md`, read in full on 2026-07-23.
- Verified repository context: `.agents/context/project.md`, last verified by
  that file on 2026-07-22. It records source checkpoints and warns that target
  requirements are not implemented behavior.
- Primary completed specification:
  `docs/technical/mhcs-operator-core/project.md` at HEAD `1a0174f`.
- Directly reconciled documents at the same HEAD:
  `docs/business/01-business-overview.md`,
  `docs/business/03-system-responsibilities.md`,
  `docs/technical/mhcs-member-core/project.md`,
  `docs/technical/mhcs-image-gateway/project.md`, and
  `docs/technical/mpips/project.md`.
- Git evidence: `git branch --show-current`, `git rev-parse HEAD`,
  `git status --short`, `git diff --stat`, `git log -3 --oneline --stat`, and
  `git show --format=fuller --no-patch HEAD`, run on 2026-07-23.
- Standards evidence used during the audit came from official HL7 FHIR R5
  pages for `ImagingStudy`, `Encounter`, Vital Signs `Observation`, and
  `Provenance`; current DICOM pages for Modality Worklist, DX positioning,
  performed-procedure status, and controlled reason codes; and official Docker
  Compose networking documentation. These support interoperability decisions,
  not claims that the application implements them.
- User decisions were obtained one question at a time. This handoff records
  outcomes only and does not transfer conversational approval.

## Completed work

- Member Core's approved identity, booking, points, walk-in, site isolation,
  Docker-network, operator API, and FHIR R5 rules are present in the current
  repository history.
- Operator Core now specifies one operational Operator permission with
  front-desk and examination features, plus one global Administrator
  permission; accounts may hold both.
- Operator Core is the source authority for physical sites and its FHIR
  `Organization`/`Location`; Member Core owns schedules, quotas, bookings,
  prices, points, and orders for synchronized sites.
- Staffing is demand-triggered at five confirmed bookings, supports exactly one
  immutable operator assignment per site shift, and defines alternative-shift
  and refund handling for underfilled or unstaffed shifts.
- Queue ordering, identity verification, optional/mandatory global vital-sign
  handling, walk-ins, overtime completion for accepted members, cash closing,
  versioned projection protocols, session-only NPZ drafts, safe validation,
  idempotent Image Gateway submission, and read-only DICOM viewing are defined.
- Only a doctor may request a diagnostic repeat. Member Core creates a free,
  doctor-only repeat that the member schedules; it consumes booking capacity,
  runs no second AI stage, and preserves the original records.
- Operator earnings are IDR, site/service-specific, and rate-snapshotted at
  examination start. AI and doctor stages are independent. Doctor-stage
  eligibility requires diagnostic-quality acceptance or a verified
  non-operator cause. Automatic payment-gateway payouts, account verification,
  idempotency, callback verification, suspension, and reconciliation are
  specified.
- Operator Core's R5 chain is `ServiceRequest -> Encounter -> ImagingStudy`.
  Its internal queue does not use FHIR `Task`, and the X-ray does not require a
  separate FHIR `Procedure` resource.
- Superseded role, site-ownership, and doctor-queue payment statements were
  reconciled across the directly affected shared documents.

## Current work

Paused after completing and verifying the Operator Core documentation update.
No implementation work is active.

## Decisions

- FHIR R5 `5.0.0` is the sole active interoperability target.
- Each repository uses its own Docker Compose file on one physical computer and
  joins external network `mhcs-internal`; inter-container calls use Docker DNS,
  never `localhost`.
- Operator Core's global administrator owns physical-site master data;
  Member Core consumes stable site references for booking operations.
- Front desk is an Operator Core feature, not a separate role.
- The initial queue has one assigned operator and no multi-operator
  coordination.
- Advance bookings always precede walk-ins; accepted and checked-in members are
  completed even after nominal shift end.
- Draft NPZ files are drag-and-drop, session-only, and discarded on navigation
  or restart after a warning. Only validated Grabber NPZ is accepted.
- Image Gateway durable acceptance, not MPIPS completion, closes the operator
  queue and completes the Encounter.
- Doctor-queue entry no longer makes operator earnings eligible. The doctor
  stage waits for diagnostic-quality acceptance; AI remains a separate stage.
- Operator payouts are automatic through Operator Core's own payment-gateway
  adapter and do not require administrator approval.

## Verification results

- `git diff --check`: passed on 2026-07-23.
- `python3 website/test_site.py`: `Site OK: 5 pages and all local links resolve`.
- `python3 website/bpmn/test_bpmn.py`: `BPMN OK: 5 lanes, 23 nodes, 26 flows`.
- Active-specification scan for FHIR R4, old doctor-queue payment wording,
  separate `Front-desk staff`, and legacy `operational project`: no matches.
- Parent-aware Markdown heading and code-fence scan: passed before the committed
  checkpoint; no unbalanced fences or duplicate headings within a parent.

## Superseded facts

- Separate front-desk and operator roles are superseded by one Operator
  permission with two feature stages.
- A target operational `project` entity is superseded by site, shift, booking,
  queue item, and examination context. Legacy projects remain a current-state
  implementation finding only.
- Member Core as examination-site master is superseded by Operator Core site
  authority and Member Core synchronization.
- Doctor Core dashboard entry as the doctor-only operator-payment trigger is
  superseded by doctor confirmation of diagnostic usability.
- Operator Core ownership of FHIR `Task` and `Procedure` is superseded by the
  approved `ServiceRequest -> Encounter -> ImagingStudy` boundary.

## Unknowns

- Authoritative Grabber NPZ schema, representative files, safe parsing boundary,
  dimensions, and measured upload limits.
- Selected payment gateway and its account-verification, payout, webhook,
  idempotency, reconciliation, fee, and sandbox contracts.
- MHCS FHIR R5 Implementation Guide canonical URL, package ID, version,
  profiles, terminology bindings, examples, and validator fixtures.
- Doctor Core implementation state; the repository was unavailable at the
  evidence checkpoint recorded in `.agents/context/project.md`.
- Image Gateway implementation; the checkout was empty at the same evidence
  checkpoint.
- Exact production OpenAPI schemas and implementation tests for all target
  service contracts.

## Blockers

- The external NPZ, payment-gateway, and FHIR IG artifacts block production
  implementation and conformance claims.
- They do not block the next read-only Doctor Core documentation audit.

## Next action

Re-read `.agents/AGENTS.md`, reverify HEAD and working-tree ownership, then use
the read-only review workflow on
`docs/technical/mhcs-doctor-core/project.md`. Reconcile it against the approved
doctor quality-confirmation, repeat-request, earning-event, and FHIR R5
boundaries. Ask any business clarification one question at a time and do not
edit until the user gives fresh explicit approval.

## Safety check

- No secrets, credentials, personal data, private prompts, hidden reasoning, or
  full transcripts are included.
- No permission, approval, or authority is assumed to transfer to the next
  session.
