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
