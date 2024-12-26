class inventoryPage{
    verifyHome(){
        cy.get('.inventory_list').find('.inventory_item').should('have.length',6)
    }
}
export default inventoryPage;