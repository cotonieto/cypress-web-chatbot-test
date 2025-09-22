Cypress Chatbot & OrangeHRM Tests










📘 Descripción

Este proyecto automatiza pruebas de:

Chatbot embebido en la página

OrangeHRM

Objetivos:

Validar la funcionalidad crítica de ambas aplicaciones

Comprobar la interacción con iframes (chatbot) y formularios (OrangeHRM)

Generar reportes claros de cada ejecución

Se utiliza Cypress como framework de pruebas y mochawesome para reportes HTML.

⚙️ Instalación

1️⃣ Clonar el repositorio:

git clone https://github.com/cotonieto/cypress-web-chatbot-test.git
cd cypress-web-chatbot-test


2️⃣ Instalar dependencias:

npm install


3️⃣ Instalar Cypress (si es necesario):

npx cypress install


4️⃣ Instalar http-server globalmente (requerido para el chatbot):

npm install -g http-server

🏃‍♂️ Ejecución de pruebas
Chatbot

⚠️ Antes de ejecutar las pruebas, levantar el servidor local:

npm run start:chatbot


Luego ejecutar:

npm run test:chatbot

OrangeHRM
npm run test:orangehrm

Ejecutar ambos tests
npm test

📊 Reportes

Se genera un reporte HTML en:

cypress/reports/index.html


Abrir en navegador:

open cypress/reports/index.html


Incluye detalle de cada test: nombre, estado y logs de ejecución

⚡ Pipeline de GitHub Actions

Automatiza la ejecución de tests y generación de reportes al hacer push o pull request en main.

Archivo: .github/workflows/cypress.yml

name: Cypress Chatbot & OrangeHRM Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-24.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run Chatbot tests
        run: |
          npx http-server -p 8080 &
          npm run test:chatbot

      - name: Run OrangeHRM tests
        run: npm run test:orangehrm

      - name: Upload test report
        uses: actions/upload-artifact@v3
        with:
          name: cypress-report
          path: cypress/reports/index.html

📝 Scripts en package.json
{
  "scripts": {
    "start:chatbot": "http-server -p 8080",
    "test": "cypress run --spec 'cypress/e2e/chatbot/**/*.cy.js','cypress/e2e/orangehrm/**/*.cy.js'",
    "test:chatbot": "cypress run --spec 'cypress/e2e/chatbot/**/*.cy.js'",
    "test:orangehrm": "cypress run --spec 'cypress/e2e/orangehrm/**/*.cy.js'"
  }
}


npm run start:chatbot → Levanta el servidor local para el chatbot

npm run test:chatbot → Ejecuta pruebas del chatbot

npm run test:orangehrm → Ejecuta pruebas de OrangeHRM

npm test → Ejecuta ambos tests

📂 Estructura del proyecto
cypress-web-chatbot-test/
├─ cypress/
│  ├─ e2e/
│  │  ├─ chatbot/       # chatbot.cy.js
│  │  └─ orangehrm/     # orangehrm.cy.js
│  └─ reports/          # Reportes generados
├─ package.json
├─ cypress.config.js
└─ README.md

⚙️ Configuración de Cypress para estabilidad
e2e: {
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: {
    runMode: 2,   // reintenta tests fallidos en pipeline
    openMode: 0
  },
}
