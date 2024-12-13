const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'r367ew',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env:{
      RECORD_KEY: "3d088a7d-910a-4e51-a06d-4f6e300c3d65"
    },
    specPattern: 'cypress/integration/examples/*.js',
    baseUrl: 'https://www.saucedemo.com/v1'
  },
});
