import inventoryPage from "./inventoryPage"

class signInPage{
    signIn(username,password){
        cy.get('[data-test="username"]').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
        return new inventoryPage()
    }
}
export default signInPage;