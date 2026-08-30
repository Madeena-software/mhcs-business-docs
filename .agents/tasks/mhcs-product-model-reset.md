---
title: MHCS Business/Product-Model Reset — Research and Reconciliation
document_id: AGENT-TASK-MHCS-RESET-001
version: 1.2
status: validated-published
language: en-US
last_updated: 2026-08-30
scope:
  - MHCS business and product-model research, challenge, and validation
  - repository-wide authority and consistency reconciliation
  - diagrams, BPMN, mock-up, and demonstrator reconciliation
  - candidate-branch review and human-approval handoff
authority_note: This published umbrella task authorizes only the bounded documentation and research work defined here. It does not authorize merge, release, or changes in another repository.
---

# Executable Task

## Task identity

**Task title:** MHCS Business/Product-Model Reset — Research and Reconciliation
**Task path:** `.agents/tasks/mhcs-product-model-reset.md`
**Task contract state:** `Validated/Published`
**Delivery objective / Work Package:** MHCS product-model reset / `WP-DOC-RESET-001`
**Owner:** Designated MHCS Product Authority / Repository Planner

This is one umbrella contract. Future execution MAY use bounded slices without creating downstream tasks. The Executor retains technical discretion within this contract, but MUST NOT invent material product, clinical, legal, security, payment, identity, authorization, or operational decisions.

## Repository state and lifecycle

- Repository: `Madeena-software/mhcs-business-docs` only.
- `main` is the current approved business/product authority; comparison baseline: `0d01e032f5d6b607daddf57a32481bf0717ce23e`.
- `docs/mhcs-product-model-reset` is the candidate next authority; existing candidate state at republication planning: `bf8b0758a5168cef9b6ab74e6483dbe8c1fa5776`.
- The candidate branch history and existing work MUST be preserved and treated as provisional evidence, not final authority.
- Expected execution baseline is the candidate branch state after this task publication; the Executor MUST record the actual starting SHA and stop if drift materially changes scope, authority, or safe publication basis.
- This task revision is identified by the immutable commit that publishes this file; do not create an impossible self-referential SHA requirement.

Lifecycle:

```text
research / challenge
→ evidence validation
→ candidate product decisions
→ repository documentation reconciliation
→ diagrams / BPMN / mock-ups reconciliation
→ repository-wide audit
→ branch-versus-main comparison
→ human review
→ bounded revision if requested
→ explicit human approval
→ separate merge decision
```

Candidate work MUST NOT be represented as approved merely because it is committed. Merge to `main` is a separate explicit human approval boundary and is not authorized by this task.

## Objective and target hypothesis

Research, challenge, validate, and formalize the next MHCS business/product model within this repository. Treat the following as a hypothesis to validate, not as an unquestionable conclusion:

```text
WhatsApp
= persistent interaction, notification, communication, dispatch,
  accept/decline, reminder, and simple structured orchestration

Temporary Web
= a specialized secure workspace opened only when the current task
  genuinely requires a richer interface

MHCS
= the underlying healthcare/business system whose internal complexity
  is not unnecessarily exposed to ordinary users
```

Preservation rule: still valid → preserve; partially valid → adapt; superseded → replace explicitly; unclear → research and keep unresolved.

## Human-established direction to validate

### Member

- No permanent Member Portal, conventional Member username/password UX, or required native mobile/desktop application.
- WhatsApp is the persistent Member interaction channel.
- Specialized temporary web access remains allowed when justified. The current preferred result flow is `Result Finalized → WhatsApp Notification → Secure Temporary Result Link → Temporary Result Web Surface → View / Download Result`; this surface is not a Member Portal.
- Do not prematurely choose token, OTP, passkey, expiry, database, or comparable low-level mechanics.
- Preserve the Member domain for MRN, medical records, bookings, payments, subject-of-care relations, notifications, and result orchestration.

### Booking and identity

Preserve distinct concepts: Requester, Payer, Member, Subject of Care, Guardian, and Result Recipient. A WhatsApp booking is not verified Member registration:

```text
Requester → Booking → Provisional Subject → on-site identity verification → Verified Member → MRN
```

Booking code, including booking code plus name, is only a reservation locator and is not proof of clinical identity. Do not assume KTP/KIA/KK or similar sensitive identity documents should be collected as ordinary WhatsApp attachments. Research and document the product-level rule; leave storage mechanics open unless authoritative evidence resolves them.

### Operator

Validate the target of three independently assignable permissions: `TU / Registration`, `Nakes Pemeriksaan Dasar`, and `Radiografi`. One qualified staff account MAY hold any combination of one, two, or all three. Station selection routes active work and LCD calls but MUST NOT grant or elevate permissions.

Preserve transitional compatibility: existing undifferentiated MVP/beta Operator accounts may temporarily retain all three operational areas; new provisioning explicitly selects applicable permissions. Validate this dispatch hypothesis:

```text
operational need / open shift → eligible staff → WhatsApp offer
→ ACCEPT / DECLINE → assignment → reminder → OPEN SITE WORKSPACE
→ temporary specialized operational workspace
```

WhatsApp possession or an incoming URL is not clinical permission. Workspace scope should derive from staff identity, permission, site, assignment, shift/time window, and operational scope. Preserve the mature examination-day workflow where valid: FIFO queues, atomic claims, paired LCD calls, paper consent confirmation, basic measurements/vitals, Grabber NPZ/gain capture review and retake, multi-capture submission, read-only AI monitor, and stage earnings.

### Doctor

Validate support for radiologists and authorized non-radiologist specialists (and other configured specialties only where justified). Preserve the radiology workflow for radiology services, while keeping specialty/service authorization, qualification, credential, and modality eligibility explicit. Shared foundations MAY include staff authentication, case assignment, report drafting/submission, amendments, and earnings/payout infrastructure.

Validate this hypothesis without exposing unnecessary clinical data in notifications:

```text
eligible case → eligible Doctors → WhatsApp offer → ACCEPT / DECLINE
→ assignment/claim → OPEN CASE → temporary Clinical / DICOM Workspace
```

Do not force non-radiologists into radiology quality decisions (`usable` / `repeat_required`), raw DICOM review, or repeat-imaging workflows unless justified by their specialty. Do not copy Operator examination workflows into Doctor. Keep exact specialty workflows open where authority is insufficient.

### Authentication, authorization, and Global Admin

Preserve the distinction:

```text
no conventional login page ≠ no authentication
WhatsApp possession ≠ clinical authorization
```

Identity, credential verification, authorization, access control, auditability, and clinical responsibility remain required. Low-level mechanisms remain open unless authorized.

Global Admin remains distinct from TU / Registration and other operational roles. A persistent high-security administration workspace may be appropriate; do not force WhatsApp-native administration for symmetry. Define one unified administration panel as a presentation surface over Member, Operator, Doctor, and Image Gateway domain-owned operations, without creating a monolithic `Admin` business domain.

## Required execution scope

Discover the smallest sufficient affected set across the repository. Reconcile, where materially affected:

- business and system-responsibility authority;
- actor, Member, booking, payment, identity, guardian/subject, result, authentication, and authorization models;
- Global Admin boundaries and capability/access maps;
- `mhcs-core` architecture and module specifications;
- MPIPS and Image Gateway boundary documentation;
- Mermaid diagrams and other repository diagrams;
- `website/` demonstrators, mock-ups, actor journeys, and BPMN assets;
- terminology and relative links.

Actual `mhcs-core`, `mpips`, or any other repository implementation, tasks, branches, issues, and plans remain out of scope. Do not create downstream execution tasks. Do not modify historical research merely for coverage.

Research MUST use current external evidence where materially useful, prefer primary or authoritative sources, and distinguish external observation from an MHCS product decision. Relevant areas include WhatsApp Business Platform policy/capabilities, healthcare messaging and booking, identity/document handling, Indonesian personal-data and electronic-medical-record requirements, privacy/access control, result delivery, workforce dispatch, clinical case allocation, professional credentials, temporary workspaces, and legitimately comparable messaging/healthcare models. Do not claim novelty or convert consumer dispatch behavior into clinical-authority precedent without evidence.

## Required invariants and constraints

- Preserve one modular `mhcs-core` Laravel application containing Member, Operator, Doctor, and Image Gateway.
- Preserve the separate private MPIPS runtime boundary, patient-free radiograph NPZ plus gain NPZ plus signed manifest input, and DICOM output boundary.
- Preserve Image Gateway ownership of durable clinical binary storage, submission manifests, conversion orchestration, and authorized access routing.
- Preserve the offline Grabber patient-free capture boundary and identity association only through the active Operator examination.
- Preserve module-owned data, local commands/queries/transactions and durable domain events inside `mhcs-core`, staff authentication foundations, and HL7 FHIR R5 `5.0.0` as the external interoperability target.
- Preserve privacy, data minimization, least privilege, authorization-aware access, auditability, and clinical responsibility at the business/product abstraction level.
- Do not select vendors, payment providers, bot/LLM architecture, credentials, legal interpretations, token mechanisms, or other unresolved implementation details without authority.

## Open design decisions

The Executor MUST document these as open, candidate, or resolved with evidence; never manufacture certainty:

1. WhatsApp provider, API gateway, hosting, bot/LLM, triage, and human-handoff design.
2. Temporary result-link mechanics and legally/clinically/platform-appropriate result delivery content.
3. Payment provider, methods, webhook/settlement behavior, Madeena Points commercial policy, deposit/full-payment, cancellation, and refund terms.
4. On-site identity evidence capture/storage and qualification or regulatory credential rules.
5. Staff permission implementation and beta-account migration mechanics.
6. Specialty-specific Doctor workflows, modality matrices, reporting templates, and clinical workspace details.
7. Exact authentication, notification disclosure, temporary workspace, retention, and audit mechanisms where not already authorized.

## Acceptance criteria for future human review

The umbrella work is review-ready only when observed evidence demonstrates:

- coherent business/product, actor, Member, booking, requester/payer/subject/guardian/recipient, payment, identity, Operator, Doctor, and Global Admin models;
- the WhatsApp, temporary-web, Operator workspace, Doctor workspace, and unified Admin surface boundaries are unambiguous;
- authentication versus authorization, privacy, least privilege, auditability, and clinical responsibility are preserved;
- permissions, dispatch, assignment, workspace scope, and specialty eligibility are coherent;
- preserved architecture and mature operational workflow invariants remain explicit;
- unresolved decisions are named, scoped, and supported by evidence rather than hidden;
- relevant documents, diagrams, BPMN, mock-ups, and demonstrators are reconciled or stale conflicts are explicitly recorded for follow-up;
- stale permanent-portal, member-credential, exclusive-payment, single-permission, and fragmented-admin assumptions are removed, superseded, or justified as compatibility;
- relative links and terminology are valid and the complete candidate branch is compared with `main`.

## Verification and evidence

Record the exact starting SHA, branch head, changed-file list, diff summary, and candidate-versus-main comparison. Run and report, as applicable:

```bash
git diff --check
python3 website/test_site.py
python3 website/bpmn/test_bpmn.py
git status --short
```

Also validate relative Markdown links and heading anchors under `docs/` and `.agents/context/`; search the repository for stale portal/login/password, exclusive-payment, single-permission, fragmented-admin, and contradictory channel assumptions; inspect cross-document, diagram, BPMN, and mock-up consistency; and trace external research claims to reliable sources. Never represent an unobserved command as passed.

## Stop and escalate

Stop and return to planning/human authority when:

- actual repository state materially contradicts the stated baseline or contains unfamiliar work that cannot safely be preserved;
- a material business, clinical, legal, privacy, security, identity, authorization, payment, or product decision is missing or contradictory;
- safe result delivery or required interaction cannot be achieved without an unauthorized permanent Member web experience;
- execution would require another repository, historical research rewrite, deployment/release, destructive Git operation, or scope expansion;
- the task's acceptance criteria cannot be satisfied within this umbrella objective.

## Side-effect boundary

Authorized: bounded edits, commits, and pushes to `docs/mhcs-product-model-reset` and documentation/product-authority surfaces in this repository, plus read-only validation and approved external research needed for evidence.

Not authorized: merge to `main`, force-push or history rewrite, mutation of `main` or unrelated branches, changes in `mhcs-core`, `mpips`, or other repositories, deployment/release, destructive cleanup, secrets, or external-system mutation.

## Required final handoff

Return:

```text
Repository
Branch
Actual starting SHA
Approved main baseline SHA
Final branch head SHA
Changed files
New business/product model
Key decisions established
Existing decisions preserved
Old assumptions superseded
Open questions
External evidence used
Validation performed
Known limitations and deferred downstream artifacts
Recommendation: READY TO MERGE or NOT READY TO MERGE
```

The recommendation is not merge authorization. Do not merge as part of this task.
