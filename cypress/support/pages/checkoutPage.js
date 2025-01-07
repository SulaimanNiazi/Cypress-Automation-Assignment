import cartPage from "./cartPage";
import purchasePage from "./purchasePage";

class checkoutPage{
    entry={
        firstName:'[data-test="firstName"]',
        lastname:'[data-test="lastName"]',
        postalCode:'[data-test="postalCode"]',
        button:'.btn_primary',
    }
    cancelButton='.cart_cancel_link'
    cancel(){
        cy.get(this.cancelButton).click()
        return new cartPage()
    }
    enterDetails(firstName,lastName,postalCode){
        cy.get(this.entry.firstName).type(firstName)
        cy.get(this.entry.lastname).type(lastName)
        cy.get(this.entry.postalCode).type(postalCode)
        cy.get(this.entry.button).click()
        return new purchasePage()
    }
}
export default checkoutPage;