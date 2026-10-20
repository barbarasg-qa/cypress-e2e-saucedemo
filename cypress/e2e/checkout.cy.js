describe('Funcionalidade de Checkout - SauceDemo', () => {

  beforeEach(() => {
    // Realiza o login antes de cada teste
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('Deve adicionar produtos ao carrinho e finalizar a compra com sucesso', () => {
    // 1. Adicionar o produto "Sauce Labs Backpack" ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // 2. Ir para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack');

    // 3. Avançar para o Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // 4. Preencher os dados de entrega
    cy.get('[data-test="firstName"]').type('Barbara');
    cy.get('[data-test="lastName"]').type('QA');
    cy.get('[data-test="postalCode"]').type('11700-000');
    cy.get('[data-test="continue"]').click();

    // 5. Validar a página de resumo (Overview) e finalizar
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="finish"]').click();

    // 6. Validar a mensagem de sucesso da compra
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

});