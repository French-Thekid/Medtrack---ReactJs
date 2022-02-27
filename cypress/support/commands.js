// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

import './support_wizards/command';

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('loginAs', (userType) => {

    switch(userType){
        case 'support':
            cy.visit("/");
            cy.get('#email').should('exist').type(Cypress.env('supportEmail'));
            cy.get('#password').should('exist').type(Cypress.env('supportPassword'));
            cy.get('#signup-submit').click();

            cy.url().should('contain', '/support/facilities');            
        break;
    }
});

