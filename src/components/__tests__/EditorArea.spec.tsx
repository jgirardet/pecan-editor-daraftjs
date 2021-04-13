import { mount } from "@cypress/react";
import {
  ContentBlock,
  DraftInlineStyle,
  DraftStyleMap,
  EditorState,
} from "draft-js";
import { useReducer, useState } from "react";
import { Defaults } from "../../defaults";
import { pecanReduer } from "../../hooks/pecan_reducer";
import { EditorArea } from "../EditorArea";
import { PecanEditor } from "../PecanEditor";

const FakeEditorArea = () => {
  const [state, dispatch] = useReducer(
    pecanReduer,
    EditorState.createEmpty(),
    undefined
  );

  return (
    <EditorArea editorState={state} dispatch={dispatch} config={Defaults} />
  );
};

describe("Editor Area keymaps", () => {
  beforeEach(() => {
    mount(<FakeEditorArea />);
  });

  it("has state handle with onChange", () => {
    cy.rooteditor()
      .type("azer")
      .should("contain", "azer")
      .and("have.length", 1);
  });
  it("test Return  Key", () => {
    cy.rooteditor()
      .type("az")
      .type("{enter}")
      .type("er")
      .get(".pecan-unstyled")
      .should("contain", "az")
      .should("contain", "er")
      .should("have.length", 2);
  });

  const inlinestyle = [
    { title: "bold", key: "b", get: '[style="font-weight: bold;"]' },
    { title: "italic", key: "i", get: '[style="font-style: italic;"]' },
    {
      title: "underline",
      key: "u",
      get: '[style="text-decoration: underline;"]',
    },
    {
      title: "color 1",
      key: "j",
      get: `[style="color: rgb(255, 56, 96);"]`,
    },
    {
      title: "color 2",
      key: "k",
      get: `[style="color: rgb(21, 177, 104);"]`,
    },
    {
      title: "color 3",
      key: "l",
      get: `[style="color: rgb(4, 76, 211);"]`,
    },
    {
      title: "color 4",
      key: "m",
      get: `[style="color: rgb(250, 173, 29);"]`,
    },
  ];

  inlinestyle.forEach((st) =>
    it.only(`test ${st.title}`, () => {
      cy.rooteditor()
        .type(`{ctrl+${st.key}}`)
        .type("az")
        .get(st.get)
        .should("have.length", 1);
    })
  );

  it("fontsizes", () => {
    Object.entries(
      Defaults.styles.defaultFontSizes
    ).forEach(([nom, value]) => {});
  });
});
