/// <reference types="Cypress" />
describe("Smoke Testing the Forget Password page along with the Confirm Password Page", () => {        

    it("Navigates to the Forget Password Page by clicking the Forget Password Link. Also Smoke tests the page", () => {
        cy.visit("/");

        cy.get('.SignInForm___StyledSection2-sc-cyefr8-2').click();

        cy.url().should('contain', '/forget-password'); 

        cy.get('.Card___StyledDiv3-sc-afsaxf-3').should('exist').should(
            'contain.text',
            'Please enter your email address in the field below, and we will send you an email with a link to reset your password'
        );

        cy.get('#forgetpassword-back').should('exist').should(
            'contain.text',
            'Back'
        );

        cy.get('#forgetpassword-submit').should('exist').should(
            'contain.text',
            'Submit'
        );
        
        cy.get('#forgetpassword-submit').click();

        cy.get('p[data-testid="forgetpassword-email-error"]').should('exist').should(
            'contain.text',
            'Email is a required field'
        );

        cy.get('#email').should('exist').clear().type('Not an email');

        cy.get('p[data-testid="forgetpassword-email-error"]').should('exist').should(
            'contain.text',
            'Email must be valid!'
        );

        cy.get('#email').should('exist').clear().type('email_doesnt_exist@vertisjm.com');
        
        cy.get('p[data-testid="forgetpassword-email-error"]').should('exist').should(
            'not.contain.text',
            'Email is a required field'
        );

        cy.get('#forgetpassword-submit').click();

        cy.get('div.sc-dlfnuX p').should('exist').should(
            'contain.text',
            'Failed to submit, please try again.'
        );

        cy.get('#email').should('exist').clear().type(Cypress.env('supportEmail'));

        cy.get('#forgetpassword-submit').click();

        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
        cy.get('#signup-submit').should('exist');
    });
});