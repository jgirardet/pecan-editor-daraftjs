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
      // .type("az")
      .type("az{enter}er")
      // .type("er")
      .get("span:first")
      .should("contain", "az")
      .get("span:last")
      .should("contain", "er")
      .get("span")
      .should("have.length", 4);
  });

  inlinestyles.forEach((st) =>
    it(`test ${st.title}`, () => {
      cy.rooteditor()
        .type(`{ctrl+${st.key}}`)
        .type("az")
        .contains("az")
        .should("have.css", st.get.split(":"));
    })
  );

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
      .get("span:first")
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
      .should("have.css", "font-size", emToPx("1.4em"))
      .type("{ctrl+-}")
      .type("{ctrl+-}")
      .should("have.css", "font-size", emToPx("1.2em"));
  });
  it("clear format vi keymap", () => {
    cy.rooteditor()
      .type("{ctrl+b}")
      .type("ab")
      .contains("ab")
      .should("have.css", "font-weight", "700");
    cy.rooteditor()
      .type("{selectAll}{ctrl+,}")
      .contains("ab")
      .should("not.have.css", "font-weight", "700");
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
      .get("span:first")
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
      .get("span:first")
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
      .get("span:first")
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
      .get("span:first")
      .should("have.css", "color", "rgb(250, 173, 29)")
      .should("have.css", "text-decoration-color", "rgb(250, 173, 29)")
      .should("have.css", "text-decoration-style", "solid")
      .should("have.css", "text-decoration-line", "underline");
  });
  it("add newline with unstyled with key Return", () => {
    cy.rooteditor().type("aa{ctrl+y}").type("{enter}bb");
    cy.contains("aa")
      .parent()
      .should("have.css", "text-decoration-line", "underline");
    cy.contains("bb")
      .parent()
      .should("have.css", "text-decoration-line", "none");
  });
  it("add new unstyled line  before with shift  Return", () => {
    cy.rooteditor()
      .type("aa{ctrl+y}{leftArrow}")
      .type("{shift+enter}bb{downArrow}{downArrow}cc");
    cy.contains("aacc")
      .parent()
      .should("have.css", "text-decoration-line", "underline");
    cy.contains("bb")
      .parent()
      .should("have.css", "text-decoration-line", "none");
  });
  it("add new unstyled line  after with shift  Return", () => {
    cy.rooteditor()
      .type("aa{ctrl+y}{leftArrow}")
      .type("{ctrl+enter}bb{upArrow}{upArrow}cc");
    cy.contains("ccaa")
      .parent()
      .should("have.css", "text-decoration-line", "underline");
    cy.contains("bb")
      .parent()
      .should("have.css", "text-decoration-line", "none");
  });
});

describe("font size", () => {
  // const fontsize = Defaults.styles.blockStyles.unstyled.fontSize;
  beforeEach(() => {
    mount(<FakeEditorArea />);
  });
  it("default", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1'):first")
      .should("have.css", "font-size", emToPx("1.3em"));
  });
  it("increase font via keymap no selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("{ctrl++}")
      .type("1")
      .get("span:contains('1'):first")
      .should("have.css", "font-size", emToPx("1.4em"))
      .get("span:first")
      .type("{ctrl++}")
      .type("2")
      .get("span:contains('2')")
      .should("have.css", "font-size", emToPx("1.5em"));
  });
  it("increase font via keymap selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl++}")
      .should("have.css", "font-size", emToPx("1.4em"));
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
      .should("have.css", "font-size", emToPx("1.5em"));
  });
  it("decrease font via keymap no selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("{ctrl+-}")
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.2em"))
      .get("span:first")
      .type("{ctrl+-}")
      .type("2")
      .get("span:contains('2')")
      .should("have.css", "font-size", emToPx("1.1em"));
  });
  it("decrease font via keymap selection no previous inlinestyle", () => {
    cy.rooteditor()
      .type("1")
      .get("span:contains('1')")
      .should("have.css", "font-size", emToPx("1.3em"))
      .get("span:contains('1'):first")
      .type("{selectAll}")
      .type("{ctrl+-}")
      .should("have.css", "font-size", emToPx("1.2em"));
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
      .should("have.css", "font-size", emToPx("1.1em"));
  });
});
