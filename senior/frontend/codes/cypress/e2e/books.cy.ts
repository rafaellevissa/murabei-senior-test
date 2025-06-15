describe('Books Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Document Finder').should('exist');
  });

  it('should filter books by title', () => {
    const title = "Violence";

    cy.get('[data-testid=filter-select-trigger]').click();
    cy.get('[data-testid=filter-select-item-title]').click();

    cy.get('[data-testid=filter-input]').clear().type(title);
    cy.wait(500);

    cy.get('[data-testid=filter-tag-title]')
      .should('exist')
      .within(() => {
        cy.get('span').first().should('have.text', 'title:');
        cy.get('span').last().should('have.text', title);
      });
  });

  it('should filter books by author', () => {
    const author = "Tony";

    cy.get('[data-testid=filter-select-trigger]').click();
    cy.get('[data-testid=filter-select-item-author]').click();

    cy.get('[data-testid=filter-input]').clear().type(author);
    cy.wait(500);

    cy.get('[data-testid=filter-tag-author]')
      .should('exist')
      .within(() => {
        cy.get('span').first().should('have.text', 'author:');
        cy.get('span').last().should('have.text', author);
      });
  });

  it('should filter books by biography', () => {
    const bio = "Mary";

    cy.get('[data-testid=filter-select-trigger]').click();
    cy.get('[data-testid=filter-select-item-author_bio]').click();

    cy.get('[data-testid=filter-input]').clear().type(bio);
    cy.wait(500);

    cy.get('[data-testid=filter-tag-author_bio]')
      .should('exist')
      .within(() => {
        cy.get('span').first().should('have.text', 'author_bio:');
        cy.get('span').last().should('have.text', bio);
      });
  });
});
