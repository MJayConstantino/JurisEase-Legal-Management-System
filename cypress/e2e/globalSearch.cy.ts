describe('Global Search E2E', () => {
  before(() => {
    cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
    cy.task('confirmUserEmail', 'test@testdomain.com')
    cy.initializeSearchTests('Test User')
  })
  beforeEach(() => {
    cy.login('test@testdomain.com', 'testPassword')
    cy.wait(5000)
  })
  after(() => {
    cy.cleanUpSearchTests()
  })

  // MATTERS SECTION
  describe('When the user wants to search for a matter', () => {
    beforeEach(() => {
      cy.visit('/matters').wait(5000)
      cy.get('.border-input').click()
      cy.get('#clientName').click()
      cy.get('#attorney').click()
      cy.get('#caseName').click()
      cy.get('#matters').click()
      cy.get('#tasks').click()
      cy.get('#bills').click()
    })
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
    it('should navigate to the full detail matters page when matter item is clicked', () => {
      cy.get('#matters').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')
      cy.wait(2000)
        .contains(/testMatter/i)
        .should('be.visible')
      cy.contains(/testMatter/i).click()
    })
    it('shoould display relevant matters whose name or client matches the search query if the matter checkbox is checked and the client search by checkbox is checked', () => {
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
  describe.skip('When a user wants to search for a task', () => {
    beforeEach(() => {
      cy.visit('/tasks').wait(5000)
      cy.get('.border-input').click()
      cy.get('#clientName').click()
      cy.get('#attorney').click()
      cy.get('#caseName').click()
      cy.get('#matters').click()
      cy.get('#tasks').click()
      cy.get('#bills').click()
    })

    it('should not yield results if the matter checkbox is unchecked', () => {
      cy.get('input[aria-label="DialogBoxSearch"]').type('Mock Task')
      cy.contains(/no results/i).should('be.visible')
    })
    it('should display relevant tasks whose name (including those without matters) matches the search query if the tasks checkbox is checked and no search by checkboxes are checked', () => {
      cy.get('#tasks').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('Mock Task')
      cy.wait(2000)
        .contains(/no matter/i)
        .should('be.visible')
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })

    it('should display relevant tasks whose name or  matter client matches the search query if the matter checkbox is checked and the client search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#clientName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatterClient')
      cy.wait(2000)
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })
    it('should display relevant tasks whose name or matter assigned attorney matches the search query if the matter checkbox is checked and the attorney search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#attorney').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testUser')
      cy.wait(2000)
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })
    it('should display relevant tasks whose  matter name matches the search query if the matter checkbox is checked and the case name search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#caseName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')
      cy.wait(2000)
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })
    it('should display relevant tasks whose name or matter opposing council name matches the search query if the matter checkbox is checked and the opposing council search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#opposingCouncil').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testOpposingCouncil')
      cy.wait(2000)
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })
    it('should display relevant tasks whose name or  matter court name matches the search query if the matter checkbox is checked and the court search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#court').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testCourt')
      cy.wait(2000)
      cy.contains(/mock task/i).should('be.visible')
      cy.contains(/with matter/i).should('be.visible')
    })
  })

  // BILLS SECTION
  describe.skip('When a user wants to search for a bill', () => {
    beforeEach(() => {
      cy.visit('/billings').wait(5000)
      cy.get('.w-64 > .border-input').click()
      cy.get('#clientName').click()
      cy.get('#attorney').click()
      cy.get('#caseName').click()
      cy.get('#matters').click()
      cy.get('#tasks').click()
      cy.get('#bills').click()
    })

    it('should not yield results if the bill checkbox is unchecked', () => {
      cy.get('input[aria-label="DialogBoxSearch"]').type('Mock Bill')
      cy.contains(/no results/i).should('be.visible')
    })
    it('should display relevant bills whose name matches the search query if the tasks checkbox is checked and no search by checkboxes are checked', () => {
      cy.get('#bills').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('MockBill')
      cy.wait(2000)

      cy.contains(/mockbill/i).should('be.visible')
    })

    it('should display relevant bills whose name or matter client matches the search query if the matter checkbox is checked and the client search by checkbox is checked', () => {
      cy.get('#bills').click()
      cy.get('#clientName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatterClient')
      cy.wait(2000)
      cy.contains(/mockbill/i).should('be.visible')
    })
    it('should display relevant bills whose name or matter assigned attorney matches the search query if the matter checkbox is checked and the attorney search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#attorney').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testUser')
      cy.wait(2000)
      cy.contains(/mockbill/i).should('be.visible')
    })
    it('should display relevant bills whose  matter name matches the search query if the matter checkbox is checked and the case name search by checkbox is checked', () => {
      cy.get('#tasks').click()
      cy.get('#caseName').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testMatter')
      cy.wait(2000)
      cy.contains(/mockbill/i).should('be.visible')
    })
    it('should display relevant bills whose name or matter opposing council name matches the search query if the matter checkbox is checked and the opposing council search by checkbox is checked', () => {
      cy.get('#bills').click()
      cy.get('#opposingCouncil').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testOpposingCouncil')
      cy.wait(2000)
      cy.contains(/mockbill/i).should('be.visible')
    })
    it('should display relevant bills whose name or  matter court name matches the search query if the matter checkbox is checked and the court search by checkbox is checked', () => {
      cy.get('#bills').click()
      cy.get('#court').click()
      cy.get('input[aria-label="DialogBoxSearch"]').type('testCourt')
      cy.wait(2000)
      cy.contains(/mockbill/i).should('be.visible')
    })
  })

  // describe('When the user searches for a bill', () => {})

  // describe states when all matters, tasks, bills are checked

  // describe when the modal is cleared
})
