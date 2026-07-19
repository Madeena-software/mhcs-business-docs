# System Responsibilities and Readiness

This document explains what each application owns, what it should not own, and
what could be verified on 19 July 2026.

## Responsibility and readiness map

| Application | Business responsibility | Receives | Produces | Status |
|---|---|---|---|---|
| `mhcs-member-core` | Member account, booking choices, payment, walk-in policy, member data, and result display | Member activity and authorised result notices | Attendance list, authorised Grabber data, and member-facing information | **Current:** core member workflow exists; expanded target handoffs remain unverified |
| `mhcs-operator-core` | Front desk, arrivals, global walk-in use, queues, examination flow, image viewing, and completion notices | Attendance list and gateway completion status | Arrival order, examination status, and walk-in registration | **Current:** operational workflow exists; target cross-system handoffs were not found |
| Grabber | X-ray capture and DICOM creation | Authorised member and examination data | DICOM uploaded to image-gateway | **Target integration:** separate device software; implementation was not inspected |
| `mhcs-image-gateway` | Controlled image routing, processing coordination, result collection, and publication | Completed studies and processing/review updates | Processing requests, status, and safe publication notices | **Target:** available checkout contains no commits |
| `mpips` | Scientific image-processing execution | Authorised image-processing jobs and stored image references | Processed images, job status, and callbacks | **Current:** processing service exists; MHCS gateway integration was not found |
| `mhcs-doctor-core` | Separate doctor worklist and review workflow | Assigned studies and available supporting outputs | Doctor review output and status | **Unknown:** repository was unavailable for verification |

## `mhcs-member-core`

### Owns

- member registration and account access;
- member profile information;
- booking and cancellation;
- selection of AI only, doctor only, or both;
- payment during normal booking;
- the configurable global daily walk-in limit;
- points and related member services;
- member notifications; and
- display of result information deliberately published to the member.

### Verified current state

The application contains a member booking flow. It also provides controlled
integration entry points for:

- reading today's confirmed shifts and bookings;
- updating a confirmed booking as completed or not attended; and
- receiving result status and member-safe information from an authorised image
  gateway.

The application can notify a member when received result information is marked
as published.

In the target flow, member-core also supplies the attendance list to
operator-core and the authorised member data Grabber needs to create a DICOM.
Front desk may register a new walk-in member. The shared daily walk-in limit
applies across every operator, location, and device and consumes normal
booking capacity.

### Does not own

- examination-day queues;
- raw clinical image processing;
- AI orchestration;
- doctor worklists; or
- long-term storage of raw clinical image files.

## `mhcs-operator-core`

### Owns

- organisations, projects, and operational participant lists;
- staff assignments;
- arrival confirmation and queue numbers;
- first-arrival-first-served queue order;
- moving a participant into the examination;
- using separate Grabber software during image capture;
- showing the processed X-ray image without diagnostic detail; and
- receiving processing completion notifications.

### Verified current state

The application moves a screening through four stages:

1. not arrived;
2. waiting in the queue;
3. examination in progress; and
4. completed.

Captured files are uploaded directly to private, S3-compatible storage.
Completion marks the record as waiting for AI.

No verified code connects this workflow to member-core, image-gateway, or
MPIPS.

### Does not own

- member accounts, wallet, or booking rules;
- the target image-processing control plane;
- scientific image-processing algorithms; or
- the target doctor application.

## `mhcs-image-gateway`

### Target ownership

The image gateway should be the controlled coordinator for:

- accepting a completed study from operator-core;
- accepting and validating a DICOM uploaded by Grabber;
- retaining traceable references to the study;
- automatically requesting processing from MPIPS;
- requesting third-party AI only when selected;
- sending studies to doctor-core for separate review;
- collecting progress and output references; and
- delivering the processed image and each selected result to member-core;
- notifying operator-core of completion without diagnostic detail;
- making operator payment eligible when a valid DICOM is accepted; and
- retrying third-party AI failures before notifying an administrator.

### Verified current state

The available local checkout is an empty Git repository with no commits.
Therefore, every image-gateway capability in this pack is **Target**, not
**Current**.

### Does not own

- member booking and wallet rules;
- examination-day queue management;
- MPIPS processing algorithms; or
- the doctor's clinical workflow.

## `mpips`

### Owns

- accepting authorised image-processing jobs;
- running defined processing steps;
- keeping processing jobs separated by tenant;
- reading and writing image objects in compatible storage;
- reporting progress and final status; and
- sending signed status callbacks when requested.

### Verified current state

MPIPS is an implemented Python service with an API and background workers.
It can queue, inspect, and cancel image-processing jobs. It includes multiple
image-processing operations and S3-compatible storage support.

No verified code connects MPIPS to the current operator or image-gateway
applications.

### Does not own

- member experience;
- booking or examination queues;
- doctor worklists;
- clinical approval policy; or
- deciding what a member may see.

## `mhcs-doctor-core`

### Target ownership

The intended doctor application should provide:

- a doctor worklist;
- access to assigned studies and relevant supporting outputs;
- a separate doctor review process; and
- review status and output returned to the image gateway.

When both services were selected, the doctor may see available AI output but
does not need to wait for it before completing the review.

### Verified current state

**Unknown.** `/var/www/mhcs-doctor-core` was not present, and its source could
not be inspected. This pack intentionally makes no claim about its current
features.

### Boundary

Doctor review is separate from AI output. This pack does not define doctor
approval as a mandatory gate for all AI output, and it does not define which
doctor output is member-visible.

## Readiness summary

| Area | Readiness | Main gap |
|---|---|---|
| Member booking | Available within member-core | Result-choice and Grabber handoffs remain target behavior |
| Walk-in registration | Confirmed target behavior | Global limit enforcement and payment flow are not implemented or fully specified |
| Day-of-service operations | Available within operator-core | Uses its own participants rather than a verified member booking connection |
| Image capture and storage | Available within operator-core | Target Grabber-to-gateway flow is not implemented in the available repositories |
| Image-gateway coordination | Not implemented in the available checkout | Gateway application must be built |
| Image processing | Available within MPIPS | Gateway-to-MPIPS integration must be built |
| AI diagnosis | Target third-party service | Provider contract, retry count, and final-failure handling must be implemented |
| Doctor review | Unknown or target | Doctor-core source and workflow need verification |
| Member result publication | Receiving capability exists in member-core | Gateway delivery of image and independently completed selected results is missing |
| Operator payment eligibility | Confirmed target rule | Ledger owner and implementation are unknown |

## Decisions still required

The following decisions remain open:

- What is the exact AI retry limit?
- Which system records and pays the operator entitlement?
- How does a walk-in pay?
- How is a doctor assigned?
- What notifications and service-level expectations apply to delayed work?
- What is the exact medical-record identifier format and mapping?

Until those decisions are approved, the target flow should be described as a
direction rather than a customer promise.
