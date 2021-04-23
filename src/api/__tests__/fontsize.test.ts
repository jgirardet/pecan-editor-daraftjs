import { FontSize, fontsize } from "../fontsize";
import { expect } from "chai";
describe("fontsize", () => {
  it("tests init", () => {
    const f = fontsize("fontSize__2.3em");
    expect(f.toStyle()).equal("fontSize__2.3em");
    const g = FontSize.fromEm("3.4em");
    expect(g.toStyle()).equal("fontSize__3.4em");
    expect(f.float).equal(2.3);
  });

  it("test increase decrease", () => {
    const f = fontsize("fontSize__2.3em");
    expect(f.increase()).equal("fontSize__2.5em");
    expect(f.decrease()).equal("fontSize__2.1em");
  });
});
export {};
