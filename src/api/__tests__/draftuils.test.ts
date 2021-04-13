import { CharacterMetadata } from "draft-js";
import { getAllChars, setEditorSelection } from "../../testsUtils/editorUtils";
import { mapSelectedCharacters } from "../draftutils";

import { expect } from "chai";
import { createEditorStateWithText } from "@draft-js-plugins/editor";

describe("test mapSelectedCharacters", () => {
  it("applies style in one whole block", () => {
    const ed1 = createEditorStateWithText("ab cd");
    const ed = setEditorSelection(ed1, 0, 5);
    const newContent = mapSelectedCharacters((c: CharacterMetadata) => {
      return CharacterMetadata.applyStyle(c, "BOLD");
    }, ed);
    newContent.getBlockMap().forEach((b) => {
      b?.getCharacterList().forEach((c) => {
        expect(c?.hasStyle("BOLD")).to.be.true;
      });
    });
  });
  it("applies style in partial  one  block", () => {
    const ed1 = createEditorStateWithText("ab cd");
    const ed = setEditorSelection(ed1, 2, 4);
    const newContent = mapSelectedCharacters((c: CharacterMetadata) => {
      return CharacterMetadata.applyStyle(c, "BOLD");
    }, ed);
    const chars = newContent.getBlockMap().first().getCharacterList();
    expect(chars.get(0).hasStyle("BOLD")).to.be.false;
    expect(chars.get(1).hasStyle("BOLD")).to.be.false;
    expect(chars.get(2).hasStyle("BOLD")).to.be.true;
    expect(chars.get(3).hasStyle("BOLD")).to.be.true;
    expect(chars.get(4).hasStyle("BOLD")).to.be.false;
  });
  it("applies style multiple block", () => {
    const ed1 = createEditorStateWithText("ab\ncd\nef");
    const ed = setEditorSelection(ed1, 1, 1, 0, 2);
    // expect(ed1.getCurrentContent().getBlockMap().size).to.equal(3);
    const newContent = mapSelectedCharacters((c: CharacterMetadata) => {
      return CharacterMetadata.applyStyle(c, "BOLD");
    }, ed);
    const chars = getAllChars(newContent);
    expect(chars.size).equal(6);
    expect(chars.get(0).hasStyle("BOLD")).false;
    expect(chars.get(1).hasStyle("BOLD")).true;
    expect(chars.get(2).hasStyle("BOLD")).true;
    expect(chars.get(3).hasStyle("BOLD")).true;
    expect(chars.get(4).hasStyle("BOLD")).true;
    expect(chars.get(5).hasStyle("BOLD")).false;
  });
});
