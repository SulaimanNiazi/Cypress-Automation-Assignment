///<reference types="cypress"/>

import cartPage from "../../support/pages/cartPage"
import inventoryPage from "../../support/pages/inventoryPage"
import signInPage from "../../support/pages/signInPage"

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
    this.afterEach(()=>{
        new inventoryPage().logout()
    })
})