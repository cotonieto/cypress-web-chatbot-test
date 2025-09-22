// cypress/pages/AttachmentsPage.js
class AttachmentsPage {
  elements = {
    addBtn: () => cy.contains('button', 'Add', { timeout: 10000 }),
    fileInput: () => cy.get('input[type="file"]', { timeout: 10000 }),
    saveBtn: () =>
      cy.get('div.oxd-form-actions')
        .find('button[type="submit"]')
        .last(),
    tableBody: () => cy.get('.oxd-table-body', { timeout: 15000 }),
    attachmentRow: () => cy.get('.oxd-table-card', { timeout: 15000 }),
    editBtns: () => cy.get('i.bi-pencil-fill', { timeout: 10000 }),
    downloadBtn: () =>
      cy.get('.oxd-table-card').first().find('button i.bi-download').parent(),
    deleteBtn: () =>
      cy.get('.oxd-table-card').first().find('button i.bi-trash').parent(),
    confirmDeleteBtn: () => cy.contains('button', 'Yes, Delete', { timeout: 10000 }),
    successToast: () => cy.get('.oxd-toast', { timeout: 10000 }),
  };

  // Subir archivo y validar
  uploadFile(fileName) {
    if (!fileName) throw new Error('File name is required for uploadFile()');

    const filePath = `cypress/fixtures/${fileName}`;
    this.elements.addBtn().click();
    this.elements.fileInput().selectFile(filePath, { force: true });
    this.elements.saveBtn().click();

    this.elements.successToast().should('be.visible');
    this.elements.successToast().should('not.exist');
    cy.contains('.oxd-table-card', fileName, { timeout: 15000 }).should('exist');
  }

  // Editar archivo existente
  editFile(newFileName) {
    if (!newFileName) throw new Error('File name is required for editFile()');

    const filePath = `cypress/fixtures/${newFileName}`;
    this.elements.editBtns().first().click({ force: true });
    this.elements.fileInput().selectFile(filePath, { force: true });
    this.elements.saveBtn().click();

    this.elements.successToast().should('be.visible');
    this.elements.successToast().should('not.exist');
    cy.contains('.oxd-table-card', newFileName, { timeout: 15000 }).should('exist');
  }

  // Descargar archivo
  downloadFile() {
    this.elements.downloadBtn().click({ force: true });
  }

  // Eliminar archivo
  deleteFile(fileName) {
    this.elements.deleteBtn().click({ force: true });
    this.elements.confirmDeleteBtn().click();
    this.elements.successToast().should('be.visible');
    this.elements.successToast().should('not.exist');

    if (fileName) {
      cy.contains('.oxd-table-card', fileName, { timeout: 15000 }).should('not.exist');
    }
  }

  // Validar que archivo está visible
  verifyUpload(fileName) {
    cy.contains('.oxd-table-card', fileName, { timeout: 15000 }).should('be.visible');
  }
}

module.exports = new AttachmentsPage();













