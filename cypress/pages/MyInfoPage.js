class MyInfoPage {
  elements = {
    // Headers
    personalDetailsHeader: () =>
      cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title'),

    // Basic Inputs
    firstName: () => cy.get('input[name="firstName"]'),
    middleName: () => cy.get('input[name="middleName"]'),
    lastName: () => cy.get('input[name="lastName"]'),

    // Employee Identifiers
    employeeId: () =>
      cy.get('.oxd-input-group').contains('Employee Id').parents('.oxd-input-group').find('input'),
    otherId: () =>
      cy.get('.oxd-input-group').contains('Other Id').parents('.oxd-input-group').find('input'),
    licenseNumber: () =>
      cy.get('.oxd-input-group').contains("Driver's License Number").parents('.oxd-input-group').find('input'),
    licenseExpiry: () =>
      cy.get('.oxd-input-group').contains('License Expiry Date').parents('.oxd-input-group').find('input'),

    // Dropdowns
    nationalityDropdown: () =>
      cy.get('.oxd-input-group').contains('Nationality').parents('.oxd-input-group').find('div.oxd-select-text'),
    maritalStatusDropdown: () =>
      cy.get('.oxd-input-group').contains('Marital Status').parents('.oxd-input-group').find('div.oxd-select-text'),

    // Date of Birth (fix)
    dateOfBirth: () =>
      cy.get('.oxd-input-group').contains('Date of Birth').parents('.oxd-input-group').find('.oxd-date-input input'),

    // Gender
    genderMale: () => cy.get('input[value="1"]'),
    genderFemale: () => cy.get('input[value="2"]'),

    // Save button
    saveBtn: () => cy.contains('button', 'Save'),

    // Custom fields
     bloodTypeDropdown: () =>
      cy.get('.oxd-input-group')
        .contains('Blood Type')
        .parents('.oxd-input-group')
        .find('div.oxd-select-text-input'),
    testFieldInput: () =>
      cy.get('.oxd-input-group')
        .contains('Test_Field')
        .parents('.oxd-input-group')
        .find('input')
  };

  fillPersonalDetails(data) {
    this.elements.firstName().clear().type(data.firstName);
    this.elements.middleName().clear().type(data.middleName);
    this.elements.lastName().clear().type(data.lastName);

    this.elements.employeeId().clear().type(data.employeeId);
    this.elements.otherId().clear().type(data.otherId);
    this.elements.licenseNumber().clear().type(data.licenseNumber);
    this.elements.licenseExpiry().clear().type(data.licenseExpiry);

    this.elements.nationalityDropdown().click();
    cy.contains('.oxd-select-option', data.nationality).click();

    this.elements.maritalStatusDropdown().click();
    cy.contains('.oxd-select-option', data.maritalStatus).click();

    this.elements.dateOfBirth().clear().type(data.dateOfBirth);

    if (data.gender === 'Male') {
      this.elements.genderMale().check({ force: true });
    } else {
      this.elements.genderFemale().check({ force: true });
    }

    this.elements.saveBtn().click();
  }

  fillCustomFields(data) {
    // Blood Type dropdown
    this.elements.bloodTypeDropdown().click();
    cy.get('div.oxd-select-dropdown')
      .contains(data.bloodType)
      .click();

    // Test Field input
    this.elements.testFieldInput().clear().type(data.testField);

    // Guardar cambios
    this.elements.saveBtn().click();
  }
}

module.exports = new MyInfoPage();


