describe('Information', () => {
  it('should see the information', () => {
    cy.visit('http://localhost:3000/');

    cy.get('img').click();

    cy.get('#info').should('have.css', 'opacity', '0');
  });
});
