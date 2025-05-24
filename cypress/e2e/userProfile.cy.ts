


describe("User Profile E2E Interactions", () => {
    before(() => {
        Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes("Failed to execute 'removeChild'")) {
            return false
        }
        return true
        });

        cy.signUp("Test User", "test@testdomain.com", "testPassword")
        cy.task("confirmUserEmail", "test@testdomain.com")
    });

    beforeEach(() => {
        cy.login("test@testdomain.com", "testPassword")
        cy.wait(5000)
        
        cy.visit('/matters')

        cy.get('button[aria-label="Avatar"]').click({ force: true });

        cy.get('#user-profile').contains('Profile')
        .should('be.visible')
        .click({ force: true })

    })

    it("should change the user's avatar", () => {
        cy.get('button')
    })
        


})