import { mount } from "@cypress/react";

import { Toolbar } from "../Toolbar";
import { Defaults } from "../../defaults";
import { emptySharedState as sharedState } from "../../testsUtils/editorUtils";
const buttons = Defaults.toolbar.buttons;

describe("toolbar ", () => {
  it("counts toolbar  items", () => {
    mount(
      <Toolbar
        config={Defaults}
        dispatch={() => {}}
        sharedState={sharedState}
      />
    );
    cy.get("button").should("have.length", 14);
  });
});
