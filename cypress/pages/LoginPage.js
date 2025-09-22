class LoginPage {
  elements = {
    // 🔹 Forzamos visibilidad y tiempo de espera más largo
    usernameInput: () =>
      cy.get('input[name="username"]', { timeout: 20000 }).should('be.visible'),
    passwordInput: () =>
      cy.get('input[name="password"]', { timeout: 20000 }).should('be.visible'),
    loginBtn: () =>
      cy.get('button[type="submit"]', { timeout: 20000 }).should('be.visible'),
    errorMsg: () =>
      cy.get('.oxd-alert-content-text', { timeout: 10000 }).should('be.visible'),
  };

  /**
   * Ejecuta login con credenciales dadas
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    // 🔹 Espera explícita opcional para asegurar que la página haya cargado
    cy.wait(500);

    // 🔹 Limpiar y escribir de forma confiable
    this.elements.usernameInput().clear().type(username, { delay: 50 });
    this.elements.passwordInput().clear().type(password, { delay: 50 });
    this.elements.loginBtn().click();
  }
}

export default new LoginPage();

