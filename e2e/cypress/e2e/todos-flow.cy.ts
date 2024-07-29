describe('Todos Flow', () => {

  before(() => {
    cy.request('DELETE', 'http://localhost:3001/api/reset');
    cy.visit('http://localhost:3000');

    cy.get('[aria-label="Add List"]').click();
    cy.get('[aria-label="field name"]').type('My Todo List');
    cy.get('[aria-label="field description"]').type('List for managing todos');
    cy.get('[aria-label="Add List"]').click();

    cy.contains('My Todo List').should('exist');
    cy.contains('List for managing todos').should('exist');

  });

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('My Todo List').click();
  });

  it('should add a new todo', () => {
    cy.contains('My Todo List').click();

    cy.get('[aria-label="Add Todo"]').click();
    const dialog = cy.get('[role=dialog]');
    dialog.get('[aria-label="Description"]').type('My New Todo');
    dialog.get('[role=dialog] [aria-label="Add Todo"]').click();

    cy.contains('My New Todo').should('exist');
  });

  it('should mark a todo as completed', () => {
    cy.contains('My New Todo').click();

    cy.get('[aria-label="Todo Container"').should('have.class', 'line-through');
  });

  it('should delete a todo', () => {
    cy.contains('My New Todo').should('exist');
    const todoContainer = cy.get('[aria-label="Todo Container"]');
    todoContainer.children('[aria-label="Delete Todo"]').click();
    cy.contains('My New Todo').should('not.exist');
  });

});
