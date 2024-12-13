///<reference types="cypress"/>
/*
clear|npx cypress open
clear|npx cypress run --browser chrome --spec "cypress/integration/examples/Test1.js"
clear|npx cypress cache clear|npx cypress install|npx cypress open
*/
describe("Assignment test suite",function(){
    it("Successful Sign In",function(){
        cy.visit('/index.html')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('.product_label').should('be.visible').should('have.text','Products')
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    })
    it("Add Items to Cart and Remove Them from the Products Page",function(){
        
    })
    it("Add Items to Cart and Remove Them from the Checkout Page",function(){
        
    })
    it("Add Items to Cart and Remove Them from the Product Details Page",function(){
        
    })
    it("Buy Items",function(){
        
    })
    it("Add Items to Cart, Logout, and Login Again to Verify Cart Persistence",function(){
        
    })
    it("Verify All Sorting Options on Products Page",function(){
        
    })
})