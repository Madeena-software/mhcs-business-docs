# Doctor Core context

## Purpose and ownership

Doctor Core provides scoped clinical review and reporting in the temporary
Clinical / DICOM Workspace. It owns professional/specialty/service authority,
assignment and case scope, radiology quality decisions, controlled repeat
decisions, report lifecycle, amendments, and publication handoffs.

## Actors and boundaries

Doctor is an umbrella actor. A **Radiologist** may make radiology-specific
quality decisions, review DICOM, and control radiology repeat decisions. An
**Authorized Specialist** works only within the authorized specialty, service,
and modality scope. Clinical access is assignment/case-scoped; administration
must not rewrite or sign a doctor's clinical work.

## Does not own

Member identity/booking, Site Staff queues or earnings, durable binary storage
and conversion, MPIPS, or payment settlement. Image Gateway controls the binary
boundary and supplies authorized study access.

## Dependencies and evidence

Doctor receives work through Image Gateway and coordinates result delivery with
Member Core. The approved business sources in `context/project.md` define
intended authority. Inspect the target Doctor module, authorization policies,
report persistence, image-access code, and tests for observed reality; this
context is not evidence of implementation.

## Open decisions

Specialty-specific workflows, qualification rules, report/publication details,
temporary workspace authentication, and FHIR conformance artifacts remain open
where current technical material does not have approved authority.
