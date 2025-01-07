///<reference types="cypress"/>

import cartPage from "../../support/pages/cartPage"
import inventoryPage from "../../support/pages/inventoryPage"
import purchasePage from "../../support/pages/purchasePage"
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
            if((Cypress.env('firstName')=='')&&(Cypress.env('lastName')=='')&&(Cypress.env('postalCode')=='')){
                cy.fixture('Personal Details').then((data)=>{
                    this.entry=data
                })
            }
            else{
                this.entry={
                    firstName:Cypress.env('firstName'),
                    lastName:Cypress.env('lastName'),
                    postalCode:Cypress.env('postalCode'),
                }
            }
        })
    })
    it("Buy Items",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        const cart=this.inventorypage.visitCart()
        cart.verifyCartItems(2)
        const checkout=cart.checkout()
        const purchasepage=checkout.enterDetails(this.entry.firstName,this.entry.lastName,this.entry.postalCode)
        purchasepage.purchaseItems()
        purchasepage.verifyPurchase()
    })
    this.afterEach(()=>{
        new inventoryPage().logout()
    })
})