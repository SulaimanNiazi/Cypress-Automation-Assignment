const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'r367ew',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
    },
    specPattern: 'cypress/integration/examples/*.js',
    baseUrl: 'https://www.saucedemo.com/v1'
  },
});
