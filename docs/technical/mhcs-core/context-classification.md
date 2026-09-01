# MHCS Core context-package classification record

This record classifies the material audited for the simplification task. The
copy-ready payload is only `docs/technical/mhcs-core/context/`.

| Source material | Classification | Treatment |
|---|---|---|
| `project.md` | KEEP IN CONTEXT / REFERENCE / OPEN DECISION | Distilled to `context/project.md`; detailed mechanics remain in the source document and target implementation. |
| `ui-language.md` | KEEP IN CONTEXT / REFERENCE | Distilled to `context/ui-language.md`; full policy remains as technical reference. |
| `modules/*/project.md` | KEEP IN CONTEXT / IMPLEMENTATION EVIDENCE / OPEN DECISION | Each module was distilled into its scoped context; low-level workflows remain source evidence. |
| `design/DESIGN.md` | KEEP IN CONTEXT | Reduced to visual-system routing and safety classification. |
| `design/mhcs-logo.svg` | KEEP IN CONTEXT | Repository-owned asset copied unchanged into the payload. |
| `design/mhcs-core-design.html` | MOVE OUT OF CONTEXT / IMPLEMENTATION EVIDENCE | Preserved in its original location as a non-normative illustrative reference; stale behavior is explicitly disclaimed. |
| `root/AGENTS.md` | REFERENCE / MOVE OUT OF CONTEXT | Repository-entry and governance routing remains outside the payload. |
| `tasks/_template.md` | REFERENCE / MOVE OUT OF CONTEXT | Task-template governance material remains outside the payload. |
| `tasks/mhcs-core-conformance-v1.md` | REFERENCE / MOVE OUT OF CONTEXT | Planning/conformance task remains outside the payload and is not copied. |
| global active-booking concurrency rule | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| repeat entitlement validity/expiry | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| Site Staff payout cadence and transfer-fee treatment | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| body-part/laterality correction authority | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| clinical-binary retention lifecycle | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| encryption/at-rest security placement | OPEN DECISION | Not resolved in context; retain the source material for authority review. |
| detailed payment, booking, report, queue, NPZ, DICOM, retry, and controller detail | IMPLEMENTATION EVIDENCE / ARCHITECTURE DECISION / REFERENCE | Not duplicated into orientation; inspect authoritative source, target implementation, or obtain approval as applicable. |

No business authority, governance framework, task artifact, application code,
or external repository was modified. No material source file was silently
deleted.
