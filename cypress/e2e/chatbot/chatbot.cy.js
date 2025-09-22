const IframeBotPage = require('../../pages/IframeBotPage');

describe('Pruebas visuales con iframe bot', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    IframeBotPage.visit();
  });

  it('Acceder a la URL y validar sitio', () => {
    cy.url().should('include', 'index.html');
  });

  it('Validar que el iframe del bot exista', () => {
    IframeBotPage.getIframe().should('exist');
  });

  it('Interactuar con el iframe y botones del bot', () => {
    IframeBotPage.typeMessage('Hola');
    IframeBotPage.clickBotButton();
    IframeBotPage.validateBotResponse('Hola! ¿Cómo estás?'); // ✅ Espera a que aparezca
  });

  it('Ingresar y mandar mensaje "Hola"', () => {
    IframeBotPage.typeMessage('Hola');
    IframeBotPage.clickBotButton();
  });

  it('Recibir respuesta del bot', () => {
    IframeBotPage.typeMessage('Hola');
    IframeBotPage.clickBotButton();
    IframeBotPage.getBotResponse().should('contain.text', 'Hola! ¿Cómo estás?');
  });
});
