describe ('My first test suite', () => {
    it('My first test case', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        cy.get('.product:visible').should('have.length', 4)

        //Parent child chaining
        cy.get('.products').find('.product').should('have.length', 4)

        //cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        cy.get('.products').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if(textVeg.includes('Cashews')){ 
                cy.wrap($el).find('button').click() 
            }
        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')
        
        //this is to print in logs
        cy.get('.brand').then((logoelement) =>
        {
            cy.log(logoelement.text())
        
        })
    })
})