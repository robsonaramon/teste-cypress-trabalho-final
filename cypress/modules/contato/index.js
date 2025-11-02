import { faker, fakerPT_BR } from '@faker-js/faker'
import {getRandomEmail} from '../../support/helpers'

class Contato {
    preencherFormulariodeContato(){
        cy.get('.contact-form h2').contains('Get In Touch').should('be.visible')

        cy.get('[data-qa="name"]').type(fakerPT_BR.person.firstName())
        cy.get('[data-qa="email"]').type(getRandomEmail())
        cy.get('[data-qa="subject"]').type(fakerPT_BR.word.words(4))
        cy.get('[data-qa="message"]').type(fakerPT_BR.word.words(14))

        cy.fixture('ok.jpg').as('image')
        cy.get('input[name="upload_file"]').selectFile('@image')
        cy.get('[data-qa="submit-button"]').click()
    }
}

export default new Contato()