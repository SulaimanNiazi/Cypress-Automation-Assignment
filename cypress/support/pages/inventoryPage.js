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
    sortByName(reverse){
        if(reverse==null)reverse=false;
        if(reverse){
            cy.get('.product_sort_container').select('Name (Z to A)').should('have.value','za')
        }
        else{
            cy.get('.product_sort_container').select('Name (A to Z)').should('have.value','az')
        } 
    }
    sortByPrice(descending){
        if(descending==null)descending=false
        if(descending){
            cy.get('.product_sort_container').select('Price (high to low)').should('have.value','hilo')
        }
        else{
            cy.get('.product_sort_container').select('Price (low to high)').should('have.value','lohi')
        }
    }
    logout(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        return new signInPage()
    }
}
export default inventoryPage;