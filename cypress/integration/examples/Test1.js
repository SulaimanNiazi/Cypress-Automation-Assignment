///<reference types="cypress"/>

import cartPage from "../../support/pages/cartPage"
import inventoryPage from "../../support/pages/inventoryPage"
import signInPage from "../../support/pages/signInPage"

/*
clear|npx cypress open
clear|npx cypress run --headed --browser firefox --spec "cypress/integration/examples/Test1.js"
clear|npx cypress cache clear|npx cypress install|npx cypress open
*/

describe("Assignment test suite",function(){
    beforeEach(function(){
        cy.fixture('SignIn').then((data)=>{
            this.signin=data
            this.signinpage=new signInPage('/index.html')
            this.signinpage.visit()
            if((Cypress.env('username')=='')&&(Cypress.env('password')=='')){
                this.inventorypage=this.signinpage.signIn(this.signin.username,this.signin.password)
            }
            else{
                this.inventorypage=this.signinpage.signIn(Cypress.env('username'),Cypress.env('password'))
            }
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
        const cart=this.inventorypage.visitCart()
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
        cy.fixture("Personal Details").then((entry)=>{
            this.inventorypage.addItem(1)
            this.inventorypage.addItem(2)
            const cart=this.inventorypage.visitCart()
            cart.verifyCartItems(2)
            const checkout=cart.checkout()
            if((Cypress.env('firstName')=='')&&(Cypress.env('lastName')=='')&&(Cypress.env('postalCode')=='')){
                this.purchasepage=checkout.enterDetails(entry.firstName,entry.lastName,entry.postalCode)
            }
            else{
                this.purchasepage=checkout.enterDetails(Cypress.env('firstName'),Cypress.env('lastName'),Cypress.env('postalCode'))
            }
            this.purchasepage.purchase()
            this.purchasepage.verifyPurchase()
        })
    })
    it("Add Items to Cart, Logout, and Login Again to Verify Cart Persistence",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        this.signinpage=this.inventorypage.logout()
        this.inventorypage=this.signinpage.signIn(this.signin.username,this.signin.password)
        this.inventorypage.verifyHome()
        const cart=this.inventorypage.visitCart()
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
    this.afterEach(()=>{
        new inventoryPage().logout()
    })
})