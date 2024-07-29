describe('Lists Flow', () => {

  before(() => {
    cy.request('DELETE', 'http://localhost:3001/api/reset');
  });


  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should create a new list', () => {
    cy.get('[aria-label="Add List"]').click();

    cy.get('[aria-label="field name"]').type('New List');
    cy.get('[aria-label="field description"]').type('Description of New List');

    cy.get('[aria-label="Add List"]').click();

    cy.contains('New List').should('exist');
    cy.contains('Description of New List').should('exist');
  });

  it('should edit an existing list', () => {
    cy.contains('New List').should('exist');

    const listRow = cy.get('[aria-label="New List"]');

    listRow.get('[aria-label="Edit List"]').click();

    cy.get('[aria-label="field name"]').type('{selectall}{backspace}')
    cy.get('[aria-label="field description"]').type('{selectall}{backspace}');
    cy.get('[aria-label="field name"]').type('Edited List');
    cy.get('[aria-label="field description"]').type('Description of Edited List');

    cy.get('[aria-label="Add List"]').click();

    cy.contains('Edited List').should('exist');
    cy.contains('Description of Edited List').should('exist');
  });

  it('should delete an existing list', () => {
    cy.contains('Edited List').should('exist');

    const listRow = cy.get('[aria-label="Edited List"]');

    listRow.get('[aria-label="Delete List Button"]').click();
    cy.get('[aria-label="Confirm Deletion"]').click();

    cy.contains('Edited List').should('not.exist');
  });


});
