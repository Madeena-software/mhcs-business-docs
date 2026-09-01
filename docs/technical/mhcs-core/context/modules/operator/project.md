# Operator Core context

## Purpose and ownership

Operator Core is the internal module for physical-site and examination-day
operations. It owns sites, Site Staff accounts/assignments, arrivals, queue
operations, operational monitoring, Site Staff earnings, and payout handoff.

## Authorization boundary

Human actors are Site Staff. The three independently assignable roles are
**Reception / Registration**, **Basic Examination**, and **Radiography**.
Authorization is role → eligibility → assignment → authorized workspace.
Station selection routes work but cannot grant or elevate a role. Work is scoped
to the active site, shift, ticket, and assigned workspace. The temporary Site
Workspace is not a general clinical or administration surface.

## Responsibilities and handoffs

Reception / Registration performs approved identity verification and assisted
walk-ins. Basic Examination records the required assessment and releases work
to Radiography. Radiography reviews/captures the image set and submits it to
Image Gateway. Operator may show operational processing status, but non-clinical
Site Staff must not receive clinical AI-result content. Radiography image/DICOM
access remains role, site, shift, and case scoped.

## Does not own

Member identity or booking authority, clinical quality/report decisions,
clinical binary storage/conversion, MPIPS, AI interpretation, or member result
publication.

## Dependencies and evidence

Interaction surfaces are WhatsApp dispatch, Temporary Site Workspace, public
queue displays, and Unified Admin Web. Dependencies include Member Core,
Image Gateway, Messaging, payment adapters, and FHIR mapping. Intended
authority is the accepted business sources in `context/project.md`; observed
evidence must be checked in the target Operator module, policies, queue code,
schema, and tests.

## Open decisions

Staff authorization implementation, regulatory credentials, payout integration,
beta-account migration, and FHIR conformance artifacts remain open unless
approved elsewhere.
