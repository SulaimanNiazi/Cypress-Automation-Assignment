import inventoryPage from "./inventoryPage"

class signInPage{
    url
    constructor(URL){
        this.url=URL
    }
    visit(){
        cy.visit(String(this.url))
    }
    signIn(username,password){
        cy.get('[data-test="username"]').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        return new inventoryPage()
    }
}
export default signInPage;