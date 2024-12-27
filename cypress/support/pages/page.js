import cartPage from "./cartPage"
import signInPage from "./signInPage"

class page{
    visitCart(){
        cy.get('.shopping_cart_link').click()
        return new cartPage()
    }
    logout(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        return new signInPage()
    }
    visitInventory(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#inventory_sidebar_link').click()
        return new inventoryPage()
    }
}
export default page;