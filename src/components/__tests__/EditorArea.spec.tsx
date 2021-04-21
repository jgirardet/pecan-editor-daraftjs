import { mount } from "@cypress/react";
import { EditorState } from "draft-js";
import { useReducer } from "react";
import { Defaults } from "../../defaults";
import { pecanReducer } from "../../hooks/pecan_reducer";
import { EditorArea } from "../EditorArea";
import { emToPx } from "../../testsUtils/editorUtils";
import { inlinestyles } from "../../testsUtils/samples";
const FakeEditorArea = () => {
  const [state, dispatch] = useReducer(
    pecanReducer,
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

  inlinestyles.forEach((st) =>
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
  it("increase font via keymap", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl++}")
      .should("have.attr", "style", "font-size: 1.4em;")
      .type("{ctrl+-}")
      .type("{ctrl+-}")
      .should("have.attr", "style", "font-size: 1.2em;");
  });
  it("clear format vi keymap", () => {
    cy.rooteditor()
      .type("{ctrl+b}")
      .type("ab")
      .get("span")
      .should("have.attr", "style", "font-weight: bold;");
    cy.rooteditor()
      .type("{selectAll}{ctrl+,}")
      .get("span")
      .should("have.attr", "style", "");
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

describe("font size", () => {
  const fontsize = Defaults.styles.blockStyles.get(-1).styles["font-size"];
  beforeEach(() => {
    mount(<FakeEditorArea />);
  });
  it("default", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"));
  });
  it("increase font via keymap no selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("{ctrl++}")
      .type("1")
      .get("span:contains('1')")
      .should("have.attr", "style", "font-size: 1.4em;")
      .get(".pecan-unstyled")
      .type("{ctrl++}")
      .type("2")
      .get("span:contains('2')")
      .should("have.attr", "style", "font-size: 1.5em;");
  });
  it("increase font via keymap selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl++}")
      .should("have.attr", "style", "font-size: 1.4em;");
  });
  it("increase font via keymap selection with previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl++}")
      .type("{ctrl++}")
      .should("have.attr", "style", "font-size: 1.5em;");
  });
  it("decrease font via keymap no selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("{ctrl+-}")
      .type("1")
      .get("span:contains('1')")
      .should("have.attr", "style", "font-size: 1.2em;")
      .get(".pecan-unstyled")
      .type("{ctrl+-}")
      .type("2")
      .get("span:contains('2')")
      .should("have.attr", "style", "font-size: 1.1em;");
  });
  it("decrease font via keymap selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl+-}")
      .should("have.attr", "style", "font-size: 1.2em;");
  });
  it("decrease font via keymap selection with previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl+-}")
      .type("{ctrl+-}")
      .should("have.attr", "style", "font-size: 1.1em;");
  });
});
