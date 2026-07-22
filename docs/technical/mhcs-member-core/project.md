# Member Core Project Specification

**Specification status:** Expected end-state specification
**Business foundation:** Approved
**Last reviewed:** 22 July 2026

This is the central specification for `mhcs-member-core`. It defines how the
system must work and is the expected state that implementation work must move
toward. A repository-local copy will replace that repository's
`.agents/context/project.md`.

## Agent rules

- Treat every requirement in this document as the expected state that the
  implementation must satisfy.
- When the implementation differs from this specification, adapt the
  implementation toward the specification. Do not weaken the specification to
  match existing code.
- Verify source and tests before claiming that a requirement is implemented.
- Do not invent database columns, API fields, states, or service ownership.
- Internal names do not have to match FHIR resource names. MHCS uses `Member`
  internally and maps it to FHIR `Patient` only at an external boundary.
- HL7 FHIR R5 `5.0.0` is the only active MHCS interoperability standard.

## Purpose and ownership

Member Core is the member-facing application and the authority for:

- login accounts created for members, including members without phones;
- member identity and the MHCS medical-record number;
- member registration, including operator-assisted walk-ins;
- examination sites, service offerings, schedules, and bookings;
- B2B and B2C booking authority;
- member charges, payments, source-restricted Madeena Points, and refunds;
- the attendance list supplied to Operator Core;
- member notifications; and
- member-safe presentation of processed images, AI results, and doctor reports.

Member Core does not own front-desk queues, image capture, raw NPZ, permanent
DICOM storage, AI execution, doctor work queues, or operator/doctor earnings.

## Users and admin panel

- Members use the member-facing Blade application.
- Member administrators use the Filament panel at `/admin`.
- The admin panel manages members, examination sites, service offerings,
  schedules, B2B and B2C bookings, member payments, point reservations,
  promotions, settings, and service credentials.
- Operator Core uses an organization/site-scoped service credential. It never
  receives direct database access.

## Identity model

MHCS uses two records created through one member-registration operation:

- `users` owns authentication credentials and login state.
- `members` owns the healthcare identity and member demographics.

Every member, including a walk-in, receives both records. Keeping them separate
prevents authentication concerns from becoming the clinical identity model.
The business and UI term remains **Member** even when an external integration
maps the record to FHIR `Patient`.

A member logs in with either email and password or NIK and password. Email and
phone are optional because the population includes people who have
neither. Authentication must use one generic `identifier` input and a generic
failure response so the login form does not reveal whether an email or NIK is
registered.

Identifiers have distinct purposes:

- `users.id`: internal authentication identifier;
- `members.id`: internal member identifier used by MHCS relations;
- `members.medical_record_number`: immutable, globally unique MHCS MRN; and
- external patient identifiers: optional integration metadata, never used as
  the local primary key.

NIK is an optional official identifier, not the primary key. A member without
NIK must not be assigned an invented NIK.

NIK and family-card number are sensitive lookup values. Member Core stores an
encrypted value for authorized display and a keyed lookup hash for exact match
and uniqueness; only NIK is also used for login. They must not appear in logs,
URLs, analytics, or API responses unless the receiving role and purpose
explicitly require them.

KK groups members into a family but is not a login identifier. A member who
has no email or phone may log in with NIK and password. If that member forgets
the password, an MHCS administrator performs assisted recovery after verifying
NIK and KK; the recovery flow must not disclose protected values or account
existence to an unauthorised requester.

## B2B-first commercial model

Member Core supports B2B and B2C simultaneously through the same member
account and individual wallet. B2B is the initial commercial priority.

### Initial B2B provisioning

After a business agreement and its member data are available, an MHCS
developer will use a later manual import script. The import creates or matches
members, allocates the agreed annual Madeena Points, and creates the agreed
entitlements and any bookings whose schedules are already known. No import
script or fixed input format is specified before real agreement data are
available.

Each imported account receives a unique random temporary password generated
with a cryptographically secure source. The account is active but must force a
password change immediately after the first successful login. Plaintext
temporary passwords must not be logged or stored after the one-time handoff.
MHCS sends the credential document to one designated business contact outside
Member Core; credential-document delivery is not an application feature.

### Booking and points rules

- The business centrally pays the annual fee for each covered member. Its
  agreed value becomes business-funded Madeena Points in that member's
  individual wallet.
- Business-funded points are reserved for the agreed B2B entitlements or
  bookings and cannot pay for a personal B2C booking. When scheduling follows
  later, the reservation remains locked until its booking is created.
- The agreement must provision the complete B2B cost before its entitlement or
  booking is created. A funding mismatch is an administrative data error and
  must never take points from the member's personal balance.
- The business determines the examination, selected result service, location,
  date, and shift. A member cannot cancel or reschedule a B2B booking.
- An MHCS administrator may change or cancel a B2B booking only after an
  official request from the business, with the request and action audited.
- A B2B no-show remains paid and consumes the agreed examination quota.
  Employee attendance consequences belong to the business, not MHCS.
- A member may top up personal points and create additional B2C bookings in the
  same account. Personal points fund these member-controlled bookings.

The points ledger must preserve funding source, reservation, allocation, and
consumption history even though the member sees one wallet. Booking records
must preserve whether their authority and funding are B2B or B2C; changing a
label must never convert one type into the other.

### Family participation

Employee family members use B2C. MHCS may create their accounts from submitted
NIK and KK data, or they may self-register and link to an existing protected
family record after verification. Their accounts and wallets remain individual;
family grouping does not share balances or make KK a login identifier.

## Organization and examination-site rule

Every schedule and booking belongs to one examination site. Each site is
assigned to one Operator Core organization.

For the first API version, an Operator Core service credential is bound to one
organization and one site. The caller cannot select another organization or
site through request parameters. This prevents cross-site attendance leakage.

Member Core owns the bookable site record. Operator Core owns its operational
organization record. Their stable external identifiers are stored as opaque
references; there are no cross-service database foreign keys.

## Required data model

```mermaid
erDiagram
    USERS ||--|| MEMBERS : "authenticates"
    FAMILIES ||--o{ MEMBERS : "groups"
    MEMBERS ||--o{ MEMBER_VERIFICATION_ASSETS : "verified with"
    OPERATOR_ORGANIZATION_REFS ||--o{ EXAMINATION_SITES : "operates"
    EXAMINATION_SITES ||--o{ SHIFT_SCHEDULES : "hosts"
    SERVICE_OFFERINGS ||--o{ SHIFT_SCHEDULES : "scheduled as"
    MEMBERS ||--o{ BOOKINGS : "receives"
    SHIFT_SCHEDULES ||--o{ BOOKINGS : "contains"
    SERVICE_OFFERINGS ||--o{ BOOKINGS : "selected"
    BOOKINGS ||--o{ PAYMENTS : "charged through"
    BOOKINGS ||--o| IMAGING_RESULTS : "publishes"
    MEMBERS ||--o{ VITAL_SIGN_MEASUREMENTS : "has"
    BOOKINGS ||--o{ VITAL_SIGN_MEASUREMENTS : "measured during"
    EXAMINATION_SITES ||--o{ VITAL_SIGN_MEASUREMENTS : "recorded at"

    USERS {
        uuid id PK
        string email UK
        string password
        enum account_status
    }

    MEMBERS {
        uuid id PK
        uuid user_id UK
        uuid family_id FK
        string medical_record_number UK
        string encrypted_nik
        string nik_lookup_hash UK
        string name
        date birth_date
        enum administrative_gender
        enum registration_source
        string phone
    }

    FAMILIES {
        uuid id PK
        string encrypted_family_card_number
        string family_card_lookup_hash UK
    }

    MEMBER_VERIFICATION_ASSETS {
        uuid id PK
        uuid member_id FK
        enum type
        string private_object_key
        datetime verified_at
        uuid verified_by_operator_id
    }

    OPERATOR_ORGANIZATION_REFS {
        uuid id PK
        string operator_organization_id UK
        string name
        boolean active
    }

    EXAMINATION_SITES {
        uuid id PK
        uuid operator_organization_ref_id FK
        string code UK
        string name
        string timezone
        boolean active
    }

    SERVICE_OFFERINGS {
        uuid id PK
        string code UK
        string name
        boolean includes_ai
        boolean includes_doctor
        integer price
        boolean active
    }

    SHIFT_SCHEDULES {
        uuid id PK
        uuid examination_site_id FK
        uuid service_offering_id FK
        datetime starts_at
        datetime ends_at
        integer quota
        enum status
    }

    BOOKINGS {
        uuid id PK
        uuid member_id FK
        uuid shift_schedule_id FK
        uuid service_offering_id FK
        enum booking_type
        enum status
        integer price_snapshot
    }

    VITAL_SIGN_MEASUREMENTS {
        uuid id PK
        uuid member_id FK
        uuid booking_id FK
        uuid examination_site_id FK
        string measured_by_operator_id
        datetime measured_at
        enum status
        decimal height_cm
        decimal weight_kg
        decimal bmi_kg_m2
        integer systolic_mm_hg
        integer diastolic_mm_hg
        integer pulse_per_minute
        integer respiratory_rate_per_minute
        decimal temperature_celsius
        decimal oxygen_saturation_percent
        uuid supersedes_id
    }
```

The diagram defines the required ownership and relations, not final Laravel
migration syntax. Supporting framework tables are omitted.

### Schema requirements

- Member demographics and the MRN belong to `members`, linked one-to-one to
  `users`.
- Email is nullable; authentication uses normalized email or NIK.
- Account status and member registration source are independent fields.
- A family record is keyed by a protected KK number and associated with its
  members; KK is not a login identifier.
- KTP and profile photos are private verification assets, never public URLs or
  inline database blobs.
- Operator organization references and examination sites are first-class
  records.
- Every shift schedule and booking belongs to one site.
- Every booking preserves B2B or B2C authority and funding provenance.
- The points ledger preserves business-funded reservations separately from
  personal top-ups while exposing one member wallet.
- Each service records whether it includes AI, doctor review, or both.
- Price and selected-service behavior are immutable booking snapshots.
- Identifiers exchanged between services are stable UUIDs.
- Suspending login access preserves bookings and clinical history.
- Basic health measurements are timestamped history linked to the member,
  booking, site, and recorder; the latest value never overwrites a `members`
  table column.

## Account and member states

Account state controls login only:

```text
pending_activation -> active -> suspended
                         ^          |
                         +----------+
```

Registration source is immutable metadata:

```text
online | walk_in | administrator
```

It must never be used as an account state.

The initial developer-run B2B import uses the existing administrator
registration source. First-login password replacement is an authentication
requirement independent of account and registration state.

## Booking states

The approved booking lifecycle is:

```text
pending_payment -> confirmed -> completed
        |              |       -> no_show
        |              |       -> postponed
        |              +------ -> cancelled_refunded
        +--------------------- -> cancelled
```

B2B bookings cannot be cancelled or rescheduled by a member. An MHCS
administrator may change them only on an official business request, and a
no-show remains paid and consumes the business quota. Exact B2C cancellation,
refund, and forfeiture transitions still require business approval; until
decided, an agent must preserve existing B2C behavior and report the unresolved
decision.

## Operator attendance API

Operator Core obtains the eligible attendance list from Member Core. Member
Core never pushes member rows directly into the Operator Core database.

```http
GET /api/v1/operator/attendance?at=2026-07-22T09:15:00+07:00
Authorization: Bearer <site-scoped-token>
Accept: application/json
```

Rules:

- `at` is required, ISO 8601 with an explicit offset, and normalized to UTC.
- The authenticated credential determines the organization and site.
- Only confirmed, paid, non-cancelled bookings whose schedule contains `at`
  are returned.
- Repeating the request has no side effects.
- The response exposes only fields required for examination operations.
- Email, phone, address, account state, points, and payment details are not
  returned.

Response example:

```json
{
  "data": {
    "site_id": "site-uuid",
    "schedule_id": "schedule-uuid",
    "starts_at": "2026-07-22T02:00:00Z",
    "ends_at": "2026-07-22T05:00:00Z",
    "members": [
      {
        "booking_id": "booking-uuid",
        "member_id": "member-uuid",
        "medical_record_number": "MHCS-...",
        "name": "Member name",
        "birth_date": "1990-01-01",
        "administrative_gender": "female",
        "service_code": "THORAX-AI-DOCTOR",
        "attendance_status": "expected"
      }
    ]
  }
}
```

## Operator-assisted walk-in API

An authenticated operator creates a walk-in through Member Core:

```http
POST /api/v1/operator/walk-ins
Authorization: Bearer <site-scoped-token>
Idempotency-Key: <unique-request-id>
Content-Type: application/json
```

The request supplies member identity, an activation contact, the selected
service offering, and the applicable schedule. The organization and site come
from the credential, not caller-controlled identifiers.

Member Core must perform one transaction:

1. Match an existing member using approved identifiers; never match by name
   alone.
2. Reuse the existing member or create `users` and `members` records.
3. Assign an immutable MHCS MRN when creating a member.
4. Create the walk-in booking.
5. Record payment state without letting Operator Core mutate wallet balances.
6. Return the member, MRN, and booking identifiers.
7. Send account activation outside the database transaction.

Operator staff never choose, receive, or view the member's password. Duplicate
requests with the same idempotency key must return the same result.

When a member has no email or phone, the registration interface must allow the
member to enter a password privately. An assisted fallback may use a printed
one-time secret that forces a password change; the secret must never be logged
or remain visible to staff after issuance.

The exact minimum walk-in identity fields and the login fallback for a member
without NIK, email, and phone remain open decisions and must be approved before
this endpoint is implemented.

## Arrival identity verification

Member Core stores two optional private verification assets:

- a KTP image, when the member has a KTP; and
- a current profile photograph.

Operator Core receives neither permanent object keys nor downloadable copies.
For a site-scoped eligible booking, an authorized operator may open a short-
lived verification view to compare the arriving person with the stored images.

Every view is audit logged with member, booking, operator, site, purpose, and
timestamp. The interface must prevent ordinary listing, bulk export, and public
caching. KTP access is limited to identity verification and reconciliation;
the less sensitive profile photograph should be preferred for routine arrival
checks after initial verification.

Collection purpose, member notice/consent or other lawful basis, retention,
replacement, and deletion rules require explicit policy approval before image
collection is enabled.

## Basic health measurements

Operator Core records basic measurements during arrival or examination. Member
Core is the authoritative longitudinal store. A current value is derived from
the newest valid measurement; it is not duplicated onto `members`.

The initial measurement set follows the FHIR R5 Vital Signs profile:

| Measurement | LOINC code | Canonical UCUM unit |
|---|---:|---|
| Height | `8302-2` | `cm` |
| Weight | `29463-7` | `kg` |
| Body mass index | `39156-5` | `kg/m2` |
| Blood-pressure panel | `85354-9` | components |
| Systolic pressure | `8480-6` | `mm[Hg]` |
| Diastolic pressure | `8462-4` | `mm[Hg]` |
| Pulse/heart rate | `8867-4` | `/min` |
| Respiratory rate | `9279-1` | `/min` |
| Body temperature | `8310-5` | `Cel` |
| Oxygen saturation | `2708-6` | `%` |

Each measurement set records:

- member, booking, examination site, and operator reference;
- actual measurement time separately from database creation time;
- status: `preliminary`, `final`, `corrected`, or `entered_in_error`;
- canonical numeric values and units;
- optional method, device, body site/position, cuff size, and notes when they
  materially affect interpretation; and
- correction lineage through `supersedes_id` instead of silent overwrite.

Blood pressure is one composite observation. Systolic and diastolic components
must be recorded together, or the missing component must carry a standardized
absence reason. BMI is calculated only from height and weight in the same
measurement session:

```text
BMI = weight_kg / (height_cm / 100)^2
```

Do not reject a measurement merely because it is clinically abnormal. Reject
invalid types or impossible units; require the operator to confirm implausible
values and retain that confirmation for audit.

### Operator measurement API

```http
POST /api/v1/operator/bookings/{booking}/vital-signs
Authorization: Bearer <site-scoped-token>
Idempotency-Key: <unique-measurement-request-id>
Content-Type: application/json
```

```json
{
  "measured_at": "2026-07-22T09:20:00+07:00",
  "status": "final",
  "height_cm": 168.5,
  "weight_kg": 62.4,
  "systolic_mm_hg": 118,
  "diastolic_mm_hg": 76,
  "pulse_per_minute": 72,
  "respiratory_rate_per_minute": 16,
  "temperature_celsius": 36.6,
  "oxygen_saturation_percent": 98
}
```

Rules:

- The booking must belong to the caller's credential-bound site.
- The API calculates BMI; callers cannot provide a conflicting BMI.
- At least one supported measurement is required.
- Duplicate idempotency keys return the original result.
- Corrections create a new record referencing the superseded record.
- Timestamps require an explicit offset and are normalized to UTC.

## Security and privacy invariants

- Service credentials are stored hashed, scoped to one site, revocable, and
  never committed as plaintext.
- Passwords are hashed with the framework's approved adaptive password hasher;
  NIK and KK lookup hashes are keyed and separate from encrypted display values.
- Imported temporary passwords use cryptographically secure randomness, force
  replacement on first login, and are never logged or retained in plaintext
  after their one-time handoff.
- Login is rate limited and returns the same failure response for an unknown
  identifier and an incorrect password.
- Every cross-service request is authenticated and audit logged.
- Member information is minimized for the operator's task.
- KTP and profile photographs use private encrypted object storage and
  short-lived authorized access; they are never placed in a public bucket.
- Suspended login access does not erase the member or medical history.
- Raw NPZ and DICOM never pass through Member Core.
- Result URLs are short-lived or resolved through an authorized proxy.
- Database transactions and row locks protect booking quotas, points, and
  idempotent walk-in creation.
- A B2B booking cannot consume personal points, and a B2C booking cannot
  consume reserved business-funded points.

## FHIR R5 boundary

### Version and conformance policy

- **FHIR release:** R5 `5.0.0` only.
- **FHIR endpoint base:** `/fhir/r5`.
- **FHIR JSON media type:** `application/fhir+json; fhirVersion=5.0`.
- **MHCS operational APIs:** ordinary versioned MHCS JSON contracts. They must
  not claim FHIR conformance because their field names resemble a resource.
- **Profiles:** the approved MHCS R5 Implementation Guide and resource profiles
  take precedence over unconstrained base-resource examples.
- **Future adapters:** a future integration with an older release must use a
  separate explicit adapter and must not weaken the R5 source model.

`GET /fhir/r5/metadata` returns the Member Core `CapabilityStatement`. Every
FHIR resource declares its MHCS profile through `meta.profile`. Unsupported
resources, interactions, searches, or profiles return `OperationOutcome` and
are never accepted as loosely structured JSON.

Member Core initially supports the R5 resources it owns:

| Resource | Required capability |
|---|---|
| `Patient` | read, search, create, update, history |
| `RelatedPerson` | read/search when a family member participates in care |
| `FamilyMemberHistory` | read/search/create/update for recorded family history |
| `Schedule`, `Slot` | read/search for bookable availability |
| `Appointment` | read/search/create/update for member bookings |
| `ServiceRequest` | read/search/create/update for imaging orders |
| `Observation` | read/search/create and correction history for vital signs |
| `Consent` | read/search/create/update for applicable permissions |
| `DocumentReference` | read/search for member-safe documents |
| `Provenance`, `AuditEvent` | authorized read/search only |
| `Bundle`, `OperationOutcome` | transaction/search results and standard errors |

The `CapabilityStatement` is authoritative for the final interaction and
search list. This table is the minimum required capability.

Internal names remain business-oriented:

| MHCS concept | External FHIR representation |
|---|---|
| Member | `Patient` |
| Operator/doctor | `Practitioner` |
| Staff assignment | `PractitionerRole` |
| Operator organization | `Organization` |
| Examination site | `Location` |
| Booking | `Appointment` |
| Performed examination | `Encounter` |
| Imaging examination order | `ServiceRequest` |
| Basic health measurement | `Observation` |
| Imaging study | `ImagingStudy` |
| Doctor report | `DiagnosticReport` |
| Report file or member-safe document | `DocumentReference` when needed |
| Resource revision lineage | `Provenance` |
| Security access record | `AuditEvent` |

This mapping is a boundary contract, not a direction to reproduce FHIR JSON as
the relational schema. Local tables use clear MHCS domain models and a mapper
builds or consumes FHIR resources.

The mapping table names stable domain concepts. Exact R5 element paths belong
in the MHCS profiles and mapper, not in UI code.

### Required radiology chain

The required radiology relationship is:

```text
Member/Patient
  -> booking/Appointment
  -> visit/Encounter
  -> imaging order/ServiceRequest
  -> DICOM study/ImagingStudy
  -> findings/Observation
  -> report/DiagnosticReport
```

Required linkage rules:

- `ServiceRequest` identifies the member, encounter, requested examination,
  body site/laterality, requester, performer organization, location, priority,
  reason, authored time, and accession/order identifiers.
- `ImagingStudy` references the same member, encounter, and `ServiceRequest`,
  plus location, modality, study/series/instance UIDs, start time, and available
  series/instance counts.
- `DiagnosticReport` references the same encounter and `ServiceRequest`, its
  `ImagingStudy`, result observations, interpreter, effective/issued times,
  conclusion, status, and any presented report form.
- A correction never overwrites a final clinical report. It creates a new
  version with explicit lineage and preserves the prior version.

MHCS R5 radiology uses `ServiceRequest`, `ImagingStudy`, `Observation`, and
`DiagnosticReport`. FHIR logical IDs, local UUIDs, accession numbers, and DICOM
UIDs remain distinct identifiers and must never be substituted for each other.

### Ownership of FHIR mappings

| Resource | MHCS source authority |
|---|---|
| `Patient` | Member Core |
| `Appointment` | Member Core, when required by the approved use case |
| `Encounter` | Operator Core, with the reference returned to Member Core |
| Vital-sign `Observation` | Member Core; Operator Core records it |
| `ServiceRequest` | Member Core creates the examination order |
| `ImagingStudy` | Image Gateway after DICOM creation/storage |
| AI result `Observation` | Image Gateway |
| `DiagnosticReport` | Doctor Core for doctor reports |
| `Organization`, `Location`, `PractitionerRole` | Owning service, reconciled with central identifiers |

Family membership is not automatically exported as FHIR `RelatedPerson`.
Create that relationship only when the person participates in the member's
care and the applicable exchange requires it.

### Integration metadata

Every synchronized local resource must retain:

- external system and FHIR resource type;
- FHIR release and profile canonical URL;
- external resource ID and version ID;
- local resource type and immutable local ID;
- synchronization status and last attempt time;
- successful synchronization time; and
- sanitized error code without clinical payload or credentials.

External failure never removes or silently changes the authoritative local
record. Retries are idempotent, and submitted payload versions remain
traceable.

### Terminology and units

Use standard terminology at clinical exchange boundaries:

| Purpose | Standard |
|---|---|
| Vital signs and coded measurements | LOINC |
| Measurement units | UCUM |
| Anatomy, laterality, and clinical concepts | SNOMED CT where required by the profile |
| Diagnoses or examination reasons | The ICD-10 edition approved by MHCS |
| DICOM modality and study/series/instance identity | DICOM identifiers and code sets |
| Dates and instants | ISO 8601 with explicit offset; canonical UTC exchange |

Local codes may exist for MHCS operations, but every externally exchanged code
requires a documented mapping. Do not reuse a display label as a code, invent
a LOINC/SNOMED code, or assume a code is valid because it exists in another
FHIR release.

### Conformance artifacts

The R5 interface requires these conformance artifacts; ordinary MHCS APIs do
not:

- `ImplementationGuide`: package and version the MHCS FHIR rules;
- `StructureDefinition`: constrain each supported R5 resource/profile;
- `CapabilityStatement`: declare supported resources, operations, searches,
  formats, and FHIR version;
- `ValueSet` and `CodeSystem`: only for genuinely local coded concepts not
  already covered by an approved terminology;
- `ConceptMap`: map genuinely local operational codes to approved R5 concepts;
- example resources and automated validation fixtures for valid, invalid, and
  version/profile mismatch cases.

Security and history are also standardized concerns: `Consent` represents an
applicable clinical consent record, `Provenance` records who or what produced a
resource version, and `AuditEvent` records security-relevant access. These
resources do not replace MHCS authorization checks or immutable local audit
logs.

FHIR R5 conformance is required. Local entities remain authoritative for MHCS
operations; the R5 API is a strict interoperable representation with explicit
profiles, validation, history, and security.

## Admin panel

Member administrators must be able to manage:

- member identity reconciliation and account activation;
- protected NIK/KK reconciliation, family grouping, and verification assets;
- B2B agreement references, member import reconciliation, point reservations,
  and audited business-requested booking changes;
- Operator organizations and examination sites;
- site-scoped service credentials and revocation;
- service offerings and AI/doctor inclusion flags;
- site schedules, quotas, and booking eligibility;
- bookings, payments, refunds, points, and promotions; and
- result publication state without access to raw clinical binaries.

Sensitive administrative actions require authorization and audit history.

## Acceptance criteria

Member Core does not satisfy this specification until tests demonstrate that:

- an online registration creates linked user and member records;
- a B2B import creates or matches one member account, requires temporary-password
  replacement on first login, and never retains the plaintext password;
- login works with email or NIK without requiring a phone;
- assisted recovery for a member without email or phone requires authorised
  NIK/KK verification;
- login errors do not disclose whether a NIK or email exists;
- an idempotent operator walk-in request creates at most one member and booking;
- a credential cannot retrieve attendance for another site;
- attendance excludes unpaid, cancelled, and out-of-window bookings;
- attendance does not expose unnecessary account/contact data;
- KTP/profile access is booking-, site-, role-, and audit-scoped;
- repeated health measurements preserve history and correction lineage;
- vital-sign values use the specified LOINC codes and UCUM units when mapped;
- blood pressure maps systolic and diastolic as one composite observation;
- cross-service, FHIR, and DICOM identifiers cannot be confused with local IDs;
- every external payload declares and validates against its intended FHIR
  release and profile;
- non-R5 or unversioned resources are rejected by the R5 interface;
- booking capacity remains correct under concurrent requests;
- B2B bookings consume only their fully provisioned reserved points and cannot
  be changed by a member;
- B2C bookings consume only personal points, including when the same member has
  B2B entitlements;
- a B2B no-show remains paid and consumes its agreed quota;
- account suspension preserves bookings and clinical references; and
- FHIR mapping uses the member identity without renaming the internal domain.

## Open decisions

- Which identity fields are mandatory when a walk-in has no NIK?
- May a member without NIK/email/phone log in with MRN and password?
- What are the approved KTP/profile-photo retention and deletion periods?
- What are the exact B2C cancellation, refund, and forfeiture transitions?
- What real import file format and field mapping will the first signed B2B
  agreement require?
- Is one service credential issued per deployed Operator Core instance or per
  site regardless of deployment?

## Standards references

- [HL7 FHIR R5](https://hl7.org/fhir/)
- [HL7 FHIR version management](https://hl7.org/fhir/versions.html)
- [HL7 FHIR R5 Vital Signs](https://hl7.org/fhir/observation-vitalsigns.html)
- [HL7 FHIR R5 ServiceRequest](https://hl7.org/fhir/servicerequest.html)
- [HL7 FHIR R5 ImagingStudy](https://hl7.org/fhir/imagingstudy.html)
- [HL7 FHIR R5 DiagnosticReport](https://hl7.org/fhir/diagnosticreport.html)
- [HL7 FHIR R5 Encounter](https://hl7.org/fhir/encounter.html)
- [HL7 FHIR R5 Provenance](https://hl7.org/fhir/provenance.html)
- [HL7 FHIR R5 AuditEvent](https://hl7.org/fhir/auditevent.html)
- [HL7 FHIR R5 Consent](https://hl7.org/fhir/consent.html)
