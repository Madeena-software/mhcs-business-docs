<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 21 August 2026

This repository is the business documentation source for the MHCS
teleradiology service.

## Core documents

| Document | Purpose |
|---|---|
| [MHCS Core product context](docs/project.md) | Product context entry point, purpose, actors, interaction model, and authority boundaries |
| [Business overview and actor journeys](docs/business/01-business-overview.md) | End-to-end business flow, actor journeys, responsibilities, and rules |
| [Business user stories](docs/business/02-user-stories.md) | Human intent, value, acceptance criteria, and journey traceability |
| [System responsibilities](docs/business/03-system-responsibilities.md) | Ownership, collaboration, access, payment triggers, and the FHIR R5 boundary |

## Product Authority for MHCS Core

This repository serves as the definitive **Product Authority Repository** for MHCS.

`Madeena-software/mhcs-core` is the application implementation repository. An AI coding agent or developer working on `mhcs-core` receives:
- `docs/project.md` (MHCS Core Product Context entry point)
- `docs/business/*` (Detailed Business and Product Authority)

into its `.agents/context/` directory to understand product intent, human workflows, actor authority, and safety boundaries before inspecting implementation evidence. Technical implementation details (architecture, framework, database, APIs, and deployment) are owned directly within `mhcs-core`.

## Previewing the website

To view and preview the actor journey maps and technical BPMN diagrams locally:

```bash
python3 -m http.server --directory website 8000
```
Or navigate into the `website` directory and run:
```bash
cd website && python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

## Boundary

This repository contains documentation only. It must not contain patient data,
clinical files, credentials, secrets, application code, or live deployment
configuration.
