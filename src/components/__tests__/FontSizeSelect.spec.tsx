import { mount } from "@cypress/react";
import { FontSizeSelect } from "../FontSizeSelect";
import { emptySomeEditorState } from "../../testsUtils/editorUtils";
import { OrderedMap } from "immutable";
import { em_font_sizes } from "../../defaults/stylesDefaults";
describe("test FontSizeSelect", () => {
  it("shows closed populated, check display", () => {
    mount(
      <FontSizeSelect
        dispatch={() => {}}
        someEditorState={{ ...emptySomeEditorState, activeFontSize: 1.4 }}
        selectData={em_font_sizes}
      />
    );
    cy.get("select").select("14").should("have.value", 1.4)
  });
  it("shows select active on existing default", () => {
    mount(
      <FontSizeSelect
        dispatch={() => {}}
        someEditorState={{ ...emptySomeEditorState, activeFontSize: 1.4 }}
        selectData={em_font_sizes}
      />
    );
    cy.get("select").should("have.value", 1.4);
  });
  it("shows select active on non existing default", () => {
    mount(
      <FontSizeSelect
        dispatch={() => {}}
        someEditorState={{ ...emptySomeEditorState, activeFontSize: 2.1 }}
        selectData={em_font_sizes}
      />
    );
    cy.get("select").should("have.value", 2.1);
  });
});
