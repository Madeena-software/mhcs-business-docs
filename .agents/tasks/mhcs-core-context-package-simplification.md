---
title: MHCS Core Context Package Simplification
document_id: AGENT-TASK-MHCS-CONTEXT-001
version: 1.1
status: validated-published
language: en-US
last_updated: 2026-09-01
scope:
  - mhcs-core repository-context package
  - technical-document simplification and classification
  - copy-portable context overlay preparation
authority_note: This task authorizes only the bounded documentation work defined here in mhcs-business-docs. It does not authorize changes to mhcs-core, MPIPS, business authority, application code, release, or deployment.
---

# Executable Task

## Task identity

**Task title:** MHCS Core Context Package Simplification

**Task path:** `.agents/tasks/mhcs-core-context-package-simplification.md`

**Task contract state:** `Validated/Published`

**Delivery objective / Work Package:** MHCS Core context-package simplification / `WP-MHCS-CONTEXT-001`

**Owner / designated planning authority:** Designated MHCS Product/Architecture Authority / Repository Planner

This is one coherent umbrella contract. Execution MAY use bounded documentation
slices, but MUST preserve one objective, one acceptance boundary, and one
copy-ready package outcome. The Executor MUST NOT invent business, product,
clinical, payment, identity, authorization, architecture, or security policy.

## Delivery context

The existing `docs/technical/mhcs-core/` tree is detailed technical authority
material, while a target application repository needs a concise, refreshable
`.agents/context/` orientation package. Refactor the existing material into one
designated folder whose complete contents can later be overlaid 1:1 into
`Madeena-software/mhcs-core/.agents/context/`.

The package follows the repository-context philosophy of
`faliqadlan/agent-work-governance` `templates/software/.agents/context/project.md`:
supporting repository orientation, authority routing, and implementation-
evidence routing. It is not a software specification, business-requirements
repository, source-code substitute, implementation manual, or independent
business/product authority.

## Baseline and task revision

**Implementation baseline:** `8d7628be78c597039f2cf44d111807e7ec2279b1`

**Task revision:** the exact immutable Git revision containing this published
file; resolve it from the publication commit before execution.

The baseline is the `mhcs-business-docs` revision only. Do not change it
silently during execution; stop if it is no longer safely applicable.

## Objective

**Objective:** Promote the accepted MHCS Core context material into one lean,
authority-mapped, copy-ready package under
`docs/technical/mhcs-core-context/`, retire the duplicate active
`docs/technical/mhcs-core/` technical tree after classifying its material, and
preserve only information that materially helps an AI/software agent orient
itself before inspecting implementation evidence.

The conceptual package is:

```text
docs/technical/mhcs-core-context/
├── project.md
├── ui-language.md
├── modules/
│   ├── member/project.md
│   ├── operator/project.md
│   ├── doctor/project.md
│   └── image-gateway/project.md
├── integrations/
│   └── mpips/project.md
└── design/
    ├── DESIGN.md
    └── mhcs-logo.svg
```

An equivalent layout is allowed only when the entire designated folder can be
copied directly into `mhcs-core/.agents/context/` without file selection,
renaming, post-copy moves, governance/task artifacts, or broken assumptions.

## Authoritative inputs

### Governing authority

- `.agents/AGENTS.md`
- `.agents/software-workflow.md`
- `.agents/tasks/_template.md`
- `docs/business/01-business-overview.md`
- `docs/business/02-user-stories.md`
- `docs/business/03-system-responsibilities.md`
- The approved repository-context philosophy in
  `faliqadlan/agent-work-governance` `templates/software/.agents/context/project.md`,
  used as a design constraint rather than copied authority.

### Requirement traceability

- Context package objective → this validated task and the three accepted business sources above
- Module ownership and boundaries → `docs/business/03-system-responsibilities.md` and the current MHCS Core technical documents as observed evidence
- Actor, role, interaction, and result-delivery terminology → `docs/business/01-business-overview.md`, `docs/business/02-user-stories.md`, and the observed prior MHCS Core UI-language material
- MPIPS boundary → `docs/business/03-system-responsibilities.md` and the observed prior MHCS Core project/Image Gateway material; detailed MPIPS authority remains under `docs/technical/mpips/`

Business documents are authority to reference, not text to duplicate. Existing
technical documents and implementation-facing material are evidence to assess;
they do not retroactively define intended behavior.

## Scope

### In scope

- Inventory and classify all material in the existing `docs/technical/mhcs-core/` tree, including `project.md`, `ui-language.md`, module documents, `design/`, `root/`, and `tasks/`, before retiring that duplicate active structure.
- Create and populate the designated copy-ready `docs/technical/mhcs-core-context/` folder with a concise root entrypoint, UI-language context, four module contexts, an mhcs-core-side MPIPS integration context, and only justified design context/assets.
- Make `docs/technical/mhcs-core-context/project.md` a concise orientation map containing repository identity/purpose, delivery state, intended-authority map, observed-implementation-evidence map, high-level boundaries, integrations, scoped routing, material constraints, and relevant open decisions.
- Represent system context and high-level internal boundaries: Member, Authorized B2B Representative/Business Customer where relevant, Site Staff, Doctor, Global Admin, MHCS, Messaging, payment/external capabilities, government/interoperability systems where relevant, MPIPS, and other material external systems; and `mhcs-core` boundaries for Member Core, Operator Core, Doctor Core, and Image Gateway.
- Keep each module context short and responsibility-focused, using a common grammar such as Purpose, Owns, Does Not Own, important business/authorization boundaries, interaction surfaces, dependencies, authority references, observed implementation evidence, and open decisions.
- Preserve the material orientation that Member Core coordinates members and Messaging, uses a temporary result surface where needed, has no permanent conventional Member Portal requirement, does not make Guardian automatically the Result Recipient, and respects identity/result authority.
- Preserve Operator Core as an internal module name; use Site Staff for human actors; retain the three canonical roles (Reception / Registration, Basic Examination, Radiography), role → eligibility → assignment → authorized workspace, Temporary Site Workspace, and applicable radiography image/DICOM authority.
- Preserve Doctor as an umbrella actor; distinguish Radiologist and Authorized Specialist; retain Temporary Clinical / DICOM Workspace, professional/specialty/service authorization, assignment/case scope, radiologist quality and controlled-repeat responsibility, report lifecycle ownership, and handoffs.
- Preserve Image Gateway as the durable clinical-binary boundary, controlled image-access and processing coordinator, manifest/integrity boundary where material, storage/trust/security boundary, and sole `mhcs-core` caller of MPIPS; remove low-level algorithm, controller, attempt-counter, and exact retry mechanics from default context unless a responsibility/contract requires them.
- Create an mhcs-core-side `integrations/mpips/project.md` describing only the Image Gateway → MPIPS boundary, high-level input/output, patient/business-authority separation, trust boundary, responsibility split, and where detailed MPIPS authority lives. Do not duplicate MPIPS architecture.
- Perform a semantic simplification audit of `ui-language.md`, retaining canonical actors/roles, Bahasa Indonesia conventions, clinical/safety wording, Interaction Surface terminology, and important prohibited/stale terms while reducing duplicated explanations, obsolete screens, redundant examples, and UI recipes; remove dependencies on retired source paths.
- Classify `design/DESIGN.md`, `mhcs-core-design.html`, and `mhcs-logo.svg`; retain only concise valid visual-system context and a required visual asset, move useful historical evidence outside `docs/technical/mhcs-core-context/`, and prevent illustrative/stale screens from becoming behavioral authority.
- Preserve copy portability: use repository identity plus stable paths for cross-repository references, avoid source-repository-relative links that break after copy, avoid hard-coded evergreen commit assumptions, and do not create a source `README.md` that overwrites the target-managed `.agents/context/README.md`.
- Move the existing classification record to `docs/technical/mhcs-core-context-classification.md`, outside the payload, and deliberately classify every removed, moved, or retained material as `KEEP / PROMOTE`, `REFERENCE`, `IMPLEMENTATION EVIDENCE`, `ARCHITECTURE DECISION`, `OPEN DECISION`, or `RETIRE`; no unique material may be silently lost.
- Reconcile repository-wide references affected by the path change, including README links, repository-context routing, Markdown links, task/reference material, and `website/test_site.py`, with only minimal necessary updates to the new canonical package path.

### Out of scope

- Any modification to `Madeena-software/mhcs-core`, its `.agents/context/`, or any other repository.
- Copying or overlaying the package into `mhcs-core`; the overlay check may use only a temporary directory.
- Modification of `docs/business/`, website product content/semantics, MPIPS implementation, application code, schema/database files, `main`, deployment/release, or the `.agents` governance framework outside this task file.
- Creating a full software specification, duplicating complete user stories/system responsibilities, full C4 component/code diagrams, low-level implementation manuals, or detailed payment, booking, report-state, retry, queue, NPZ, DICOM, controller, or route mechanics.
- Turning unresolved business, clinical, payment, identity, security, FHIR, or implementation choices into implied policy.
- Deployment, release, merge, PR creation, or external-system mutation.

### Preserved behavior and boundaries

- Business authority remains in `docs/business/`; context references it and does not redefine it.
- Intended authority and observed implementation evidence remain explicitly distinct.
- MHCS has exactly the two target repositories described by approved authority: `mhcs-core` and separate private `mpips`.
- Messaging is the persistent member coordination channel; richer result access may use a secure temporary result surface, not a permanent Member Portal.
- Site Staff authorization, doctor specialization boundaries, temporary workspaces, clinical binary ownership, the Image Gateway sole-caller MPIPS boundary, patient/business-authority separation, and HL7 FHIR R5 `5.0.0` remain intact where approved.
- Existing useful information is not silently deleted; information unsuitable for context is classified and retained, referenced, moved, or retired deliberately.

## Dependencies and assumptions

### Dependencies

- The three accepted business sources and current technical artifacts remain available for reconciliation.
- The target repository's `.agents/context/README.md` is target-managed and must not be overwritten by this package.
- `docs/technical/mpips/` remains the separate detailed MPIPS concern.

### Approved assumptions

- The package source is `mhcs-business-docs`; this task does not create or modify the target application repository.
- `docs/technical/mhcs-core-context/` is the single designated copy-ready folder; no classification, task, root-governance, source README, or other provenance material belongs inside it.
- `docs/technical/mpips/` remains separate and is not moved into the MHCS Core package.
- Current source documents may contain stale, illustrative, duplicated, or low-level material and must be assessed rather than trusted merely because they exist.

### Remaining approval requirements

- Any unresolved business, architecture, clinical, security, privacy, payment, identity, or interoperability decision must remain explicitly open and return to planning/authority approval rather than being resolved by the Executor.
- No approval beyond the task's existing authority is required for the bounded documentation changes; commit, push, release, and target-repository mutation remain prohibited to the Executor unless separately authorized.

## Required capabilities

- Repository read/write and local command execution
- Markdown, link, heading, terminology, and file-tree auditing
- Temporary-directory dry-run support without access to or mutation of `mhcs-core`

## Execution constraints

### Constraints

- Use existing repository terminology, authorities, and document patterns; do not add dependencies or new governance abstractions.
- Keep context concise and refreshable. If a detail can change during an internal refactor without changing responsibility, boundary, contract, quality attribute, security/trust boundary, or authorized behavior, it normally does not belong in context.
- Use references over duplicated authority. Label intended authority and observed implementation evidence separately in every context where both appear.
- Do not use current implementation to claim intended conformance, or approved requirements to claim implementation conformance.
- Retire the duplicate active `docs/technical/mhcs-core/` structure after accepted material has been promoted; do not preserve a full duplicate archive merely for convenience because Git history preserves historical versions.
- Do not retain `docs/technical/mhcs-core/root/AGENTS.md` or `docs/technical/mhcs-core/tasks/` artifacts inside the payload; classify them outside the payload and assess whether they should be preserved, moved, or retired.
- Do not make the package's complete copy operation depend on files outside `docs/technical/mhcs-core-context/`, except for clearly labeled cross-repository authority references that remain valid after copy.
- Update only references broken by the move; do not use the migration to rewrite unrelated README, website, or `.agents` content.

## Acceptance criteria

- [ ] Exactly one explicitly designated folder, `docs/technical/mhcs-core-context/`, is copy-ready for `mhcs-core/.agents/context/`; its complete contents can be overlaid without selecting, renaming, moving, nested `context/context` or `context/mhcs-core-context`, or copying task/root-governance files.
- [ ] The package contains the required root, UI-language, module, MPIPS integration, and justified design context artifacts, with no unrequested source `README.md` replacement for the target-managed README.
- [ ] `docs/technical/mhcs-core-context/project.md` is concise repository orientation and routing, not a detailed technical book or substitute for business authority, source code, architecture decisions, migrations, configuration, tests, or runtime evidence.
- [ ] The root and scoped contexts clearly separate intended authority from observed implementation evidence and point to the accepted business sources rather than duplicating them.
- [ ] Module contexts are concise, responsibility/boundary-focused, and preserve the required Member, Operator, Doctor, and Image Gateway distinctions and authorization/trust boundaries.
- [ ] `integrations/mpips/project.md` describes only the mhcs-core-side Image Gateway → MPIPS contract and routes detailed MPIPS authority elsewhere.
- [ ] UI language is materially simplified without losing canonical actor/role terminology, Bahasa Indonesia conventions, clinical/safety language, Interaction Surface terminology, or important prohibited/stale terminology.
- [ ] Design artifacts are classified so stale or illustrative HTML cannot become behavioral authority; valid `DESIGN.md` and `mhcs-logo.svg` are retained only when justified.
- [ ] The duplicate active `docs/technical/mhcs-core/` technical tree is retired, while all removed, moved, or retained material is deliberately classified in `docs/technical/mhcs-core-context-classification.md`; no material is silently lost.
- [ ] The classification record is outside the payload, `docs/technical/mpips/` remains separate, and the payload contains no source README that would overwrite the target-managed context README.
- [ ] Repository-wide references to retired paths are reconciled, including README, routing, Markdown, and website technical-path checks where applicable.
- [ ] README terminology presents `docs/technical/mhcs-core-context/` as the prepared/copy-ready repository-context package and no longer directs readers to retired `docs/technical/mhcs-core/project.md` or `docs/technical/mhcs-core/modules/...` paths.
- [ ] Copy portability has been verified, including no broken package-internal links or repository-relative assumptions after overlay.
- [ ] No changes are made to `docs/business/`, website product content/semantics, `mhcs-core`, MPIPS implementation, application code, `main`, deployment/release, or governance outside this task.

## Verification requirements

### Required checks

- `git diff --check`
- Repository-wide stale-path search for `docs/technical/mhcs-core/` and `docs/technical/mhcs-core/context/`
- Markdown relative-link target audit before and after moves
- Markdown heading/anchor audit for package links
- Copy-ready package file-tree audit against the designated structure and exclusions
- Copy-overlay dry run of `docs/technical/mhcs-core-context/.` into a temporary `.agents/context/` directory; confirm no extra nested directory, source README, classification file, or governance artifact; do not mutate the actual `mhcs-core` repository
- Authority-reference audit confirming business sources are referenced, not duplicated, and cross-repository references use stable repository identity/path wording
- Stale terminology audit, including Member Portal, Madeena Points, obsolete product/application names, and stale design behavior
- Duplicated-business-rule and technical-overdetail audits
- Context-versus-observed-evidence separation audit
- Stale-design-behavior audit covering `mhcs-core-design.html`
- README link audit and repository-context routing audit
- Classification/no-information-loss audit and context semantic regression audit
- Existing website/BPMN regression checks: `python3 website/test_site.py` and `python3 website/bpmn/test_bpmn.py`; report actual execution and result

### Required evidence

The Executor MUST report the exact implementation working-tree state or
revision, files changed, classification record, all commands executed, actual
outputs/results, package tree, overlay dry-run result, link/heading audit
result, any website/BPMN checks run, known gaps, and unresolved decisions.

## Stop conditions

The Executor MUST stop and return to planning when:

- required business or architecture authority is missing, contradictory, or materially changes;
- a source artifact's status cannot be classified without an unapproved authority decision;
- copy portability requires target-repository assumptions or mutation;
- the package cannot preserve a material security, privacy, clinical, interoperability, or ownership boundary concisely;
- the work would require changing `docs/business/`, another repository, governance, application code, or any excluded surface;
- acceptance or verification requires an unapproved external side effect;
- the implementation would become a detailed specification or materially broaden the objective.

The Executor MUST NOT silently reinterpret unresolved policy as context.

## Side-effect authorization

This task authorizes bounded documentation changes in `mhcs-business-docs` only.

### Explicitly authorized side effects

- Create, move, edit, classify, or retire documentation within the bounded objective in `mhcs-business-docs`.
- Run local read-only audits and a temporary-directory overlay dry run.

The task does not authorize commits, pushes, pull requests, target-repository
mutation, deployment, release, dependency changes, destructive operations,
secret access, or external-system mutation.

## Expected terminal outcome

### Review Required

Use when the context package is implemented in a reviewable working-tree or
immutable revision and all truthful verification evidence is available for
Planner/Reviewer evaluation.

### Planning Required

Use when a stop condition prevents safe completion. Report the blocking source,
authority, dependency, scope, acceptance, or portability issue and supporting
repository evidence. The Executor does not self-declare final acceptance.
