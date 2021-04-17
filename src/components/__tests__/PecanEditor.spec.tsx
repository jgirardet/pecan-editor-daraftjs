import { mount } from "@cypress/react";
import { EditorState } from "draft-js";
import { inlinestyles } from "../../testsUtils/samples";
import { PecanEditor } from "../PecanEditor";

describe("Pecan Editor", () => {
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
        cy.rooteditor()
          .type("ab{selectAll}")
          .get(b.selector!)
          .click()
          .get(b.get)
          .should("have.length", 1);
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
});
