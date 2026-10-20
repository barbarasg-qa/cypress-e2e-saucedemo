describe('Funcionalidade de Autenticação - SauceDemo', () => {

  beforeEach(() => {
    // Visita a página inicial do e-commerce
    cy.visit('https://www.saucedemo.com/');
    cy.wait(2000); // Pausa para visualizar a tela inicial de login
  });

  it('Deve realizar login com sucesso com credenciais válidas', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.wait(1500); // Pausa para ver os dados preenchidos

    cy.get('[data-test="login-button"]').click();

    // Validações pós-login
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.wait(3000); // Pausa para visualizar a página de produtos carregada
  });

  it('Deve exibir mensagem de erro ao tentar login com utilizador bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.wait(1500); // Pausa para ver os dados do utilizador bloqueado

    cy.get('[data-test="login-button"]').click();

    // Validação da mensagem de erro
    cy.get('[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.');
    cy.wait(3000); // Pausa para visualizar a mensagem de erro vermelha na tela
  });

});