/// <reference types="cypress" />;
describe('Actions', () => {
  it('header test', () => {
    cy.visit('/');
    cy.get('.Header_item__2VaIS').find('a');
    cy.contains('Video Tube');

    // cy.get('form').find('[type="text"]').get('[value="music"]');
  });
});
