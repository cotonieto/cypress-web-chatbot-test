// cypress/pages/IframeBotPage.js
class IframeBotPage {
  /**
   * Visita la página principal que contiene el iframe del bot
   */
  visit() {
    cy.visit('http://localhost:8080/index.html'); // Asegúrate de que tu servidor sirva desde public/
  }

  /**
   * Obtiene el iframe del bot
   */
  getIframe() {
    return cy.get('iframe#botFrame', { timeout: 20000 }).should('exist');
  }

  /**
   * Escribe un mensaje dentro del iframe y envía
   * @param {string} msg
   */
  typeMessage(msg) {
    this.getIframe().then($iframe => {
      const body = $iframe.contents().find('body');

      cy.wrap(body)
        .find('input[name="message"]')
        .clear()
        .type(msg, { delay: 50 });

      cy.wrap(body)
        .find('button[type="submit"]')
        .click();
    });
  }

  /**
   * Obtiene la última respuesta del bot
   */
  getLastBotResponse() {
    return this.getIframe().then($iframe => {
      const body = $iframe.contents().find('body');
      return cy.wrap(body)
        .find('.bot-response')
        .last();
    });
  }
}

export default new IframeBotPage();






