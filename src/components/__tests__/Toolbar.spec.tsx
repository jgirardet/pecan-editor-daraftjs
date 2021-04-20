import { mount } from "@cypress/react";

import { Toolbar } from "../Toolbar";
import { Defaults } from "../../defaults";
import { emptySomeEditorState } from "../../testsUtils/editorUtils";
import { PecanProvider } from "../../hooks/pecan_context";
const buttons = Defaults.toolbar.buttons;

describe("toolbar ", () => {
  it("counts toolbar  items", () => {
    mount(
      <PecanProvider>
        <Toolbar
          config={Defaults}
          dispatch={() => {}}
          someEditorState={emptySomeEditorState}
        />
      </PecanProvider>
    );
    cy.get("button").should("have.length", 12);
  });
});
