import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';
import MyInfoPage from '../../pages/MyInfoPage';
import AttachmentsPage from '../../pages/AttachmentsPage';

describe('OrangeHRM Automation Suite', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('Invalid login should not access dashboard', () => {
    cy.fixture('user').then(user => {
      LoginPage.login(user.invalidUser.username, user.invalidUser.password);
      LoginPage.elements.errorMsg()
        .should('be.visible')
        .and('contain', 'Invalid credentials');
    });
  });

  it('Valid login should access dashboard', () => {
    cy.fixture('user').then(user => {
      LoginPage.login(user.validUser.username, user.validUser.password);
      DashboardPage.elements.dashboardHeader().should('contain', 'Dashboard');
    });
  });

  it('Access My Info section and verify Personal Details', () => {
    cy.fixture('user').then(user => {
      LoginPage.login(user.validUser.username, user.validUser.password);
      DashboardPage.goToMyInfo();
      MyInfoPage.elements.personalDetailsHeader().should('contain', 'Personal Details');
    });
  });

  it('Fill and save Personal Details', () => {
    cy.fixture('personalDetails').then(data => {
      LoginPage.login('Admin', 'admin123');
      DashboardPage.goToMyInfo();
      MyInfoPage.fillPersonalDetails(data);
    });
  });

  it('Fill and save Custom Fields', () => {
    cy.fixture('customFields').then(data => {
      LoginPage.login('Admin', 'admin123');
      DashboardPage.goToMyInfo();
      MyInfoPage.fillCustomFields(data);
    });
  });

  it('Handle Attachments actions', () => {
    const originalFile = 'testing-image.png';
    const newFile = 'testing-image2.png';

    LoginPage.login('Admin', 'admin123');
    DashboardPage.goToMyInfo();

    AttachmentsPage.uploadFile(originalFile);
    AttachmentsPage.editFile(newFile);
    AttachmentsPage.downloadFile();
    AttachmentsPage.deleteFile(newFile);
  });

  it('Logout from dashboard', () => {
    LoginPage.login('Admin', 'admin123');
    DashboardPage.elements.dashboardHeader().should('contain', 'Dashboard');
    cy.get('span.oxd-userdropdown-tab').click();
    cy.get('a.oxd-userdropdown-link').contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });
});

