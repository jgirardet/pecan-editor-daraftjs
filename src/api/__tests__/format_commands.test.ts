import { getAllChars, setEditorSelection } from "../../testsUtils/editorUtils";

import { expect } from "chai";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { applyFormatting, RE_STYLE, switchStyle } from "../format_commands";
import { EditorState, RichUtils } from "draft-js";
import { OrderedSet } from "immutable";
import { cssObjToString } from "../dom_manipulation";
import { defaultBlockStyles } from "../../defaults/stylesDefaults";
describe("test applyformatting", () => {
  const commands = [
    "BOLD",
    "UNDERLINE",
    "ITALIC",
    "COLOR__1",
    "COLOR__2",
    "COLOR__#234242",
    "FONTSIZE__3.2",
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
    { val: "COLOR__1", res: true },
    { val: "COLOR__AZ1", res: true },
    { val: "COLOR__#234342", res: true },
    { val: "COLOR__2.3", res: true },
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
    const ed2 = RichUtils.toggleInlineStyle(ed1, "COLOR__1");
    const ed3 = switchStyle(ed2, "COLOR__4");
    expect(
      getAllChars(ed3.getCurrentContent()).every((c) => c!.hasStyle("COLOR__4"))
    ).true;
    expect(
      getAllChars(ed3.getCurrentContent()).every(
        (c) => !c!.hasStyle("COLOR__1")
      )
    ).true;
  });
  it("switch override style", () => {
    const ed = createEditorStateWithText("ab");
    const ed1 = EditorState.setInlineStyleOverride(
      ed,
      OrderedSet(["COLOR__1", "BOLD"])
    );
    expect(ed1.getInlineStyleOverride().toArray()).deep.equal([
      "COLOR__1",
      "BOLD",
    ]);
    const ed2 = switchStyle(ed1, "COLOR__4");
    expect(ed2.getInlineStyleOverride().toArray()).deep.equal([
      "BOLD",
      "COLOR__4",
    ]);
  });
});

describe("test cssObjToString", () => {
  it("transformes a base", () => {
    const style = {
      selector: ".bla",
      styles: { color: "blue", "font-size": "500" },
    };
    expect(cssObjToString(style)).equal(".bla{color:blue;font-size:500;} ");
  });
  it("transformes a default block", () => {
    expect(cssObjToString(defaultBlockStyles[0])).equal(
      ".pecan-titre1{color:#FF3860;text-decoration-line:underline;text-decoration-style:solid;text-decoration-color:#FF3860;text-transform:uppercase;font-size:2.5em;font-weight:500;font-family:verdana;} "
    );
  });
});