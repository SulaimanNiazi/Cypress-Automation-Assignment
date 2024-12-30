import productDetailsPage from "./productDetailsPage.js"
import page from "./page"
class inventoryPage extends page{
    verifyHome(){
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    }
    addItem(num){
        cy.getItemButton(false,num).should('have.text','ADD TO CART').click()
    }
    verifyCount(num){
        cy.get('.fa-layers-counter').should('be.visible').should('have.text',num.toString())
    }
    verifyNotSelected(num){
        cy.getItemButton(false,num).should('have.text','ADD TO CART')
    }
    removeItem(num){
        cy.getItemButton(true,num).should('have.text','REMOVE').click()
    }
    visitDetailsPage(num){
        cy.get('.inventory_item_name').eq(num-1).click()
        return new productDetailsPage()
    }
    sortByName(reverse){
        if(reverse){
            cy.get('.product_sort_container').select('Name (Z to A)').should('have.value','za')
        }
        else{
            cy.get('.product_sort_container').select('Name (A to Z)').should('have.value','az')
        } 
    }
    sortByPrice(descending){
        if(descending){
            cy.get('.product_sort_container').select('Price (high to low)').should('have.value','hilo')
        }
        else{
            cy.get('.product_sort_container').select('Price (low to high)').should('have.value','lohi')
        }
    }
    verifySorted(reverse){
        cy.get('.product_sort_container option:selected').then((choice)=>{
            if(choice.text().includes('Price')){
                cy.checkSorted('.pricebar > .inventory_item_price',true,reverse)
            }else{
                cy.checkSorted('.inventory_item_name',false,reverse)
            }
        })
    }
}
export default inventoryPage;