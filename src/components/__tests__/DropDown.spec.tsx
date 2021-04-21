import { mount } from "@cypress/react";
import React from "react";
import { emptySharedState as sharedState } from "../../testsUtils/editorUtils";
import { ColorDropDown } from "../ColorDropDown";
import { DropDown } from "../DropDown";
import { FontSizeDropDown } from "../FontSizeDropDown";
import { Defaults as config } from "../../defaults";

describe("dropdown", () => {
  beforeEach(() => {
    const but = (
      <button className="button has-background-success-light">
        <span>push me</span>
        <span className="icon is-small">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </button>
    );
    const content = ["aaa", "bbb"].map((val) => (
      <a className="dropdown-item">{val}</a>
    ));
    mount(<DropDown trigger={but}>{content}</DropDown>);
  });
  it("base", () => {
    cy.get(".dropdown-content").should("not.be.visible");
  });
  it("show on click", () => {
    cy.get(".dropdown-trigger")
      .click()
      .get(".dropdown-content")
      .should("be.visible")
      .get("a")
      .should("be.visible")
      .and("have.length", 2);
  });
  it("hide on select on click", () => {
    cy.get(".dropdown-trigger")
      .click()
      .get("a:first")
      .click()
      .get(".dropdown-content")
      .should("not.be.visible");
  });
  it("hide on leave", () => {
    cy.get(".dropdown-trigger")
      .click()
      .get("body")
      .click()
      .get(".dropdown-content")
      .should("not.be.visible");
  });
});

describe("DropDownFontSize", () => {
  beforeEach(() => {
    mount(
      <FontSizeDropDown {...{ dispatch: () => {}, config, sharedState }} />
    );
  });
  it("base", () => {
    cy.get(".dropdown-trigger>button").should("have.text", 13); //deafautl empty block
  });
});

describe("DropDownColor", () => {
  beforeEach(() => {
    mount(<ColorDropDown {...{ dispatch: () => {}, config, sharedState }} />);
  });
  it("base", () => {
    cy.get(".icon").should("have.attr", "style", "color: rgb(68, 68, 68);"); //deafautl empty block
  });
});
