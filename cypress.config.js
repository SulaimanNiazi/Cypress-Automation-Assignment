const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'r367ew',
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env:{
    },
    specPattern: 'cypress/integration/examples/*.js',
    baseUrl: 'https://www.saucedemo.com/v1'
  },
});
