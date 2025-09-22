// Comando personalizado para enviar mensaje al bot vía API
Cypress.Commands.add('sendMessageBot', (message) => {
  const applicationId = '59015449'; // Tu bot propio
  const instanceId = '0'; // Puede ser 0 para iniciar nueva sesión
  const xmlBody = `<chat application='${applicationId}' instance='${instanceId}'><message>${message}</message></chat>`;

  cy.request({
    method: 'POST',
    url: '/rest/api/chat',
    headers: {
      'Content-Type': 'application/xml'
    },
    body: xmlBody,
    failOnStatusCode: true
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.wrap(response.body).as('botResponse');
  });
});