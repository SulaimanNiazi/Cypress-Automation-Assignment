import cartPage from "./cartPage";

class checkoutPage{
    cancel(){
        cy.get('.cart_cancel_link').click()
        return new cartPage()
    }
    enterDetails(firstName,lastName,postalCode){
        cy.get('[data-test="firstName"]').type(firstName)
        cy.get('[data-test="lastName"]').type(lastName)
        cy.get('[data-test="postalCode"]').type(postalCode)
        cy.get('.btn_primary').click()
    }
    purchase(){
        cy.get('.btn_action').click()
    }
    verifyPurchase(){
        cy.get('.complete-header').should('be.visible').should('have.text','THANK YOU FOR YOUR ORDER')
    }
    cancelPurchase(){
        cy.get('.cart_cancel_link').click()
    }
}
export default checkoutPage;