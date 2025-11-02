import userData from '../../fixtures/forms.json'

class Subscricao {
    subscreverEmail(){
        cy.get('footer#footer').scrollIntoView()
        cy.get('footer h2').contains('Subscription').should('be.visible')
        cy.get('input[id=susbscribe_email]').type(userData.email)
        cy.get('button[id=subscribe]').click()
    }
}

export default new Subscricao()