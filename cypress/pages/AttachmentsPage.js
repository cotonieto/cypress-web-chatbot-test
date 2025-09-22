// Page Object for Attachments Section
class AttachmentsPage {
  elements = {
    addBtn: () => cy.contains('button', 'Add'),
    fileInput: () => cy.get('input[type="file"]', { timeout: 10000 }),

    // Save button específico dentro del form actions
    saveBtn: () =>
      cy.get('div.oxd-form-actions')
        .find('button[type="submit"].oxd-button--secondary')
        .last(),

    // Tabla y filas
    tableBody: () => cy.get('.oxd-table-body', { timeout: 15000 }),
    attachmentRow: () => cy.get('.oxd-table-card', { timeout: 15000 }),

    // Toast popup
    successToast: () => cy.get('.oxd-toast', { timeout: 10000 }),

    // Acciones dentro de las filas
    editBtns: () => cy.get('i.bi-pencil-fill'), // todos los íconos de editar
    downloadBtn: () =>
      cy.get('.oxd-table-card').first().find('button i.bi-download').parent(),
    deleteBtn: () =>
      cy.get('.oxd-table-card').first().find('button i.bi-trash').parent(),
    confirmDeleteBtn: () => cy.contains('button', 'Yes, Delete')
  };

  /**
   * Subir archivo y validar que aparece en la tabla
   * @param {string} fileName Nombre del archivo en /cypress/fixtures
   */
  uploadFile(fileName) {
    if (!fileName) throw new Error('File name is required for uploadFile()');

    const filePath = `cypress/fixtures/${fileName}`;

    this.elements.addBtn().click();
    this.elements.fileInput().selectFile(filePath, { force: true });
    this.elements.saveBtn().click();

    cy.contains('.oxd-toast', /Successfully (Updated|Saved)/, { timeout: 10000 })
      .should('be.visible');
    cy.get('.oxd-toast', { timeout: 10000 }).should('not.exist');

    cy.contains('.oxd-table-card', fileName, { timeout: 15000 }).should('exist');
  }

  /**
   * Editar un archivo existente
   * @param {string} newFileName Nombre del nuevo archivo en /cypress/fixtures
   */
  editFile(newFileName) {
    if (!newFileName) throw new Error('File name is required for editFile()');

    const filePath = `cypress/fixtures/${newFileName}`;

    this.elements.editBtns().first().click({ force: true });
    this.elements.fileInput().selectFile(filePath, { force: true });
    this.elements.saveBtn().click();

    cy.contains('.oxd-toast', /Successfully (Updated|Saved)/, { timeout: 10000 })
      .should('be.visible');
    cy.get('.oxd-toast', { timeout: 10000 }).should('not.exist');

    cy.contains('.oxd-table-card', newFileName, { timeout: 15000 }).should('exist');
  }

  downloadFile() {
    this.elements.downloadBtn().click({ force: true });
  }

  /**
   * Eliminar archivo
   * @param {string} fileName Nombre del archivo que se eliminará (opcional, solo para validación)
   */
  deleteFile(fileName) {
    this.elements.deleteBtn().click({ force: true });
    this.elements.confirmDeleteBtn().click();

    cy.contains('.oxd-toast', /Successfully/, { timeout: 10000 }).should('be.visible');
    cy.get('.oxd-toast', { timeout: 10000 }).should('not.exist');

    if (fileName) {
      cy.contains('.oxd-table-card', fileName).should('not.exist');
    }
  }
}

module.exports = new AttachmentsPage();













