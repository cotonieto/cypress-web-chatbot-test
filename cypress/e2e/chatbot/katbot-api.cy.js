describe('Pruebas API Chatbot Público @Kat Bot', () => {

  // Test 1: Enviar mensaje corto "Hola"
  it('Enviar mensaje "Hola" y validar respuesta', () => {
    cy.sendKatBotMessage('Hola').then((response) => {
      expect(response).to.be.a('string');
      cy.log('Bot respondió: ' + response);
    });
  });

  // Test 2: Enviar mensaje largo
  it('Enviar mensaje largo y validar respuesta', () => {
    const longMessage = 'Este es un mensaje largo para probar la respuesta del bot Kat.';
    cy.sendKatBotMessage(longMessage).then((response) => {
      expect(response).to.be.a('string');
    });
  });

  // Test 3: Validar respuesta a pregunta "Cómo estás?"
  it('Validar respuesta del bot para "Cómo estás?"', () => {
    cy.sendKatBotMessage('Cómo estás?').then((response) => {
      expect(response.toLowerCase()).to.include('bien'); // ajusta según respuesta real
    });
  });

  // Test 4: Validar respuesta a "Qué puedes hacer?"
  it('Validar respuesta del bot para "Qué puedes hacer?"', () => {
    cy.sendKatBotMessage('Qué puedes hacer?').then((response) => {
      expect(response).to.be.a('string');
      cy.log('Bot respondió: ' + response);
    });
  });

  // Test 5: Validar respuesta a "Dime un chiste"
  it('Validar respuesta del bot para "Dime un chiste"', () => {
    cy.sendKatBotMessage('Dime un chiste').then((response) => {
      expect(response).to.be.a('string');
      cy.log('Bot respondió: ' + response);
    });
  });

});
