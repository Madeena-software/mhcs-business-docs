---
title: MHCS Business Presentation Readiness
document_id: AGENT-TASK-MHCS-PRESENTATION-001
version: 1.2
status: candidate-task
language: en-US
last_updated: 2026-09-04
scope:
  - website business-presentation readiness
  - reusable general-audience presentation template and executive narrative
  - bilingual presentation support (English default, Bahasa Indonesia parity)
  - external AI demo decoupling and failure-mode safety
  - evidence-calibrated language and health-system positioning
  - supporting actor journey, infographic, and technical BPMN preservation
authority_note: This task authorizes only the bounded website presentation and consistency work defined here in mhcs-business-docs. It does not authorize changes to mhcs-core, MPIPS, production clinical systems, patient data, business authority, release, or deployment.
---

# Executable Task

## Task identity

**Task title:** MHCS Business Presentation Readiness

**Task path:** `.agents/tasks/mhcs-business-presentation-readiness.md`

**Task contract state:** `Validated/Published` (Candidate published for Planner/Reviewer validation)

**Delivery objective / Work Package / MVP:** MHCS business-first presentation readiness / `WP-PRES-001`

**Owner / designated planning authority:** Designated MHCS Product/Architecture Authority / Repository Planner

This is one coherent umbrella contract. Execution MAY use bounded implementation
slices, but MUST preserve one objective, one acceptance boundary, and one
integrated presentation outcome. The Executor MUST NOT invent business, product,
clinical, commercial, regulatory, pricing, partnership, or investment authority.

## Delivery context

The repository currently serves as the product and business authority for MHCS,
with supporting journey maps, technical BPMN workflows, and an operational
demonstrator under `website/`.

Human Intent has established that the presentation must serve as a reusable,
business-first MHCS presentation template for general business, healthcare,
institutional, governmental, academic, and prospective collaboration stakeholders.
It must not be personalized to any named person, organization, private relationship,
or particular meeting.

However, the existing `website/` was originally structured as an internal technical
artifact viewer rather than an executive presentation:
1. It opens with an artifact catalog and technical journey links that overwhelm a
   first-time business stakeholder with implementation-level detail before
   explaining the problem being solved or the business proposition.
2. Technical BPMN diagrams and low-level operator/staff handoffs obstruct the
   strategic continuous-care narrative.
3. The operational demonstrator originally hardcoded a literal external HTTP IP
   endpoint (`http://124.225.183.175:8361/` in `website/demonstrator/config.js`)
   and `.github/workflows/deploy-pages.yml` required an `AI_DEMO_URL` secret,
   creating a fragile external dependency that risks presentation failure if the
   external server is unreachable, unconfigured, or offline.
4. The operational demonstrator and strategic concept already contained bilingual
   English/Bahasa Indonesia support, but the main landing page, supporting journey
   surfaces, and overall executive presentation route did not provide coherent
   bilingual coverage. The required outcome is complete bilingual parity for all
   material content in the primary business-presentation route, without unnecessary
   translation of every historical or deeply technical supporting artifact.
5. Content formulations must use evidence-calibrated language rather than
   unsupported absolute guarantees, and health-system positioning must explicitly
   clarify that MHCS coordinates workflow handoffs without replacing clinicians,
   facilities, PACS, HIS/RME, or national health infrastructure (SATUSEHAT).

This task exists to transform `website/` into a curated, confident, 10–15 minute
reusable business-first presentation template for general stakeholders, while
preserving all existing detailed Actor Journeys, infographics, and Technical BPMN
as supporting evidence.

## Baseline and task revision

**Implementation baseline:** `cae4ddc09a69fa05a0f70d20d77cd46a384e858c`

**Task revision:** the exact immutable Git revision containing this published
file; resolve it from the publication commit before execution.

The implementation baseline is the verified `main` revision
`cae4ddc09a69fa05a0f70d20d77cd46a384e858c`, which contains the approved
`Messaging Interaction Surface` model enhancements across `docs/business/` and
`docs/project.md`.

Execution MUST start from the publication commit containing this contract and
preserve publication history. Do not change the implementation baseline
silently during execution. If baseline drift or intervening repository changes
materially affect this task, stop and return to planning.

## Objective

**Objective:** Create a reusable, business-first MHCS presentation template for general
business, healthcare, institutional, governmental, academic, and prospective
collaboration stakeholders, presentable in approximately 10–15 minutes, communicating
the complete business narrative in a coherent sequence while preserving existing
detailed artifacts as accessible supporting evidence.

The presentation must be understandable without knowledge of a particular person,
relationship, organization, or meeting.

The primary presentation route must communicate, in a coherent sequence:
1. **The healthcare-service coordination problem:** The structural geographical and
   specialist distribution challenges in Indonesia (fragmented service handoffs,
   specialist shortages at examination sites, citizen friction in preventive
   screening, and safety/consent gaps).
2. **What MHCS is:** An Indonesia-led healthcare orchestration and coordination
   platform—coordinating existing healthcare capabilities into continuous, reliable
   pathways rather than replacing health infrastructure, PACS, HIS/RME, or clinical
   judgement.
3. **The interaction model:** The `Messaging Interaction Surface → Temporary Secure Web → MHCS`
   model, explaining how citizens and staff engage through familiar channels without
   permanent portal logins or cumbersome app downloads.
4. **The current service slice:** The focused initial operational episode:
   `booking → on-site check-in & consent → basic examination → radiography capture → processing coordination → finalized result & optional specialist review`.
5. **Potential stakeholder value:** Clear, articulated potential value for Members,
   healthcare sites (hospitals/Puskesmas), healthcare professionals
   (radiologists/specialists), business customers (B2B annual screening), and
   collaboration partners.
6. **Safe fictional demonstrator:** A guided, self-contained walkthrough of the
   current service slice using explicitly labeled fictional, non-clinical data.
7. **Capability maturity and claim boundaries:** Clear, transparent visual and textual
   distinction between verified/current capabilities, prototype/demonstrator behavior,
   validation-stage work, and future strategic continuous-care concepts.
8. **General collaboration opportunities:** General collaboration opportunities
   (English: `Collaboration Opportunities`, Bahasa Indonesia: `Peluang Kolaborasi`),
   framing potential collaboration models without naming or implying a specific
   recipient, organization, endorsement, commitment, or commercial agreement.
9. **Neutral discussion and next steps:** A neutral closing section (English:
   `Discussion and Next Steps`, Bahasa Indonesia: `Diskusi dan Langkah Berikutnya`)
   whose purpose is to:
   - invite feedback on the MHCS proposition;
   - identify capabilities requiring further evaluation;
   - identify relevant collaboration areas;
   - agree on the next appropriate demonstration, evidence review, workflow
     validation, technical assessment, or discussion.
   Do not name or imply a specific recipient or organization.

Detailed Actor Journeys, infographics, and Technical BPMN must remain reachable as
supporting materials, but must not obstruct or replace the primary business
narrative.

## Authoritative inputs

### Governing authority

- `AGENTS.md` (Codex Runtime Adapter)
- `.agents/AGENTS.md` (Repository AI Delivery Contract)
- `.agents/software-workflow.md` (Runtime-Neutral Software Delivery Protocol)
- `.agents/context/project.md` (Repository Context Entrypoint)
- `docs/project.md` (MHCS Core Product Context)
- `docs/business/01-business-overview.md` (Business Overview and Actor Journeys)
- `docs/business/02-user-stories.md` (User Stories and Acceptance Criteria)
- `docs/business/03-system-responsibilities.md` (System Responsibilities and Architecture)
- Human-approved presentation direction:
  - Audience: General business, healthcare, institutional, governmental, academic,
    and prospective collaboration stakeholders.
  - Reusable template: A reusable general-audience presentation template understandable
    without knowledge of a particular person, relationship, organization, or meeting.
  - Purpose: Business introduction and strategic alignment (not clinical validation,
    technical acceptance, certification, commercial partnership commitment, or an
    investment offer).
  - Desired closing outcome: Neutral discussion and next steps—invite feedback on the
    MHCS proposition, identify capabilities requiring further evaluation, identify
    relevant collaboration areas, and agree on the next appropriate demonstration,
    evidence review, workflow validation, technical assessment, or discussion.
  - Required neutral section framing:
    - English: `Collaboration Opportunities` / Bahasa Indonesia: `Peluang Kolaborasi`
    - English: `Discussion and Next Steps` / Bahasa Indonesia: `Diskusi dan Langkah Berikutnya`
  - Default presentation language: English.
  - Required additional language: Bahasa Indonesia (complete parity for material
    primary-route content).
  - Product abstraction: `Messaging Interaction Surface`.
  - WhatsApp positioning: Current reference channel for the Indonesian context, not an
    immutable universal product dependency.
  - Failure-mode safety: Fully usable without external AI server; live AI demo
    must be optional, explicitly labeled, and fail closed.

### Evidence-calibrated language requirements

Future implementation MUST use evidence-calibrated wording across all presentation
surfaces:
- Preferred formulations include:
  - `MHCS is designed to help coordinate...`
  - `MHCS aims to make responsibilities, service status, handoffs, and next actions more visible...`
  - `MHCS may support collaboration...`
  - `The current demonstrator illustrates...`
  - `This capability remains under validation...`
  - `Production integration has not been established unless verified evidence is available.`
- Prohibited unsupported formulations include:
  - `MHCS guarantees...`
  - `MHCS eliminates...`
  - `MHCS has proven...`
  - `MHCS is fully integrated with...`
  - `MHCS is officially partnered with...`
  - `MHCS replaces...`
  unless the exact claim is supported by approved authority and observed evidence.

### Health-system positioning requirements

The presentation MUST explicitly state that MHCS does not replace:
- healthcare professionals or clinical judgement;
- healthcare facilities;
- PACS;
- hospital information systems (HIS/SIMRS);
- electronic medical records (EMR/RME);
- SATUSEHAT or national health infrastructure.

MHCS must be described as coordinating service journeys at the workflow and interaction
level within its authorized scope.

Any interoperability statement must remain conditional on applicable standards,
authorization, governance, configuration, validation, and actual implementation
evidence.

Do not claim production SATUSEHAT integration merely because SATUSEHAT uses
FHIR or because MHCS defines an interoperability direction.

### Requirement traceability

- Healthcare problem and MHCS identity → `docs/project.md` (§ Purpose) and
  `docs/business/01-business-overview.md` (Intro)
- Product abstraction (`Messaging Interaction Surface`, `Temporary Secure Web`, `Admin Web`) →
  `docs/business/01-business-overview.md` (§ Strategic product),
  `docs/business/03-system-responsibilities.md` (§ Module boundaries), and
  `docs/project.md`
- Current service slice definition → `docs/project.md` (§ Intended Future Direction) and
  `docs/business/01-business-overview.md` (§ End-to-end service flow)
- Stakeholder value and actor responsibilities → `docs/business/01-business-overview.md`
  (§ People, systems, and responsibilities) and `docs/business/02-user-stories.md`
- Claim boundaries and non-clinical demo safety → `docs/business/01-business-overview.md`
  and human-approved presentation direction
- Decoupling of external AI server and fail-closed demo behavior → Human-approved
  presentation direction and `.github/workflows/deploy-pages.yml`
- General collaboration framing and neutral closing discussion ask → Human-approved
  presentation direction
- Evidence calibration and health-system positioning boundaries → Human-approved
  presentation direction

## Scope

### In scope

Bounded modifications to:
- `website/index.html`: Reorganize the primary landing page to deliver the curated
  9-part general-audience business presentation template, with neutral sections
  (`Collaboration Opportunities` / `Peluang Kolaborasi` and `Discussion and Next Steps` /
  `Diskusi dan Langkah Berikutnya`), with seamless navigation to supporting evidence.
- Existing shared website CSS and JavaScript (e.g., `website/assets/presentation.css`
  and `website/assets/presentation.js`): Provide polished executive layout, responsive
  stepper/navigation, claim-boundary visual chips, and language-toggling behavior.
- Presentation-facing copy and navigation: Professional, executive-ready copy aligned
  strictly with approved business definitions, free of individualized recipient names
  or private relationship references, and using evidence-calibrated language.
- Language resources: English as coherent default, with complete Bahasa Indonesia
  translations for all material primary presentation sections.
- Existing demonstrator (`website/demonstrator/`): Safe configuration and failure-mode
  behavior (eliminate hardcoded literal IP address, ensure demo works cleanly in
  standalone/mock mode without external server, fail closed if an external server is
  configured but unreachable, maintain explicit fictional non-clinical labeling).
- Relevant infographics or journey pages: Minor copy or link adjustments only where
  required for presentation consistency.
- `website/test_site.py`: Extend tests to assert presentation integrity, general-audience
  markers, absence of prohibited personalized names, calibrated language checks,
  bilingual support markers, clean configuration without literal IP dependencies, and
  local link validity.
- `website/bpmn/test_bpmn.py`: Verify only if BPMN integration or link anchors change.
- `.github/workflows/deploy-pages.yml`: Ensure deployment is safe and deterministic even
  if `AI_DEMO_URL` is omitted (optional rather than mandatory secret).
- Concise presentation/rehearsal documentation: A concise guide (e.g.,
  `website/PRESENTATION.md` or embedded presentation notes) providing a general-audience
  10–15 minute rehearsal outline and speaking points suitable for any prospective
  business, healthcare, or institutional stakeholder.

The Executor must discover and touch the smallest sufficient affected file set.

### Out of scope

- Changes to `Madeena-software/mhcs-core`, `mpips`, production clinical systems,
  or any external repository.
- Introduction or storage of real patient data, clinical images, credentials, or secrets.
- Invention of pricing schedules, fee amounts, revenue forecasts, market-size
  projections, formal investment terms, regulatory approvals, clinical diagnostic
  claims, production-readiness certifications, or commercial partnership agreements.
- Modifying approved business authority under `docs/business/` or `docs/project.md`
  merely to simplify website presentation copy.
- Making WhatsApp the permanent universal product abstraction instead of
  `Messaging Interaction Surface`.
- Building a new production web application or introducing heavy build runtimes (e.g.,
  Node/npm/webpack/vite build pipelines).
- Merging to `main`, triggering production releases, or modifying server infrastructure.
- Deletion of existing Actor Journeys, infographics, Technical BPMN, or concept
  materials.
- Personalizing presentation materials to named individuals, private relationships,
  or specific prospective partner entities.
- Rewriting historical Git commits or force-pushing.

### Preserved behavior

- All existing Actor Journeys (`website/journeys/*`), infographics
  (`website/infographics/*`), Technical BPMN (`website/bpmn/*`), and strategic
  concept (`website/concept/*`) must remain reachable and functional as supporting
  materials.
- All internal relative links across the website must continue to resolve cleanly.
- Static site architecture: The site must continue to run locally via Python's
  built-in HTTP server (`python3 -m http.server`) without an external build step.
- Python standard library test execution must continue to pass.

## Dependencies and assumptions

### Dependencies

- Python 3 standard library for local testing and static preview.
- GitHub Pages environment for preview deployment (workflow-dispatch triggered).

### Approved assumptions

- Prospective stakeholders will view the presentation in English, but
  Bahasa Indonesia must be readily switchable for strategic clarity and local
  Indonesian alignment.
- The external AI demonstration server (`124.225.183.175` or similar) may be offline,
  firewalled, or unconfigured during a presentation; the website and demonstrator
  must remain completely functional and impressive without it.
- WhatsApp is the reference channel for the current Indonesian implementation, but
  the product abstraction remains `Messaging Interaction Surface`.

### Remaining approval requirements

- Candidate task review and formal validation by designated Planner/Reviewer.
- Review of general-audience presentation copy and Indonesian translation prior to
  presenting to external stakeholders.
- Designated human approval required before merging task branch to `main`,
  creating pull requests unless separately authorized, or deploying to public GitHub Pages
  (automatic fast-forward push to `origin/docs/mhcs-business-presentation-readiness`
  is explicitly authorized for bounded implementation execution).

## Required capabilities

- Repository read and write.
- Local shell execution (`python3` for test verification and static web server).
- Browser inspection capability (for verifying responsive rendering across desktop,
  tablet, and mobile viewport widths).

## Execution constraints

- **Repository reuse discipline:** Reuse existing CSS patterns, structure, and design
  tokens where feasible. Do not introduce bloated external CSS/JS frameworks or
  unnecessary third-party dependencies.
- **Pure static delivery:** Vanilla HTML, CSS, and lightweight JavaScript. No
  external build steps, compilers, or package managers required.
- **Multi-viewport responsive layout:** The presentation must render cleanly on
  presentation laptops (1280px–1440px+), tablets (768px–1024px), and mobile devices
  (375px–414px) with zero horizontal overflow, clipped text, or broken navigation.
- **Visual claim boundaries:** Clear visual badges/chips distinguishing:
  - *Verified / Current Capability*
  - *Prototype / Demonstrator Behavior*
  - *Validation-Stage Work*
  - *Future Strategic Concept*
- **Fail-closed demonstrator:** The demonstrator must default to self-contained
  fictional data, explicitly indicate when external AI is disconnected, and fail
  closed without degrading the local experience.
- **Evidence-calibrated language:** Use calibrated formulations (`designed to help coordinate`,
  `aims to make visible`, `may support`, `under validation`, `illustrates`); strictly avoid
  unsupported absolute claims (`guarantees`, `eliminates`, `fully integrated`, `official partner`,
  `replaces`).
- **Health-system positioning:** Clearly position MHCS as workflow coordination; explicitly
  state non-replacement of clinicians, facilities, PACS, HIS/RME, and SATUSEHAT.

## Acceptance criteria

- [ ] 1. The primary presentation works as a reusable MHCS business template;
- [ ] 2. It does not depend on knowledge of a named person, organization, private
  relationship, or particular meeting;
- [ ] 3. Active presentation content contains no references to:
  - `Pak Wong`;
  - `Stanley Wei`;
  - `Oneness`;
  - `Indonesia–Oneness`;
- [ ] 4. The prohibited-name restriction applies across:
  - English primary-route content;
  - Bahasa Indonesia primary-route content;
  - headings;
  - metadata and descriptions;
  - presentation/rehearsal notes;
  - tests and expected markers;
  - collaboration and closing sections;
- [ ] 5. Collaboration content (English: `Collaboration Opportunities`, Bahasa Indonesia:
  `Peluang Kolaborasi`) does not name specific partner entities and does not imply an
  existing partnership, endorsement, commitment, or commercial agreement;
- [ ] 6. The closing section (English: `Discussion and Next Steps`, Bahasa Indonesia:
  `Diskusi dan Langkah Berikutnya`) neutrally invites feedback, identifies evaluation
  capabilities, identifies collaboration areas, and agrees on next discussion/validation
  steps without naming or implying a specific recipient or organization;
- [ ] 7. Benefits are presented as intended or potential value using evidence-calibrated
  language (`designed to help coordinate`, `aims to make visible`, `may support`,
  `under validation`), avoiding unsupported absolute statements (`guarantees`, `eliminates`,
  `fully integrated`, `official partner`, `replaces`);
- [ ] 8. Health-system positioning explicitly states that MHCS does not replace healthcare
  professionals, clinical judgement, healthcare facilities, PACS, HIS/SIMRS, EMR/RME,
  or SATUSEHAT, and any interoperability statements remain conditional;
- [ ] 9. Current capability, prototype/demonstrator behavior, validation-stage work,
  and future concept remain visually and textually distinguishable;
- [ ] 10. The reusable template retains English default and complete Bahasa Indonesia
  parity across all material primary presentation sections;
- [ ] 11. Technical supporting artifacts (Actor Journeys, infographics, Technical BPMN,
  strategic concept) remain reachable and functional without obstructing the primary narrative;
- [ ] 12. Fictional/non-clinical demonstration data remain explicit;
- [ ] 13. Offline-safe demonstrator behavior and external-AI decoupling remain intact
  with zero dependency on literal HTTP IP endpoints, and optional external demo fails closed;
- [ ] 14. `Messaging Interaction Surface` is the durable product abstraction and
  WhatsApp is described only as the reference Indonesian channel where appropriate;
- [ ] 15. All local internal links resolve and automated test suites pass;
- [ ] 16. Desktop presentation and representative mobile/tablet layouts render cleanly
  with no horizontal overflow, clipped text, or broken navigation;
- [ ] 17. The primary presentation route has a documented general-audience rehearsal outline
  suitable for approximately 10–15 minutes;
- [ ] 18. No patient data, credentials, secrets, or unsupported business/clinical claims
  are introduced.

## Verification requirements

### Required checks

Future implementation remediation MUST perform and report:
- Case-insensitive scan of current active deliverable files for prohibited names:
  - `Pak Wong`
  - `Stanley Wei`
  - `Oneness`
  - `Indonesia-Oneness` (and `Indonesia–Oneness`)
  (Search findings must be evaluated contextually; prohibited names in historical immutable
  Git commits or superseded task revisions are not current-deliverable defects and must
  not trigger history rewriting);
- Scan for unsupported absolute statements:
  - `guarantees`
  - `eliminates`
  - `fully integrated`
  - `official partner`
  - `replaces`
- English and Bahasa Indonesia parity verification across all primary presentation sections;
- Automated test suite execution:
  - `python3 website/test_site.py`
  - `python3 website/bpmn/test_bpmn.py`
- Local link verification ensuring zero broken internal links;
- Literal endpoint scan verifying zero hardcoded literal HTTP IP addresses;
- Rendered browser inspection across presentation laptop (1280px–1440px), tablet (768px),
  and mobile (375px) viewports;
- Complete generic-audience presentation walkthrough following the 10–15 minute
  rehearsal order;
- Exact diff and repository status inspection (`git diff --check`, `git status --short`).

### Required evidence

The future Executor MUST report:
- Actual execution-start SHA;
- Implementation commit SHA;
- Remote branch SHA;
- Push result;
- Confirmation that local and remote SHAs match;
- Exact changed-file list and diff summary;
- Observed verification evidence (commands and checks actually executed, observed outputs,
  and rendered visual layout observations across target viewports);
- Tests added, updated, or verified;
- Known verification gaps, deviations, or non-blocking observations;
- Confirmation that `main` was not modified;
- Explicit distinction between local verification and CI or deployed-site evidence.

Do not claim deployment, browser rendering, CI, or live-demo readiness unless that
exact evidence was observed.

## Stop conditions

The Executor MUST stop implementation and return the issue to planning when:
- Current approved business authority materially conflicts with the presentation
  direction;
- Repository state contains unsafe or unfamiliar work that cannot be preserved;
- A pricing, partnership, investment, regulatory, clinical, security, or
  production claim would need new human authority;
- Safe handling of the external AI demo requires credentials, infrastructure
  mutation, or another unapproved side effect;
- The required task cannot be made reviewable within this repository and scope;
- Implementation reveals an unanticipated need to modify `mhcs-core`, MPIPS, or
  production infrastructure.

## Side-effect authorization

### Explicitly authorized side effects for task implementation

- Bounded edits to `website/index.html`, shared website CSS and JavaScript,
  `website/demonstrator/`, `website/test_site.py`, `.github/workflows/deploy-pages.yml`,
  and presentation/rehearsal documentation.
- Local command execution for testing (`python3 website/test_site.py`, etc.) and
  local HTTP serving.
- Automatically commit bounded implementation work on the
  `docs/mhcs-business-presentation-readiness` task branch.
- Automatically push implementation commits to
  `origin/docs/mhcs-business-presentation-readiness` using normal fast-forward push
  only (Git push to this specifically authorized implementation branch is
  explicitly authorized and not prohibited by general external/network-mutation
  restrictions).
- Verify that `origin/docs/mhcs-business-presentation-readiness` resolves to the
  reported implementation commit SHA.
- Return the exact local and remote implementation SHAs for Planner/Reviewer
  inspection.

### Strictly prohibited side effects

- Direct commits or pushes to `main`;
- Force-push or history rewriting on any branch;
- Merging to `main` or triggering production releases;
- Pull-request creation unless separately authorized;
- Deploying live GitHub Pages without explicit human approval;
- Modifying the stale `docs/mhcs-product-model-reset` branch;
- Changes to unrelated branches or other repositories (`Madeena-software/mhcs-core`,
  `mpips`, etc.);
- Production or external-infrastructure mutations (excluding the specifically authorized
  fast-forward Git push to `origin/docs/mhcs-business-presentation-readiness`).

## Expected terminal outcome

### Review Required

Use when the presentation route is fully implemented as a reusable general-audience
template, bilingual support is active, the demonstrator is decoupled and fails closed,
all 18 acceptance criteria are met, the implementation is committed and fast-forward
pushed to `origin/docs/mhcs-business-presentation-readiness`, and all required execution
evidence (including verified matching local and remote SHAs) is reported for
Planner/Reviewer inspection.

### Planning Required

Use if any stop condition is encountered during implementation.
