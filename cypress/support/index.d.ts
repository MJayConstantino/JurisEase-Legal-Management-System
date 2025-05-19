// support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void
    signUp(name: string, email: string, password: string): void
    initializeSearchTests(userName: string): void
    cleanUpSearchTests(): void
  }
}
