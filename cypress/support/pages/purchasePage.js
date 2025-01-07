import inventoryPage from "./inventoryPage"
import page from "./page"
class purchasePage extends page{
    purchase={
        button:{
            purchase:'.btn_action',
            cancel:'.cart_cancel_link',
        },
        afterPurchase:{
            header:'.complete-header',
            text:'THANK YOU FOR YOUR ORDER',
        },
    }
    verifyPurchase(){
        cy.get(this.purchase.afterPurchase.header).should('be.visible').should('have.text',this.purchase.afterPurchase.text)
        return
    }
    purchaseItems(){
        cy.get(this.purchase.button.purchase).click()
        return
    }
    cancelPurchase(){
        cy.get(this.purchase.button.cancel).click()
        return new inventoryPage()
    }
}
export default purchasePage;