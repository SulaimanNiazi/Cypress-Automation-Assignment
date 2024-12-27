import checkoutPage from "./checkoutPage"
import inventoryPage from "./inventoryPage"

class cartPage{
    constructor(){
        cy.visit('/cart.html')
    }
    verifyCartItems(num){
        cy.get('.cart_list').find('.cart_item').should('have.length',num)
    }
    removeItem(num){
        cy.get('.cart_list button, REMOVE').eq(num-1).click()
    }
    goBack(){
        cy.get('.cart_footer > .btn_secondary').click()
        return new inventoryPage();
    }
    checkout(){
        cy.get('.btn_action').click()
        return new checkoutPage()
    }
}
export default cartPage;