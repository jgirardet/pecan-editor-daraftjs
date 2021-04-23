import { getAllChars, setEditorSelection } from "../../testsUtils/editorUtils";

import { expect } from "chai";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { applyFormatting, RE_STYLE, switchStyle } from "../format_commands";
import { EditorState, RichUtils } from "draft-js";
import { OrderedSet } from "immutable";
describe("test applyformatting", () => {
  const commands = [
    "BOLD",
    "UNDERLINE",
    "ITALIC",
    "color__1",
    "color__2",
    "color__#23Aa242",
    "fontSize__3.2",
    "verticalAlign__sub",
    "verticalAlign__super",
  ];
  commands.forEach((x) =>
    it(`applyFormatting: ${x} `, () => {
      const ed1 = createEditorStateWithText("ab");
      const ed = setEditorSelection(ed1, 0, 2);
      const efd = applyFormatting(ed, x);
      expect(getAllChars(efd.getCurrentContent()).every((c) => c!.hasStyle(x)))
        .true;
    })
  );
});

describe("test RE_STYLe regex", () => {
  [
    { val: "COLOR", res: false },
    { val: "COLOR_1", res: false },
    { val: "color__1", res: true },
    { val: "color__AZ1", res: true },
    { val: "color__#234342", res: true },
    { val: "color__2.3", res: true },
    { val: "color__#0000ff", res: true },
    { val: "verticalAlign__sub", res: true },
  ].forEach((x) =>
    it(`test ${x.val}`, () => {
      expect(RE_STYLE.test(x.val)).equals(x.res);
    })
  );
});

describe("test switchStyle", () => {
  it("remove one when another is applied if selected", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = setEditorSelection(ed, 0, 2);
    const ed2 = RichUtils.toggleInlineStyle(ed1, "color__1");
    const ed3 = switchStyle(ed2, "color__4");
    expect(
      getAllChars(ed3.getCurrentContent()).every((c) => c!.hasStyle("color__4"))
    ).true;
    expect(
      getAllChars(ed3.getCurrentContent()).every(
        (c) => !c!.hasStyle("color__1")
      )
    ).true;
  });
  it("remove the same if  applied if selected", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = setEditorSelection(ed, 0, 2);
    const ed2 = RichUtils.toggleInlineStyle(ed1, "color__1");
    const ed3 = switchStyle(ed2, "color__1");
    expect(
      getAllChars(ed3.getCurrentContent()).every(
        (c) => !c!.hasStyle("color__1")
      )
    ).true;
  });
  it("switch override style", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = EditorState.setInlineStyleOverride(
      ed,
      OrderedSet(["color__1", "BOLD"])
    );
    expect(ed1.getInlineStyleOverride().toArray()).deep.equal([
      "color__1",
      "BOLD",
    ]);
    const ed2 = switchStyle(ed1, "color__4");
    expect(ed2.getInlineStyleOverride().toArray()).deep.equal([
      "BOLD",
      "color__4",
    ]);
  });
  it("switch remove existing style no selection", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = EditorState.setInlineStyleOverride(
      ed,
      OrderedSet(["color__1", "BOLD"])
    );
    expect(ed1.getInlineStyleOverride().toArray()).deep.equal([
      "color__1",
      "BOLD",
    ]);
    const ed2 = switchStyle(ed1, "color__1");
    expect(ed2.getInlineStyleOverride().toArray()).deep.equal(["BOLD"]);
  });
});

describe("clear format command when text selected", () => {
  it("remove the same if  applied if selected", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = setEditorSelection(ed, 0, 2);
    const ed2 = RichUtils.toggleInlineStyle(ed1, "color__1");
    const ed4 = RichUtils.toggleInlineStyle(ed2, "BOLD");
    const ed5 = applyFormatting(ed4, "CLEAR_FORMAT");
    expect(
      getAllChars(ed5.getCurrentContent()).every(
        (c) => c!.getStyle().size === 0
      )
    ).true;
  });
  it("test clear overrideinline style", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = RichUtils.toggleInlineStyle(ed, "BOLD");
    const ed2 = applyFormatting(ed1, "CLEAR_FORMAT");
    expect(ed2.getInlineStyleOverride().size).equal(0);
  });
});
