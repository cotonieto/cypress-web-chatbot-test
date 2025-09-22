import LoginPage from "../../pages/LoginPage";
import MyInfoPage from "../../pages/MyInfoPage";

describe('OrangeHRM - My Info Flow', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('user').then((user) => {
            LoginPage.login(user.validUser.username, user.validUser.password);
        });
    });

it('Should update Personal Details in My Info Section', () => {
    cy.fixture('myInfo').then((data) => {
        MyInfoPage.goToMyInfo();
        MyInfoPage.fillPersonalDetails(data);
        MyInfoPage.save();

        //Asertion of saving (i.e success message or persistent values)
        cy.contains('Successfully Updated').should('be.visible');
    }); 
});
});