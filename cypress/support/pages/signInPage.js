class signInPage{
    signIn(username,password){
        cy.get('[data-test="username"]').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
    }
    verifySignIn(){
        cy.get('.product_label').should('be.visible').should('have.text','Products')
    }
}
export default signInPage;