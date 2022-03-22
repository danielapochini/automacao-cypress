describe('API Test Suite', () => {
    beforeEach(() => {
        cy.visit("/angularAppdemo/")
    })

    it('Intercepting Request', () => {
        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            },
            {
                statusCode: 200,
                body:
                    [
                        {
                            "book_name": "Teste Dan",
                            "isbn": "RSU",
                            "aisle": "2301"
                        }
                    ]
            }).as('bookRetrievals')
        cy.get('.btn-primary').click()
        cy.wait('@bookRetrievals').should(({request,response}) =>{
            cy.get('tr').should('have.length', response.body.length+1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })
})