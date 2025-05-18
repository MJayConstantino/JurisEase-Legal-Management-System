describe('Global Search E2E', () => {
  before(() => {
    cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
    cy.task('confirmUserEmail', 'test@testdomain.com')
    cy.initializeSearchTests('Test User')
  })
  beforeEach(() => {
    cy.login('test@testdomain.com', 'testPassword')
    cy.wait(5000)
    cy.visit('/matters').wait(5000)
    cy.get('.border-input').click()
    cy.get('#clientName').click()
    cy.get('#attorney').click()
    cy.get('#caseName').click()
    cy.get('#matters').click()
    cy.get('#tasks').click()
    cy.get('#bills').click()
  })
  after(() => {
    cy.cleanUpSearchTests()
  })

  // MATTERS SECTION
  describe('When the user wants to search for a matter', () => {
    it('should not yield results if the matter checkbox is unchecked', () => {
      cy.get('input[aria-label="DialogBoxSearch"]').type('NoMatterResult')
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')

      cy.contains(/no results/i).should('be.visible')
    })
    it('shoould display relevant matters whose name matches the search query if the matter checkbox is checked and no search by checkboxes are checked', () => {
      cy.get('#matters').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
    it('shoould display relevant matters whose nameor client matches the search query if the matter checkbox is checked and the client search by checkbox is checked', () => {
      cy.get('#matters').click()
      cy.get('#clientName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatterClient')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
    it('shoould display relevant matters whose name or assigned attorney matches the search query if the matter checkbox is checked and the attorney search by checkbox is checked', () => {
      cy.get('#matters').click()
      cy.get('#attorney').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testUser')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
    it('shoould display relevant matters whose name matches the search query if the matter checkbox is checked and the case name search by checkbox is checked', () => {
      cy.get('#matters').click()
      cy.get('#caseName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
    it('shoould display relevant matters whose name or opposing council name matches the search query if the matter checkbox is checked and the opposing council search by checkbox is checked', () => {
      cy.get('#matters').click()
      cy.get('#opposingCouncil').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testOpposingCouncil')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
    it('shoould display relevant matters whose name or court name matches the search query if the matter checkbox is checked and the court search by checkbox is checked', () => {
      cy.get('#matters').click()
      cy.get('#court').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testCourt')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
    })
  })

  //TASKS SECTION
  // describe('When the user wants to search for a task', () => {

  // })
  // describe('When the user searches for a task ', () => {})

  // describe('When the user searches for a bill', () => {})
})
