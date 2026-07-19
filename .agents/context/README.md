<!-- antigravity-code-agent-template:managed -->
# MHCS Business Documentation

**Status:** Updated review pack
**Generated from project context verified:** 2026-07-19

This repository explains the Madeena Health Care System (MHCS) teleradiology
service for readers who do not need a technical background.

The documents answer six practical questions:

1. What service does MHCS provide?
2. What happens from booking until a result becomes available?
3. Who is responsible at each stage?
4. Which parts work today?
5. Which parts are still the target vision?
6. What is the current SATUSEHAT readiness?

## Start here

| Document | What it explains |
|---|---|
| [Business overview](../../docs/01-business-overview.md) | The service, its value, its users, and key terms |
| [Member journey](../../docs/02-member-journey.md) | The current situation and intended end-to-end journey |
| [System responsibilities](../../docs/03-system-responsibilities.md) | The role, readiness, and boundaries of each application |
| [SATUSEHAT readiness](../../docs/04-satusehat-readiness.md) | Why SATUSEHAT is an unimplemented future possibility and what would be required before approval |

The recommended reading order is the order shown above.

## How to read status labels

- **Current** means the capability was found in the available source code on
  19 July 2026.
- **Target** means the capability is part of the intended business flow but is
  not fully implemented or connected.
- **Unknown** means the relevant source code was unavailable or the business
  rule has not been decided.
- **Future possibility** means an option is under consideration but is not an
  approved target commitment.

These labels matter. A planned connection or future possibility must not be
presented to customers, staff, or partners as if it already works.

## Audience

This review pack is for:

- management and business teams;
- operational staff;
- doctors and clinical stakeholders;
- partners; and
- engineers who need a shared business map.

The documents deliberately avoid source-code details, API instructions, and
deployment procedures.

## Review status

This Markdown review pack is not yet a user manual, website, or formal PDF.

After the content is approved, it can be reused for a simple website and a
printable PDF without changing the underlying business story.

## Important boundary

This repository must not contain patient information, clinical images,
credentials, or secret configuration. It is business documentation, not a
clinical record system. Its SATUSEHAT readiness document is not a compliance,
certification, or production-readiness claim.
