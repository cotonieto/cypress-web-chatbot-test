/// <reference types="cypress" />
const KatBotPage = require('../../pages/KatBotPage');

// Creamos la instancia dentro del test
const katBot = new KatBotPage();

describe('Pruebas visuales con Kat Bot', () => {

  it('Acceder a la URL y validar sitio', () => {
    katBot.visit();
    cy.url().should('include', 'browse?id=59015449');
  });

  it('Encontrar el componente del bot', () => {
    katBot.visit();
    katBot.validateBotExists();
  });

  it('Interactuar con el iframe y validar nombre del bot', () => {
    katBot.visit();
    katBot.validateBotExists();
    katBot.validateBotName('Kat Bot'); 
  });

  it('Ingresar texto "Hola" y enviarlo', () => {
    katBot.visit();
    katBot.validateBotExists();
    katBot.typeMessage('Hola');
    katBot.sendMessage();
  });

  it('Recibir respuesta y validar que sea correcta', () => {
    katBot.visit();
    katBot.validateBotExists();
    katBot.typeMessage('Hola');
    katBot.sendMessage();
    katBot.validateResponse('Hola'); // Ajusta según la respuesta real
  });

});


