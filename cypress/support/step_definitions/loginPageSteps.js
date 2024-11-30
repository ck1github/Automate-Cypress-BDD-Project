import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am in login page', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.contains("Sign In").click()
  })

  When ('I enter valid username and password', () => {
    cy.fixture('users.json').then((users) => {
      cy.get('[id="email"]').click({force: true})
      cy.get('[id="email"]').type(users.valid.validemail)
      cy.get('[name="login[password]"]').click({force: true})
      cy.get('[name="login[password]"]').type(users.valid.password)
      })
})

When('I click on login button' , () => {
   cy.get('button[class="action login primary"]').click()
})

Then('I should logged in and redirected to dashboard page', () => {

  cy.contains('Welcome,')
});

When ('I enter invalid username and password', () => {
  cy.fixture('users.json').then((users) => {
    cy.get('[id="email"]').click({force: true})
    cy.get('[id="email"]').type(users.invalid.invemail)
    cy.get('[name="login[password]"]').click({force: true})
    cy.get('[name="login[password]"]').type(users.invalid.password)
  })
})

Then('I should see invalid credentials message', () => {
  cy.get('body div.page.messages').should('be.visible').then(($errorMessage) => {
    if ($errorMessage.text().includes('There is already an account with this email address. If you are sure that it is your email address,')) {
        cy.log('**An account with these details already exists. Please retrieve your password to log in or use different mandatory details to create a new account.**')
    }else {
      if ($errorMessage.text().includes('Thank you for registering with Main Website Store.')) {
        cy.log('**Your account has been successfully created. Please log in using the credentials you just created.**')
          }
      }
    })
 
})

When(/I enter "(.*)" in (invemail|password) field/, (text, field) => {
    cy.get(`input[name=${field}]`).type(text)
})

