import LoginPage from "../../pages/LoginPage";

describe('OrangeHRM - Login', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    it('Should not login with invalid credentials', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user.invalidUser.username, user.invalidUser.password);
            LoginPage.elements.errorMessage().should('be.visible');
        });
    });

    it('SHould login successfully with valid credentials', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user.validUser.username, user.validUser.password);
            cy.url().should('include', '/dashboard');
        });
    });
});