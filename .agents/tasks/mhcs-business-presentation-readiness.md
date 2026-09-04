---
title: MHCS Business Presentation Readiness
document_id: AGENT-TASK-MHCS-PRESENTATION-001
version: 1.0
status: candidate-task
language: en-US
last_updated: 2026-09-04
scope:
  - website business-presentation readiness
  - curated primary presentation route and executive narrative
  - bilingual presentation support (English default, Bahasa Indonesia secondary)
  - external AI demo decoupling and failure-mode safety
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

Pak Wong, a business contact and relative of Stanley Wei, has been identified as a
key audience for an executive introduction and strategic alignment presentation
regarding MHCS's position in Indonesia–Oneness collaboration.

However, the existing `website/` is structured as an internal technical artifact
viewer rather than an executive presentation:
1. It opens with an artifact catalog and technical journey links that overwhelm a
   first-time business stakeholder with implementation-level detail before
   explaining the problem being solved or the business proposition.
2. Technical BPMN diagrams and low-level operator/staff handoffs obstruct the
   strategic continuous-care narrative.
3. The operational demonstrator currently hardcodes a literal external HTTP IP
   endpoint (`http://124.225.183.175:8361/` in `website/demonstrator/config.js`)
   and `.github/workflows/deploy-pages.yml` requires an `AI_DEMO_URL` secret,
   creating a fragile external dependency that risks presentation failure if the
   external server is unreachable, unconfigured, or offline.
4. The site is currently English-only, lacking Bahasa Indonesia support for key
   executive messaging and local Indonesian collaboration discussions.

This task exists to transform `website/` into a curated, confident, 10–15 minute
business-first presentation for Pak Wong, while preserving all existing detailed
Actor Journeys, infographics, and Technical BPMN as supporting evidence.

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

**Objective:** Transform the existing `website/` into a curated business-presentation
experience that can be confidently presented to Pak Wong in approximately 10–15
minutes, communicating the complete business narrative in a coherent sequence while
preserving existing detailed artifacts as accessible supporting evidence.

The primary presentation route must communicate, in a coherent sequence:
1. **The healthcare/service problem:** The structural geographical and specialist
   distribution challenges in Indonesia (fragmented service handoffs, specialist
   shortages at examination sites, citizen friction in preventive screening, and
   safety/consent gaps).
2. **What MHCS is:** An Indonesia-led healthcare orchestration and coordination
   platform—coordinating existing healthcare capabilities into continuous, reliable
   pathways rather than replacing health infrastructure, PACS, HIS/RME, or clinical
   judgement.
3. **The interaction model:** The `Messaging Interaction Surface → Temporary Secure Web → MHCS`
   model, explaining how citizens and staff engage through familiar channels without
   permanent portal logins or cumbersome app downloads.
4. **The current service slice:** The focused initial operational episode:
   `booking → on-site check-in & consent → basic examination → radiography capture → processing coordination → finalized result & optional specialist review`.
5. **Stakeholder value proposition:** Clear, articulated value for Members,
   healthcare sites (hospitals/Puskesmas), healthcare professionals
   (radiologists/specialists), business customers (B2B annual screening), and
   collaboration partners.
6. **Safe fictional demonstrator:** A guided, self-contained walkthrough of the
   current service slice using explicitly labeled fictional, non-clinical data.
7. **Evidence/status and claim boundaries:** Clear, transparent visual and textual
   distinction between verified/current capabilities, prototype/demonstrator behavior,
   validation-stage work, and future strategic continuous-care concepts.
8. **Collaboration framing:** Framing MHCS within the broader Indonesia–Oneness
   collaboration context.
9. **Closing ask:** An explicit request for Pak Wong's feedback on MHCS's position
   in Indonesia–Oneness collaboration and identifying an appropriate follow-up
   discussion involving Stanley Wei.

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
  - Audience: Pak Wong, business contact and relative of Stanley Wei.
  - Purpose: Business introduction and strategic alignment (not clinical validation,
    technical acceptance, certification, or an investment offer).
  - Desired closing outcome: Obtain Pak Wong's feedback on MHCS's position in
    Indonesia–Oneness collaboration and identify an appropriate follow-up discussion
    involving Stanley Wei.
  - Default presentation language: English.
  - Required additional language: Bahasa Indonesia.
  - Product abstraction: `Messaging Interaction Surface`.
  - WhatsApp positioning: Current reference channel for the Indonesian context, not an
    immutable universal product dependency.
  - Failure-mode safety: Fully usable without external AI server; live AI demo
    must be optional, explicitly labeled, and fail closed.

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
- Collaboration framing and closing discussion ask → Human-approved presentation direction

## Scope

### In scope

Bounded modifications to:
- `website/index.html`: Reorganize the primary landing page to deliver the curated
  9-part business presentation narrative, with seamless navigation to supporting
  evidence.
- Existing shared website CSS and JavaScript (e.g., `website/assets/journey.css` or
  modular presentation styles/scripts): Provide polished executive layout, responsive
  stepper/navigation, claim-boundary visual chips, and language-toggling behavior.
- Presentation-facing copy and navigation: Professional, executive-ready copy aligned
  strictly with approved business definitions.
- Language resources: English as coherent default, with complete Bahasa Indonesia
  translations for all material primary presentation sections.
- Existing demonstrator (`website/demonstrator/`): Safe configuration and failure-mode
  behavior (eliminate hardcoded literal IP address, ensure demo works cleanly in
  standalone/mock mode without external server, fail closed if an external server is
  configured but unreachable, maintain explicit fictional non-clinical labeling).
- Relevant infographics or journey pages: Minor copy or link adjustments only where
  required for presentation consistency.
- `website/test_site.py`: Extend tests to assert presentation integrity, bilingual
  support markers, clean configuration without literal IP dependencies, and local
  link validity.
- `website/bpmn/test_bpmn.py`: Verify only if BPMN integration or link anchors change.
- `.github/workflows/deploy-pages.yml`: Update workflow so deployment is safe and
  deterministic even if `AI_DEMO_URL` is omitted (optional rather than mandatory secret).
- Concise presentation/rehearsal documentation: A concise guide (e.g.,
  `website/PRESENTATION.md` or embedded presentation notes) providing a 10–15 minute
  rehearsal outline and speaking points for Pak Wong.

The Executor must discover and touch the smallest sufficient affected file set.

### Out of scope

- Changes to `Madeena-software/mhcs-core`, `mpips`, production clinical systems,
  or any external repository.
- Introduction or storage of real patient data, clinical images, credentials, or secrets.
- Invention of pricing schedules, fee amounts, revenue forecasts, market-size
  projections, formal investment terms, regulatory approvals, clinical diagnostic
  claims, or production-readiness certifications.
- Modifying approved business authority under `docs/business/` or `docs/project.md`
  merely to simplify website presentation copy.
- Making WhatsApp the permanent universal product abstraction instead of
  `Messaging Interaction Surface`.
- Building a new production web application or introducing heavy build runtimes (e.g.,
  Node/npm/webpack/vite build pipelines).
- Merging to `main`, triggering production releases, or modifying server infrastructure.
- Deletion of existing Actor Journeys, infographics, Technical BPMN, or concept
  materials.

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

- The primary audience (Pak Wong) will view the presentation in English, but
  Bahasa Indonesia must be readily switchable for strategic clarity and local
  Indonesian alignment.
- The external AI demonstration server (`124.225.183.175` or similar) may be offline,
  firewalled, or unconfigured during a presentation; the website and demonstrator
  must remain completely functional and impressive without it.
- WhatsApp is the reference channel for the current Indonesian implementation, but
  the product abstraction remains `Messaging Interaction Surface`.

### Remaining approval requirements

- Candidate task review and formal validation by designated Planner/Reviewer.
- Review of executive presentation copy and Indonesian translation prior to
  presenting to Pak Wong.
- Designated human approval required before merging task branch to `main` or
  deploying to public GitHub Pages.

## Required capabilities

- Repository read and write.
- Local shell execution (`python3` for test verification and static web server).
- Browser inspection capability (for verifying responsive rendering across desktop,
  tablet, and mobile viewport widths).

## Execution constraints

- **Ponytail reuse discipline:** Reuse existing CSS patterns, structure, and design
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

## Acceptance criteria

- [ ] 1. A first-time business audience can follow the main story without opening
  Technical BPMN;
- [ ] 2. The main route clearly explains the business problem, MHCS proposition,
  current service slice, stakeholder value, evidence boundary, collaboration framing,
  and closing ask;
- [ ] 3. `Messaging Interaction Surface` is the durable product abstraction and
  WhatsApp is described only as the current/reference Indonesian channel where
  appropriate;
- [ ] 4. English is the coherent default and Bahasa Indonesia is available for all
  material primary-presentation content;
- [ ] 5. Terminology and claims remain consistent with current approved `docs/project.md`
  and `docs/business/*`;
- [ ] 6. Verified capability, prototype/demonstrator behavior, validation-stage work,
  and future concept are visually and textually distinguishable;
- [ ] 7. Fictional/non-clinical demonstration data remain explicit;
- [ ] 8. The primary presentation has no dependency on a literal HTTP IP address or
  an available external AI server;
- [ ] 9. An optional external demo fails closed and does not break the local
  presentation;
- [ ] 10. Existing supporting journey, infographic, and BPMN materials remain reachable;
- [ ] 11. All local links resolve;
- [ ] 12. Desktop presentation and representative mobile/tablet layouts have no
  material clipping, overflow, unreadable text, or broken navigation;
- [ ] 13. The main presentation route has a documented and rehearsable order suitable
  for approximately 10–15 minutes;
- [ ] 14. No patient data, credentials, secrets, or unsupported business/clinical
  claims are introduced.

## Verification requirements

### Required checks

- `git diff --check` (verify no trailing whitespace or formatting defects);
- `python3 website/test_site.py` (verify all pages, links, and content markers);
- `python3 website/bpmn/test_bpmn.py` (verify BPMN graph and flow integrity);
- Repository consistency check: Search-based comparison between website terminology
  and current approved `docs/project.md` and `docs/business/*`;
- Literal endpoint scan: Verify that no literal HTTP IP address (such as
  `124.225.183.175`) is required by `website/` or blocks execution;
- Local link validation: Ensure zero broken internal links across all pages;
- Responsive browser inspection: Rendered verification at presentation-laptop width
  (1280px–1440px), tablet width (768px), and mobile width (375px);
- Rehearsal walkthrough: Complete manual walkthrough following the 10–15 minute
  documented presentation order;
- `git status --short` and exact diff inspection.

### Required evidence

The Executor MUST report:
- Implementation revision or exact working-tree state;
- Commands and checks actually executed and observed outputs;
- Rendered visual layout observations across target viewports;
- Tests added, updated, or verified;
- Known verification gaps, deviations, or non-blocking observations;
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
- Bounded local commits on the `docs/mhcs-business-presentation-readiness` task
  branch.

### Strictly prohibited side effects

- Direct commits to `main`;
- Force-pushes or history rewriting;
- Merging to `main` or triggering production releases;
- Deploying live GitHub Pages without explicit human approval;
- Modifying the stale `docs/mhcs-product-model-reset` branch;
- Changes to other repositories (`mhcs-core`, `mpips`, etc.);
- External infrastructure or network mutations.

## Expected terminal outcome

### Review Required

Use when the presentation route is fully implemented, bilingual support is active,
the demonstrator is decoupled and fails closed, all 14 acceptance criteria are met,
and observed verification evidence is documented for Reviewer inspection.

### Planning Required

Use if any stop condition is encountered during implementation.
