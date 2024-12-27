import inventoryPage from "./inventoryPage";

class productDetailsPage{
    removeItem(){
        cy.get('.btn_secondary').click()
    }
    goBack(){
        cy.get('.inventory_details_back_button').click({force:true})
        return new inventoryPage()
    }
}
export default productDetailsPage;