---
title: MHCS Product-Model Reset Umbrella Task
document_id: AGENT-TASK-MHCS-RESET-001
version: 1.0
status: draft
language: en-US
last_updated: 2026-08-29
scope:
  - MHCS business and technical authority reset
  - WhatsApp-only member channel reframing
  - permission-based operator authorization with MVP/beta compatibility
  - multi-specialty doctor access model
  - unified administration panel definition
  - cross-document authority reconciliation
authority_note: This task is a Draft delivery contract. It defines the bounded implementation scope for the coordinated revision of MHCS business and technical authority. It does not authorize application-code changes, deployment, or release.
---

# Executable Task

This file defines a bounded software-delivery contract for implementation.

A validated task MUST provide enough authority, scope, acceptance, verification, and stop-condition information for an Executor to proceed without inventing material product, requirement, architecture, scope, or approval decisions.

A task is not a generic coding recipe. Implementation technique remains the Executor's responsibility within the constraints established here.

## Task identity

**Task title:**  
MHCS Product-Model Reset Umbrella Documentation Revision

**Task path:**  
`.agents/tasks/mhcs-product-model-reset.md`

**Task contract state:**  
`Draft`

The task file is the executable delivery contract.

Execution and review lifecycle states such as `In Execution`, `Review Required`, `Remediation Required`, and `Accepted` SHOULD normally be tracked by orchestration, review records, repository metadata, or another mechanism that preserves the exact governing task revision.

A lifecycle-status update MUST NOT silently replace the immutable task revision that governed an execution attempt.

When remediation materially changes this executable contract, edit the same stable task path, return it to Draft as needed, and republish it as a new immutable governing task revision before renewed execution.

**Delivery objective / Work Package / MVP:**  
MHCS Product-Model Reset / WP-DOC-RESET-001

**Owner / designated planning authority:**  
Designated MHCS Product Authority / Repository Planner

## Delivery context

The MHCS teleradiology platform is undergoing a product-model reset based on approved human product direction. The target product model introduces five fundamental shifts:

1. **Member experience is WhatsApp-only:** Members interact exclusively via WhatsApp. All prior assumptions regarding an authenticated Member web portal, native mobile apps (Android/iOS), desktop applications, and username/password credentials are eliminated. The internal Member domain remains necessary for healthcare identity (MRN), booking, payment/financial records, subject-of-care relationships, notifications, and result-delivery orchestration.
2. **Permission-based Operator authorization with MVP/beta compatibility:** The operator model transitions from an undifferentiated station-label model to three independently assignable operational permissions: `TU / Registration`, `Nakes Pemeriksaan Dasar`, and `Radiografi`. Staff may hold any combination of these permissions. Station selection cannot elevate permissions. For transitional compatibility, existing MVP/beta Operator accounts temporarily retain all three permissions, while newly provisioned staff accounts require explicit administrator selection of permissions.
3. **Multi-specialty Doctor access:** The doctor-facing web application covers radiologists and appropriately authorized non-radiologist specialists, distinguishing shared foundations from specialty/service authorizations, modality eligibility, and clinical workflow variations without duplicating or copying Operator examination workflows.
4. **Unified Administration panel:** System administration is unified into one administrator-facing web panel without creating a new monolithic "Admin" business domain. Admin acts as a presentation/role surface over domain-owned operations (Member, Operator, Doctor, Image Gateway).
5. **Preserved architecture invariants:** The existing modular `mhcs-core` Laravel backend, separate MPIPS conversion runtime boundary, Image Gateway durable storage/orchestration ownership, NPZ-to-DICOM conversion flow, mature Operator examination-day queue/LCD workflows, domain-owned data, local commands/events, and FHIR R5 external interoperability boundaries are strictly preserved.

This umbrella documentation task exists to audit, update, and reconcile all cross-system business and technical authority documents in `Madeena-software/mhcs-business-docs` so that downstream application repositories (`mhcs-core`, `mpips`) receive an unambiguous, consistent, and non-contradictory specification baseline.

## Baseline and task revision

**Implementation baseline:**  
`cfe5d523b82da7af5557711c90d50f6173f4c531`

**Task revision:**  
`resolved when published`

`resolved when published` is a Draft placeholder. It is not sufficient for T5.

Before this task is treated as `Validated/Published` or handed to an Executor, the exact immutable governing task revision MUST be resolvable.

For Git repositories, the preferred published task identity is:

```text
.agents/tasks/mhcs-product-model-reset.md @ <full Git commit SHA containing the governing task content>
```

The immutable revision MAY be supplied externally by version-control history, publication metadata, Planner handoff, runtime metadata, or another repository-approved immutable content-identity mechanism. The task body does not need to embed the commit SHA that contains itself.

If establishing the immutable published task revision requires an otherwise unauthorized commit, publication, or other side effect, stop for the applicable authorization. Do not claim the task is Validated/Published while its governing revision remains unresolved.

The implementation baseline and governing task revision are separate references.

Do not change the implementation baseline silently during execution.

If parallel or intervening repository changes require reconciliation, return the issue to planning or follow explicit repository policy.

## Objective

**Objective:**  
Reframe MHCS business and technical authority around a WhatsApp-only Member channel, permission-based examination operations with MVP/beta compatibility, multi-specialty Doctor access, and one unified Admin surface, while preserving the established modular backend and mature Operator workflow where compatible.

## Authoritative inputs

### Governing authority

- **Human-Approved Product Direction (2026-08-29):**
  - *Decision 1 (Member Experience):* WhatsApp-only member interaction channel; removal of Member web portal, mobile apps, desktop apps, and member username/password credentials; preservation of internal Member domain (MRN, booking, payment, notifications, result delivery, subject-of-care relations); conceptual separation of Requester/contact, Payer, Subject of care, Guardian, and Result recipient; booking code is a reservation locator, not sufficient identity proof; official identity verified on-site before clinical check-in; no sensitive identity evidence (KTP/KIA/KK) collected via ordinary WhatsApp chat; open integration details remain explicit.
  - *Decision 2 (Operator Experience):* Three independent operational permissions (`TU / Registration`, `Nakes Pemeriksaan Dasar`, `Radiografi`); staff account may hold 1, 2, or all 3 permissions; station selection routes work but cannot grant unheld permissions; MVP/beta transitional compatibility: existing Operator accounts temporarily retain access to all 3 operational areas; new staff provisioning requires administrator-selected permissions; no immediate forced migration of existing beta accounts.
  - *Decision 3 (Doctor Experience):* Distinct doctor-facing web application; target population includes radiologists and authorized non-radiologist specialists; shared foundations with explicit specialty/service authorization and modality eligibility; clinical workflow differences distinguished; no copying of Operator examination workflow.
  - *Decision 4 (Administration Experience):* One unified administrator-facing panel; Admin is a role/presentation surface over domain-owned operations, not a new monolithic business domain; domain ownership strictly preserved (Member, Operator, Doctor, Image Gateway).
  - *Decision 5 (Preserved Architecture):* Single modular `mhcs-core` application; separate MPIPS trust/runtime boundary; Image Gateway ownership of durable imaging/processing orchestration; NPZ → DICOM conversion boundary; existing mature Operator examination-day flow (FIFO queues, LCD displays, paper consent confirmation, basic examination, Grabber review, atomic claims); module-owned data; local commands/queries/transactions and durable domain events; staff authentication foundation; FHIR R5 external interoperability boundary.
- **Repository AI Delivery Contract:** `.agents/AGENTS.md` (document_id: AGENTS-CONTRACT-001)
- **Runtime-Neutral Software Delivery Protocol:** `.agents/software-workflow.md` (document_id: SD-PROTOCOL-001)
- **Repository Project Context:** `.agents/context/project.md`
- **Active Specification Documents:**
  - `docs/business/01-business-overview.md`
  - `docs/business/02-system-responsibilities.md`
  - `docs/technical/mhcs-core/project.md`
  - `docs/technical/mhcs-core/modules/member/project.md`
  - `docs/technical/mhcs-core/modules/operator/project.md`
  - `docs/technical/mhcs-core/modules/doctor/project.md`
  - `docs/technical/mhcs-core/modules/image-gateway/project.md`
  - `docs/technical/mpips/project.md`
  - `docs/technical/mhcs-core/ui-language.md`

### Requirement traceability

- `PD-MEM-001` (WhatsApp-Only Member Channel) → Human-Approved Product Direction §1
- `PD-MEM-002` (Removal of Member Portal/Credentials & Preservation of Member Domain) → Human-Approved Product Direction §1, `docs/business/01-business-overview.md`, `docs/technical/mhcs-core/modules/member/project.md`
- `PD-MEM-003` (Requester / Payer / Subject of Care / Guardian / Recipient Separation) → Human-Approved Product Direction §1
- `PD-MEM-004` (Booking Code vs. On-Site Official Identity Verification) → Human-Approved Product Direction §1, `docs/business/01-business-overview.md`
- `PD-MEM-005` (WhatsApp Chat Privacy & Sensitive Document Collection Boundary) → Human-Approved Product Direction §1
- `PD-OPR-001` (Three Independent Operator Permissions: TU, Nakes, Radiografi) → Human-Approved Product Direction §2, `docs/technical/mhcs-core/modules/operator/project.md`
- `PD-OPR-002` (Multi-Permission Account Assignment & Station Non-Elevation) → Human-Approved Product Direction §2
- `PD-OPR-003` (MVP/Beta Transitional Compatibility for Existing Operator Accounts) → Human-Approved Product Direction §2
- `PD-OPR-004` (New Permission-Aware Staff Account Provisioning) → Human-Approved Product Direction §2
- `PD-OPR-005` (Preservation of Mature Examination-Day Workflow) → Human-Approved Product Direction §2, §5
- `PD-DOC-001` (Multi-Specialty Doctor Access: Radiologists & Non-Radiologist Specialists) → Human-Approved Product Direction §3, `docs/technical/mhcs-core/modules/doctor/project.md`
- `PD-DOC-002` (Shared Doctor Foundations vs. Specialty Authorization & Modality Eligibility) → Human-Approved Product Direction §3
- `PD-DOC-003` (Clinical Workflow Differentiation vs. Operator Workflow Boundary) → Human-Approved Product Direction §3
- `PD-ADM-001` (Unified Administrator-Facing Web Panel) → Human-Approved Product Direction §4, `docs/technical/mhcs-core/project.md`
- `PD-ADM-002` (Admin as Role/Presentation Surface, Not a Monolithic Business Domain) → Human-Approved Product Direction §4
- `PD-ADM-003` (Strict Preservation of Domain Data and Operation Ownership) → Human-Approved Product Direction §4, `docs/business/02-system-responsibilities.md`
- `PD-ARC-001` (Preservation of Single Modular `mhcs-core` Architecture) → Human-Approved Product Direction §5, `docs/technical/mhcs-core/project.md`
- `PD-ARC-002` (Preservation of MPIPS Trust/Runtime Boundary & Image Gateway Ownership) → Human-Approved Product Direction §5, `docs/technical/mpips/project.md`, `docs/technical/mhcs-core/modules/image-gateway/project.md`
- `PD-ARC-003` (Preservation of FHIR R5 Interoperability Boundary) → Human-Approved Product Direction §5, `docs/business/02-system-responsibilities.md`

## Scope

### In scope

The Executor MUST revise and reconcile the following core authority documents within this single umbrella execution:

1. **`docs/business/01-business-overview.md`:**
   - Update end-to-end service flow and actor journeys to reflect WhatsApp-only member interactions.
   - Remove references to authenticated Member Portal, member username/password login, self-service web portals, and native mobile apps.
   - Reframe member-facing result access from portal views to WhatsApp-coordinated result delivery / on-site printouts.
   - Replace single-permission interchangeable operator model with three independent operational permissions (`TU / Registration`, `Nakes Pemeriksaan Dasar`, `Radiografi`).
   - Define MVP/beta transitional compatibility for existing operator accounts.
   - Expand Doctor role and journey to include radiologists and authorized non-radiologist specialists, noting specialty-specific workflow differences.
   - Reframe MHCS administrator into unified administration panel operations over domain-owned capabilities.
   - Reconcile Madeena Points assumptions: audit current wallet/points references, reflect direct payment / unbundled payment triggers, and mark unresolved commercial policies explicitly.
   - Update glossary, access maps, and payment trigger tables.

2. **`docs/business/02-system-responsibilities.md`:**
   - Update Member Core responsibility map: retain MRN, healthcare identity, booking, requester/subject-of-care relations, notifications, and result orchestration while removing portal/credential management.
   - Update Operator Core responsibility map: document 3 independent operational permissions, multi-permission account support, station non-elevation, and MVP/beta compatibility rules.
   - Update Doctor Core responsibility map: document multi-specialty clinical review (radiologists + non-radiologist specialists) and specialty authorization.
   - Define Unified Admin presentation surface across domain-owned operations without introducing an `Admin` business domain.
   - Reconcile payment ownership and access maps to match WhatsApp-only member and unified admin models.

3. **`docs/technical/mhcs-core/project.md`:**
   - Update target architecture description, user-facing surfaces (WhatsApp for Member, Web app for Operator, Web app for Doctor, Unified Web panel for Admin).
   - Update process topology and module interaction rules to reflect unified admin routing over domain modules.
   - Preserve modular Laravel structure, Shared boundaries, and MPIPS private network boundary.

4. **`docs/technical/mhcs-core/modules/member/project.md`:**
   - Reframe Member module from an authenticated Blade portal to the backend domain authority for WhatsApp-orchestrated member interactions.
   - Update identity model: separate `Requester / contact`, `Payer`, `Subject of care`, `Guardian`, and `Result recipient`.
   - Explicitly establish that booking code possession is a reservation locator, not sufficient identity proof; define official identity verification as an on-site TU workflow.
   - Remove `users` table linkage for members, password authentication, and self-registration portal credential management.
   - Reconcile Member data model: remove portal login fields, update booking and guardian relationships, remove or isolate Madeena Points wallet mechanics into unbundled payment/financial structures, and mark open payment provider decisions explicitly.
   - Update attendance query contract and on-site lookup interfaces for Operator TU check-in.

5. **`docs/technical/mhcs-core/modules/operator/project.md`:**
   - Redefine authorization model from single `Operator` role with station labels to three independently assignable permissions: `TU / Registration`, `Nakes Pemeriksaan Dasar`, and `Radiografi`.
   - Specify that one staff account may hold 1, 2, or all 3 permissions.
   - Specify station selection rules: station routes active work and LCD calls but CANNOT grant or elevate permissions.
   - Document MVP/beta compatibility rule: existing beta operator accounts temporarily retain access to all 3 operational areas.
   - Document new staff account provisioning: administrator explicitly selects applicable operational permissions.
   - Preserve mature examination-day workflow: FIFO queue management, atomic claims, paper consent confirmation, basic measurements & vital signs, Grabber radiograph/gain NPZ capture review, multi-capture submission, LCD displays, read-only AI monitor, and stage earnings.

6. **`docs/technical/mhcs-core/modules/doctor/project.md`:**
   - Expand user and authorization model to cover radiologists and authorized non-radiologist specialists.
   - Define shared doctor foundations (shared queue, atomic claim, study viewing, DICOM download when clinically necessary, quality decisions, report drafting/submission, amendments, earnings).
   - Specify specialty/service authorization and modality eligibility rules (e.g. non-radiologist specialists reviewing relevant clinical modalities/services).
   - Distinguish clinical workflow differences where applicable without copying Operator examination workflows.

7. **Downstream technical & supporting document consistency review:**
   - `docs/technical/mhcs-core/modules/image-gateway/project.md`: verify references to Member result distribution and Operator raw DICOM access; ensure no obsolete portal references remain.
   - `docs/technical/mpips/project.md`: verify references and black-box boundary.
   - `docs/technical/mhcs-core/ui-language.md`: audit and update UI terminology, removing references to "Member Portal" while updating Bahasa Indonesia strings for the 3 operator permissions, multi-specialty doctor UI, and unified admin panel.
   - `.agents/context/project.md`: verify and update orientation pointers and repository facts for consistency.

### Out of scope

- Modifying application source code in `mhcs-core`, `mpips`, or any implementation repository.
- Authoring or running application-level migrations, seeders, or database changes.
- Authoring or executing deployment scripts, CI/CD pipelines, or server configurations.
- Inventing unapproved external vendor/provider solutions (e.g., selecting a specific WhatsApp BSP vendor, choosing a specific payment gateway, or designing specific WhatsApp bot/LLM conversational trees).
- Modifying historical research artifacts under `docs/research/` (which remain historical context).
- Complete visual/structural overhaul of `website/` demonstrators and mock-ups (`website/demonstrator/`, `website/mock-up/`, `website/bpmn/`), except for necessary consistency updates or explicit documentation of deferred alignment tasks.
- Authoring application-level implementation tasks (e.g. `docs/technical/mhcs-core/tasks/` implementation tasks) beyond auditing them for consistency.

### Preserved behavior

The following architecture, business, and operational invariants MUST remain unchanged:

- **Single Modular Application (`mhcs-core`):** One deployable Laravel application containing Member, Operator, Doctor, and Image Gateway modules.
- **MPIPS Trust and Runtime Boundary:** Separate private conversion service receiving patient-free radiograph NPZ + gain NPZ + signed manifest and returning DICOM.
- **Image Gateway Ownership:** Exclusive ownership of durable clinical binary storage, submission manifests, MPIPS conversion orchestration, and authorized access routing.
- **Offline Grabber Boundary:** Offline-capable Grabber generating patient-free NPZ captures; patient identity supplied only by the active Operator examination.
- **Mature Operator Examination Flow:** On-site paper consent confirmation, staged FIFO queues (Pemeriksaan Dasar, Sesi Foto Radiografi), atomic ticket claims, paired LCD calling displays, draft capture review/retake, and independent stage earnings.
- **Domain Data Ownership:** Each module changes only the tables and entities it owns; no cross-module database bypass.
- **Module Communication:** Local commands, shared transactions for tight invariants, and durable domain events inside `mhcs-core`; no internal network calls between modules.
- **Staff Authentication Foundation:** Shared user credentials and session management for staff (Operator, Doctor, Admin).
- **Interoperability Target:** HL7 FHIR R5 `5.0.0` as the external clinical interoperability target.

## Dependencies and assumptions

### Dependencies

- Approval of this Draft task contract by the designated human authority before publication and execution.
- Baseline repository state at commit `cfe5d523b82da7af5557711c90d50f6173f4c531`.

### Approved assumptions

- The Member interaction channel is WhatsApp-only. No web portal, native iOS/Android app, desktop app, or member password login will be provided.
- The internal Member domain remains essential for medical records (MRN), bookings, financial tracking, guardian/dependent relations, notifications, and result orchestration.
- Operator authorization comprises three independent operational permissions (`TU / Registration`, `Nakes Pemeriksaan Dasar`, `Radiografi`).
- Existing MVP/beta Operator accounts temporarily retain access to all three operational areas as a transitional compatibility measure.
- The Doctor module serves both radiologists and authorized non-radiologist specialists based on configured specialty and modality eligibility.
- Administration is delivered via one unified web panel acting as a presentation layer over domain-owned services, without creating an `Admin` domain entity.

### Remaining approval requirements

- Formal approval of this Draft task file by the designated repository authority.
- Human review and acceptance of the revised business and technical authority documents upon completion of umbrella execution.
- Open design decisions (listed below) remain explicitly marked and require subsequent human authority decisions.

## Required capabilities

- `repository-read`
- `repository-write`
- `shell` (for executing repository validation scripts and checks)

## Execution constraints

### Constraints

- **Strict Authority Hierarchy:** Follow `.agents/AGENTS.md` and `.agents/software-workflow.md`. Distinguish approved authority from observed evidence.
- **No Invented Decisions:** Genuine unresolved items (WhatsApp BSP, bot architecture, payment provider, Madeena Points commercial policy, result delivery channel mechanics, qualification rules) MUST be explicitly recorded under an "Open Design Decisions" section in the respective documents, rather than fabricated.
- **Terminology Consistency:** Use consistent terms across all documents (e.g., `TU / Registration`, `Nakes Pemeriksaan Dasar`, `Radiografi`, `Unified Administration Panel`, `Requester`, `Subject of Care`, `WhatsApp Channel`).
- **Language Policy Conformance:** Authority documents are written in plain English, while browser UI copy and operational station labels conform to `docs/technical/mhcs-core/ui-language.md` (Bahasa Indonesia for station names like `PEMERIKSAAN DASAR` and `SESI FOTO RADIOGRAFI`).
- **No Parallel Abstractions:** Apply Ponytail reuse discipline; do not introduce extraneous service layers, event systems, or domain entities.
- **Documentation Only:** Execution of this task MUST NOT alter any application source code, database migrations, or deployment configurations.

## Acceptance criteria

The Executor's implementation MUST satisfy all of the following observable criteria:

- [ ] 1. The four human-facing surfaces are unambiguous across all revised documents:
  - Member = WhatsApp-only channel;
  - Operator = staff web application;
  - Doctor = doctor web application;
  - Admin = one unified administration web panel.
- [ ] 2. All authority documents no longer require an authenticated Member Portal, member username/password login, or member-facing mobile/desktop applications.
- [ ] 3. Member domain responsibility remains explicit for MRN, medical records, bookings, payments, subject-of-care relations, notifications, and result orchestration.
- [ ] 4. Conceptual distinctions among Requester/contact, Payer, Subject of care, Guardian, and Result recipient are explicitly defined and not collapsed into a single account assumption.
- [ ] 5. Possession of a booking code is explicitly defined as a reservation locator and NOT sufficient proof of patient identity; official identity verification is required at the on-site TU station.
- [ ] 6. Operator authorization explicitly defines three independent operational permissions: `TU / Registration`, `Nakes Pemeriksaan Dasar`, and `Radiografi`.
- [ ] 7. The Operator specification allows one staff account to hold one, two, or all three operational permissions.
- [ ] 8. Existing MVP/beta Operator accounts are explicitly documented as temporarily retaining all three operational permissions under a transitional compatibility rule.
- [ ] 9. New staff provisioning is defined as requiring administrator selection of applicable operational permissions.
- [ ] 10. The specification explicitly states that station selection routes active work and calls but cannot grant or elevate account permissions.
- [ ] 11. The mature Operator examination-day workflow (FIFO queues, LCD calls, paper consent confirmation, basic measurements, Grabber capture review, atomic claims, stage earnings) is preserved.
- [ ] 12. Doctor authority covers radiologists and authorized non-radiologist specialists, distinguishing shared foundations from specialty authorizations, modality eligibility, and clinical workflow variations.
- [ ] 13. Admin is defined as one unified human-facing panel without creating a new monolithic `Admin` business domain.
- [ ] 14. Domain ownership remains strictly explicit across Member, Operator, Doctor, and Image Gateway modules.
- [ ] 15. Modular `mhcs-core` application topology, separate MPIPS runtime boundary, and Image Gateway storage/orchestration ownership are strictly preserved.
- [ ] 16. Contradictory legacy assumptions (Member Portal, member login credentials, Madeena Points as exclusive member payment, single interchangeable operator permission, module-fragmented admin panels) are removed, replaced, or explicitly isolated.
- [ ] 17. Genuine unresolved business and technical decisions are explicitly documented under "Open Design Decisions" sections and not fabricated.
- [ ] 18. Cross-document terminology, actor journeys, and module responsibility maps are mutually consistent across all updated documents.
- [ ] 19. Any downstream demonstrator, mock-up, BPMN, or task artifacts that are not updated within this scope are explicitly identified with documented follow-up/deferral rationale.
- [ ] 20. The execution produces changes exclusively within documentation files and does not modify application code, `mhcs-core`, `mpips`, deployment configs, or external systems.

## Verification requirements

### Required checks

The Executor MUST run and report results for at least the following verification checks:

1. **Whitespace & Git Cleanliness:**
   ```bash
   git diff --check
   ```
   *Expectation:* Zero whitespace errors or malformed lines.

2. **Repository Site & Link Verification:**
   ```bash
   python3 website/test_site.py
   ```
   *Expectation:* All local links and site tests resolve successfully.

3. **BPMN Validation:**
   ```bash
   python3 website/bpmn/test_bpmn.py
   ```
   *Expectation:* BPMN structure passes validation.

4. **Relative Markdown Link Target Validation:**
   Validate that every relative link across `docs/business/`, `docs/technical/`, and `.agents/context/` resolves to an existing file and heading anchor.

5. **Legacy Terminology Audit (Ripgrep / Grep Search):**
   Search the repository for obsolete and contradictory terms:
   - Search for lingering "Member Portal" references outside of historical notes.
   - Search for member login / password credential requirements.
   - Search for single interchangeable operator permission assumptions.
   - Search for fragmented admin module assumptions.
   *Expectation:* Zero unauthorized legacy assumptions remain in active authority documents.

6. **Scope Boundary Verification:**
   ```bash
   git status --short
   ```
   *Expectation:* Only authorized markdown documentation files are modified; no application source code, configuration, or deployment files are changed.

### Required evidence

The Executor MUST report:
- Implementation revision (Git commit SHA) and exact working-tree status.
- Exact list of modified, added, or removed files.
- Command-by-command verification outputs from the required checks above.
- Summary of audited and replaced legacy terms.
- Explicit list of unresolved design decisions recorded in the documents.
- List of any deferred downstream artifacts requiring future follow-up.

## Stop conditions

The Executor MUST stop implementation and return the issue to planning when any of the following materially affects the task:

- A required business or product authority decision is contradictory or missing beyond the approved inputs.
- A conflict arises between the WhatsApp-only model and necessary clinical invariants that cannot be resolved without a new human decision.
- Execution would require altering application code, deployment scripts, or infrastructure configuration.
- The implementation baseline is no longer applicable.
- The task requires expanding scope into rewriting historical research documents (`docs/research/`).
- Acceptance criteria cannot be satisfied within the bounded documentation objective.

## Side-effect authorization

### Explicitly authorized side effects

- Creation and modification of documentation markdown files under `docs/business/`, `docs/technical/`, `.agents/context/`, and `.agents/tasks/`.
- Execution of Python test scripts (`website/test_site.py`, `website/bpmn/test_bpmn.py`) and read-only shell commands (`git diff`, `git status`, `grep`).

### Unauthorized side effects

- Any modification to application source code in `mhcs-core`, `mpips`, or other repositories.
- Git commits, pushes, or pull requests unless explicitly authorized by the governing run.
- Production, staging, or external infrastructure mutations.
- Network calls to external APIs or services.
- Secret access, creation, or persistence.

## Expected terminal outcome

### Review Required

Use when all 20 acceptance criteria are satisfied, all required authority documents are updated and consistent, and complete verification evidence is documented for Reviewer evaluation.

Expected evidence:
- Full changed file list and diff summary.
- Test run results for site tests, BPMN tests, and whitespace checks.
- Terminology audit search results demonstrating elimination of contradictory legacy rules.
- Documentation of explicit open design decisions.

### Planning Required

Use when a stop condition prevents safe completion within the governing task contract.

Expected evidence:
- Specific blocking issue and affected document(s).
- Rationale why new human authority or planning intervention is required.

## Review and remediation handling

The Reviewer evaluates implementation against this exact governing task revision, authoritative inputs, implementation baseline, and observed verification evidence.

If the implementation is accepted, the reviewed immutable repository revision becomes the new accepted documentation baseline.

If review identifies bounded corrections within the same delivery objective, update and republish this same task under `.agents/tasks/mhcs-product-model-reset.md` with a new immutable governing revision before renewed execution.

Materially new objectives or scope expansions outside this documentation reset MUST return to Delivery Planning and become separate task work.

## Open design decisions

The following decisions are intentionally unresolved by current human authority and MUST be explicitly documented as open design decisions in the revised specifications rather than fabricated:

1. **WhatsApp Business Platform Provider:** Exact WhatsApp Business Platform provider, API gateway, integration contract, and hosting model.
2. **WhatsApp Bot / LLM Architecture:** Exact conversation flow design, NLP/LLM orchestration layer, automated triage logic, and human-handoff escalation boundaries.
3. **Payment Provider Integration:** Exact payment gateway adapter, payment methods (QRIS, VA, e-wallet), webhook schemas, and timeout/settlement contracts.
4. **Madeena Points Commercial Policy:** Final commercial determination whether Madeena Points are completely retired, converted to internal loyalty/subsidy credits, or replaced by direct rupiah pricing.
5. **Deposit vs. Full-Payment Policy:** Commercial rules regarding whether WhatsApp bookings require full advance payment, a deposit, or pay-at-site options.
6. **Cancellation & Refund Commercial Terms:** Specific cancellation cutoffs, refund fee policies, and automated refund settlement workflows for WhatsApp-originated bookings.
7. **Clinical Result Delivery Channel Mechanics:** Specific delivery pattern for member results via WhatsApp (e.g. direct encrypted PDF dispatch, secure time-limited web view link, on-site printed summary, or hybrid model).
8. **On-Site Identity Verification Storage Procedure:** Exact data capture and storage mechanics for physical KTP/KIA/KK verification and photo comparison at the TU station.
9. **Staff Credential & Regulatory Qualification Rules:** Formal regulatory qualification, certification evidence, and credential verification criteria for TU staff, basic examination nakes, radiographers, radiologists, and non-radiologist specialists.
10. **Specialty-Specific Doctor Workflows:** Specific clinical sub-specialty workflows, modality eligibility matrices, and reporting templates for non-radiologist specialists.
11. **Staff Permission Implementation Mechanism:** Technical implementation details in Laravel/Filament (e.g. Spatie Permission vs custom bitmask/boolean flags) for the three operator permissions.
12. **Beta Account Migration Mechanism:** Exact database migration and transition schedule for upgrading existing MVP/beta operator accounts to the granular permission model.
