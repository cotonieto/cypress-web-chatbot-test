# OrangeHRM Cypress Automation

Este proyecto contiene pruebas automatizadas de Cypress para la aplicación OrangeHRM (demo).  
Incluye pruebas de UI Web y Chatbot, con integración a CI/CD en GitHub Actions.

---

## 🚀 CI/CD Pipeline with GitHub Actions

This project includes an automated pipeline that runs Cypress tests on every push and pull request.

### Pipeline steps:
1. Install dependencies
2. Run **Web UI tests** (`cypress/e2e/web/`)
3. Run **Chatbot tests** (`cypress/e2e/chatbot/`)
4. Generate **Mochawesome HTML reports**

---

### Running tests locally

```bash
# Run all tests
npx cypress run

# Run only web tests
npx cypress run --spec "cypress/e2e/web/**/*.cy.js"

# Run only chatbot tests
npx cypress run --spec "cypress/e2e/chatbot/**/*.cy.js"
