// cypress/pages/DashboardPage.js
class DashboardPage {
    elements = {
        // Sidebar menu items
        dashboardMenu: () => cy.contains('span.oxd-main-menu-item--name', 'Dashboard'),
        performanceMenu: () => cy.contains('span.oxd-main-menu-item--name', 'Performance'),
        directoryMenu: () => cy.contains('span.oxd-main-menu-item--name', 'Directory'),
        adminMenu: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),

        // Topbar breadcrumb header
        dashboardHeader: () => cy.contains('h6.oxd-topbar-header-breadcrumb-module', 'Dashboard'),

        // My Info link (para el flujo de navegación)
        myInfoLink: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),

        // Logout flow
        userDropdown: () => cy.get('.oxd-userdropdown-tab'),
        logoutBtn: () => cy.contains('a', 'Logout')
    }

    /**
     * Validate the dashboard page by checking key elements
     */
    validateDashboard() {
        this.elements.dashboardMenu().should('be.visible');
        this.elements.performanceMenu().should('be.visible');
        this.elements.directoryMenu().should('be.visible');
        this.elements.adminMenu().should('be.visible');
        this.elements.dashboardHeader().should('contain', 'Dashboard');
    }

    /**
     * Navigate to My Info section
     */
    goToMyInfo() {
        this.elements.myInfoLink().should('be.visible').click();
    }

    /**
     * Perform logout from dashboard
     */
    logout() {
        this.elements.userDropdown().click();
        this.elements.logoutBtn().should('be.visible').click();
    }
}

module.exports = new DashboardPage();

