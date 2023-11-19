/// <reference types="cypress" />

describe('Cowprar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  });

  it('should register a new user', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('dsantiagortega@hotmail.com')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    cy.get('.navbar-brand').should('have.text', 'Cowmprar')
  });
});