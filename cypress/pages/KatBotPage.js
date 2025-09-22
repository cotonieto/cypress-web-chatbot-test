/// <reference types="cypress" />

class KatBotPage {
  constructor() {
    this.url = 'http://www.botlibre.com/browse?id=59015449';
    this.iframeSelector = 'iframe';
    this.inputSelector = 'input[name="message"]';
    this.sendButtonSelector = 'button[type="submit"], button.send';
    this.botNameSelector = '.bot-name, .chat-header';
    this.responseSelector = '.message, .chat-message';
  }

  visit() {
    cy.visit(this.url);
  }

  validateBotExists() {
    cy.get(this.iframeSelector, { timeout: 10000 }).should('exist');
  }

  getIframeBody() {
    return cy
      .get(this.iframeSelector)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  validateBotName(expectedName) {
    this.getIframeBody()
      .find(this.botNameSelector, { timeout: 10000 })
      .should('contain.text', expectedName);
  }

  typeMessage(message) {
    this.getIframeBody()
      .find(this.inputSelector, { timeout: 10000 })
      .type(message);
  }

  sendMessage() {
    this.getIframeBody()
      .find(this.sendButtonSelector, { timeout: 10000 })
      .click();
  }

  validateResponse(expectedText) {
    this.getIframeBody()
      .find(this.responseSelector, { timeout: 10000 })
      .last()
      .should('contain.text', expectedText);
  }
}

// Exporta la clase directamente
module.exports = KatBotPage;



