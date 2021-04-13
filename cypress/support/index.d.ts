/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get root editorArea
     * @example
     * cy.rooteditor()
     */
    rooteditor(): Chainable<any>;
  }
}
