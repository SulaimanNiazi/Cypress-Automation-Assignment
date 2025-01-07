import inventoryPage from "./inventoryPage"

class signInPage{
    url
    loginbutton='#login-button'
    usernameSlot='[data-test="username"]'
    passwordSlot='#password'
    constructor(URL){
        this.url=URL
    }
    visit(){
        cy.visit(String(this.url))
    }
    signIn(username,password){
        cy.get(this.usernameSlot).type(username)
        cy.get(this.passwordSlot).type(password)
        cy.get(this.loginbutton).click()
        return new inventoryPage()
    }
}
export default signInPage;