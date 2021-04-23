import { mount } from "@cypress/react";
import { EditorState } from "draft-js";
import { emToPx } from "../../testsUtils/editorUtils";
import { inlinestyles } from "../../testsUtils/samples";
import { PecanEditor } from "../PecanEditor";

describe("click toolbar effects", () => {
  beforeEach(() => {
    mount(<PecanEditor initialState={EditorState.createEmpty()} />);
  });

  it("should affiche base", () => {
    cy.get("body");
  });

  inlinestyles
    .filter((x) => x.selector !== undefined)
    .forEach((b) =>
      it("click apply inline style " + b.title, () => {
        cy.rooteditor().type("ab{selectAll}").get(b.selector!).click();
        cy.contains("ab").should("have.css", b.get.split(":"));
      })
    );
  it("click apply block style", () => {
    cy.rooteditor()
      .type("ab")
      .get(".ri-h-1")
      .click()
      .get("h1")
      .should("have.length", 1)
      .get(".ri-h-2")
      .click()
      .get("h1")
      .should("have.length", 0)
      .get("h2")
      .should("have.length", 1)
      .get(".ri-h-3")
      .click()
      .get("h2")
      .should("have.length", 0)
      .get("h3")
      .should("have.length", 1)
      .get(".ri-h-4")
      .click()
      .get("h3")
      .should("have.length", 0)
      .get("h4")
      .should("have.length", 1)
      .get(".ri-h-4")
      .click() // desactivate current active
      .get("h4")
      .should("have.length", 0);
  });
  it("check text size is shown in FontsizeDropDown", () => {
    cy.get(".dropdown-trigger>button").should("have.text", 13); //deafautl empty block
    cy.rooteditor().type("{ctrl++}");
    cy.get(".dropdown-trigger>button").should("have.text", 14); //deafautl empty block
    cy.rooteditor().type("{ctrl+-}{ctrl+-}");
    cy.get(".dropdown-trigger>button").should("have.text", 12); //deafautl empty block
  });
  it("test click change fontsize and do not deelect", () => {
    cy.rooteditor().type("ab{selectAll}");
    cy.get('.dropdown:contains("13")').within(() => {
      return cy
        .get(".dropdown-trigger")
        .click()
        .get(".dropdown-item:first")
        .click();
    });

    cy.rooteditor()
      .contains("ab")
      .should("have.css", "font-size", emToPx("0.3em"));
    cy.get(".dropdown-trigger>button").should("have.text", 3); //deafautl empty block
  });
  it("check color  with #color is shown in ColorDropDown", () => {
    cy.rooteditor().type("aa");
    cy.get("span.icon:has(.ri-input-method-line):first").as("triggercolor");
    cy.get("@triggercolor").should("have.css", "color", "rgb(68, 68, 68)"); //deafautl empty block

    cy.get(".dropdown:has(.ri-input-method-line)")
      .click()
      .within(() => cy.get(".dropdown-item:nth(5)").click());
    cy.get("@triggercolor").should("have.css", "color", "rgb(0, 0, 255)");
    cy.rooteditor().type("bb");
    cy.get('span:contains("bb")').should("have.css", "color", "rgb(0, 0, 255)");
  });
  it("check color  with color__1 style is shown in ColorDropDown", () => {
    cy.rooteditor().type("aa{selectAll}");
    cy.get("span.icon:has(.ri-input-method-line):first").as("triggercolor");
    cy.get("@triggercolor").should("have.css", "color", "rgb(68, 68, 68)"); //deafautl empty block

    cy.get(".dropdown:has(.ri-input-method-line)")
      .click()
      .within(() => cy.get(".dropdown-item:first").click());
    cy.get("@triggercolor").should("have.css", "color", "rgb(255, 56, 96)");
    cy.rooteditor()
      .contains("aa")
      .should("have.css", "color", "rgb(255, 56, 96)");
  });
  it("clear format", () => {
    cy.rooteditor()
      .type("{ctrl+b}")
      .type("ab")
      .get('span:contains("ab")')
      .as("target")
      .should("have.css", "font-weight", "700");
    cy.rooteditor()
      .type("{selectAll}")
      .get(".ri-format-clear")
      .click()
      .get("@target")
      .should("not.have.css", "font-weight", "700");
  });
});
