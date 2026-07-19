<!-- antigravity-code-agent-template:managed -->
# Project Context

**Status:** Verified
**Last verified:** 2026-07-19
**Repository checkpoint:** `main` working tree based on `05f511167026`

## Purpose

`mhcs-business-docs` explains the Madeena Health Care System (MHCS) as a
business service for non-technical readers. Its first documentation pack
describes the teleradiology journey, assigns responsibilities across five
application repositories, records SATUSEHAT as an unimplemented future
possibility, and separates verified current behavior from the target operating
model.

Evidence: `.agents/context/README.md`, `docs/01-business-overview.md`,
`docs/02-member-journey.md`, `docs/03-system-responsibilities.md`, and
`docs/04-satusehat-readiness.md`.

## Intended users

- Management and business teams use the pack to understand value, ownership,
  readiness, and gaps.
- Operational and clinical teams use it to understand who acts at each stage.
- Partners use it to understand system boundaries without needing source-code
  knowledge.
- Engineering uses the current-versus-target distinction to prevent planned
  integrations from being described as already available.

Evidence: the audience and reading guidance in `.agents/context/README.md`.

## Current capabilities and flows

- The repository provides an English four-document Markdown pack with a landing
  page, business overview, member journey, system map, readiness assessments,
  and glossary.
- The documentation records the verified current state as disconnected or
  partially connected application capabilities.
- The target journey covers booking, day-of-service operations, image
  capture through Grabber, automatic processing, optional third-party AI,
  separate doctor review, and independent result publication.
- Members choose AI only, doctor only, or both. Each successful selected result
  and the processed image are delivered as soon as available.
- Operator payment becomes eligible when image-gateway accepts a valid DICOM;
  downstream AI failure does not cancel payment.
- SATUSEHAT is documented as a future possibility, not an implemented
  capability or approved target commitment. Available material consists of
  proposed work and uncompleted submission templates.

Evidence: `.agents/context/README.md` and `docs/`.

## Technology stack

- Markdown is the source format.
- Mermaid diagrams are used for flows rendered by GitHub.
- Git provides change history and review.
- There is no application runtime, package manager, site generator, or PDF
  build system.

Evidence: repository tree and the absence of runtime manifests at this
checkpoint.

## Architecture and entry points

- `.agents/context/README.md` is the human entry point and reading guide.
- `docs/01-business-overview.md` defines the service, actors, boundaries, and
  vocabulary.
- `docs/02-member-journey.md` compares current and target journeys.
- `docs/03-system-responsibilities.md` records ownership, readiness, evidence,
  and gaps for the five application repositories.
- `docs/04-satusehat-readiness.md` records the unimplemented SATUSEHAT status,
  missing evidence, ownership boundary, and approval gates.
- `.agents/context/project.md` is the agent-facing, evidence-backed repository
  context.

## Commands

| Purpose | Command | Evidence | Verification status |
|---|---|---|---|
| Install | None | No dependency manifest exists | Not applicable |
| Develop | Edit Markdown files directly | Repository format | Not applicable |
| Test formatting | `git diff --check` | Git | Passed on 2026-07-19 |
| Check local links | Inspect every relative Markdown link target | Markdown sources | Passed on 2026-07-19 |
| Check GitHub rendering | Submit each document to the GitHub Markdown API in GFM mode | GitHub Markdown API | Not run for the four-document pack |
| Build | None | No generator or build manifest exists | Not applicable |

## Data and integrations

This repository stores documentation only. It does not process patient data,
clinical images, credentials, or integration payloads.

The current-state assessment was derived from these sibling checkouts:

- `/var/www/mhcs-member-core` at `main` / `452b1264fa6a`
- `/var/www/mhcs-operator-core` at `main` / `e520a8bada30`
- `/var/www/mhcs-image-gateway`, an empty `main` checkout with no commits
- `/var/www/mpips` at `adlan` / `a98ed1e6517f`

`/var/www/mhcs-doctor-core` was not present, and its implementation could not
be verified.

SATUSEHAT readiness was derived from reference material under the Member Core
and Operator Core `.agents/context/satusehat/` directories. Those repositories
document SATUSEHAT as not implemented; the facility list, declaration, security
assessment, manual, and sandbox evidence remain absent or template-only.

Evidence: Git checkpoint commands; member API controllers and routes; operator
front-desk, photo-booth, upload, model, and migration sources; MPIPS API,
worker, storage, and project context; image-gateway Git state.

## Repository conventions

- Use plain English and define unavoidable technical terms at first use.
- Label statements as **Current**, **Target**, **Unknown**, or **Future
  possibility**.
- Describe business responsibilities and handoffs, not internal APIs.
- Support diagrams with numbered prose so the documents remain understandable
  when Mermaid is not rendered.
- Never store credentials, patient identifiers, clinical images, or secret
  values in this repository.

## Constraints and hazards

- The source repositories change independently, so current-state claims can
  become stale and must retain verification dates and checkpoints.
- `mhcs-image-gateway` has no committed implementation in the available
  checkout.
- `mhcs-doctor-core` was unavailable for inspection.
- Operator-core currently writes images to S3-compatible storage but contains
  no verified gateway or MPIPS integration.
- Grabber behavior and its target data handoff were provided as business
  direction but were not verified from source.
- SATUSEHAT has no verified implementation, approved scope, owner, sandbox
  evidence, or completed submission package in the available repositories.
- External SATUSEHAT requirements, templates, links, and regulatory
  interpretation were not revalidated.
- MPIPS contains a credential-like value in a tracked research artifact. The
  value is not reproduced here; revocation and history cleanup are a separate
  security task.
- Business documentation must not be interpreted as medical, regulatory,
  security, or deployment guidance.

## Evidence provenance

- Member booking and handoffs: `/var/www/mhcs-member-core/routes/api.php`,
  `app/Http/Controllers/Api/V1/OperatorController.php`, and
  `app/Http/Controllers/Api/V1/ImagingResultWebhookController.php`.
- Day-of-service flow: `/var/www/mhcs-operator-core/app/Livewire/Radiographer/`
  and `app/Http/Controllers/Radiographer/UploadController.php`.
- Image processing: `/var/www/mpips/mpips/api/`,
  `/var/www/mpips/mpips/worker/`, and `/var/www/mpips/mpips/storage.py`.
- SATUSEHAT status:
  `/var/www/mhcs-member-core/.agents/context/satusehat/`,
  `/var/www/mhcs-operator-core/.agents/context/satusehat/`, and both verified
  project-context files.
- Repository availability and checkpoints were checked with Git on
  2026-07-19. No dependencies were installed and no external service was
  contacted.

## Proposed behavior

- Member-core supplies attendance and authorised examination data, owns the
  shared configurable daily walk-in limit, and supports AI-only, doctor-only,
  or combined booking choices.
- Operator-core manages front desk, arrival-order queues, examination flow,
  processed-image viewing, and completion-only notifications.
- Grabber obtains authorised member data from member-core, creates DICOM, and
  uploads it to image-gateway.
- Image-gateway validates DICOM, makes operator payment eligible, starts MPIPS
  processing automatically, routes selected AI/doctor work, and delivers each
  successful output independently.
- Third-party AI failures retry a limited number of times, then notify an
  administrator. The exact limit is undecided.
- SATUSEHAT remains a future possibility until its business scope, clinical/RME
  owner, data mappings, implementation, evidence, and approvals are agreed.
- After business review, the approved Markdown may become a static website and
  printable PDF from the same content.
- Detailed operating procedures, screenshots, API documentation, regulatory
  guidance, and technical architecture may be added only through separately
  approved work.

## Superseded facts

- The initial repository context was uninitialized and contained no verified
  project facts. This context replaces that placeholder.

## Known gaps

- Image-gateway and doctor-core behavior cannot yet be documented as current
  implementation.
- Grabber source and its member-core contract were not available for
  verification.
- AI retry count, operator-payment ledger ownership, walk-in payment, and
  doctor assignment remain undecided.
- The planned medical-record identifier is not yet verified against an exact
  standard or mapping.
- SATUSEHAT integration, sandbox verification, security evidence, facility
  list, signed declaration, and system manual are not available.
- No website or PDF delivery mechanism exists by design.

## Open questions

- What is the third-party AI retry limit?
- Which system owns operator-payment records and settlement?
- How are walk-in payment and doctor assignment handled?
- Where can Grabber and doctor-core implementations be inspected?
- What exact contracts connect member-core, operator-core, Grabber,
  image-gateway, MPIPS, and doctor-core?
- Will SATUSEHAT enter approved MHCS scope?
- Which clinical or RME application and business owner would be accountable for
  SATUSEHAT?
