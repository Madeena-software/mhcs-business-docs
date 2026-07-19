"""Minimal link and content checks for the static journey website."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).parent
PAGES = {
    "index.html": ("Read the care process by role.", "MHCS Actor Journey Maps"),
    "member/index.html": ("Member", "NIK", "initial payment"),
    "operator/index.html": ("Operator", "complete set", "payment"),
    "doctor/index.html": ("Doctor", "shared queue", "amendment"),
    "bpmn/index.html": ("Technical BPMN", "All journeys"),
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

    print(f"Site OK: {len(PAGES)} pages and all local links resolve")


if __name__ == "__main__":
    main()
