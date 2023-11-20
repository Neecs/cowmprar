/// <reference types="cypress" />

describe('Cowprar', () => {
  beforeEach(() => {
    
  });

  it('Login user', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('dsantiagortega@hotmail.com')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    cy.get('.navbar-brand').should('have.text', 'Cowmprar')
  });

  it('Create cow', () => {

    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('dsantiagortega@hotmail.com')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    
    cy.get('#add-cow-button').click()
    cy.get('#breed').select('Holstein')
    cy.get('#genre').select('Hembra')
    cy.get("#bornDate").type("2023-11-19");

    cy.get('#name').type('Vaca 1')

    cy.get('.button-aceptar').click()
    cy.reload()

  });

  it('add incident', () => {

    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('dsantiagortega@hotmail.com')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    cy.wait(1000)
    
    cy.get(':nth-child(3) > .card > .card-body > .card-button-container > .incident-button').click()
    
    cy.get('#dateIn').type("2023-11-19");

    cy.get('#description').type('la mordio un perro en la pata derecha')

    cy.get('#incidentName').select('Accidentes y lesiones')

    cy.get('[type="submit"]').click()
    cy.reload()

  });

  it('change status', () => {

    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('dsantiagortega@hotmail.com')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    
    cy.get(':nth-child(3) > .card > .card-body > .card-button-container > .hv-button').click()

    cy.get('.modal-body > .btn').click()
    
    cy.get('#status').select('En valoracion')


    cy.get('.button-aceptar').click()
    cy.reload()

  });
});