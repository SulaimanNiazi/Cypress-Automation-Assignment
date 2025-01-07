import inventoryPage from "./inventoryPage";

class productDetailsPage{
    button={
        remove:'.btn_secondary',
        exit:'.inventory_details_back_button'
    }
    removeItem(){
        cy.get(this.button.remove).click()
    }
    goBack(){
        cy.get(this.button.exit).click({force:true})
        return new inventoryPage()
    }
}
export default productDetailsPage;