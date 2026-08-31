# MHCS Business User Stories

**Status:** Candidate business authority — pending human approval

These stories define human intent, desired value, and observable outcomes for
the Messaging-led MHCS model. They do not prescribe UI, schemas, APIs,
vendors, credentials, or authentication mechanics.

## Member

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-MEMBER-001 | As a Member, I want to book and coordinate my examination through Messaging, so that I can arrange care without a permanent portal account. | B2B and B2C booking, confirmation, preparation, reminder, and status interactions can be coordinated through Messaging, with WhatsApp as the initial channel. Requester, Payer, Subject of Care, Guardian, and Result Recipient remain distinct when relevant. | [Business Overview — Member journey](01-business-overview.md#member-journey); [System Responsibilities — Member Core](03-system-responsibilities.md#member-core) |
| US-MEMBER-002 | As a Member, I want to participate in attendance and approved identity verification, so that my examination is associated with the correct person. | The booking code locates a reservation but does not prove clinical identity. Approved on-site verification precedes check-in and consent confirmation. | [Business Overview — Member Core boundary](01-business-overview.md#member-core-boundary); [System Responsibilities — Member Core](03-system-responsibilities.md#member-core) |
| US-MEMBER-003 | As a Member, I want to be notified when a result is finalized and open a temporary secure result surface when richer viewing or downloading is needed, so that I can access my result without a permanent member portal. | Messaging carries the notification and coordination. A task-specific secure result surface may support authorized member-safe view/download and returns the interaction to Messaging. Raw NPZ and raw DICOM are not ordinary Member downloads. | [Business Overview — Member journey](01-business-overview.md#member-journey); [System Responsibilities — Member Core](03-system-responsibilities.md#member-core) |
| US-MEMBER-004 | As a Member, I want to coordinate optional doctor review through Messaging, so that I can choose additional clinical review when offered. | The Member can request and fund an available doctor-review service independently of the examination workflow; the resulting report is notified through Messaging and may use a temporary result surface. | [Business Overview — Member journey](01-business-overview.md#member-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |
| US-MEMBER-005 | As a Member, I want to coordinate a doctor-requested repeat examination, so that a clinically justified repeat can be scheduled without treating the original visit as cancelled. | A radiologist's recorded repeat decision creates a linked repeat entitlement; the Member coordinates a compatible site and shift through Messaging. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Member Core](03-system-responsibilities.md#member-core) |

<a id="site-staff--shared"></a>
## Site Staff — Shared

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-STAFF-SHARED-001 | As Site Staff, I want to receive eligible work offers and accept or decline them, so that assignments match my role and availability. | Offers are based on held role, qualification/credential eligibility, site, shift, and operational need. Accepting creates an assignment; declining leaves the work available for another eligible person. | [Business Overview — Site Staff journey](01-business-overview.md#site-staff-journey); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |
| US-STAFF-SHARED-002 | As Site Staff, I want to open an assignment-scoped Temporary Site Workspace, so that I can perform only authorized work for the active assignment. | Messaging is the dispatch and coordination layer. Workspace scope derives from identity, role, eligibility, assignment, site, time/shift, and operational scope; station selection cannot elevate a role. | [Business Overview — Operator Core boundary](01-business-overview.md#operator-core-boundary); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |
| US-STAFF-SHARED-003 | As Site Staff, I want to see a concise work history, so that I can understand my completed and upcoming assignments and applicable earning status. | Messaging may provide a concise summary; a richer history, if justified, opens only through a secure temporary work-history surface. | [Business Overview — Site Staff journey](01-business-overview.md#site-staff-journey); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |

<a id="site-staff--reception--registration"></a>
## Site Staff — Reception / Registration

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-STAFF-REG-001 | As Site Staff with the Reception / Registration role, I want to look up a booking and verify an arrival, so that the examination starts with the correct person. | The booking locator is checked against approved on-site identity evidence; unresolved identity mismatch blocks check-in. Sensitive identity documents are not collected in ordinary Messaging. | [Business Overview — Member Core boundary](01-business-overview.md#member-core-boundary); [System Responsibilities — Member Core](03-system-responsibilities.md#member-core) |
| US-STAFF-REG-002 | As Site Staff with the Reception / Registration role, I want to confirm consent and issue one visit ticket, so that registration evidence and queue handoff are auditable. | Signed paper consent is confirmed once, the required evidence is recorded, and one site-and-shift ticket is issued for the visit. | [Business Overview — Site Staff journey](01-business-overview.md#site-staff-journey); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |

<a id="site-staff--basic-examination"></a>
## Site Staff — Basic Examination

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-STAFF-EXAM-001 | As Site Staff with the Basic Examination role, I want to claim eligible work and capture the required basic examination, so that the Member can proceed with a complete operational record. | FIFO claiming is atomic and only one staff member owns the active stage. Required measurements, screening, interview, and questionnaire evidence are recorded before release to radiography. | [Business Overview — Site Staff journey](01-business-overview.md#site-staff-journey); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |
| US-STAFF-EXAM-002 | As Site Staff with the Basic Examination role, I want to complete and release my stage, so that the next authorized stage can begin. | Completion records the responsible role and releases the same visit ticket to the radiography queue; the configured stage earning becomes eligible at completion. | [Business Overview — Operator Core boundary](01-business-overview.md#operator-core-boundary); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |

<a id="site-staff--radiography"></a>
## Site Staff — Radiography

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-STAFF-RAD-001 | As Site Staff with the Radiography role, I want to claim eligible radiography work and capture/review the image set, so that the examination can be processed without mixing patient identity into offline capture files. | The staff member accepts eligible work before opening the Temporary Site Workspace. Captures and matching gain input are reviewed, with retake/omission handling before submission. The active examination supplies identity association. | [Business Overview — Site Staff journey](01-business-overview.md#site-staff-journey); [System Responsibilities — Operator Core](03-system-responsibilities.md#operator-core) |
| US-STAFF-RAD-002 | As Site Staff with the Radiography role, I want to submit the complete capture set, so that processing can begin with a coherent examination handoff. | A complete set and matching gain input are submitted with the active examination context; durable acceptance completes the radiography stage and preserves the capture boundary. | [Business Overview — Image Gateway boundary](01-business-overview.md#image-gateway-boundary); [System Responsibilities — Image Gateway](03-system-responsibilities.md#image-gateway) |
| US-STAFF-RAD-003 | As Site Staff with the Radiography role, I want to perform a doctor-requested repeat assignment, so that a controlled clinical repeat can be completed. | The repeat is dispatched only after the radiologist records the clinical decision; the assigned Radiography staff member accepts it and performs a linked repeat session. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |

<a id="doctor--shared"></a>
## Doctor — Shared

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-DOCTOR-SHARED-001 | As a Doctor, I want to receive and accept, decline, or claim an eligible case, so that clinical work is allocated to an authorized professional. | Offers and claims are limited by qualification, credential, specialty, service, modality, and assignment eligibility; only one active claim owns the case. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |
| US-DOCTOR-SHARED-002 | As a Doctor, I want to open a Temporary Clinical Workspace and view my professional history, so that I can work securely without a permanent worklist portal. | Messaging provides minimal-information dispatch and a concise history; richer clinical work and detailed history occur only inside an assignment-scoped workspace. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |

<a id="doctor--radiologist"></a>
## Doctor — Radiologist

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-DOCTOR-RAD-001 | As a Radiologist, I want to review authorized DICOM studies and decide whether they are diagnostically usable, so that the clinical decision is accountable. | Authorized cases can be reviewed in the Temporary Clinical / DICOM Workspace. The Radiologist records `usable` or `repeat_required` with a controlled reason or note. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |
| US-DOCTOR-RAD-002 | As a Radiologist, I want to request a controlled repeat when clinically necessary, so that the imaging team can correct an inadequate study. | The repeat decision is recorded in the clinical workspace, audited by MHCS, and dispatched to eligible Radiography Site Staff; it is not reduced to an ordinary chat message. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |
| US-DOCTOR-RAD-003 | As a Radiologist, I want to submit a final report and issue a correction or amendment when necessary, so that the Member receives a traceable clinical result. | Final reports are immutable; corrections/amendments preserve prior versions, carry clinical authorship, and trigger member-safe publication and notification without overwriting history. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |

<a id="doctor--authorized-specialist"></a>
## Doctor — Authorized Specialist

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-DOCTOR-SPECIALIST-001 | As an Authorized Specialist, I want to review cases only within my authorized specialty and service scope, so that my work reflects my professional authority. | Offers, claims, workspace access, and clinical output are limited by qualification, specialty, service, modality, and assignment eligibility. | [Business Overview — Doctor journey](01-business-overview.md#doctor-journey); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |
| US-DOCTOR-SPECIALIST-002 | As an Authorized Specialist, I want to provide the appropriate clinical output without a radiology-only workflow, so that my specialty is not incorrectly treated as radiology. | The workflow supports the authorized specialty's output. Radiology quality decisions, DICOM review, and imaging repeats are not imposed unless separately authorized. | [Business Overview — Doctor Core boundary](01-business-overview.md#doctor-core-boundary); [System Responsibilities — Doctor Core](03-system-responsibilities.md#doctor-core) |

<a id="global-admin--super-admin"></a>
## Global Admin / Super Admin

| ID | User Story | Acceptance Criteria | Traceability |
|---|---|---|---|
| US-ADMIN-001 | As a Global Admin / Super Admin, I want to provision Site Staff roles, eligibility, and assignments, so that operational work is allocated only to authorized people. | Reception / Registration, Basic Examination, and Radiography are independently assignable; qualification/credential evidence and site/shift assignment are recorded; multiple roles require eligibility for each role. | [Business Overview — Administration boundary](01-business-overview.md#administration-boundary); [System Responsibilities — Unified Administration](03-system-responsibilities.md#unified-administration) |
| US-ADMIN-002 | As a Global Admin / Super Admin, I want to manage Doctor authorization, so that cases are offered only to eligible Radiologists or Authorized Specialists. | Specialty, service, modality, credential, and assignment eligibility are administrable and auditable; administrators cannot make clinical decisions or sign reports for Doctors. | [Business Overview — Administration boundary](01-business-overview.md#administration-boundary); [System Responsibilities — Unified Administration](03-system-responsibilities.md#unified-administration) |
| US-ADMIN-003 | As a Global Admin / Super Admin, I want to manage site, service, and business configuration, so that the operating model remains controlled across domains. | Site, schedule, service, B2B configuration, and approved operational settings remain owned by their domain modules and are changed through one unified administrative surface. | [Business Overview — Administration boundary](01-business-overview.md#administration-boundary); [System Responsibilities — Unified Administration](03-system-responsibilities.md#unified-administration) |
| US-ADMIN-004 | As a Global Admin / Super Admin, I want audit and operational exception handling, so that failures, access decisions, and administrative actions remain reviewable. | Processing failures, access decisions, reassignment, configuration changes, and legally required record actions are auditable; the unified surface does not become a separate business domain. | [Business Overview — Administration boundary](01-business-overview.md#administration-boundary); [System Responsibilities — Unified Administration](03-system-responsibilities.md#unified-administration) |
