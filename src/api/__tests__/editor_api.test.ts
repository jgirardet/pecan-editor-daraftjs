import { ContentBlock, DraftInlineStyle } from "draft-js";
import { OrderedSet } from "immutable";
import { getCustomStyleFn } from "../editor_api";
import { expect } from "chai";
import { Defaults } from "../../defaults";
describe("test customStyleFn", () => {
  const customStyleFn = getCustomStyleFn(Defaults.styles);
  const block = new ContentBlock();
  it("get font size corret", () => {
    const size = OrderedSet(["fontSize__2.3em"]);
    const res = customStyleFn(size as DraftInlineStyle, block);
    expect(res).deep.contains({ fontSize: "2.3em" });
  });
  it("get font size bad speeling (one underscore missing)", () => {
    const size = OrderedSet(["FONTSIZE_2.3"]);
    const res = customStyleFn(size as DraftInlineStyle, block);
    expect(res).deep.contains({
      fontSize: Defaults.styles.blockStyles.unstyled.fontSize,
    });
  });
  it("get color  corret", () => {
    const color = OrderedSet(["color__#123456"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.contains({ color: "#123456" });
  });
  it("get color  if color shortcurt", () => {
    const color = OrderedSet(["color__1"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.contains({
      color: Defaults.styles.defaultColors.color__1.color,
    });
  });
  it("get no color if bad speeling (one underscore missing)", () => {
    const color = OrderedSet(["COLOR_2.3"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.contains({
      color: Defaults.styles.blockStyles.unstyled.color,
    });
  });
  it("apply subscript default block size", () => {
    const color = OrderedSet(["verticalAlign__sub"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.contains({ verticalAlign: "sub", fontSize: "0.7em" });
  });
  it("apply subscript some other size", () => {
    const color = OrderedSet(["verticalAlign__sub", "fontSize__3.4em"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.contains({ verticalAlign: "sub", fontSize: "1.7em" });
  });
  it("ignore fontwieight if bold", () => {
    const color = OrderedSet(["BOLD"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    console.log(res);
    expect(res.fontWeight).undefined;
  });
  it("apply fontweight number", () => {
    const color = OrderedSet(["fontWeight__700"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    console.log(res);
    expect(res).contains({ fontWeight: 700 });
  });
  it("apply fontweight string", () => {
    const color = OrderedSet(["fontWeight__lighter"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    console.log(res);
    expect(res).contains({ fontWeight: 'lighter' });
  });
  it("apply fontweightof default block", () => {
    const color = OrderedSet([]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    console.log(res);
    expect(res).contains({ fontWeight: 200 });
  });
});
export {};
