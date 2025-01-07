import cartPage from "./cartPage"
import inventoryPage from "./inventoryPage"
import signInPage from "./signInPage"

class page{
    shoppingCart='.shopping_cart_link'
    sidebar={
        button:'.bm-burger-button > button',
        list:'.bm-menu a',
        logoutButtonNumber:3,
        inventoryButtonNumber:1,
    }
    sidebarSelect(option){
        cy.get(this.sidebar.button).click()
        cy.get(this.sidebar.list).eq(option-1).click()
    }
    visitCart(){
        cy.get(this.shoppingCart).click()
        return new cartPage()
    }
    logout(){
        this.sidebarSelect(this.sidebar.logoutButtonNumber)
        return new signInPage()
    }
    visitInventory(){
        this.sidebarSelect(this.sidebar.inventoryButtonNumber)
        return new inventoryPage()
    }
}
export default page;