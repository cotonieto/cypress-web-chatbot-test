// Este archivo se ejecuta en el navegador antes de los tests.
//import 'cypress-mochawesome-reporter/register';
import '@cypress/code-coverage/support';
import './commands';

// Limpiar localStorage antes de cada test
beforeEach(() => {
  cy.clearLocalStorage();
});

// Ignorar errores de JS de la aplicación que no afectan las pruebas
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar específicamente el error de "reading 'response'" durante logout
  if (err.message.includes("reading 'response'")) {
    // Devuelve false para que Cypress no falle el test
    return false;
  }

  // Para otros errores, dejar que fallen los tests
  return true;
});



