///<reference types="cypress"/>
/*
clear|npx cypress open
clear|npx cypress run --browser chrome --spec "cypress/integration/examples/Test1.js"
clear|npx cypress cache clear|npx cypress install|npx cypress open
*/
describe("Assignment test suite",function(){
    beforeEach('Visit saucedemo inventory page',function(){
        cy.visit('/inventory.html')
    })
    it("Successful Sign In",function(){
        cy.visit('/index.html')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('.product_label').should('be.visible').should('have.text','Products')
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    })
})