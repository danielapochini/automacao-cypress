/// <reference types="cypress-iframe" />
import "cypress-iframe";

describe('My Fifth Test Suite', () => {
    beforeEach(() => {
        cy.visit("/AutomationPractice/")
      }) 
    
      it('Handling Frame',() => {
        //install plugin npm install -D cypress-iframe 
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).click() 
    })
})
