describe('Meu Primeiro Teste de Automação', () => {
  
  it('Deve realizar login com sucesso em um site real', () => {
    // 1. O robô entra na página exata de login de testes
    cy.visit('https://practicetestautomation.com/practice-test-login/')

      // 3. O robô encontra o campo de usuário e digita "student"
    cy.get('#username').type('student')

    // 4. O robô encontra o campo de senha e digita "Password123"
    cy.get('#password').type('Password123')

    // 5. O robô clica no botão de Submit (Enviar)
    cy.get('#submit').click()

    // 6. O robô valida se a página atual contém o texto de sucesso esperado pelo sistema
    cy.contains('Logged In Successfully').should('be.visible')
  })

})

