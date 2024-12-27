import inventoryPage from "./inventoryPage";

class purchasePage{
    purchase(){
        cy.get('.btn_action').click()
    }
    visitCart(){
        cy.get('.shopping_cart_link').click()
        return new cartPage()
    }
    visitInventory(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#inventory_sidebar_link').click()
        return new inventoryPage()
    }
    verifyPurchase(){
        cy.get('.complete-header').should('be.visible').should('have.text','THANK YOU FOR YOUR ORDER')
    }
    cancelPurchase(){
        cy.get('.cart_cancel_link').click()
        return new inventoryPage()
    }
}
export default purchasePage;