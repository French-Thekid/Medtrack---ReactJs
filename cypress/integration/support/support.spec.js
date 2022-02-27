/// <reference types="Cypress" />
describe("First Test Case", () => {    
    beforeEach(() => {
        cy.loginAs("support");
    });

    it("Should have the following elements present", () => {
        cy.get('.MainContainer___StyledP2-sc-1c3rjr3-13').should('exist').should(
            'contain.text',
            'Facilities'
        );

        cy.get('.MainContainer___StyledDiv9-sc-1c3rjr3-9 .MuiSvgIcon-root').should('exist');
        cy.get('.MainContainer___StyledDiv8-sc-1c3rjr3-8 section.MainContainer___StyledSection-sc-1c3rjr3-7 .MainContainer___StyledP-sc-1c3rjr3-12').should('exist');

        cy.get('div.NavItem___StyledDiv3-sc-g69mwf-2').should('exist').should(
            'contain.text',
            'Pharmacies'
        );

        cy.get('button.Button___StyledButton-sc-16i82i7-0').should('exist').should(
            'contain.text',
            'New Medical Facility'
        );

        cy.get('.MainContainer___StyledP2-sc-1c3rjr3-13').should('exist').should(
            'contain.text',
            'Facilities'
        );        

    });
    
    it("Creates New Facility", () => {
        cy.get('button.Button___StyledButton-sc-16i82i7-0').click();

        cy.newFacilityWizard1();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.newFacilityWizard2();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.newFacilityWizard3();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.newFacilityWizard4();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.newFacilityWizard5();        

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.newFacilityWizard5();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[1]/button').click();

        cy.newFacilityWizard4();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[1]/button').click();

        cy.newFacilityWizard3();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[1]/button').click();

        cy.newFacilityWizard2();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[1]/button').click();

        cy.newFacilityWizard1();

        cy.newFacilityWizardPopulate1();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.populateFacilityWizard2();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.populateFacilityWizard3();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.populateFacilityWizard4();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();

        cy.populateFacilityWizard5();

        cy.xpath('//*[@id="portal"]/div/div/div/div/div/div/div[2]/form/div[3]/div[2]/button').click();
    });
    

    it("Update Facility", () => {

        cy.get('div.table___StyledDiv2-sc-1sgt9zf-1').get('div.table___StyledDiv7-sc-1sgt9zf-6').
        get('div.Row___StyledDiv-sc-1gmtsdw-0')
        .contains('End to End Test Organization').parent().click();

        cy.get('div.CustomCard___StyledDiv3-sc-1ybcccb-2').should('exist').should(
            'contain.text',
            'View Facility'
        ).
        get('div.ViewFacility___StyledDiv7-sc-wcs015-6.bZRGAt')
        .should(
            'contain.text',
            'End to End Test Organization'
        ).should(
            'contain.text',
            'Facility ID'
        ).should(
            'contain.text',
            'Facility Email'
        ).should(
            'contain.text',
            'testorganization@printzjm.com'
        ).should(
            'contain.text',
            'Facility Tax-ID'
        ).should(
            'contain.text',
            '345-678-902'
        ).should(
            'contain.text',
            '86 Old Hope Road, Kingston 6, St. Andrew, Jamaica'
        );

        cy.get('div.ViewFacility___StyledDiv2-sc-wcs015-1.grqDcR').should('exist').should(
            'contain.text',
            'Medtrack Admin'
        ).should(
            'contain.text',
            'Medtrack Biller'
        ).should(
            'contain.text',
            'Medtrack Biller'
        ).should(
            'contain.text',
            'Administrator Contact'
        ).should(
            'contain.text',
            'Billing Contact'
        ).should(
            'contain.text',
            'Technical Contact'
        );

        cy.get('div.CustomCard___StyledDiv4-sc-1ybcccb-3.hQujMI').should('exist').click();

        cy.get('div.table___StyledDiv2-sc-1sgt9zf-1').get('div.table___StyledDiv7-sc-1sgt9zf-6').
        get('div.Row___StyledDiv-sc-1gmtsdw-0')
        .contains('End to End Test Organization').parent().children().last().click();
        
        cy.get('div.ActionItemContainer___StyledDiv-sc-pnl3pc-0').should('exist').first().click();
        
    });
});