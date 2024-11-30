Feature: Account creation

    Scenario: Enter mandatory details on the 'Create an Account' page and verify created account
        Given user is on the Create Account page
        When user fill in the mandatory details
            | FirstName       | LastName | EmailId                | Password      |
            | Chandrakant123     | Rathod   | ckrathod123@gmail.com | ckrathod@2024 |
        And submit the details
        Then the user should be able to log in with the entered credentials