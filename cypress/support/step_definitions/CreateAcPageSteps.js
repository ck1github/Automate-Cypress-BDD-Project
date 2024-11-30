import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
//XPath Locators
const firstname = '[id="firstname"]'
const lastname = '[id="lastname"]'
const email_address = '[id="email_address"]'
const password = '[id="password"]'
const passwordConfirmation = '[id="password-confirmation"]'
const createAnAccount = 'button[class="action submit primary"]'
const emailIdSignIn = '[id="email"]'
const passwrdSignIn = '[name="login[password]"]'
const signIn = 'button[class="action login primary"]'

Given('user is on the Create Account page', () => {
  cy.visit('https://magento.softwaretestingboard.com/');
  cy.contains("Create an Account").click()
});

When('user fill in the mandatory details', () => {
    cy.fixture('users.json').then((users) => {
      cy.url().should('include', '/customer/account/create/');
      cy.get(firstname).click({force: true})
      cy.get(firstname).type(users.createaccountdata.firstname)
      cy.get(lastname).click({force: true})
      cy.get(lastname).type(users.createaccountdata.lastname)
      cy.get(email_address).click({force: true})
      cy.get(email_address).type(users.createaccountdata.email_address)
      cy.get(password).click({force: true})
      cy.get(password).type(users.createaccountdata.password)
      cy.get(passwordConfirmation).click({force: true})
      cy.get(passwordConfirmation).type(users.createaccountdata.confirmpassword)
    })
})

When('submit the details', () => {

  cy.get(createAnAccount).click()
  cy.wait(1000)
});

Then('the user should be able to log in with the entered credentials', () => {
  cy.get('body div.page.messages').should('be.visible').then(($errorMessage) => {
    if ($errorMessage.text().includes('There is already an account with this email address. If you are sure that it is your email address,')) {
        cy.log('**An account with these details already exists. Please retrieve your password to log in or use different mandatory details to create a new account.**')
        } else {
        if ($errorMessage.text().includes('Thank you for registering with Main Website Store.')) {
            cy.log('**Your account has been successfully created. Please log in using the credentials you just created.**')
          }
        }
    })
})

When(/I enter "(.*)" in (firstname|lastname|email_address|password|password-confirmation) field/, (text, field) => {
    cy.get(`input[name=${field}]`).type(text)
})

