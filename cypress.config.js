const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'http://admin.atdplatform.work',
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {},
  },
});
