describe('Test Framework Suite', () => {
  let userData

  beforeEach(() => {
    cy.fixture('user').then((user) => {
      userData = user
    })

    cy.visit("/angularpractice/")
  })

  it('Fixtures', () => {
    cy.get('input[name="name"]:nth-child(2)').type(userData.name)
    cy.get('select').select(userData.gender)
    cy.get(':nth-child(4) > .ng-untouched').should('have.value', userData.name)
    cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2')
    cy.get('#inlineRadio3').should('be.disabled')
  })

  it('Commands', () => {
    cy.get(':nth-child(2) > .nav-link').click()

    userData.productName.forEach((element) => {
      cy.AddToCart(element)
    })
  })

  it.skip('Debugging and Pausing', () => {
    cy.pause()
    cy.debug()
    //- pause() will always stop a test execution no matter what, 
    //debug() will only stop the test when developer tools are open

    //pause() does not provide debug info, debug() does - it can be found inside console tab

    //- when pause() is used you get 'next' button inside cypress test runner which allows 
    //you to execute your code step by step, when using debug() next button in not available
  })

  it.only('End 2 End Flow', () => {
    cy.get(':nth-child(2) > .nav-link').click()

    userData.productName.forEach((element) => {
      cy.AddToCart(element)
    })
    cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link').click()
    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.get('.suggestions > ul > li > a').click()
    cy.get('#checkbox2').click({force:true})
    cy.get('input[type="submit"]').click()
    cy.get('.alert').should('include.text','Success!') 
  })

  it.skip('DB Integration', () => {
    cy.sqlServer("SELECT 'test'").should('eq', 'test');
  })
})