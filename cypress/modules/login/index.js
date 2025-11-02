class Login{
    preencherFormularioDeLogin(user, password){
        cy.get('.login-form h2').contains('Login to your account')

        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()
    }
}

export default new Login()