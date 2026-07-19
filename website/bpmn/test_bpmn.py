"""Minimal structural checks for the static MHCS BPMN page."""

from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).parent
BPMN = "http://www.omg.org/spec/BPMN/20100524/MODEL"
BPMNDI = "http://www.omg.org/spec/BPMN/20100524/DI"
NS = {"bpmn": BPMN, "bpmndi": BPMNDI}


class PageAssets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.paths.append(attrs["href"])
        elif tag == "script" and attrs.get("src"):
            self.paths.append(attrs["src"])
        elif tag == "a" and "download" in attrs:
            self.paths.append(attrs["href"])


def main():
    root = ET.parse(ROOT / "mhcs-target-flow.bpmn").getroot()
    process = root.find("bpmn:process", NS)
    assert process is not None and process.get("isExecutable") == "false"

    lanes = process.findall(".//bpmn:lane", NS)
    assert [lane.get("name") for lane in lanes] == [
        "Member",
        "Operator",
        "MHCS Platform",
        "Doctor",
        "AI Service",
    ]

    node_tags = {
        "startEvent",
        "endEvent",
        "userTask",
        "serviceTask",
        "parallelGateway",
        "exclusiveGateway",
    }
    nodes = {
        element.get("id"): element
        for element in process
        if element.tag.rsplit("}", 1)[-1] in node_tags
    }
    lane_refs = [
        ref.text for lane in lanes for ref in lane.findall("bpmn:flowNodeRef", NS)
    ]
    assert len(lane_refs) == len(set(lane_refs))
    assert set(lane_refs) == set(nodes)

    flows = {
        flow.get("id"): flow for flow in process.findall("bpmn:sequenceFlow", NS)
    }
    for flow in flows.values():
        assert flow.get("sourceRef") in nodes
        assert flow.get("targetRef") in nodes

    choice = nodes["Gateway_DoctorSelected"]
    assert choice.get("default") == "Flow_Doctor_No"
    assert flows["Flow_Doctor_Yes"].find("bpmn:conditionExpression", NS) is not None
    assert len(nodes["Gateway_DoctorMerge"].findall("bpmn:incoming", NS)) == 2
    ai_choice = nodes["Gateway_AISelected"]
    assert ai_choice.get("default") == "Flow_AI_No"
    assert flows["Flow_AI_Yes"].find("bpmn:conditionExpression", NS) is not None
    assert len(nodes["Gateway_AIMerge"].findall("bpmn:incoming", NS)) == 2
    assert len(nodes["Gateway_IndependentResults"].findall("bpmn:outgoing", NS)) == 3
    assert len(nodes["Gateway_ResultJoin"].findall("bpmn:incoming", NS)) == 3

    shape_refs = {
        shape.get("bpmnElement")
        for shape in root.findall(".//bpmndi:BPMNShape", NS)
    }
    edge_refs = {
        edge.get("bpmnElement") for edge in root.findall(".//bpmndi:BPMNEdge", NS)
    }
    assert shape_refs == set(nodes) | {lane.get("id") for lane in lanes}
    assert edge_refs == set(flows)

    assets = PageAssets()
    assets.feed((ROOT / "index.html").read_text(encoding="utf-8"))
    assert "./mhcs-target-flow.bpmn" in assets.paths
    for asset in assets.paths:
        assert not asset.startswith(("http://", "https://", "//"))
        assert (ROOT / asset.removeprefix("./")).is_file()

    viewer = ROOT / "vendor/bpmn-navigated-viewer.production.min.js"
    assert "v18.16.1" in viewer.read_text(encoding="utf-8")[:200]
    assert "watermark" in (ROOT / "vendor/LICENSE").read_text(encoding="utf-8")

    print(f"BPMN OK: {len(lanes)} lanes, {len(nodes)} nodes, {len(flows)} flows")


if __name__ == "__main__":
    main()
