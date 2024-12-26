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
    it("Add Items to Cart and Remove Them from the Products Page",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get('.fa-layers-counter').should('be.visible').should('have.text','1')
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get('.fa-layers-counter').should('be.visible').should('have.text','2')
        cy.wait(1000)
        cy.get(':nth-child(1) > .pricebar > .btn_secondary').should('have.text','REMOVE').click()
        cy.get(':nth-child(2) > .pricebar > .btn_secondary').should('have.text','REMOVE').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART')
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART')
    })
})