describe('index page', () => {
  it('should redirect to the login', () => {
    cy.clearCookies()

    cy.visit('/')
    cy.url().should('include', '/auth')
  })

  it('should display empty data', () => {
    // Call your custom cypress command
    cy.login();
    // Visit a route in order to allow cypress to actually set the cookie
		cy.visit("/");
		// Wait until the intercepted request is ready
    cy.wait("@session");

    cy.get("[data-test='mainHeadTitle']").contains(`TODO LIST`);
  })
})
