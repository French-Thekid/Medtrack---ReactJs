/// <reference types="Cypress" />
describe("Smoke Testing the sign in page along with testing the validation for the sign in process", () => {    
    beforeEach(() => {
        cy.visit("/");
    });

    it("Should have the following elements present", () => {
        cy.get('#email').should('exist');
        cy.get('#password').should('exist');
        cy.get('#signup-submit').should('exist');        
        cy.get('.SignInForm___StyledSection-sc-cyefr8-1').should('exist').should(
            'contain.text',
            'Remember My Password'
        );
        cy.get('.SignInForm___StyledSection-sc-cyefr8-1 input[type="checkbox"]').should('exist');
        cy.get('.SignInForm___StyledSection2-sc-cyefr8-2').should('exist').should(
            'contain.text',
            'Forget Password'
        );
        cy.get('#signup-submit').should('exist').should(
            'contain.text',
            'Login'
        );
    });

    it("Process Validation Checks", () => {
        cy.get('#signup-submit').click();

        cy.get('p[data-testid="sign-in-email-error"]').should('exist').should(
            'contain.text',
            'Email is a required field'
        );

        cy.get('p[data-testid="sign-in-password-error"]').should('exist').should(
            'contain.text',
            'Password is a required field'
        );
        
        cy.get('#email').should('exist').type(Cypress.env('supportEmail'));
        
        cy.get('p[data-testid="sign-in-email-error"]').should('exist').should(
            'not.contain.text',
            'Email is a required field'
        );        

        cy.get('#password').should('exist').type(Cypress.env('supportPassword'));

        cy.get('p[data-testid="sign-in-password-error"]').should('exist').should(
            'not.contain.text',
            'Password is a required field'
        );

        cy.get('#email').should('exist').clear().type('Not an email');

        cy.get('p[data-testid="sign-in-email-error"]').should('exist').should(
            'contain.text',
            'Email must be valid!'
        );

        cy.get('#email').should('exist').clear().type(Cypress.env('supportEmail'));
        
        cy.get('p[data-testid="sign-in-email-error"]').should('exist').should(
            'not.contain.text',
            'Email is a required field'
        );

        cy.get('p[data-testid="sign-in-email-error"]').should('exist').should(
            'not.contain.text',
            'Email must be valid!'
        );
    });
});