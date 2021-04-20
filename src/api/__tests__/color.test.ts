import { Color, color } from "../color";
import { expect } from "chai";
import { Defaults } from "../../defaults";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { RichUtils } from "draft-js";
describe("Test Color", () => {
  it("test init", () => {
    const f = color("COLOR__#123456");
    expect(f.toStyle()).equal("COLOR__#123456");
    const g = color("rgb(255, 56, 96)");
    expect(g.toStyle()).equal("COLOR__#ff3860");
    const h = color("#ff3860");
    expect(h.toStyle()).equal("COLOR__#ff3860");
    expect(h.hex).equal("#ff3860");
  });
  it("test from block", () => {
    const unstyled = createEditorStateWithText("bla");
    const blockStyle = Defaults.styles.blockStyles;
    const key = unstyled.getCurrentContent().getBlockMap().first().getKey();
    const h1 = RichUtils.toggleBlockType(unstyled, "header-one");
    let res = Color.fromBlock(unstyled, blockStyle, key);
    if (res) expect(res.toStyle()).equal(color("#444444").toStyle());
    res = Color.fromBlock(h1, blockStyle, key);
    if (res) expect(res.toStyle()).equal(color("#ff3860").toStyle());
  });
});

export {};
