# Member Core Business Project Foundation

**Status:** Approved target foundation
**Last reviewed:** 19 July 2026

This document defines the MHCS-specific business responsibilities that belong
to `mhcs-member-core`. It is not an implementation plan or proof that every
target capability is already available.

## Purpose

Member Core is the member-facing application. It owns member identity,
bookings, member payments, service choices, notifications, and the controlled
presentation of images and results.

## Intended users

- Members register, maintain their profile, book and pay for services, and
  receive results.
- Member administrators manage services, booking rules, member payments, and
  member-facing information.
- Operator Core receives authorised attendance and examination information.
- Image Gateway publishes authorised imaging and result references.

## Current verified foundation

The available application already includes member accounts, profiles,
bookings, payments, notifications, and a controlled endpoint for imaging-result
metadata from an authorised image gateway.

The complete target handoffs described below were not verified as connected
end to end.

## Target business responsibilities

Member Core owns:

- a globally unique medical-record ID for every member;
- member registration, including registration initiated for a walk-in;
- booking and cancellation;
- member charges and payment records;
- the examination and service catalogue;
- the service choices available for each body part or examination type;
- the current AI-only, doctor-only, and combined choices;
- authorised attendance and examination information supplied to Operator Core;
- member notifications;
- member-facing image viewing and exports; and
- automatic publication of completed AI results, doctor reports, and report
  amendments.

The exact AI provider is not chosen by the member. It is selected by
application code under administrator control.

## Walk-in rule

A walk-in without an account must be registered in Member Core and receive a
medical-record ID before entering the operator queue. Walk-in payment must be
completed in Member Core before Operator Core confirms the examination.

## Examination identity

The globally unique medical-record ID is the primary member link across all
MHCS organisations.

The clinical metadata supplied for an examination becomes a frozen snapshot
when the operator submits the capture set. Later profile changes must not
silently change DICOM files already created from that snapshot.

The identifier and clinical structures should be FHIR-compatible. This is a
design direction for future interoperability, not a claim that Member Core is
integrated with or certified by SATUSEHAT.

## Member result experience

- The complete processed image set becomes visible when every submitted
  capture has successfully produced DICOM.
- The member does not wait for selected AI or doctor results before viewing the
  processed images.
- AI and doctor results become visible automatically and independently as each
  completes.
- No doctor or administrator approval is required before a completed AI result
  becomes visible.
- No administrator approval is required before a submitted doctor report
  becomes visible.
- A corrected doctor report replaces the prior version in the default member
  view, while the original remains preserved in the audit history.
- The member is notified when a published doctor report is corrected.

Members view images inside Member Core. They do not download raw DICOM.
Initial export formats are TIFF, JPG, and PDF.

## Information received

Member Core receives only member-safe information from Image Gateway:

- processing and publication status;
- authorised temporary image references;
- completed AI results when selected;
- completed doctor reports when selected; and
- corrected or amended report versions.

Member Core does not receive raw NPZ files.

## Payment boundary

Member Core owns member charges and payments. It does not own operator or
doctor earnings.

## FHIR boundary

FHIR applies to clinical information such as member identity, examinations,
imaging studies, and clinical reports. Booking administration, payment, and
other non-clinical workflows continue to use ordinary application contracts.

## Does not own

Member Core does not own:

- front-desk queues or examination-room operations;
- raw NPZ or long-term DICOM storage;
- image-processing execution;
- AI-provider orchestration;
- doctor work queues;
- operator earnings; or
- doctor earnings.

## Readiness and gaps

**Current:** Core member functions and a result-receiving foundation exist.

**Target:** The global medical-record ID, walk-in handoff, FHIR-compatible
clinical exchange, examination-specific service rules, image viewing/exports,
and complete publication flow require verification or implementation.

Exact API contracts, FHIR resource mappings, authorisation, deployment, and
tests belong to a later technical plan.
