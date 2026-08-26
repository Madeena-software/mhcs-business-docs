"""Minimal link and content checks for the static journey website."""

from html.parser import HTMLParser
from hashlib import sha256
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).parent
PAGES = {
    "index.html": ("Read the care process by role.", "MHCS Actor Journey Maps"),
    "member/index.html": ("Member", "NIK", "business-funded"),
    "operator/index.html": ("Operator", "Basic examination & vital signs assessment", "Pair a read-only LCD session"),
    "doctor/index.html": ("Doctor", "shared queue", "amendment"),
    "bpmn/index.html": ("Technical BPMN", "All journeys"),
    "mock-up/index.html": (
        "MHCS Continuous Healthcare Journey Mockup",
        "Madeena Health Care System",
        "orchestrates existing healthcare capabilities into continuous end-to-end healthcare services",
        "Government systems remain authoritative",
        "Healthy",
        "Continued Monitoring",
        "H2 / Imaging",
        "Guided journey stages",
        "Intended outcome",
        "Action completed",
        "Example Guided Clinical Journey",
        "Demo Patient",
        "Finding requires clinical review",
        "Potential MoH Value",
        "Potential Bappenas Value",
        "Faster interpretation",
        "Better utilisation of existing healthcare investment",
    ),
    "demonstrator/index.html": (
        "MHCS Operational Demonstrator",
        "DEMO-001",
        "Member (Patient)",
        "Operator (Radiographer)",
        "Doctor (Radiologist)",
        "Journey Overview",
        "Your Health Journey",
        "Imaging Tasks",
        "Clinical Review Queue",
        "Use Demo Image",
        "Upload Image",
        "Confirm Image Acquisition",
        "External AI Capability",
        "Open AI Analysis",
        "Human Clinical Review",
        "Referral created",
        "Referral completed",
        "Follow-up",
        "Intended outcome",
        "Continued Monitoring",
        "Reset Demo",
        "Fictional demonstration",
        "Not for clinical use",
    ),
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"a", "link", "script"}:
            target = attrs.get("href") or attrs.get("src")
            if target:
                self.links.append(target)

    def handle_data(self, data):
        self.text.append(data)


def main():
    for relative, expected_text in PAGES.items():
        page = ROOT / relative
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        text = " ".join(parser.text)
        assert all(fragment in text for fragment in expected_text), relative

        for link in parser.links:
            parts = urlsplit(link)
            if parts.scheme == "data" or parts.fragment:
                continue
            assert not parts.scheme and not parts.netloc, (relative, link)
            target = (page.parent / parts.path).resolve()
            if target.is_dir() or parts.path.endswith("/"):
                target /= "index.html"
            assert target.is_file(), (relative, link)

    mockup_source = (ROOT / "mock-up/index.html").read_text(encoding="utf-8")
    for translation in (
        'data-en="To be determined" data-id="Akan ditentukan"',
        'data-en="Pending field validation" data-id="Menunggu validasi lapangan"',
    ):
        assert translation in mockup_source, translation

    clinical_demo = mockup_source.split('id="clinical-journey-demo"', 1)[1].split(
        "</section>", 1
    )[0]
    for fragment in (
        "Demo Patient",
        "Case DEMO-001",
        "Finding requires clinical review",
        "Action completed",
        "Intended outcome",
        "Continued Monitoring",
    ):
        assert fragment in clinical_demo, fragment

    for fragment in (
        "Potential MoH Value",
        "Potential Bappenas Value",
        "Faster interpretation",
        "Better utilisation of existing healthcare investment",
        "Potential value — subject to field validation and measured POC outcomes.",
    ):
        assert fragment in mockup_source, fragment

    for stage in (
        'data-stage="prevention"',
        'data-stage="screening"',
        'data-stage="finding"',
        'data-stage="action"',
        'data-stage="follow-up"',
        'data-stage="outcome"',
    ):
        assert stage in mockup_source, stage

    demonstrator = ROOT / "demonstrator/index.html"
    demonstrator_source = demonstrator.read_text(encoding="utf-8")
    demonstrator_app = (ROOT / "demonstrator/app.js").read_text(encoding="utf-8")
    demonstrator_config = (ROOT / "demonstrator/config.js").read_text(encoding="utf-8")
    workflow = (ROOT.parent / ".github/workflows/deploy-pages.yml").read_text(
        encoding="utf-8"
    )
    for fragment in (
        'href="styles.css"',
        'src="config.js"',
        'src="app.js"',
        "Member (Patient)",
        "Operator (Radiographer)",
        "Doctor (Radiologist)",
        "Journey Overview",
        "Your Health Journey",
        "Imaging Tasks",
        "Clinical Review Queue",
        "Upload Image",
        "Use Demo Image",
        "Confirm Image Acquisition",
        "External AI Capability",
        "Open AI Analysis",
        "Continue to Doctor (Radiologist) Review",
        "Human Clinical Review",
        "Referral created",
        "Referral completed",
        "Follow-up",
        "Intended outcome",
        "Continued Monitoring",
        "Reset Demo",
        "Fictional demonstration",
        "Not for clinical use",
    ):
        assert fragment in demonstrator_source, fragment

    assert 'id="language-switcher"' in demonstrator_source
    assert '<html lang="id">' in demonstrator_source
    assert 'data-language="id"' in demonstrator_source
    assert 'data-language="en"' in demonstrator_source
    assert 'aria-pressed="true"' in demonstrator_source
    assert 'aria-pressed="false"' in demonstrator_source
    assert 'data-i18n="shell.fictionalDisclaimer"' in demonstrator_source
    assert 'data-i18n="view.member"' in demonstrator_source
    assert 'data-i18n="operator.title"' in demonstrator_source
    assert 'data-i18n="doctor.title"' in demonstrator_source
    assert 'data-i18n="journey.title"' in demonstrator_source
    assert not (ROOT / "demonstrator/index-id.html").exists()
    assert not (ROOT / "demonstrator/index-en.html").exists()

    assert "const translations = {" in demonstrator_app
    assert "id: {" in demonstrator_app
    assert "en: {" in demonstrator_app
    assert 'let currentLanguage = "id";' in demonstrator_app
    assert "function localize()" in demonstrator_app
    assert "function setLanguage(language)" in demonstrator_app
    assert "document.documentElement.lang = currentLanguage" in demonstrator_app
    assert "elements.notice.textContent = text(currentAnnouncementKey)" in demonstrator_app
    for fragment in (
        "Demonstrasi fiktif",
        "Bukan untuk penggunaan klinis",
        "Member (Pasien)",
        "Operator (Radiografer)",
        "Dokter (Radiolog)",
        "Ringkasan Perjalanan",
        "Perjalanan Kesehatan Anda",
        "Tugas Radiografi",
        "Antrean Tinjauan Klinis",
        "Konfirmasi Akuisisi Citra",
        "Tinjauan Klinis oleh Dokter",
        "Buat Rujukan",
        "Rujukan diperlukan",
        "Rujukan dibuat",
        "Rujukan selesai",
        "Tindak lanjut",
        "Pemantauan Berkelanjutan",
        "PROGRES DEMO",
        "Hanya simulasi presentasi",
    ):
        assert fragment in demonstrator_app, fragment

    state_definition = demonstrator_app.split("const state = ", 1)[1].split(";", 1)[0]
    assert "language" not in state_definition
    language_body = demonstrator_app.split("function setLanguage(language)", 1)[1].split(
        "function ", 1
    )[0]
    assert "state.step" not in language_body
    assert "resetDemo" not in language_body
    assert "showView" not in language_body
    assert "render()" in language_body
    reset_body = demonstrator_app.split("function resetDemo()", 1)[1].split(
        "elements.memberNextAction", 1
    )[0]
    assert "state.step = 0" in reset_body
    assert "currentLanguage" not in reset_body
    assert "announce(\"announcement." in demonstrator_app
    assert 'id="view-member"' in demonstrator_source
    assert 'id="view-operator"' in demonstrator_source
    assert 'id="view-doctor"' in demonstrator_source
    assert 'id="view-journey"' in demonstrator_source
    assert 'id="view-member"' in demonstrator_source and 'id="view-member"' in demonstrator_source.split('id="view-journey"', 1)[0]
    assert 'data-view="member"' in demonstrator_source
    assert 'data-view="operator"' in demonstrator_source
    assert 'data-view="doctor"' in demonstrator_source
    assert 'data-view="journey"' in demonstrator_source
    assert 'aiDemoUrl: ""' in demonstrator_config
    assert "http" not in demonstrator_config.lower()
    assert "window.open" not in demonstrator_app
    assert "fetch(" not in demonstrator_app
    assert "XMLHttpRequest" not in demonstrator_app
    assert "<iframe" not in demonstrator_source.lower()
    for fragment in (
        "const capabilityAvailable = state.step >= 2;",
        "const reviewReady = state.step === 3;",
        "function beginImagingTask()",
        "state.step = 1;",
        "if (!state.imageSelected || state.step !== 1) return;",
        "function showView(name)",
        "function resetDemo()",
    ):
        assert fragment in demonstrator_app, fragment
    show_view_body = demonstrator_app.split("function showView(name)", 1)[1].split("function ", 1)[0]
    assert "state.step" not in show_view_body
    member_workspace = demonstrator_source.split('id="view-member"', 1)[1].split(
        'id="view-operator"', 1
    )[0]
    member_cta = member_workspace.split('id="member-next-action"', 1)[1].split(
        "</button>", 1
    )[0]
    assert 'data-member-action="next-details"' in member_cta
    assert "data-view=" not in member_cta
    member_render = demonstrator_app.split("function renderMember()", 1)[1].split(
        "function renderOperator()", 1
    )[0]
    assert "dataset.view" not in member_render
    assert "memberNextDetails" in member_render
    translation_source = demonstrator_app.split("const translations = {", 1)[1].split(
        "let currentLanguage", 1
    )[0]
    id_translation = translation_source.split("id: {", 1)[1].split("en: {", 1)[0]
    en_translation = translation_source.split("en: {", 1)[1]
    required_action_member = en_translation.split(
        '"member.state.4.status"', 1
    )[1].split('"member.state.5.status"', 1)[0]
    for fragment in (
        '"member.state.4.title": "Referral required"',
        '"member.state.4.next": "Referral creation"',
        '"member.state.4.actor": "Doctor (Radiologist)"',
        "has not yet been created in this demonstration",
    ):
        assert fragment in required_action_member, fragment
    for fragment in ("Referral arranged", "A referral has been arranged", "Referral awaiting completion"):
        assert fragment not in required_action_member, fragment
    id_required_action_member = id_translation.split(
        '"member.state.4.status"', 1
    )[1].split('"member.state.5.status"', 1)[0]
    for fragment in ("Rujukan diperlukan", "belum dibuat"):
        assert fragment in id_required_action_member, fragment
    referral_created_member = en_translation.split(
        '"member.state.5.status"', 1
    )[1].split('"member.state.6.status"', 1)[0]
    for fragment in (
        "Your referral is recorded",
        "receiving service still needs to complete",
    ):
        assert fragment in referral_created_member, fragment
    id_referral_created_member = id_translation.split(
        '"member.state.5.status"', 1
    )[1].split('"member.state.6.status"', 1)[0]
    for fragment in ("Rujukan dibuat", "masih perlu menyelesaikan"):
        assert fragment in id_referral_created_member, fragment

    doctor_render = demonstrator_app.split("function renderDoctor()", 1)[1].split(
        "function renderJourney()", 1
    )[0]
    doctor_queue = doctor_render.split("const queueState = ", 1)[1].split(
        "elements.doctorQueueCount", 1
    )[0]
    for fragment in (
        "state.step < 3",
        "state.step === 3",
        "state.step === 4",
        "state.step >= 5",
        'text("doctor.queue.noCase.summary")',
        'text("doctor.queue.ready.summary")',
        'text("doctor.queue.reviewed.summary")',
        'text("doctor.queue.completed.summary")',
        'text("doctor.queue.noCase.status")',
        'text("doctor.queue.ready.status")',
        'text("doctor.queue.reviewed.status")',
        'text("doctor.queue.completed.status")',
    ):
        assert fragment in doctor_queue, fragment
    for fragment in (
        '"doctor.action.review.eyebrow": "HUMAN CLINICAL REVIEW"',
        '"doctor.action.referral.eyebrow": "REQUIRED HEALTHCARE ACTION"',
        '"doctor.action.referral.title": "Create Referral"',
        "Downstream service completion and follow-up continue outside this radiology workspace",
    ):
        assert fragment in translation_source, fragment
    for fragment in ("Complete Referral", "Complete Follow-up", "Record Intended Outcome"):
        assert fragment not in doctor_render, fragment

    journey_workspace = demonstrator_source.split('id="view-journey"', 1)[1]
    for fragment in (
        'id="demo-progression"',
        "DEMO PROGRESSION",
        "Presentation simulation only",
        'id="simulate-referral-completion"',
        'id="simulate-followup-completion"',
        'id="simulate-intended-outcome"',
        "Simulate Referral Completion",
        "Simulate Follow-up Completion",
        "Simulate Intended Outcome",
    ):
        assert fragment in journey_workspace, fragment
    journey_render = demonstrator_app.split("function renderJourney()", 1)[1].split(
        "function configureAiLink()", 1
    )[0]
    for fragment in (
        '"journey.simulateReferral": "Simulate Referral Completion"',
        '"journey.simulateFollowup": "Simulate Follow-up Completion"',
        '"journey.simulateOutcome": "Simulate Intended Outcome"',
    ):
        assert fragment in translation_source, fragment
    assert "state.step = 2" in demonstrator_app
    assert "state.step = 3" in demonstrator_app
    assert "state.step = 4" in demonstrator_app
    assert "state.step = 5" in demonstrator_app
    assert "state.step = 6" in demonstrator_app
    assert "state.step = 7" in demonstrator_app
    assert "state.step = 8" in demonstrator_app
    assert "secrets.AI_DEMO_URL" in workflow
    assert workflow.index("AI_DEMO_URL") < workflow.index("Upload artifact")

    legacy = ROOT / "mock-up/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3.html"
    legacy_assets = ROOT / "mock-up/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3_files/index-2a7W-y2Q.css"
    legacy_saved_resource = ROOT / "mock-up/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3_files/saved_resource.html"
    assert not (ROOT / "mock-up/MHCS Guided Clinical Journey Mockup _ v0.3.html").exists()
    assert not (ROOT / "mock-up/MHCS Guided Clinical Journey Mockup _ v0.3_files").exists()
    assert legacy.is_file(), legacy
    assert legacy_assets.is_file(), legacy_assets
    assert legacy_saved_resource.is_file(), legacy_saved_resource
    assert "MHCS Guided Clinical Journey Mockup | v0.3" in legacy.read_text(encoding="utf-8")
    for path, expected_digest in {
        legacy: "c79d1bd2f0b8f0f14d309427c3fb007727104038c0b7a2f1e2736b9e282f1594",
        legacy_assets: "0e37a9544a4447bd5d68adcd6a2e4d7587bd8adf674cdfad0646ddad2f26fa13",
        legacy_saved_resource: "718afe981e52b556fee6a652a0c3bb4a79cc2c2d71f0f6a1ba753c9413bc7ef0",
    }.items():
        assert sha256(path.read_bytes()).hexdigest() == expected_digest, path

    design = ROOT.parent / "docs/technical/mhcs-core/design/mhcs-core-design.html"
    parser = PageParser()
    parser.feed(design.read_text(encoding="utf-8"))
    design_text = " ".join(parser.text)
    for fragment in (
        "One Ticket · Two Service Queues",
        "Signed paper consent version recorded",
        "Glucose, total cholesterol, uric acid",
        "Five recent calls",
    ):
        assert fragment in design_text, fragment

    source = design.read_text(encoding="utf-8")
    lcd = source.split('id="screen-operator-lcd"', 1)[1].split("</section>", 1)[0]
    assert 'data-display-safe-fields="ticket_number station_label called_at"' in lcd
    assert not any(value in lcd for value in ("NIK", "medical record", "Bambang", "Siti"))
    assert all(
        value in lcd
        for value in (
            "SESI FOTO RADIOGRAFI",
            "PEMERIKSAAN DASAR",
            "A-002",
            "A-003",
        )
    )
    assert not any(value in lcd for value in ("Front Desk", "Awaiting AI", "EDUKASI HASIL"))

    class IdParser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.ids = []

        def handle_starttag(self, tag, attrs):
            identifier = dict(attrs).get("id")
            if identifier:
                self.ids.append(identifier)

    ids = IdParser()
    ids.feed(source)
    assert len(ids.ids) == len(set(ids.ids)), "duplicate prototype id"

    operator_spec = " ".join(
        (
            ROOT.parent / "docs/technical/mhcs-core/modules/operator/project.md"
        ).read_text(encoding="utf-8").split()
    )
    for contract in (
        "Multiple assigned operators may serve different patients or stages concurrently.",
        "a competing claim fails",
        "Each stage uses FIFO by its own ready time.",
        "issue one site-and-shift ticket only after",
        "Every configured field requires either a value",
        "Operator Core provides a read-only **AI Results Status Monitor**",
        "expires automatically at shift end",
        "`portal`, `email`, and/or `print` delivery status",
        "**Basic examination & vital signs:** becomes eligible",
        "**X-ray:** becomes eligible",
    ):
        assert contract in operator_spec, contract

    member_spec = (
        ROOT.parent / "docs/technical/mhcs-core/modules/member/project.md"
    ).read_text(encoding="utf-8")
    assessment_schema = member_spec.split("    MCU_ASSESSMENTS {", 1)[1].split(
        "    }", 1
    )[0]
    for field in (
        "temperature_absence_reason",
        "glucose_mg_dl",
        "total_cholesterol_mg_dl",
        "uric_acid_mg_dl",
        "smoking_history_response",
        "shortness_of_breath_response",
        "tuberculosis_response",
        "occupational_dust_smoke_response",
        "relevant_family_history_response",
    ):
        assert field in assessment_schema, field
    assert "VITAL_SIGN_MEASUREMENTS {" not in member_spec
    assert not any(
        field in assessment_schema
        for field in (
            "pulse_per_minute",
            "respiratory_rate_per_minute",
            "oxygen_saturation_percent",
        )
    )

    print(f"Site OK: {len(PAGES)} pages and all local links resolve")


if __name__ == "__main__":
    main()
