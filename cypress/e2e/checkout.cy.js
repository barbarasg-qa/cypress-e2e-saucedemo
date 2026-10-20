describe('Funcionalidade de Checkout - SauceDemo', () => {

  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.wait(2000); // Pausa para visualizar a vitrine de produtos
  });

  it('Deve adicionar produtos ao carrinho e finalizar a compra com sucesso', () => {
    // 1. Adicionar produto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.wait(2000); // Pausa para ver o contador do carrinho atualizar para "1"

    // 2. Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack');
    cy.wait(2500); // Pausa para ver o produto dentro do carrinho

    // 3. Avançar para o Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // 4. Preencher formulário de entrega
    cy.get('[data-test="firstName"]').type('Barbara');
    cy.get('[data-test="lastName"]').type('QA');
    cy.get('[data-test="postalCode"]').type('11700-000');
    cy.wait(2000); // Pausa para ver o formulário preenchido

    cy.get('[data-test="continue"]').click();

    // 5. Tela de Resumo (Overview)
    cy.url().should('include', '/checkout-step-two.html');
    cy.wait(2500); // Pausa para verificar os detalhes do pedido e o valor total

    cy.get('[data-test="finish"]').click();

    // 6. Mensagem de Sucesso Final
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.wait(4000); // Pausa final para contemplar a tela de sucesso ("Thank you for your order!")
  });

});