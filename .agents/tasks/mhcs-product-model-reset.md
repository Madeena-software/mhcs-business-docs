---
title: MHCS Business/Product-Model Reset — Research and Reconciliation
document_id: AGENT-TASK-MHCS-RESET-001
version: 1.3
status: validated-published
language: en-US
last_updated: 2026-08-31
scope:
  - MHCS business and product-model research, challenge, and validation
  - repository-wide authority and consistency reconciliation
  - dedicated business User Story authority
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

This is one coherent umbrella contract. Future execution MAY use bounded slices
without creating downstream tasks. The Executor retains technical discretion
within this contract, but MUST NOT invent material product, clinical, legal,
security, payment, identity, authorization, or operational decisions.

## Repository state and lifecycle

- Repository: `Madeena-software/mhcs-business-docs` only.
- `main` is the current approved business/product authority; comparison baseline: `0d01e032f5d6b607daddf57a32481bf0717ce23e`.
- `docs/mhcs-product-model-reset` is the candidate next authority.
- The candidate branch and existing work MUST be preserved and treated as provisional evidence, not final authority.
- Future execution MUST record its actual starting SHA and stop if drift materially changes scope, authority, or safe execution basis.
- The exact governing task revision is the immutable commit that publishes this file; do not create a self-referential SHA requirement.

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

Candidate work MUST NOT be represented as approved merely because it is
committed. Merge to `main` is a separate explicit human approval boundary and
is not authorized by this task.

## Objective and target product hypothesis

Research, challenge, validate, and formalize the next MHCS business/product
model within this repository. The following is the candidate direction to make
structurally evident, while keeping unsupported details open:

```text
Messaging ecosystem
= persistent human relationship, interaction, and orchestration layer

Temporary Secure Web
= specialized task workspace opened only when richer interaction is genuinely needed

MHCS
= underlying healthcare/business orchestration system and system of record
```

Messaging-first does NOT mean messaging-only. Authentication, authorization,
privacy, auditability, professional authority, and clinical responsibility
remain mandatory. WhatsApp is the practical initial/reference messaging channel
for Indonesia; do not permanently narrow the broader product principle to
WhatsApp where a messaging-ecosystem abstraction is appropriate.

Preservation rule: still valid → preserve; partially valid → adapt; superseded
→ replace explicitly; unclear → research and keep unresolved.

## Required business model

### Human-facing actor ontology

The reconciled business model MUST distinguish these actors and roles:

```text
Member

Site Staff
├── Reception / Registration
├── Basic Examination
└── Radiography

Doctor
├── Radiologist
└── Authorized Specialist

Global Admin / Super Admin
```

Do not use `Operator` as one generic human business role covering all site work.
`Operator Core` remains the internal bounded module/system name for examination-
site operations. Human language should use Site Staff and the role model below;
system language may retain Operator Core, its paths, and its domain boundary.

### Site Staff roles and authorization

Use `Role` as the primary business authorization abstraction:

```text
Person
→ Role(s)
→ eligibility / qualification / credential validation
→ Assignment
→ authorized task/workspace
```

The three Site Staff roles are independently assignable:

1. Reception / Registration
2. Basic Examination
3. Radiography

A person MAY hold multiple roles when legitimately eligible. Qualification,
professional registration, credential, organizational authorization, or similar
evidence determines eligibility; do not model Profession and Role as parallel
equivalent business concepts. Station selection MUST NOT grant or elevate a
role. Implementation permissions/RBAC MAY exist underneath this business model.

The preferred interaction model is:

```text
operational need / shift
→ determine eligible Site Staff by required role
→ Messaging / WhatsApp work offer
→ ACCEPT / DECLINE
→ assignment → reminder → OPEN SITE WORKSPACE
→ Temporary Site Workspace → authorized work → return to Messaging
```

Workspace scope derives from identity, role eligibility, assignment, site,
time/shift, and operational scope. Messaging-account or link possession alone
is not authorization. Concise work history MAY live in Messaging; detailed
history uses a secure temporary surface only when richer inspection is needed.

Preserve valid examination-day behavior, including FIFO queues, atomic claims,
paired LCD calls, paper consent confirmation, basic measurements/vitals, Grabber
NPZ/gain capture review and retake, multi-capture submission, read-only AI
monitoring, and stage earnings. Existing undifferentiated MVP/beta accounts MAY
temporarily retain all three operational areas; new provisioning explicitly
selects applicable roles.

### Doctor roles and interaction

Distinguish `Radiologist` from `Authorized Specialist`. The preferred model is:

```text
eligible case
→ determine eligible Doctor
→ minimal-information Messaging / WhatsApp offer
→ ACCEPT / DECLINE
→ assignment / claim → OPEN CASE
→ Temporary Clinical / DICOM Workspace
→ clinical work → return to Messaging
```

Doctor should not need a permanent conventional portal merely to monitor a
worklist. Eligibility, specialty/service authorization, qualification,
credential, and modality eligibility remain explicit. Do not force an
Authorized Specialist into radiology-specific quality/repeat/DICOM workflows
without authority; do not copy Site Staff examination workflows into Doctor.

### Member interaction and result delivery

There is no permanent conventional Member Portal, persistent Member
username/password account, or required native mobile/desktop app. Messaging,
with WhatsApp as the initial/reference channel, is the persistent Member
interaction. A secure temporary result surface is allowed when richer viewing or
download is needed:

```text
Result Finalized
→ WhatsApp / Messaging Notification
→ Secure Temporary Result Link
→ Temporary Result Web Surface
→ View / Download
→ return to Messaging
```

Do not prematurely prescribe token, OTP, passkey, expiry, session-storage, or
other low-level mechanics. Preserve distinct Requester, Payer, Member, Subject
of Care, Guardian, and Result Recipient concepts:

```text
Requester → Booking → Provisional Subject
→ on-site identity verification → Verified Member → MRN
```

A booking code, including code plus name, is only a reservation locator and not
proof of clinical identity. Do not assume sensitive identity documents belong as
ordinary Messaging attachments. Preserve the Member domain for MRN, records,
bookings, payments, subject-of-care relations, notifications, and results.

### Radiology repeat workflow

Preserve this controlled clinical workflow:

```text
Radiologist clinical decision
→ recorded inside Temporary Clinical / DICOM Workspace
→ repeat_required + controlled reason / note
→ MHCS records audited clinical action
→ eligible Site Staff with Radiography role
→ Messaging repeat-work dispatch → ACCEPT
→ Temporary Site Workspace → repeat Sesi Foto Radiografi
```

The clinical decision MUST NOT be reduced to informal ordinary chat.

### Global Admin / Super Admin

`Global Admin / Super Admin` is one distinct human actor and the only human
actor authorized to have a persistent conventional web login. It remains
distinct from Reception / Registration. Persistent Secure Admin Web remains
valid for high-privilege administration as one unified presentation surface over
Member, Operator Core, Doctor, and Image Gateway domain-owned operations. Do not
create fragmented Operator Admin, Doctor Admin, or a monolithic `Admin` business
domain without separate authority.

## Required execution scope

Discover the smallest sufficient affected set. Reconcile, where materially
affected:

- business and system-responsibility authority;
- actor, Member, booking, payment, identity, guardian/subject, result, authentication, and authorization models;
- Global Admin boundaries and capability/access maps;
- `mhcs-core` architecture and module specifications;
- MPIPS and Image Gateway boundary documentation;
- Mermaid diagrams and other repository diagrams;
- `website/` demonstrators, mock-ups, actor journeys, navigation, and BPMN assets;
- terminology and relative links; and
- a dedicated business User Story authority, expected at `docs/business/03-user-stories.md` unless repository conventions justify a better existing location.

The User Story authority MUST cover Member; Site Staff — Reception /
Registration; Site Staff — Basic Examination; Site Staff — Radiography; Doctor —
Radiologist; Doctor — Authorized Specialist; and Global Admin / Super Admin.
Stories capture human intent, desired outcome/value, observable acceptance
criteria, and useful journey/business-rule traceability. They MUST NOT become
implementation recipes or prescribe buttons, database fields, token mechanics,
providers, or other low-level design.

Actual `mhcs-core`, `mpips`, or any other repository implementation, tasks,
branches, issues, and plans remain out of scope. Do not create downstream
execution tasks or modify historical research merely for coverage.

Research MUST use current external evidence where materially useful, prefer
primary or authoritative sources, and distinguish external observation from an
MHCS product decision. Relevant areas include messaging ecosystems and
healthcare messaging, temporary task-specific workspaces, workforce/job-role
modeling, qualification versus organizational role, privacy and sensitive-data
boundaries, role-based authorization, controlled clinical platforms, result
delivery, and clinical case allocation. Do not claim MHCS is the first
healthcare system to use WhatsApp. Indonesian differentiation requires qualified,
evidence-based wording.

## Preserved architecture and invariants

- Preserve one modular `mhcs-core` Laravel application containing Member, Operator Core, Doctor, and Image Gateway.
- Preserve the separate private MPIPS runtime boundary, patient-free radiograph NPZ plus gain NPZ plus signed manifest input, and DICOM output boundary.
- Preserve Image Gateway ownership of durable clinical binary storage, submission manifests, conversion orchestration, and authorized access routing.
- Preserve the offline Grabber patient-free capture boundary and identity association only through the active Site Staff examination.
- Preserve module-owned data, local commands/queries/transactions and durable domain events inside `mhcs-core`, staff authentication foundations, and HL7 FHIR R5 `5.0.0` as the external interoperability target.
- Preserve privacy, data minimization, least privilege, authorization-aware access, auditability, and clinical responsibility at the business/product abstraction level.
- Do not select vendors, payment providers, bot/LLM architecture, credentials, legal interpretations, token mechanisms, or other unresolved implementation details without authority.

## Open design decisions

Document each as open, candidate, or resolved with evidence; never manufacture
certainty:

1. Messaging/WhatsApp provider, API gateway, hosting, bot/LLM, triage, and human handoff.
2. Temporary result-link mechanics and appropriate result-delivery content.
3. Payment provider, methods, webhook/settlement behavior, Madeena Points, deposit/full-payment, cancellation, and refund terms.
4. On-site identity evidence capture/storage and qualification or regulatory credential rules.
5. Staff permission implementation and beta-account migration mechanics.
6. Specialty-specific Doctor workflows, modality matrices, reporting templates, and clinical workspace details.
7. Exact authentication, notification disclosure, temporary-workspace, retention, and audit mechanisms where not already authorized.

## Acceptance criteria for future human review

The umbrella work is review-ready only when observed evidence demonstrates:

- the structural Messaging ecosystem / Temporary Secure Web / MHCS model is coherent and unambiguous;
- the actor ontology and dedicated User Story authority cover all required actors and roles;
- Member, booking, requester/payer/subject/guardian/recipient, payment, identity, Site Staff, Doctor, and Global Admin models are coherent;
- Messaging, temporary result, Site Staff, Doctor, and unified Admin boundaries are explicit;
- Role, eligibility, assignment, workspace scope, dispatch, specialty eligibility, authentication, authorization, privacy, least privilege, auditability, and clinical responsibility are coherent;
- the radiology repeat workflow and preserved examination-day and architecture invariants remain explicit;
- unresolved decisions are named, scoped, and supported by evidence rather than hidden;
- relevant documents, diagrams, BPMN, mock-ups, and demonstrators are reconciled or stale conflicts are explicitly recorded;
- stale permanent-portal, member-credential, exclusive-payment, single-permission, generic-Operator, and fragmented-admin assumptions are removed, superseded, or justified as compatibility; and
- relative links, heading anchors, terminology, and the complete candidate-versus-`main` comparison are valid.

## Verification and evidence

Record the exact starting SHA, branch head, changed-file list, diff summary, and
candidate-versus-`main` comparison. Run and report, as applicable:

```bash
git diff --check
python3 website/test_site.py
python3 website/bpmn/test_bpmn.py
git status --short
```

Also validate relative Markdown links and heading anchors under `docs/` and
`.agents/context/`; search for stale portal/login/password, exclusive-payment,
single-permission, generic-Operator, fragmented-admin, and contradictory channel
assumptions; inspect cross-document, diagram, BPMN, and mock-up consistency; and
trace external research claims to reliable sources. Never represent an
unobserved command as passed.

## Stop and escalate

Stop and return to planning/human authority when:

- actual repository state materially contradicts the stated baseline or contains unfamiliar work that cannot safely be preserved;
- a material business, clinical, legal, privacy, security, identity, authorization, payment, or product decision is missing or contradictory;
- safe result delivery or required interaction cannot be achieved without an unauthorized permanent Member web experience;
- execution would require another repository, historical research rewrite, deployment/release, destructive Git operation, or scope expansion; or
- the acceptance criteria cannot be satisfied within this umbrella objective.

## Side-effect boundary

Authorized: bounded edits, commits, and pushes to `docs/mhcs-product-model-reset`
and documentation/product-authority surfaces in this repository, plus read-only
validation and approved external research needed for evidence.

Not authorized: merge to `main`, force-push or history rewrite, mutation of
`main` or unrelated branches, changes in `mhcs-core`, `mpips`, or other
repositories, deployment/release, destructive cleanup, secrets, or
external-system mutation.

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
