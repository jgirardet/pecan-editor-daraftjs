import {
  CharacterMetadata,
  EditorState,
  RichUtils,
} from "draft-js";
import { getAllChars, setEditorSelection } from "../../testsUtils/editorUtils";
import { mapSelectedCharacters, newEmptyBlock } from "../draftutils";

import { expect } from "chai";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { describe } from "mocha";

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

describe("test add new empty block", () => {
  function fixture(state: EditorState) {
    const newState = newEmptyBlock(state);
    const block0 = newState.getCurrentContent().getFirstBlock();
    const block1 = newState.getCurrentContent().getLastBlock();
    const sel = newState.getSelection();
    return { newState, block0, block1, sel };
  }

  it("test from unstyled endblock", () => {
    const state = EditorState.moveSelectionToEnd(
      createEditorStateWithText("aa")
    );
    const { newState, block0, block1, sel } = fixture(state);

    expect(sel.get("hasFocus")).true;
    expect(sel.getAnchorKey()).equal(block1.getKey());
    expect(sel.getFocusKey()).equal(block1.getKey());
    expect(block0.getText()).equal("aa");
    expect(block1.getText()).equal("");
    expect(block0.getType()).equal("unstyled");
    expect(block1.getType()).equal("unstyled");
  });
  it("test from unstyled midblock", () => {
    const state0 = createEditorStateWithText("aa");
    const state = EditorState.forceSelection(
      state0,
      state0.getSelection().merge({ anchorOffset: 1, focusOffset: 1 })
    );
    const { newState, block0, block1, sel } = fixture(state);

    expect(sel.get("hasFocus")).true;
    expect(sel.getAnchorKey()).equal(block1.getKey());
    expect(sel.getFocusKey()).equal(block1.getKey());
    expect(block0.getText()).equal("a");
    expect(block1.getText()).equal("a");
    expect(block0.getType()).equal("unstyled");
    expect(block1.getType()).equal("unstyled");
  });
  it("test from h1 endblock", () => {
    const state = RichUtils.toggleBlockType(
      EditorState.moveSelectionToEnd(createEditorStateWithText("aa")),
      "header-one"
    );
    const { newState, block0, block1, sel } = fixture(state);

    expect(sel.get("hasFocus")).true;
    expect(sel.getAnchorKey()).equal(block1.getKey());
    expect(sel.getFocusKey()).equal(block1.getKey());
    expect(block0.getText()).equal("aa");
    expect(block1.getText()).equal("");
    expect(block0.getType()).equal("header-one");
    expect(block1.getType()).equal("unstyled");
  });
  it("test from h1 midblock", () => {
    const state0 = RichUtils.toggleBlockType(
      createEditorStateWithText("aa"),
      "header-one"
    );
    const state = EditorState.acceptSelection(
      state0,
      state0.getSelection().merge({ anchorOffset: 1, focusOffset: 1 })
    );
    const { newState, block0, block1, sel } = fixture(state);

    expect(sel.get("hasFocus")).true;
    expect(sel.getAnchorKey()).equal(block1.getKey());
    expect(sel.getFocusKey()).equal(block1.getKey());
    expect(block0.getText()).equal("a");
    expect(block1.getText()).equal("a");
    expect(block0.getType()).equal("header-one");
    expect(block1.getType()).equal("unstyled");
  });
});
