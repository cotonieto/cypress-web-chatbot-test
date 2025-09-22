// cypress/pages/IframeBotPage.js
class IframeBotPage {
  visit() {
    cy.visit('/index.html');
  }

  getIframe() {
    return cy.get('#bot-iframe');
  }

  getIframeBody() {
    return this.getIframe()
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  typeMessage(message) {
    this.getIframeBody().find('input[name="message"]').type(message);
  }

  clickBotButton() {
    this.getIframeBody().find('button[type="submit"]').click();
  }

  // Validar respuesta específica del bot
  validateBotResponse(expected) {
    this.getIframeBody()
      .find('.bot-response', { timeout: 5000 }) // espera hasta 5s
      .should('contain.text', expected);
  }

  // Obtener la última respuesta del bot
  getBotResponse() {
    return this.getIframeBody()
      .find('.bot-response', { timeout: 5000 }) // espera a que exista
      .last();
  }
}

// ⚠️ Exportar con module.exports para require()
module.exports = new IframeBotPage();




