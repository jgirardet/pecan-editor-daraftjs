import { color } from "../color";
import { expect } from "chai";
describe("Test Color", () => {
  it("test init", () => {
    const f = color("color__#123456");
    expect(f.toStyle()).equal("color__#123456");
    const g = color("rgb(255, 56, 96)");
    expect(g.toStyle()).equal("color__#ff3860");
    const h = color("#ff3860");
    expect(h.toStyle()).equal("color__#ff3860");
    expect(h.hex).equal("#ff3860");
  });
});
export {};
