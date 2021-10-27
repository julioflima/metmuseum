describe('Information', () => {
  it('should see the information', () => {
    cy.visit('http://localhost:3000/');

    cy.get('img').first().click();

    cy.get('#info').should('have.css', 'opacity', '1');

    cy.get('img').first().click();

    cy.get('#info').should('have.css', 'opacity', '0');
  });
});
