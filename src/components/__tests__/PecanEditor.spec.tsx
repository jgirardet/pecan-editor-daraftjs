import { mount } from "@cypress/react";
import { EditorState } from "draft-js";
import { PecanEditor } from "../PecanEditor";

describe("Pecan Editor", () => {
  beforeEach(() => {
    mount(<PecanEditor initialState={EditorState.createEmpty()} />);
  });

  it("should affiche base", () => {
    cy.get("body");
  });
});
