const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'http://production.autodromo.com.br',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {},
  },
});
