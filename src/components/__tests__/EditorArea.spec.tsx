import { mount } from "@cypress/react";
import { each } from "cypress/types/jquery";
import { EditorState } from "draft-js";
import { useReducer, useState } from "react";
import { Defaults } from "../../defaults";
import { pecanReduer } from "../../hooks/pecan_reducer";
import { EditorArea } from "../EditorArea";
import hexRGB from "hex-rgb";
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
    it(`test ${st.title}`, () => {
      cy.rooteditor()
        .type(`{ctrl+${st.key}}`)
        .type("az")
        .get(st.get)
        .should("have.length", 1);
    })
  );

  // it("fontsizes", () => {
  //   Object.entries(
  //     Defaults.styles.defaultFontSizes
  //   ).forEach(([nom, value]) => {});
  // });

  it("block style", () => {
    cy.rooteditor()
      .type("bla")
      .type("{ctrl+y}")
      .get("h1")
      .should("have.length", 1)
      .type("{ctrl+y}")
      .get("h1")
      .should("have.length", 0)
      .get("h2")
      .should("have.length", 1)
      .type("{ctrl+y}")
      .get("h2")
      .should("have.length", 0)
      .get("h3")
      .should("have.length", 1)
      .type("{ctrl+y}")
      .get("h3")
      .should("have.length", 0)
      .get("h4")
      .should("have.length", 1)
      .type("{ctrl+y}")
      .get("h4")
      .should("have.length", 0)
      .get(".pecan-unstyled")
      .should("have.length", 1);
  });
});

describe("test blockformatting", () => {
  beforeEach(() => {
    mount(<FakeEditorArea />);
  });
  it("color red for H1", () => {
    cy.rooteditor()
      .type("{ctrl+y}")
      .type("11")
      .get("h1")
      .should("have.css", "color", "rgb(255, 56, 96)")
      .should("have.css", "text-decoration-color", "rgb(255, 56, 96)")
      .should("have.css", "text-decoration-style", "solid")
      .should("have.css", "text-decoration-line", "underline");
  });
  it("color green for H2", () => {
    cy.rooteditor()
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("11")
      .get("h2")
      .should("have.css", "color", "rgb(21, 177, 104)")
      .should("have.css", "text-decoration-color", "rgb(21, 177, 104)")
      .should("have.css", "text-decoration-style", "solid")
      .should("have.css", "text-decoration-line", "underline");
  });
  it("color blue for H3", () => {
    cy.rooteditor()
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("11")
      .get("h3")
      .should("have.css", "color", "rgb(4, 76, 211)")
      .should("have.css", "text-decoration-color", "rgb(4, 76, 211)")
      .should("have.css", "text-decoration-style", "solid")
      .should("have.css", "text-decoration-line", "underline");
  });
  it("color yellow for H4", () => {
    cy.rooteditor()
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("{ctrl+y}")
      .type("11")
      .get("h4")
      .should("have.css", "color", "rgb(250, 173, 29)")
      .should("have.css", "text-decoration-color", "rgb(250, 173, 29)")
      .should("have.css", "text-decoration-style", "solid")
      .should("have.css", "text-decoration-line", "underline");
  });
});
