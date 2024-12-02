# Implement Cucumber in Cypress 
## By **CK Rathod**

## 1. Initialize node project and install cypress 

```
npm init -y
npm install cypress --save-dev
npx cypress open
```

## 2. Install packages

```javascript
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev  // Bundle Cypress specs using esbuild - to increase performance
```
## 3. Update cypress configs

`cypress.config.js`

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      }));
      preprocessor.addCucumberPreprocessorPlugin(on, config);
      return config;
    },
	specPattern: "**/*.feature",
  },
})

```

## 4. Update "cypress-cucumber-preprocessor" configs (Set step definitions path and make them global)
`package.json`

```javascript
"cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/support/step_definitions/",
    "nonGlobalStepDefinitions": false
  }
```
## 5. Add IDE plugin for `.feature` files

This is one of the bests for VS-Code: [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

## 6 .Add feature files

`e2e/Login.feature`

```gherkin
Feature: Login features
  Scenario: Verify valid login 
    Given I am in login page
    When I enter valid username and password
    And I click on login button
    Then I should logged in and redirected to dashboard page
    
  Scenario: Verify invalid login
    Given I am in login page
    When I enter invalid username and password
	  And I click on login button
    Then I should see invalid credentials message
```

`e2e/Users.feature`

## 7. Add Step Definitions

`cypress/support/step_definitions/steps.js`


npx cypress run --env tags="@smoke"
npx cypress run --env tags="not @smoke"
npx cypress run --env tags="@smoke or @regression"
npx cypress run --env tags="@smoke and @regression"

## THANK YOU 🙂