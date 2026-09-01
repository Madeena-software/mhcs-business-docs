<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Business decisions reviewed:** 21 August 2026

This repository is the business documentation source for the MHCS
teleradiology service.

## Core documents

| Document | Purpose |
|---|---|
| [Business overview and actor journeys](docs/business/01-business-overview.md) | End-to-end business flow, actor journeys, responsibilities, and rules |
| [Business user stories](docs/business/02-user-stories.md) | Human intent, value, acceptance criteria, and journey traceability |
| [System responsibilities](docs/business/03-system-responsibilities.md) | Ownership, collaboration, access, payment triggers, and the FHIR R5 boundary |

## Target repository foundations

| Repository | Foundation |
|---|---|
| `mhcs-core` | [Prepared/copy-ready repository context](docs/technical/mhcs-core-context/project.md), with [Member](docs/technical/mhcs-core-context/modules/member/project.md), [Operator](docs/technical/mhcs-core-context/modules/operator/project.md), [Doctor](docs/technical/mhcs-core-context/modules/doctor/project.md), and [Image Gateway](docs/technical/mhcs-core-context/modules/image-gateway/project.md) module contexts |
| `mpips` | [Black-box contract for the private processing service/API boundary](docs/technical/mpips/project.md) |

The nested module contexts mirror the `mhcs-core/.agents/context` layout. They
partition repository orientation so an agent can load only the module relevant
to its task. `mhcs-core` is the application implementation repository that
consumes this prepared context; this repository remains the business and
candidate target technical authority pending human approval. `mpips` is a separate public GitHub
repository whose MHCS processing service/API boundary is private.

Modules inside `mhcs-core` communicate through local commands, queries,
transactions, and durable domain events. The MPIPS document is the only
transport-level contract in this design.

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
