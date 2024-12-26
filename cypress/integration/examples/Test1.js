///<reference types="cypress"/>

import inventoryPage from "../../support/pages/inventoryPage"
import signInPage from "../../support/pages/signInPage"

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
        const signinpage=new signInPage()
        cy.fixture('SignIn').then((data)=>{
            const inventorypage=signinpage.signIn(data.username,data.password)
            signinpage.verifySignIn()
            inventorypage.verifyHome()
        })
    })
    it("Add Items to Cart and Remove Them from the Products Page",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get('.fa-layers-counter').should('be.visible').should('have.text','1')
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get('.fa-layers-counter').should('be.visible').should('have.text','2')
        cy.get(':nth-child(1) > .pricebar > .btn_secondary').should('have.text','REMOVE').click()
        cy.get(':nth-child(2) > .pricebar > .btn_secondary').should('have.text','REMOVE').click()
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
                cy.get('.btn_primary').should('have.text','ADD TO CART')
            }
        })
    })
    it("Buy Items",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.visit('/cart.html')
        cy.get('.cart_list').find('.cart_item').should('have.length',2)
        cy.get('.checkout_button').click()
        cy.fixture("Personal Details").then((entry)=>{
            cy.get('[data-test="firstName"]').type(entry.firstName)
            cy.get('[data-test="lastName"]').type(entry.lastName)
            cy.get('[data-test="postalCode"]').type(entry.postalCode)
        })
        cy.get('.btn_primary').click()
        cy.get('.btn_action').click()
        cy.get('.complete-header').should('be.visible').should('have.text','THANK YOU FOR YOUR ORDER')
    })
    it("Add Items to Cart, Logout, and Login Again to Verify Cart Persistence",function(){
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get(':nth-child(2) > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.visit('/cart.html')
        cy.get('.cart_list').find('.cart_item').should('have.length',2)
    })
    it("Verify All Sorting Options on Products Page",function(){
        const checkOrder=function(loc,rev){
            let itemList=Array(6)
            if(loc.includes('price')){
                cy.get('.pricebar > .inventory_item_price').each(($el,index)=>{
                    const val=$el.text()
                    const strnum=val.split('$')
                    const num=parseFloat(strnum[1].trim())
                    itemList[index]=num
                }).then(()=>{
                    const sorted = rev?itemList.map(x=>x).sort((a,b)=>b-a):itemList.map(x=>x).sort((a,b)=>a-b)
                    expect(sorted).to.deep.equal(itemList)
                })
            }
            else{
                cy.get(loc).each(($el,index)=>{
                    itemList[index]=$el.text()
                }).then(()=>{
                    const sorted=rev?itemList.map(a=>a).sort().reverse():itemList.map(a=>a).sort()
                    expect(sorted).to.deep.equal(itemList)
                })
            }
        }
        cy.get('.product_sort_container').select('Name (A to Z)').should('have.value','az')
        checkOrder('.inventory_item_name',false)
        cy.get('.product_sort_container').select('Name (Z to A)').should('have.value','za')
        checkOrder('.inventory_item_name',true)
        cy.get('.product_sort_container').select('Price (low to high)').should('have.value','lohi')
        checkOrder('.pricebar > .inventory_item_price',false)
        cy.get('.product_sort_container').select('Price (high to low)').should('have.value','hilo')
        checkOrder('.pricebar > .inventory_item_price',true)
    })
})