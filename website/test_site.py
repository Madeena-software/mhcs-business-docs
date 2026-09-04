"""Minimal link and content checks for the static journey website."""

from html.parser import HTMLParser
from hashlib import sha256
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).parent
ACTOR_INFOGRAPHICS = (
    "member",
    "b2b-representative",
    "site-staff",
    "reception-registration",
    "basic-examination",
    "radiography",
    "doctor",
    "radiologist",
    "authorized-specialist",
    "global-admin",
)
ACTOR_MARKERS = {
    "member": ("Member", "Temporary Result Surface", "On-site / Physical", "No permanent Member portal/account"),
    "b2b-representative": ("Authorized B2B Representative", "Messaging", "entitlement", "authorized changes", "RECONCILE"),
    "site-staff": ("Site Staff", "Temporary Site Workspace", "accept or decline", "assignment", "COMPLETE"),
    "reception-registration": ("Reception / Registration", "booking", "identity", "consent", "ticket", "No clinical DICOM"),
    "basic-examination": ("Basic Examination Site Staff", "measurements", "vitals", "structured assessment", "Radiography"),
    "radiography": ("Radiography Site Staff", "Temporary Site Workspace", "capture", "review", "retake", "submit"),
    "doctor": ("Doctor: Radiologist or Authorized Specialist", "Temporary Clinical / DICOM Workspace", "specialty", "qualification"),
    "radiologist": ("Radiologist", "repeat_required", "REPORT / REPEAT", "controlled reason", "finalize"),
    "authorized-specialist": ("Authorized Specialist", "specialty-appropriate", "independent authorization", "Messaging → Temporary Clinical / DICOM Workspace → Messaging"),
    "global-admin": ("Global Admin / Super Admin", "Persistent Admin Web", "roles", "eligibility", "audit", "exceptions"),
}
PAGES = {
    "index.html": (
        "Indonesia-led healthcare orchestration",
        "current examination / radiography / AI / optional Doctor Review",
        "Strategic Concept",
        "Infographics",
        "Operational demonstrator",
    ),
    "journeys/member/index.html": (
        "Member",
        "WhatsApp",
        "reservation locator",
        "price/fee awareness",
        "payment status",
        "cancellation",
        "reschedule",
        "applicable refund",
    ),
    "journeys/operator/index.html": ("Site Staff", "Basic examination & vital signs assessment", "Pair a read-only LCD session", "Booking lookup", "Identity verification", "Consent confirmation", "Ticket issuance"),
    "journeys/doctor/index.html": ("Doctor", "Radiologist", "Authorized Specialist", "repeat_required", "controlled clinical reason", "amendment"),
    "journeys/b2b/index.html": ("Authorized B2B Representative", "Confirm entitlement", "no-show consequences", "Reconcile usage"),
    "journeys/admin/index.html": ("Global Admin / Super Admin", "Persistent Admin Web", "Suspend or resume payout processing", "identity and access exceptions"),
    "bpmn/index.html": ("Technical BPMN", "All journeys"),
    "infographics/index.html": (
        "MHCS",
        "Healthcare Orchestration",
        "Persistent interaction",
        "Member",
        "SITE STAFF",
        "DOCTOR",
        "Global Admin / Super Admin",
        "Temporary Result Surface",
        "Temporary Site Workspace",
        "Temporary Clinical / DICOM Workspace",
        "Persistent Admin Web",
        "Interaction Surface legend",
    ),
    "concept/index.html": (
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
        "Member · WhatsApp view",
        "Site Staff (Radiography)",
        "Doctor (Radiologist)",
        "Journey Overview",
        "Your WhatsApp Care Updates",
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
        text = " ".join(" ".join(parser.text).split())
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

    infographic = ROOT / "infographics/index.html"
    infographic_source = infographic.read_text(encoding="utf-8")
    for actor in ACTOR_INFOGRAPHICS:
        page = ROOT / f"infographics/actors/{actor}/index.html"
        assert page.is_file(), page
        assert f'href="actors/{actor}/"' in infographic_source, actor
        actor_source = page.read_text(encoding="utf-8")
        assert "Overall Infographic" in actor_source
        assert "Actor Journeys" in actor_source
        assert "Goal:" in actor_source and "INTERACTION SURFACE" in actor_source
        assert "HUMAN ACTIONS" in actor_source and "BOUNDARY" in actor_source and "HANDOFF / OUTCOME" in actor_source
        for component in ("visual-infographic", "who-card", "goal-card", "surface-band", "action-flow", "boundary-card", "outcome-card"):
            assert component in actor_source, (actor, component)
        for marker in ACTOR_MARKERS[actor]:
            assert marker.lower() in actor_source.lower(), (actor, marker)
        for placeholder in (
            "Actor / role identified by the page heading",
            "Achieve the human outcome described for this actor or role",
            "Messaging → assigned surface → outcome",
            "Perform the scoped human action",
            "Return the result or next action through the authorized handoff described below",
        ):
            assert placeholder not in actor_source, (actor, placeholder)
        assert any(surface in actor_source for surface in ("Messaging", "On-site / Physical", "Temporary Site Workspace", "Temporary Clinical / DICOM Workspace", "Persistent Admin Web")), actor
        actor_parser = PageParser()
        actor_parser.feed(actor_source)
        for link in actor_parser.links:
            parts = urlsplit(link)
            if parts.scheme == "data" or parts.fragment:
                continue
            target = (page.parent / parts.path).resolve()
            if target.is_dir() or parts.path.endswith("/"):
                target /= "index.html"
            assert target.is_file(), (actor, link)

    role_visuals = {
        "member": "member", "b2b-representative": "b2b",
        "site-staff": "site-staff", "reception-registration": "reception",
        "basic-examination": "basic", "radiography": "radiography",
        "doctor": "doctor", "radiologist": "radiologist",
        "authorized-specialist": "specialist", "global-admin": "admin",
    }
    for actor, role in role_visuals.items():
        actor_source = (ROOT / f"infographics/actors/{actor}/index.html").read_text(encoding="utf-8")
        assert f'data-role="{role}"' in actor_source
        assert 'class="actor-illustration"' in actor_source

        assert "One authorized person, one scoped outcome" not in actor_source
        assert "Visible handoff" not in actor_source
        assert "Scoped activity" not in actor_source

    overall = infographic_source
    for marker in (
        "orchestration-core", "messaging-hub", "actor-streams", "MEMBER",
        "SITE STAFF", "DOCTOR", "GLOBAL ADMIN / SUPER ADMIN",
        "Temporary Result Surface", "Temporary Site Workspace",
        "Temporary Clinical / DICOM Workspace", "Persistent Admin Web",
        "AUTHORIZED B2B REPRESENTATIVE",
    ):
        assert marker in overall, marker
    assert "01 · OFFER" not in overall
    # Regression guards: active Overall poster isolation and dedicated navigation
    assert 'class="poster visual-infographic"' not in overall
    assert 'visual-infographic' not in overall.split('id="overall-title"', 1)[0]
    assert 'class="cards"' not in overall
    assert 'class="card"' not in overall
    assert "infographic-poster" in overall
    assert "infographic-overall-map" in overall
    assert "infographic-actor-streams" in overall
    assert "infographic-nav-grid" in overall
    assert "infographic-nav-card" in overall

    journey_css = (ROOT / "assets/journey.css").read_text(encoding="utf-8")
    assert ".infographic-poster" in journey_css
    assert ".infographic-nav-grid" in journey_css
    assert ".infographic-nav-card" in journey_css
    assert ".infographic-actor-streams" in journey_css
    assert ".infographic-page .visual-infographic" in journey_css
    assert ":not(.infographic-page)" in journey_css

    member_source = (ROOT / "infographics/actors/member/index.html").read_text(encoding="utf-8")
    assert all(stage in member_source for stage in ("COORDINATE", "ATTEND", "RESULT", "NEXT ACTION"))
    assert "01 · OFFER" not in member_source

    admin_source = (ROOT / "infographics/actors/global-admin/index.html").read_text(encoding="utf-8")
    assert "Persistent Admin Web → Persistent Admin Web" not in admin_source
    assert "01 · OFFER" not in admin_source

    radiologist_source = (ROOT / "infographics/actors/radiologist/index.html").read_text(encoding="utf-8")
    assert all(stage in radiologist_source for stage in ("REVIEW", "QUALITY DECISION", "REPORT / REPEAT", "FINALIZE"))

    radiography_source = (ROOT / "infographics/actors/radiography/index.html").read_text(encoding="utf-8")
    assert "radiography-map" in radiography_source
    assert 'data-convergence="quality-review-to-submit"' in radiography_source
    assert 'data-convergence-path="ok-to-submit"' in radiography_source
    assert 'data-loop="capture-review"' in radiography_source
    assert 'data-branch="quality-review"' in radiography_source
    assert 'data-branch-path="retake"' in radiography_source
    assert 'data-branch-path="ok"' in radiography_source
    assert "Capture / review again" in radiography_source
    assert "OK</span><strong>Continue to SUBMIT" in radiography_source
    assert "RETAKE → OK" not in radiography_source
    assert radiography_source.count('data-stage="submit"') == 1
    assert radiography_source.index('data-branch="quality-review"') < radiography_source.index('data-stage="submit"')
    assert radiography_source.index('data-stage="quality-review"') < radiography_source.index('data-branch="quality-review"')

    b2b_source = (ROOT / "infographics/actors/b2b-representative/index.html").read_text(encoding="utf-8")
    assert "Messaging" in b2b_source
    assert "Temporary Site Workspace" not in b2b_source
    assert "On-site / Physical" not in b2b_source

    landing = (ROOT / "index.html").read_text(encoding="utf-8")
    assert "permissioned" not in landing.lower()
    assert "permission" not in landing.lower()
    assert "concept/" in landing and "demonstrator/" in landing
    assert "Strategic concept mock-up" not in landing
    assert "infographics/" in landing and "journeys/" in landing and "bpmn/" in landing

    # Primary presentation route integrity checks
    for section_id in (
        "problem",
        "overview",
        "interaction-model",
        "service-slice",
        "value",
        "demonstrator",
        "boundaries",
        "collaboration",
        "next-steps",
        "supporting-evidence",
    ):
        assert f'id="{section_id}"' in landing, section_id

    # Core product abstraction & reference channel
    assert "Messaging Interaction Surface" in landing
    assert "Temporary Secure Web" in landing
    assert "WhatsApp" in landing
    assert "Temporary Result Surface" in landing
    assert "Temporary Site Workspace" in landing
    assert "Temporary Clinical Workspace" in landing
    assert "Persistent Admin Web" in landing

    # Visual claim boundary chips
    for chip_class in (
        "maturity-chip verified",
        "maturity-chip prototype",
        "maturity-chip validation",
        "maturity-chip concept",
    ):
        assert chip_class in landing, chip_class

    # Calibrated maturity chip text labels
    for chip_label in (
        "Documented / Demonstrated",
        "Terdokumentasi / Terdemonstrasi",
        "Prototype / Demonstrator",
        "Prototipe / Demonstrator",
        "Validation Stage",
        "Tahap Validasi",
        "Future Concept",
        "Konsep Masa Depan",
    ):
        assert chip_label in landing, chip_label

    # Bilingual support markers and Indonesian parity across primary route
    assert 'data-lang-btn="en"' in landing and 'data-lang-btn="id"' in landing
    for id_marker in (
        "Tantangan Layanan Kesehatan di Indonesia",
        "Apa itu MHCS: Orkestrasi, Bukan Penggantian Monolitik",
        "Model Interaksi: Dari Perpesanan Menuju Web Sementara",
        "Irisan Layanan Saat Ini: Dari Pemeriksaan ke Hasil",
        "Proposisi Nilai Pemangku Kepentingan",
        "Demonstrator Operasional yang Aman",
        "Maturitas Kapabilitas & Batasan Klaim",
        "Peluang Kolaborasi",
        "Diskusi dan Langkah Berikutnya",
    ):
        assert f'data-id="{id_marker}"' in landing, id_marker

    pres_doc = (ROOT / "PRESENTATION.md").read_text(encoding="utf-8")

    # Prohibited recipient/organization names must NOT appear in active presentation content
    for prohibited in (
        "Pak Wong",
        "Stanley Wei",
        "Oneness",
        "Indonesia–Oneness",
        "Indonesia-Oneness",
    ):
        assert prohibited.lower() not in landing.lower(), f"Prohibited term '{prohibited}' found in landing page"
        assert prohibited.lower() not in pres_doc.lower(), f"Prohibited term '{prohibited}' found in PRESENTATION.md"

    # Reusable general-audience presentation headings and collaboration content
    assert "Collaboration Opportunities" in landing
    assert "Peluang Kolaborasi" in landing
    assert "Discussion and Next Steps" in landing
    assert "Diskusi dan Langkah Berikutnya" in landing

    # Explicit health-system positioning and non-replacement
    for non_replacement in (
        "healthcare professionals",
        "clinical judgment",
        "healthcare facilities",
        "PACS",
        "HIS/SIMRS",
        "EMR/RME",
        "SATUSEHAT",
    ):
        assert non_replacement in landing, non_replacement

    # Evidence-calibrated language assertions on affirmative claims
    assert "fully integrated" not in landing.lower()
    assert "officially partnered" not in landing.lower()
    assert "has proven" not in landing.lower()
    assert "eliminates" not in landing.lower()
    assert "delivers clear, tangible benefits" not in landing.lower()
    assert "designed to offer potential value" in landing.lower()

    # Rehearsal documentation check
    assert "10–15 minute" in pres_doc or "10-15 minute" in pres_doc.lower()
    assert "Collaboration Opportunities" in pres_doc
    assert "Discussion and Next Steps" in pres_doc
    for sec_anchor in (
        "#problem",
        "#overview",
        "#interaction-model",
        "#service-slice",
        "#value",
        "#demonstrator",
        "#boundaries",
        "#collaboration",
        "#next-steps",
    ):
        assert sec_anchor in pres_doc, sec_anchor

    # Rehearsal guide must not contain unsupported formulations
    for unsupported in (
        "millions of citizens",
        "delivers dramatically higher attendance",
        "we enforce rigorous",
        "are never transmitted",
    ):
        assert unsupported not in pres_doc.lower(), f"Unsupported formulation '{unsupported}' found in PRESENTATION.md"

    # Positive calibrated markers across landing page and rehearsal guide
    for marker in (
        "designed to",
        "aims to",
        "potential value",
    ):
        assert marker in landing.lower(), f"Calibrated marker '{marker}' missing from landing page"
        assert marker in pres_doc.lower(), f"Calibrated marker '{marker}' missing from PRESENTATION.md"

    for guide_marker in (
        "may support",
        "requires field validation",
        "require validation",
    ):
        assert guide_marker in pres_doc.lower(), f"Calibrated marker '{guide_marker}' missing from PRESENTATION.md"

    member = (ROOT / "journeys/member/index.html").read_text(encoding="utf-8")
    assert "Suspended account" not in member
    assert "Wallet rule" not in member
    assert "permanent conventional Member account" not in member

    operator = (ROOT / "journeys/operator/index.html").read_text(encoding="utf-8")
    assert operator.index("Booking lookup") < operator.index("Identity verification") < operator.index("Consent confirmation") < operator.index("Ticket issuance")
    assert "result education" not in operator.lower()
    assert "clinical AI-result content remains outside non-clinical Site Staff access" in operator

    doctor = (ROOT / "journeys/doctor/index.html").read_text(encoding="utf-8")
    assert "ordinary Messaging" in doctor
    assert "Radiologist" in doctor and "Authorized Specialist" in doctor
    assert doctor.index("repeat_required") < doctor.index("Radiography repeat") < doctor.index("replacement study")
    assert "service permission" not in doctor

    for page in (ROOT / "journeys/b2b/index.html", ROOT / "journeys/admin/index.html"):
        source = page.read_text(encoding="utf-8")
        assert "permission" not in source.lower()

    mockup_source = (ROOT / "concept/index.html").read_text(encoding="utf-8")
    assert "Active strategic concept artifact" in mockup_source
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
    id_locale = ROOT / "demonstrator/locales/id.js"
    en_locale = ROOT / "demonstrator/locales/en.js"
    id_locale_source = id_locale.read_text(encoding="utf-8") if id_locale.is_file() else ""
    en_locale_source = en_locale.read_text(encoding="utf-8") if en_locale.is_file() else ""
    demonstrator_config = (ROOT / "demonstrator/config.js").read_text(encoding="utf-8")
    workflow = (ROOT.parent / ".github/workflows/deploy-pages.yml").read_text(
        encoding="utf-8"
    )
    for fragment in (
        'href="styles.css"',
        'src="config.js"',
        'src="app.js"',
        "Member · WhatsApp view",
        "Site Staff (Radiography)",
        "Doctor (Radiologist)",
        "Journey Overview",
        "Your WhatsApp Care Updates",
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
    for fragment in (
        "INTERACTION SURFACES",
        "Messaging · WhatsApp reference channel",
        "OPEN RESULT",
        "OPEN SITE WORKSPACE",
        "OPEN CASE",
        "BACK TO MESSAGING",
        "Persistent Admin Web",
        "does not imply one persistent web application",
        "id=\"operator-messaging-state\"",
        "id=\"view-operator\"",
        "id=\"doctor-messaging-state\"",
        "id=\"view-doctor\"",
        "id=\"member-result-surface\"",
    ):
        assert fragment in demonstrator_source, fragment
    demonstrator_app = (ROOT / "demonstrator/app.js").read_text(encoding="utf-8")
    for fragment in (
        'surface: "messaging"',
        'setSurface("result")',
        'setSurface("site")',
        'setSurface("clinical")',
        'setSurface("messaging")',
        'member-open-result',
        'operator-back-messaging',
        'doctor-back-messaging',
        'decline-work',
        'decline-doctor-case',
        'state.doctorCaseOpen = false',
        'operatorMessaging.hidden = state.surface === "site"',
        'doctorMessaging.hidden = state.surface === "clinical"',
        'memberLayout.hidden = state.surface === "result"',
    ):
        assert fragment in demonstrator_app, fragment
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

    assert id_locale.is_file(), id_locale
    assert en_locale.is_file(), en_locale
    assert demonstrator_source.index('src="config.js"') < demonstrator_source.index('src="locales/id.js"')
    assert demonstrator_source.index('src="locales/id.js"') < demonstrator_source.index('src="locales/en.js"')
    assert demonstrator_source.index('src="locales/en.js"') < demonstrator_source.index('src="app.js"')
    for locale_source, locale_name in ((id_locale_source, "id"), (en_locale_source, "en")):
        assert "window.MHCS_LOCALES = window.MHCS_LOCALES || {};" in locale_source
        assert f"window.MHCS_LOCALES.{locale_name} = {{" in locale_source
        assert "state.step" not in locale_source
        assert "currentLanguage" not in locale_source
        assert "addEventListener" not in locale_source
    assert "const translations = window.MHCS_LOCALES || {};" in demonstrator_app
    assert "const translations = {" not in demonstrator_app
    assert "id: {" not in demonstrator_app
    assert "en: {" not in demonstrator_app

    assert 'let currentLanguage = "id";' in demonstrator_app
    assert "function localize()" in demonstrator_app
    assert "function setLanguage(language)" in demonstrator_app
    assert "document.documentElement.lang = currentLanguage" in demonstrator_app
    assert "elements.notice.textContent = text(currentAnnouncementKey)" in demonstrator_app
    for fragment in (
        "Demonstrasi fiktif",
        "Bukan untuk penggunaan klinis",
        "Member (Pasien)",
        "Site Staff (Radiography)",
        "Dokter (Radiolog)",
        "Ringkasan Perjalanan",
        "Pembaruan Perawatan melalui WhatsApp",
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
        assert fragment in id_locale_source, fragment
    for fragment in (
        "Fictional demonstration",
        "Member · WhatsApp view",
        "Site Staff (Radiography)",
        "Doctor (Radiologist)",
        "Your WhatsApp Care Updates",
        "Clinical Review Queue",
        "Referral required",
        "Referral created",
        "Simulate Referral Completion",
        "Continued Monitoring",
    ):
        assert fragment in en_locale_source, fragment

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
    assert "124.225.183.175" not in demonstrator_config
    for web_file in ROOT.rglob("*"):
        if web_file.is_file() and web_file.name != "test_site.py" and web_file.suffix in {".html", ".js", ".css", ".py"}:
            assert "124.225.183.175" not in web_file.read_text(encoding="utf-8", errors="ignore"), web_file
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
    translation_source = f"{id_locale_source}\n{en_locale_source}"
    id_translation = id_locale_source
    en_translation = en_locale_source
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

    legacy = ROOT / "concept/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3.html"
    legacy_assets = ROOT / "concept/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3_files/index-2a7W-y2Q.css"
    legacy_saved_resource = ROOT / "concept/v0.3/MHCS Guided Clinical Journey Mockup _ v0.3_files/saved_resource.html"
    assert not (ROOT / "concept/MHCS Guided Clinical Journey Mockup _ v0.3.html").exists()
    assert not (ROOT / "concept/MHCS Guided Clinical Journey Mockup _ v0.3_files").exists()
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

    print(f"Site OK: {len(PAGES)} pages and all local links resolve")


if __name__ == "__main__":
    main()
