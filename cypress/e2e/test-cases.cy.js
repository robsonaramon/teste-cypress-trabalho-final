///<reference types="cypress"/>
import userData from '../fixtures/forms.json'
import productsData from '../fixtures/products.json'
import {getRandomEmail} from '../support/helpers'

import { faker, fakerPT_BR } from '@faker-js/faker'

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import produtos from '../modules/produtos'
import subscricao from '../modules/subscricao'
import carrinho from '../modules/carrinho'


describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.url().should('eq', 'https://automationexercise.com/')
    });
    it('1 - Registrar usuário', () => {
        
        menu.navegarParaLogin()
        cadastro.preencherFormularioDePreCadastro(userData.name, getRandomEmail())
        cadastro.preencherFormularioDeCadastroCompleto()

        cy.get('.container h2').contains('Account Created!')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('header a').contains(`Logged in as ${userData.name}`)

        menu.deletarConta()
        cy.get('.container h2').should('contain','Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    })
    
    it('2 - Fazer login com email e senha corretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.email, userData.password)
        menu.apresentarNomeDoUsuarioQuandoLogado()
    })

    it('3 - Fazer login com email e senha incorretos', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.email, '12345')
        cy.get('.login-form form p').should('contain','Your email or password is incorrect!')
    })

    it('4 - Fazer logout', () => {
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.email, userData.password)
        menu.apresentarNomeDoUsuarioQuandoLogado()
        menu.efetuarLogout()

        cy.url().should('contain', 'login')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    })

    it('5 - Registrar usuário com e-mail existente', () => {
        menu.navegarParaLogin()
        cadastro.preencherFormularioDePreCadastro(userData.name, userData.email)

        cy.get('.signup-form > form > p').should('contain','Email Address already exist!')
    })

    it('6 - Preencher formulário de contato', () => {
        menu.navegarParaFormularioDeContato()
        contato.preencherFormulariodeContato()
        cy.get('#contact-page div.status.alert.alert-success').should('contain', 'Success! Your details have been submitted successfully.')
        cy.get('#form-section .btn.btn-success').should('contain', 'Home').click()
    })

    it('8 - Verifique todos os produtos e a página de detalhes do produto', () => {
        menu.navegarParaProdutos()
        produtos.verProdutos()
    })

    it('9 - Pesquisar produtos', () => {
        menu.navegarParaProdutos()
        produtos.pesquisarProdutos()
        cy.get('h2.title').should('contain','Searched Products')
        cy.get('.product-image-wrapper p').should('have.length.greaterThan', 0).and('contain', productsData.productName)
    })

    it('10 - Subscrever e-mail', () => {
        subscricao.subscreverEmail()
        cy.get('footer .alert-success').contains('You have been successfully subscribed!').should('be.visible')
    })

    it('15 - Fazer pedido: Cadastrar antes de finalizar a compra',() => {
        menu.navegarParaLogin()
        cadastro.preencherFormularioDePreCadastro(userData.name, getRandomEmail())
        cadastro.preencherFormularioDeCadastroCompleto()
        
        cy.get('.container h2').contains('Account Created!')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('header a').contains(`Logged in as ${userData.name}`)

        produtos.adicionarProduto()
        carrinho.finalizarCompra()
        carrinho.validarCompra()
        carrinho.adicionarComentario()
        carrinho.navegarParaPagamento()
        carrinho.inserirDadosCartao()
        carrinho.pagarCompra()

        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

        menu.deletarConta()
        cy.get('.container h2').should('contain','Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    })
})