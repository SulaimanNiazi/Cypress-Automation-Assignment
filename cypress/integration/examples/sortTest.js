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