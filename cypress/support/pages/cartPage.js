import checkoutPage from "./checkoutPage"
import inventoryPage from "./inventoryPage"

class cartPage{
    cart={
        list:'.cart_list',
        item:'.cart_item',
        removeButton:'.cart_list button, REMOVE',
        exitButton:'.cart_footer > .btn_secondary',
        checkoutButton:'.btn_action',
    }
    verifyCartItems(num){
        cy.get(this.cart.list).find(this.cart.item).should('have.length',num)
    }
    removeItem(num){
        cy.get(this.cart.removeButton).eq(num-1).click()
    }
    goBack(){
        cy.get(this.cart.exitButton).click()
        return new inventoryPage();
    }
    checkout(){
        cy.get(this.cart.checkoutButton).click()
        return new checkoutPage()
    }
}
export default cartPage;