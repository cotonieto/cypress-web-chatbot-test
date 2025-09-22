const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 🔹 Generar fixtures automáticos antes de los tests
      on('before:run', () => {
        const fixtures = [
          { name: 'testing-image.png' },
          { name: 'testing-image2.png' },
        ];
        const pngBase64 =
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AApMBgwb8WB0AAAAASUVORK5CYII=';
        fixtures.forEach((file) => {
          const filePath = path.join(__dirname, 'cypress/fixtures', file.name);
          fs.writeFileSync(filePath, Buffer.from(pngBase64, 'base64'));
          console.log(`✅ Fixture generado: ${filePath}`);
        });
      });

      // 🔹 Generar reporte Mochawesome después de los tests
      on('after:run', () => {
        try {
          execSync(
            'npx mochawesome-merge cypress/reports/mochawesome*.json --output cypress/reports/combined-report.json',
            { stdio: 'inherit', cwd: __dirname }
          );
          execSync(
            'npx mochawesome-report-generator cypress/reports/combined-report.json --reportDir cypress/reports --inline',
            { stdio: 'inherit', cwd: __dirname }
          );
          console.log('✅ Reporte generado: cypress/reports/index.html');
        } catch (error) {
          console.log('⚠️ Error generando reporte:', error.message);
        }
      });

      return config;
    },

    // 🔹 Configuración de specs y viewport
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:8080', // 🔹 Cambio aquí para usar página local con iframe
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
  },

  // 🔹 Reporter Mochawesome
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    timestamp: "mmddyyyy_HHMMss"
  }
});


