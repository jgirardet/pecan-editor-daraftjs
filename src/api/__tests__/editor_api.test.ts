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
});
export {};
