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
    it("Add Items to Cart, Logout, and Login Again to Verify Cart Persistence",function(){
        this.inventorypage.addItem(1)
        this.inventorypage.addItem(2)
        this.signinpage=this.inventorypage.logout()
        this.inventorypage=this.signinpage.signIn(this.signin.username,this.signin.password)
        this.inventorypage.verifyHome()
        const cart=this.inventorypage.visitCart()
        cart.verifyCartItems(2)
    })
    this.afterEach(()=>{
        new inventoryPage().logout()
    })
})