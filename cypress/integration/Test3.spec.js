describe('My Third Test Suite', () => {
    beforeEach(() => {
        cy.visit("/AutomationPractice/") 
      }) 

    it('Checkboxes', () => {  
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value', 'option1')
        cy.get('input[type=checkbox]').check(['option2','option3'])
    })

    it('Static Dropdowns', () => {  
        cy.get('select').select('Option2').should('have.value', 'option2')
    })

    it('Dynamic Dropdowns', () => {  
        cy.get('#autocomplete').type('Bra') 
        cy.get('.ui-menu-item div').each(($el, index, $list) => { 
            if($el.text() === "Brazil"){  
                cy.wrap($el).click() 
            }
        })  
        cy.get('#autocomplete').should('have.value', 'Brazil') 
    })

    it('Visible and invisible elements', () => {
        cy.get("#displayed-text").should("be.visible")
        cy.get("#hide-textbox").click()
        cy.get("#displayed-text").should("not.be.visible")
        cy.get("#show-textbox").click()
        cy.get("#displayed-text").should("be.visible")
    }) 
})
