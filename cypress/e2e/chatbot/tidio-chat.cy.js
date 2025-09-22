/// <reference types="cypress" />

const ChatbotPage = require('../../pages/ChatbotPage');

describe('Pruebas Funcionales - Rasa Webchat Público', () => {

  beforeEach(() => {
    ChatbotPage.visit();
  });

  it('Acceder a la URL', () => {
    ChatbotPage.validateUrl();
  });

  it('Abrir el widget y validar visibilidad', () => {
    ChatbotPage.openWidget();
  });

  it('Validar saludo del bot', () => {
    ChatbotPage.openWidget();
    ChatbotPage.validateHeader('Rasa Webchat'); // según título real
  });

  it('Enviar mensaje: "Hola"', () => {
    ChatbotPage.openWidget();
    ChatbotPage.sendMessage('Hola');
  });

  it('Validar respuesta del bot', () => {
    ChatbotPage.openWidget();
    ChatbotPage.sendMessage('Hola');
    ChatbotPage.validateBotResponse('Hola'); // cambia al texto real que responde el bot
  });
});

