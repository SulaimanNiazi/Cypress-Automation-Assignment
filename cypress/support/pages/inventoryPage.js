class inventoryPage{
    verifyHome(){
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    }
    addItem(num){
        cy.get(':nth-child('+num.toString()+') > .pricebar > .btn_primary').should('have.text','ADD TO CART').click()
    }
}
export default inventoryPage;