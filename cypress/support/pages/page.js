import cartPage from "./cartPage"
import signInPage from "./signInPage"

class page{
    visitCart(){
        cy.get('.shopping_cart_link').click()
        return new cartPage()
    }
    logout(){
        cy.sidebarSelect(3)
        return new signInPage()
    }
    visitInventory(){
        cy.sidebarSelect(1)
        return new inventoryPage()
    }
}
export default page;