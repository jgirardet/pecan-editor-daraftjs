import { mount } from "@cypress/react";

import { Toolbar } from "../Toolbar";
import { Defaults } from "../../defaults";
import { emptySomeEditorState } from "../../testsUtils/editorUtils";
const buttons = Defaults.toolbar.buttons;

describe("toolbar ", () => {
  beforeEach(() => {
    cy.viewport(600, 300);
  });
  it("counts toolbar  items", () => {
    mount(
      <Toolbar
        config={Defaults}
        dispatch={() => {}}
        someEditorState={emptySomeEditorState}
      />
    );
    cy.get("button").should("have.length", buttons.length);
  });
});