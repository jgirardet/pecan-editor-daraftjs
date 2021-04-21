import "bulma/css/bulma.min.css";

import React from "react";
import { mount, unmount } from "@cypress/react";
import { Defaults } from "../../defaults";
import { ToolbarButton } from "../ToolbarButton";
import { emptySharedState } from "../../testsUtils/editorUtils";

const buttons = Defaults.toolbar.buttons;

const bold = buttons.filter((x) => x.action === "BOLD")[0];
const h1 = buttons.filter((x) => x.action === "header-one")[0];

describe("ToolbarButtons", () => {
  beforeEach(() => {
    cy.viewport(300, 300);
    mount(
      <ToolbarButton
        buttonData={bold}
        dispatch={() => {}}
        sharedState={emptySharedState}
        config={Defaults}
      />
    );
  });
  it("no icon show warning", () => {
    unmount();
    mount(
      <ToolbarButton
        buttonData={{ action: "_", type: "inline" }}
        dispatch={() => {}}
        sharedState={emptySharedState}
        config={Defaults}
      />
    );
    cy.get("span").should("have.class", "icon ri-error-warning-fill");
  });
  it("has good icon", () => {
    cy.get("span").should("have.class", "icon ri-bold");
  });
  it("button is-focused on pressed and is-active on hover", () => {
    cy.get("button")
      .should("have.class", "button has-tooltip-arrow has-tooltip-bottom")
      .should("not.be.focused")
      .trigger("mouseover")
      .should("have.class", "is-active")
      .trigger("mousedown")
      .should("have.class", "is-focused")
      .trigger("mouseup")
      .should("have.class", "is-active")
      .trigger("mouseout")
      .should("not.have.class", "is-active");
  });

  [
    { blocktype: "inline", command: "APPLY", button: bold, payload: "BOLD" },
    {
      blocktype: "block",
      command: "BLOCK_CHANGE",
      button: h1,
      payload: "header-one",
    },
  ].forEach((genre) =>
    it("click fire action " + genre.blocktype, () => {
      const spy = cy.spy().as("click");
      unmount();
      mount(
        <ToolbarButton
          buttonData={genre.button}
          dispatch={spy}
          sharedState={{
            blockType: genre.blocktype,
            inlineStyles: [],
            activeFontSize: 2.3,
            activeColor: "COLOR__1",
          }}
          config={Defaults}
        />
      );
      cy.get("button").click();
      cy.get("@click").should("be.calledWith", {
        type: genre.command,
        payload: genre.payload,
      });
    })
  );

  it("color change if current curosrstyle match button", () => {
    // expect(button).not.toHaveClass('has-text-info');
    unmount();
    mount(
      <ToolbarButton
        buttonData={bold}
        dispatch={(x) => {}}
        sharedState={{
          ...emptySharedState,
          inlineStyles: ["BOLD"],
          blockType: "",
        }}
        config={Defaults}
      />
    );
    cy.get("button").should("have.have.class", "has-text-info");
  });

  it("color change if current block match button", () => {
    unmount();
    mount(
      <ToolbarButton
        buttonData={h1}
        dispatch={(x) => {}}
        sharedState={{
          ...emptySharedState,
          inlineStyles: [],
          blockType: "header-one",
        }}
        config={Defaults}
      />
    );
    cy.get("button").should("have.have.class", "has-text-info");
  });
});
