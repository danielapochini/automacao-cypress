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

      it.only('Commands', () => { 
        cy.get(':nth-child(2) > .nav-link').click() 

        userData.productName.forEach((element) => {
          cy.AddToCart(element)
        }) 
    })
})