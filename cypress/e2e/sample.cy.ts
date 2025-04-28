describe('template spec', () => {
  it('passes', () => {
    //visit jurisEase hompeage
    cy.visit('/')
    // click login
    cy.contains('Log In to Your Account').click()
    cy.get('#email').wait(5000).type('your-email@example.com')
  })
})

/**
 * This is the sample cy.ts file
 * 1. all tests should  have the convention of <test-name>.cy.ts
 * 2. works like jest, using .only will focus on a block or it ex it.only, describe.only
 * 2. beforeEach, afterEach, beforeAll and Afterall are only a thing
 * 3. you can make commands for things that are repeating or stuff-- add in support/commands.ts
 * 3. you can wait for functions instead of specifying a pecific time by giving an alias
 * use cy.get('@aliasname)
 * cy.request("",{}).as('alias)
 */
