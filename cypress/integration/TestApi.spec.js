describe('API Test Suite', () => {
    beforeEach(() => {
        cy.visit("/angularAppdemo/")
    })

    it('Intercepting Request - Mocking the response', () => {
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
        cy.wait('@bookRetrievals').should(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })

    it('Intercepting Request - Mocking the request', () => {
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (request) => {
                request.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
                request.continue((response) => {
                    //expect(response.statusCode).to.equal(403)
                })
            }).as('dummyUrl')
        cy.get('.btn-primary').click()
        cy.wait('@dummyUrl').should(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')
    })

    it.only('API testing', () => { 
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', { 
            "name": "Learn Appium Automation with Java",
            "isbn": "bcggsss",
            "aisle": "22s7",
            "author": "John foe"
        }).then((response) => {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.status).to.eq(200)
        })
    })


})