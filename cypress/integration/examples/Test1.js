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
    it("Add Items to Cart and Remove Them from the Checkout Page",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.visit('/cart.html')
        cy.get('.cart_list').find('.cart_item').should('have.length',2).each(($el)=>{
            if($el.find('button').text().includes('REMOVE')){
                cy.wrap($el).find('button').click()
            }
        })
        cy.get('.cart_list').find('.cart_item').should('have.length',0)
    })
    it("Add Items to Cart and Remove Them from the Product Details Page",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        let linkList=Array(20)
        let links=0
        cy.get('.inventory_list').find('.inventory_item').each(($el)=>{
            if($el.find('button').text().includes('REMOVE')){
                cy.get($el).find('a').then((link)=>{
                    cy.get(link).invoke('attr','href').then((href)=>{linkList[links++]=href})
                })
            }
        }).then(()=>{
            for(var x=0;x<links;x++){
                cy.visit(linkList[x])
                cy.get('.btn_secondary').click()
                cy.wait(1000)
                cy.get('.btn_primary').should('have.text','ADD TO CART')
            }
        })
    })
})