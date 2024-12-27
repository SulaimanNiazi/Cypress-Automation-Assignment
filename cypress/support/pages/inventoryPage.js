import productDetailsPage from "./productDetailsPage"
import signInPage from "./signInPage"

class inventoryPage{
    verifyHome(){
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    }
    addItem(num){
        cy.get(':nth-child('+num.toString()+') > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
    }
    verifyCount(num){
        cy.get('.fa-layers-counter').should('be.visible').should('have.text',num.toString())
    }
    verifyNotSelected(num){
        cy.get(':nth-child('+num.toString()+') > .pricebar > .btn_primary').should('have.text','ADD TO CART')
    }
    removeItem(num){
        cy.get(':nth-child('+num.toString()+') > .pricebar > .btn_secondary').should('have.text','REMOVE').click()
    }
    visitDetailsPage(num){
        cy.get('.inventory_item_name').eq((num-1).toString()).click()
        return new productDetailsPage()
    }
    logout(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        return new signInPage()
    }
}
export default inventoryPage;