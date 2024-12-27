///<reference types="cypress"/>

import cartPage from "../../support/pages/cartPage"
import inventoryPage from "../../support/pages/inventoryPage"
import signInPage from "../../support/pages/signInPage"

/*
clear|npx cypress open
clear|npx cypress run --browser chrome --spec "cypress/integration/examples/Test1.js"
clear|npx cypress cache clear|npx cypress install|npx cypress open
*/

describe("Assignment test suite",function(){
    beforeEach(function(){
        cy.fixture('SignIn').then((data)=>{
            this.signin=data
            this.signinpage=new signInPage('/index.html')
            this.signinpage.visit()
            this.inventorypage=this.signinpage.signIn(this.signin.username,this.signin.password)
        })
    })
    it('Successful Sign In',function(){
        this.inventorypage.verifyHome()
    })
    it("Add Items to Cart and Remove Them from the Products Page",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.verifyCount(1)
        this.inventorypage.addItem(2)
        this.inventorypage.verifyCount(2)
        this.inventorypage.removeItem(1)
        this.inventorypage.removeItem(2)
        this.inventorypage.verifyNotSelected(1)
        this.inventorypage.verifyNotSelected(2)
    })
    it("Add Items to Cart and Remove Them from the Checkout Page",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        const cart=new cartPage()
        cart.verifyCartItems(2)
        cart.removeItem(2)
        cart.removeItem(1)
        cart.verifyCartItems(0)
    })
    it("Add Items to Cart and Remove Them from the Product Details Page",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        let productDetails=this.inventorypage.visitDetailsPage(1)
        productDetails.removeItem()
        this.inventorypage=productDetails.goBack()
        productDetails=this.inventorypage.visitDetailsPage(2)
        productDetails.removeItem()
        this.inventorypage=productDetails.goBack()
        this.inventorypage.verifyNotSelected(1)
        this.inventorypage.verifyNotSelected(2)
    })
    it("Buy Items",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        const cart=new cartPage()
        cart.verifyCartItems(2)
        cart.checkout()
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
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        this.signinpage=this.inventorypage.logout()
        this.inventorypage=this.signinpage.signIn(this.signin.username,this.signin.password)
        this.inventorypage.verifyHome()
        const cart=new cartPage()
        cart.verifyCartItems(2)
    })
    it("Verify All Sorting Options on Products Page",function(){
        this.inventorypage.sortByName()
        this.inventorypage.verifySorted()
        this.inventorypage.sortByName(true)
        this.inventorypage.verifySorted(true)
        this.inventorypage.sortByPrice()
        this.inventorypage.verifySorted()
        this.inventorypage.sortByPrice(true)
        this.inventorypage.verifySorted(true)
    })
})