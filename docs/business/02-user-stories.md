# MHCS Business User Stories

**Status:** Candidate business authority — pending human approval

These stories define human intent and observable outcomes for the candidate
Messaging-led MHCS model. They do not prescribe UI, schemas, APIs, vendors, or
authentication mechanics.

## Member

### US-MEMBER-001 — Coordinate care through messaging

As a Member, I want to book, confirm, and receive care updates through the
Messaging ecosystem, so that I can complete my healthcare journey without a
permanent portal account.

Acceptance criteria:

- B2B and B2C booking/status/reminder interactions can be coordinated through
  Messaging, with WhatsApp as the initial channel.
- Requester, Payer, Subject of Care, Guardian, and Result Recipient remain
  distinct when relevant.
- A booking code is a reservation locator, not clinical identity proof; on-site
  verification precedes check-in.

### US-MEMBER-002 — Receive a finalized result safely

As a Member, I want to be notified when a result is finalized and open a
temporary secure result surface when richer viewing or downloading is needed,
so that I can access my result without a permanent member portal.

Acceptance criteria:

- Finalization produces a Messaging notification.
- A temporary result surface may support authorized view/download and returns
  the interaction to Messaging.
- Raw NPZ and raw DICOM are not ordinary Member downloads.

## Site Staff

### US-STAFF-REG-001 — Register an arriving Member

As Site Staff with the Reception / Registration role, I want to verify an
arrival, confirm consent, and issue one visit ticket, so that the examination
starts with the correct person and auditable registration evidence.

Acceptance criteria:

- The staff member is eligible for the role and assigned to the site/shift.
- The booking locator is checked against approved on-site identity evidence.
- Signed paper consent is confirmed once, and one ticket advances the visit.

### US-STAFF-EXAM-001 — Complete basic examination

As Site Staff with the Basic Examination role, I want to claim the next
eligible ticket and record the required basic examination, so that the Member
can proceed to radiography with a complete operational record.

Acceptance criteria:

- Eligibility derives from the held role, assignment, site, and shift.
- FIFO claiming is atomic and only one staff member owns the active stage.
- Required measurements, screening, and interview evidence are recorded before
  the ticket is released to radiography.

### US-STAFF-RAD-001 — Perform an assigned radiography session

As Site Staff with the Radiography role, I want to capture, review, and submit
the complete radiograph set, so that the examination can be processed without
mixing patient identity into offline capture files.

Acceptance criteria:

- The staff member accepts an eligible assignment before opening a temporary
  Site Workspace.
- Captures and matching gain input are reviewed, with retake/omission handling
  available before complete-set submission.
- The active examination supplies identity association; capture files do not
  become an identity authority.

## Doctor

### US-DOCTOR-RAD-001 — Review an eligible radiology case

As a Radiologist, I want to accept an eligible case offer and review it in a
temporary Clinical / DICOM Workspace, so that I can make an accountable
radiology decision without maintaining a permanent worklist portal.

Acceptance criteria:

- Only cases matching professional, specialty, service, modality, and
  assignment eligibility are offered.
- The case is claimed atomically and clinical work remains within the
  authorized workspace.
- For radiology services, the Radiologist can record `usable` or
  `repeat_required` with a controlled reason/note.

### US-DOCTOR-SPECIALIST-001 — Review an authorized specialist case

As an Authorized Specialist, I want to accept and complete a case within my
authorized specialty and service scope, so that clinical work reflects my
professional authority without forcing radiology-only steps on me.

Acceptance criteria:

- Offers and workspace access are limited by qualification, specialty, service,
  modality, and assignment eligibility.
- The workflow supports the authorized specialty's clinical output.
- Radiology quality and repeat-imaging decisions are not imposed unless
  separately authorized by the applicable clinical model.

## Global Administration

### US-ADMIN-001 — Administer the unified MHCS operation

As a Global Admin / Super Admin, I want one persistent secure web surface over
domain-owned administration, so that I can provision, configure, monitor, and
resolve operational issues without fragmented admin actors or duplicated
business domains.

Acceptance criteria:

- Global Admin / Super Admin is one human actor and the only actor with a
  persistent conventional web login.
- The surface manages domain-owned Member, Operator Core, Doctor, and Image
  Gateway capabilities while preserving their ownership boundaries.
- Staff role eligibility, assignments, site configuration, and doctor
  authorization changes are auditable.

Traceability: See the corresponding Member, Site Staff, Doctor, and Admin
journeys in [Business Overview](01-business-overview.md) and ownership in
[System Responsibilities](03-system-responsibilities.md).
