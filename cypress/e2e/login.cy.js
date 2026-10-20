describe('Funcionalidade de Autenticação - SauceDemo', () => {

  beforeEach(() => {
    // Visita a página inicial do e-commerce antes de cada teste
    cy.visit('https://www.saucedemo.com/');
  });

  it('Deve realizar login com sucesso com credenciais válidas', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Valida se foi redirecionado para a página de produtos
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('Deve exibir mensagem de erro ao tentar login com utilizador bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Valida se a mensagem de erro é exibida corretamente
    cy.get('[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.');
  });

});