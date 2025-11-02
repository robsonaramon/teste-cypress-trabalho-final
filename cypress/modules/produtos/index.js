import productsData from '../../fixtures/products.json'

class Produtos{
    verProdutos(){
        cy.get('h2.title').should('contain','All Products')
        cy.get('.features_items').should('be.visible')
        cy.get('a[href="/product_details/8"]').should('be.visible').click()
        cy.url().should('contain', '/product_details/8')
        cy.get('.product-information h2').should('be.visible').and('contain', productsData.productName)
        cy.get('.product-information p').contains('Category:').should('be.visible').and('contain', productsData.category)
        cy.get('.product-information span span').should('be.visible').and('contain', productsData.price)
        cy.contains('.product-information p', 'Availability:') .should('be.visible') .and('contain', productsData.availability)
        cy.contains('.product-information p', 'Condition:') .should('be.visible') .and('contain', productsData.condition)
        cy.contains('.product-information p', 'Brand:') .should('be.visible') .and('contain', productsData.brand)
    }

    pesquisarProdutos(){
        cy.get('h2.title').should('contain','All Products')
        cy.get('input[id="search_product"]').type(productsData.productName)
        cy.get('button[id="submit_search"]').click()
    }

    adicionarProduto(){
        cy.get('div.productinfo.text-center > a[data-product-id="8"]').click()
        cy.get('#cartModal a[href="/view_cart"').contains('View Cart').should('be.visible').click()
    }
}

export default new Produtos()