describe('Global Search E2E', () => {
  before(() => {
    cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
    cy.task('confirmUserEmail', 'test@testdomain.com')
  })
  beforeEach(() => {
    cy.login('test@testdomain.com', 'testPassword')
    cy.wait(5000)
    cy.visit('/matters').wait(5000)
  })
  describe('When the user searches for a matter', () => {})

  describe('When the user searches for a task ', () => {})

  describe('When the user searches for a bill', () => {})
})
