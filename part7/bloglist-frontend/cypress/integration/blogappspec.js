describe('Blog ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('BlogApp')
    cy.contains('salasana')
  })
})
it('user can login', function() {
  cy.get('#Username').type('testJussi')
  cy.get('#Password').type('wordpass')
  cy.contains('kirjaudu').click()
  cy.contains('realname kirjautunut')
})
