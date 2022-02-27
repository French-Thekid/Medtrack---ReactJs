/// <reference types="Cypress" />

context('Actions', () => {
	beforeEach(() => {
		cy.visit('/forget-password-confirmation')
  	})
  	it('Should attempt to confirm password with no password entered', () => {
    	cy.get('[type="submit"]').click()
    	cy.get('[data-testid="forgetpassword-password-error"]').should(
      		'contain.text',
      		'Password is required'
    	)
    	cy.get('[data-testid="forgetpassword-passwordConfirmation-error"]').should(
      		'contain.text',
      		'Password Confirmation is required'
    	)
  	})
  
  	it('Should produce an error for unmatched passwords', () => {
    	cy.get('[data-testid="forgetpassword-password"]')
      	.type('123')      	
    	cy.get('[data-testid="forgetpassword-passwordConfirmation"]')
      	.type('1234')      	

		cy.get('[type="submit"]').click()

		cy.get('[data-testid="forgetpassword-passwordConfirmation-error"]').should(
			'contain.text',
			'Passwords must match'
	  	)

		cy.get('#passwordConfirmation').clear().type('123');
		cy.get('[type="submit"]').click();

		cy.get('[data-testid="forgetpassword-passwordConfirmation-error"]').should(
			'not.contain.text',
			'Passwords must match'
	  	)
  	})
})