import { FontSize, fontsize } from "../fontsize";
import { expect } from "chai";
describe("fontsize", () => {
  it("tests init", () => {
    const f = fontsize("FONTSIZE__2.3");
    expect(f.toStyle()).equal("FONTSIZE__2.3");
    const g = FontSize.fromEm("3.4em");
    expect(g.toStyle()).equal("FONTSIZE__3.4");
    expect(f.float).equal(2.3);
  });

  it("test increase decrease", () => {
    const f = fontsize("FONTSIZE__2.3");
    expect(f.increase()).equal("FONTSIZE__2.5");
    expect(f.decrease()).equal("FONTSIZE__2.1");
  });
  it("test create from block", () => {
    //tested in EDitorArea.spec.tsx
  });
});
export {};
