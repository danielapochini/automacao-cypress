describe('My Fourth Test Suite', () => {
    beforeEach(() => {
        cy.visit("/AutomationPractice/")
      }) 

    it('Handling Alerts', () => {  
        cy.get('#alertbtn').click()
        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
        })  
    })

    it('Handling Alerts - Confirm Button', () => {  
        cy.get('[value="Confirm"]').click()
        cy.on('window:confirm', (str) => { 
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
        })
    })

    it('Handling Tabs', () => {
        cy.get('#opentab').invoke('removeAttr','target').click() 
        cy.url().should('include','rahulshettyacademy')  
    })

    it('Navigate commands', () => { 
        cy.get('#opentab').invoke('removeAttr','target').click() 
        cy.url().should('include','rahulshettyacademy') 
        cy.go('back')
    })

    it('Handling Tables', () => { 
        cy.get('tr td:nth-child(2)').each(($el,index,$list)=>{
            const text = $el.text();
            if(text.includes('Python')){
                const sibling = $el.next().text();
                expect(sibling).to.be.equal('25')
            }
        }) 
    }) 

    it.only('Handling Mouse Over', () => { 
        cy.contains('Top').click({force:true})
        cy.url().should('include', 'top')
    }) 
})
