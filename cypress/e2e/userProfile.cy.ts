
describe("User Profile E2E Interactions", () => {
    before(() => {
        Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes("Failed to execute 'removeChild'")) {
            return false
        }
        return true
        });
        
       
        cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
        cy.task('confirmUserEmail', 'test@testdomain.com')
        cy.login("test@testdomain.com", "testPassword")
        
    });

    beforeEach(() => {
        cy.login("test@testdomain.com", "testPassword")
        cy.wait(500)
        
        cy.visit('/matters') //default page when opening dashboard
        cy.get('button[aria-label="Avatar"]').click({ force: true });
        cy.wait(2000)
            .contains(/profile/i)
            .click()
        cy.wait(500)
    })

    describe('When changing User Avatar', () => {
        
        it("should change the user's avatar from the default", () => {
            cy.get('input#avatar-upload').selectFile('cypress/fixtures/testLogoLight.JPG', { force: true })
            cy.wait(200)
            cy.contains('User Avatar updated successfully').should('exist')
            cy.wait(2000)
        })
    })

    describe('When changing username', () => {
        it('should edit the username', () => {
            cy.get('.flex-1 > .inline-flex').click({ force: true });
            cy.wait(200)
            cy.get('.border-input').clear().type('New Test Username')
            cy.wait(200)
            cy.contains('Save').click()
            cy.wait(200)
            cy.contains('New Test Username').should('be.visible')
            cy.wait(200)
            cy.contains('Profile updated successfully').should('exist')
            cy.wait(2000)
        })
    })

    describe('When deleting the user', () => {
            it('should delete the user', () => {
            cy.contains('Delete Profile').click({force:true})
            cy.wait(500)
            cy.contains('Are you sure?').should('be.visible')
            cy.wait(2000)
            cy.get('button.bg-red-600')
                .contains(/^Delete$/i)
                .should('be.visible')
                .click({ force: true })
            cy.wait(2000)
            cy.contains('Profile deleted successfully!').should('exist')
        }) 
    })  
})