import inventoryPage from "./inventoryPage";
import page from "./page"
class purchasePage extends page{
    purchase(){
        cy.get('.btn_action').click()
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