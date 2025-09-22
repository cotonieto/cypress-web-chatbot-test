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
  IframeBotPage.typeMessage('Hola'); // Esto ya escribe y hace click en "Enviar"
  IframeBotPage.getLastBotResponse().should('contain.text', 'Hola! ¿Cómo estás?');
});

  it('Recibir respuesta del bot', () => {
  IframeBotPage.typeMessage('Hola'); // escribe y envía
  IframeBotPage.getLastBotResponse().should('contain.text', 'Hola! ¿Cómo estás?');
});

it('Recibir respuesta del bot', () => {
  IframeBotPage.typeMessage('Hola'); // escribe "Hola" y hace click en "Enviar"
  IframeBotPage.getLastBotResponse().should('contain.text', 'Hola! ¿Cómo estás?');
 });
});
