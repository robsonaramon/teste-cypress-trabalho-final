import userData from '../../fixtures/forms.json'
import { faker, fakerPT_BR } from '@faker-js/faker'

class Cadastro{
    preencherFormularioDePreCadastro(user, email){
        cy.get('.signup-form h2').contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type(user)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeCadastroCompleto(){
        cy.get('.login-form h2').contains('Enter Account Information').should('be.visible');
        cy.get('input[type=radio]').check(userData.title)
        cy.get('input[id="password"]').type(userData.password, {log: false})
        cy.get('select[data-qa=days]').select('17')
        cy.get('select[data-qa=months]').select('March')
        cy.get('select[data-qa=years]').select('2000')
        cy.get('input[type="checkbox"]#newsletter').check('1')
        cy.get('input[type="checkbox"]#optin').check('1')

        cy.get('input[data-qa=first_name]').type(fakerPT_BR.person.firstName())
        cy.get('input[data-qa=last_name]').type(fakerPT_BR.person.lastName())
        cy.get('input[data-qa=company]').type(fakerPT_BR.company.name())
        cy.get('input[data-qa=address]').type(fakerPT_BR.location.streetAddress())
        cy.get('select[data-qa=country]').select('Canada')
        cy.get('input[data-qa=state]').type(fakerPT_BR.location.state())
        cy.get('input[data-qa=city]').type(fakerPT_BR.location.city())
        cy.get('[data-qa="zipcode"]').type(fakerPT_BR.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('11987654321')
        
        cy.get('[data-qa="create-account"]').click()
    }
}

export default new Cadastro()