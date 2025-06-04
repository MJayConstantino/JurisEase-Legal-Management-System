/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// //

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.task('login', {
    email: email,
    password: password,
  }).then((session) => {
    console.log(JSON.stringify(session))
    cy.setCookie('sb-touzjmfqvuprgzzahbvc-auth-token', JSON.stringify(session))
  })
})

Cypress.Commands.add(
  'signUp',
  (name: string, email: string, password: string) => {
    cy.task('register', {
      name: name,
      email: email,
      password: password,
    })
  }
)

Cypress.Commands.add('initializeSearchTests', (username: string) => {
  cy.task('initializeSearchTests', username).then((data) => {
    console.log(data)
  })
})

Cypress.Commands.add('cleanUpSearchTests', () => {
  cy.task('deleteSearchTests', 'testMatter (Global Search E2E)')
  cy.task('deleteUser', 'test@testdomain.com')
})

//    email: 'test@testdomain.com',
//        password: 'testPassword',
