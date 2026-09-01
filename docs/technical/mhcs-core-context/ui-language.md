# MHCS UI language context

This is implementation orientation for MHCS-authored browser UI and member
communications. The full language policy remains in the approved business and
technical authority sources under
`Madeena-software/mhcs-business-docs/docs/`.

## Canonical terms

- The product term is **Member**; Bahasa Indonesia copy generally uses
  **Anda**, **Member**, or **Anggota** as appropriate. Do not default to
  `pasien` in ordinary member-facing copy; preserve it in formal clinical,
  legal, regulated, or external text where required.
- The member-facing service name is **Sesi Foto Radiografi**. Use **Foto
  Radiografi** for a visible result and **Gambar Radiografi** for processing,
  submission, quality, or collections.
- MHCS-authored member-facing copy must use Bahasa Indonesia and must not use
  **X-ray**. Technical, vendor, clinical, legally required, and interoperability
  content may retain external terminology when it must remain unchanged.
- Human operators are **Site Staff**, not “Operator” in actor-facing language.
  The internal module name remains **Operator Core**.
- Doctor is an umbrella actor. Distinguish **Radiologist** and **Authorized
  Specialist**.

## Surfaces and safety

Interaction Surface names are **Messaging**, **On-site / Physical**,
**Temporary Site Workspace**,
**Temporary Clinical / DICOM Workspace**, **Temporary Result Surface**, and
**Persistent Admin Web**. A result surface is not a permanent Member Portal.

Messaging is the canonical persistent interaction surface. WhatsApp is the
initial/reference Messaging channel in the current Indonesia model and is not
the only permanently valid provider.

Use plain, respectful, non-alarming Bahasa Indonesia. Explain technical terms
when they affect understanding, consent, safety, or required action. Never imply
that radiography alone proves complete health or absence of disease. Preserve
clinical, consent, legal, and safety wording even when simplifying UI copy.

Avoid stale or prohibited implications: persistent Member Portal, Madeena Points
as a settled exclusive payment policy, “X-ray” in member-facing copy, and
terminology that makes every member a sick patient. These are terminology and
authority constraints, not instructions to rewrite formal external documents.
