import { ContentBlock, DraftInlineStyle } from "draft-js";
import { OrderedSet } from "immutable";
import { getCustomStyleFn } from "../editor_api";
import { expect } from "chai";
describe("test customStyleFn", () => {
  const customStyleFn = getCustomStyleFn();
  const block = new ContentBlock();
  it("get font size corret", () => {
    const size = OrderedSet(["FONTSIZE__2.3"]);
    const res = customStyleFn(size as DraftInlineStyle, block);
    expect(res).deep.equal({ fontSize: "2.3em" });
  });
  it("get font size bad speeling (one underscore missing)", () => {
    const size = OrderedSet(["FONTSIZE_2.3"]);
    const res = customStyleFn(size as DraftInlineStyle, block);
    expect(res).deep.equal({});
  });
  it("get color  corret", () => {
    const color = OrderedSet(["COLOR__#123456"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.equal({ color: "#123456" });
  });
  it("get no color  if color shortcurt", () => {
    const color = OrderedSet(["COLOR__1"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.equal({});
  });
  it("get color bad speeling (one underscore missing)", () => {
    const color = OrderedSet(["COLOR_2.3"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.equal({});
  });
  it("apply subscript default block size", () => {
    const color = OrderedSet(["VERTICAL_ALIGN__SUB"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.equal({ verticalAlign: "sub", fontSize: "0.7em" });
  });
  it("apply subscript some other size", () => {
    const color = OrderedSet(["VERTICAL_ALIGN__SUB", "FONTSIZE__3.4"]);
    const res = customStyleFn(color as DraftInlineStyle, block);
    expect(res).deep.equal({ verticalAlign: "sub", fontSize: "1.7em" });
  });
});
export {};
