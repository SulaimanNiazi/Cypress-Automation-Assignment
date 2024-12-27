import cartPage from "./cartPage"
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
        cy.get('.inventory_item_name').eq(num-1).click()
        return new productDetailsPage()
    }
    visitCart(){
        cy.get('.shopping_cart_link').click()
        return new cartPage()
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
            let itemList=Array(6)
            if(choice.text().includes('Price')){
                cy.get('.pricebar > .inventory_item_price').each(($el,index)=>{
                    const val=$el.text()
                    const strnum=val.split('$')
                    const num=parseFloat(strnum[1].trim())
                    itemList[index]=num
                }).then(()=>{
                    const sorted = reverse?itemList.map(x=>x).sort((a,b)=>b-a):itemList.map(x=>x).sort((a,b)=>a-b)
                    expect(sorted).to.deep.equal(itemList)
                })
            }
            else{
                cy.get('.inventory_item_name').each(($el,index)=>{
                    itemList[index]=$el.text()
                }).then(()=>{
                    const sorted=reverse?itemList.map(a=>a).sort().reverse():itemList.map(a=>a).sort()
                    expect(sorted).to.deep.equal(itemList)
                })
            }
        })
    }
    logout(){
        cy.get('.bm-burger-button > button').click()
        cy.get('#logout_sidebar_link').click()
        return new signInPage()
    }
}
export default inventoryPage;