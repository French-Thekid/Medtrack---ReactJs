/// <reference types="Cypress" />
Cypress.Commands.add('newFacilityWizard1', () => {
    
    cy.get('div.Avatar___StyledDiv2-sc-iu0ygf-3').should('exist').should(
        'contain.text',
        'Upload'
    );;

    cy.get('input[type="file"].Avatar___StyledInput-sc-iu0ygf-0').should('exist');

    cy.get('#name').first().focus();

    cy.get('#organisationEmail').first().focus();

    cy.get('#taxId').first().focus();

    cy.get('#name').first().focus();

    cy.get('p[name="name"]').should('exist').should(
        'contain.text',
        'Organisation must have a name!'
    );

    cy.get('p[name="organisationEmail"]').should('exist').should(
        'contain.text',
        'Organisation email is required'
    );

    cy.get('p[name="taxId"]').should('exist').should(
        'contain.text',
        '9 digits Required'
    );

    let facilityFile = 'files/images/facility_image.png';
    cy.get('input[type="file"]').attachFile(facilityFile);
});

Cypress.Commands.add('newFacilityWizard2', () => {
    
    cy.get('legend.Legend___StyledLegend-sc-idaxyc-0').should('exist').should(
        'contain.text',
        'Location'
    );;

    cy.xpath('//*[@id="location.streetNumber"]').should('exist');

    cy.xpath('//*[@id="location.streetName"]').should('exist');

    cy.xpath('//*[@id="location.city"]').should('exist');

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section[2]/div/div/div/input').should('exist');

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section[3]/div/div/div/input').should('exist');
    
});

Cypress.Commands.add('newFacilityWizard3', () => {
    
    cy.get('legend.Legend___StyledLegend-sc-idaxyc-0').should('exist').should(
        'contain.text',
        "Facility's Administrator"
    );;

    cy.xpath('//*[@id="adminContact.firstName"]').should('exist');

    cy.xpath('//*[@id="adminContact.lastName"]').should('exist');

    cy.xpath('//*[@id="adminContact.email"]').should('exist');

    cy.xpath('//*[@id="adminContact.position"]').should('exist');

    cy.xpath('//*[@id="adminContact.phone"]').should('exist');

    cy.xpath('//*[@id="adminContact.firstName"]').first().focus();    

    cy.xpath('//*[@id="adminContact.lastName"]').first().focus();

    cy.xpath('//*[@id="adminContact.email"]').first().focus();

    cy.xpath('//*[@id="adminContact.position"]').first().focus();

    cy.xpath('//*[@id="adminContact.phone"]').first().focus();

    cy.xpath('//*[@id="adminContact.firstName"]').first().focus();


    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Admin First Name is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Admin Last Name is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Admin Email is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Admin Position is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        '10 digits Required'
    );    
});

Cypress.Commands.add('newFacilityWizard4', () => {
    
    cy.get('legend.Legend___StyledLegend-sc-idaxyc-0').should('exist').should(
        'contain.text',
        "Billing Contact"
    );    

    cy.xpath('//*[@id="billingContact.firstName"]').should('exist');

    cy.xpath('//*[@id="billingContact.firstName"]').first().focus();   
    
    cy.xpath('//*[@id="billingContact.firstName"]').first().focus();

    cy.xpath('//*[@id="billingContact.lastName"]').should('exist');

    cy.xpath('//*[@id="billingContact.lastName"]').first().focus();

    cy.xpath('//*[@id="billingContact.email"]').should('exist');

    cy.xpath('//*[@id="billingContact.email"]').first().focus();

    cy.xpath('//*[@id="billingContact.position"]').should('exist');

    cy.xpath('//*[@id="billingContact.position"]').first().focus();

    cy.xpath('//*[@id="billingContact.phone"]').should('exist');

    cy.xpath('//*[@id="billingContact.phone"]').first().focus();

    cy.xpath('//*[@id="billingContact.firstName"]').first().focus();
    
    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Biller First Name is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Biller Last Name is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Biller Email is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Biller Position is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        '10 digits Required'
    );
});

Cypress.Commands.add('newFacilityWizard5', () => {
    
    cy.get('legend.Legend___StyledLegend-sc-idaxyc-0').should('exist').should(
        'contain.text',
        "Technical Support Contact"
    );    

    cy.xpath('//*[@id="technicalContact.firstName"]').should('exist');

    cy.xpath('//*[@id="technicalContact.firstName"]').first().focus();

    cy.xpath('//*[@id="technicalContact.lastName"]').should('exist');

    cy.xpath('//*[@id="technicalContact.lastName"]').first().focus();

    cy.xpath('//*[@id="technicalContact.email"]').should('exist');

    cy.xpath('//*[@id="technicalContact.email"]').first().focus();

    cy.xpath('//*[@id="technicalContact.position"]').should('exist');

    cy.xpath('//*[@id="technicalContact.position"]').first().focus();

    cy.xpath('//*[@id="technicalContact.phone"]').should('exist');

    cy.xpath('//*[@id="technicalContact.phone"]').first().focus();

    cy.xpath('//*[@id="technicalContact.firstName"]').first().focus();
    
    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Technical\'s First Name is required'
    );
    
    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Technical\'s Last Name is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Technical\'s Email is required'
    );

    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        'Technical\'s Position is required'
    );
    
    cy.get('fieldset.FieldSet___StyledFieldset-sc-1lz0eoj-0').should('exist').should(
        'contain.text',
        '10 digits Required'
    );
});

Cypress.Commands.add('newFacilityWizardPopulate1', () => {
    
    cy.get('div.Avatar___StyledDiv2-sc-iu0ygf-3').should('exist').should(
        'contain.text',
        'Upload'
    );;

    cy.get('input[type="file"].Avatar___StyledInput-sc-iu0ygf-0').should('exist');

    cy.get('#name').first().focus();

    cy.get('#name').first().type('End to End Test Organization');

    cy.get('#organisationEmail').first().type('not an email');

    cy.get('p[name="organisationEmail"]').should('exist').should(
        'contain.text',
        'Invalid Email'
    );

    cy.get('#organisationEmail').first().clear().type('testorganization@printzjm.com');    

    cy.get('#taxId').first().type('111');

    cy.get('#name').first().focus();

    cy.get('p[name="taxId"]').should('exist').should(
        'contain.text',
        '9 digits Required'
    );

    cy.get('#taxId').first().clear().type('345678902');
});

Cypress.Commands.add('populateFacilityWizard2', () => {   

    cy.xpath('//*[@id="location.streetNumber"]').first().type('86');

    cy.xpath('//*[@id="location.streetName"]').first().type('Old Hope Road');

    cy.xpath('//*[@id="location.city"]').first().type('Kingston 6');

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section[2]/div/div/div').should('exist').click();
    cy.xpath('//*[@id="menu-location.province"]/div[3]/ul/li[14]').should('exist').click();

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section[3]/div/div/div').should('exist').click();
    cy.xpath('//*[@id="menu-location.country"]/div[3]/ul/li[2]').should('exist').click();
});

Cypress.Commands.add('populateFacilityWizard3', () => {   

    cy.xpath('//*[@id="adminContact.firstName"]').first().type('Medtrack');

    cy.xpath('//*[@id="adminContact.lastName"]').first().type('Admin');

    cy.xpath('//*[@id="adminContact.email"]').first().type('not an email');
    

    cy.get('p[name="adminEmail"]').should('exist').should(
        'contain.text',
        'Invalid Email'
    );

    cy.xpath('//*[@id="adminContact.email"]').first().clear().type('testorganization@printzjm.com');

    cy.xpath('//*[@id="adminContact.position"]').first().type('Admin');    

    cy.xpath('//*[@id="adminContact.phone"]').first().type('111');

    cy.xpath('//*[@id="adminContact.position"]').first().focus();

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/div[2]/section[2]/p').should('exist').should(
        'contain.text',
        '10 digits Required'
    );

    cy.xpath('//*[@id="adminContact.phone"]').first().type('978364117');
});

Cypress.Commands.add('populateFacilityWizard4', () => {   

    cy.xpath('//*[@id="billingContact.firstName"]').first().type('Medtrack');

    cy.xpath('//*[@id="billingContact.lastName"]').first().type('Biller');

    cy.xpath('//*[@id="billingContact.email"]').first().type('not an email');
    

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section/p').should('exist').should(
        'contain.text',
        'Invalid Email'
    );

    cy.xpath('//*[@id="billingContact.email"]').first().clear().type('testorganization@printzjm.com');

    cy.xpath('//*[@id="billingContact.position"]').first().type('Biller');    

    cy.xpath('//*[@id="billingContact.phone"]').first().type('111');

    cy.xpath('//*[@id="billingContact.email"]').first().focus();

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/div[2]/section[2]/p').should('exist').should(
        'contain.text',
        '10 digits Required'
    );

    cy.xpath('//*[@id="billingContact.phone"]').first().type('978364117');
});

Cypress.Commands.add('populateFacilityWizard5', () => {   

    cy.xpath('//*[@id="technicalContact.firstName"]').first().type('Medtrack');

    cy.xpath('//*[@id="technicalContact.lastName"]').first().type('Biller');

    cy.xpath('//*[@id="technicalContact.email"]').first().type('not an email');
    

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/section/p').should('exist').should(
        'contain.text',
        'Invalid Email'
    );

    cy.xpath('//*[@id="technicalContact.email"]').first().clear().type('testorganization@printzjm.com');

    cy.xpath('//*[@id="technicalContact.position"]').first().type('Technical Assistance');    

    cy.xpath('//*[@id="technicalContact.phone"]').first().type('111');

    cy.xpath('//*[@id="technicalContact.email"]').first().focus();

    cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[2]/fieldset/div[2]/section[2]/p').should('exist').should(
        'contain.text',
        '10 digits Required'
    );

    cy.xpath('//*[@id="technicalContact.phone"]').first().type('978364117');
});