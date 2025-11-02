import productsData from '../../fixtures/products.json'
import { faker, fakerPT_BR } from '@faker-js/faker'

class Carrinho{

    finalizarCompra(){
        cy.get('a[class="btn btn-default check_out"]').contains('Proceed To Checkout').should('be.visible').click()
    }
    validarCompra(){
        cy.get('table').within(() => {
            cy.get('.cart_description h4').should('be.visible').should('have.text', productsData.productName)
            cy.get('.cart_description p').contains(productsData.category).should('be.visible')
            cy.get('.cart_price p').contains(productsData.price).should('be.visible')
            cy.get('.cart_quantity').should('contain.text', '1')
        })
    }
    adicionarComentario(){
        cy.get('textarea[name="message"]').type(productsData.message)
    }
    navegarParaPagamento(){
        cy.get('a[href="/payment"]').contains('Place Order').should('be.visible').click()
    }
    inserirDadosCartao(){
        cy.get('input[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('input[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('input[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('input[data-qa="expiry-month"]').type('10')
        cy.get('input[data-qa="expiry-year"]').type('2030')
        
    }
    pagarCompra(){
        cy.get('button[data-qa="pay-button"]').contains('Pay and Confirm Order').should('be.visible').click()
    }
}

export default new Carrinho()