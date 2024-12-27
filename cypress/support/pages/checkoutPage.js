import cartPage from "./cartPage";
import purchasePage from "./purchasePage";

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
        return new purchasePage()
    }
}
export default checkoutPage;