import userData from '../../fixtures/forms.json'

class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
    }

    deletarConta(){
        cy.get('a[href="/delete_account"]').click()
    }

    apresentarNomeDoUsuarioQuandoLogado(){
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
    }

    efetuarLogout(){
        cy.get('a[href="/logout"]').click()
    }

    navegarParaFormularioDeContato(){
        cy.get('a[href="/contact_us"]').click()
    }

    navegarParaProdutos(){
        cy.get('a[href="/products"]').click()
    }
}

export default new Menu()