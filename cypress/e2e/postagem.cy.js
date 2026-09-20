describe('Validação Avançada de Campos - Portfólio do Sady', () => {

  beforeEach(() => {
    cy.visit('index.html')
  })

  it('1. Deve permitir uma postagem normal dentro do limite', () => {
    cy.get('#campo-postagem').type('Minha primeira postagem oficial de testes.')
    cy.get('#btn-publicar').click()
    cy.get('#mensagem-alerta').should('contain', 'Postado com sucesso!')
  })

  it('2. Deve cortar o texto quando ultrapassar o limite de 100 caracteres', () => {
    const textoMuitoLongo = 'A'.repeat(150)
    cy.get('#campo-postagem').type(textoMuitoLongo, { delay: 0 })
    cy.get('#campo-postagem').should('have.value', 'A'.repeat(100))
  })

  it('3. Deve aceitar injeção de caracteres especiais com sucesso', () => {
    const textoEspecial = 'Postagem #Foco @QA_2026 $Sucesso!'
    cy.get('#campo-postagem').type(textoEspecial)
    cy.get('#btn-publicar').click()
    cy.get('#mensagem-alerta').should('contain', 'Postado com sucesso!')
  })

  it('4. Deve exibir erro se o usuário tentar publicar o campo vazio', () => {
    // O robô não digita nada e clica direto em publicar
    cy.get('#btn-publicar').click()
    cy.get('#mensagem-alerta').should('contain', 'Erro: O campo não pode ficar vazio!')
  })

  it('5. Deve limpar espaços inúteis nas pontas e barrar post de espaços vazios', () => {
    // O robô digita apenas espaços em branco
    cy.get('#campo-postagem').type('      ')
    cy.get('#btn-publicar').click()
    cy.get('#mensagem-alerta').should('contain', 'Erro: O campo não pode ficar vazio!')
  })

  it('6. Deve processar corretamente um texto copiado e colado (Paste)', () => {
    // O robô simula a ação de dar um Ctrl+V direto no campo
    cy.get('#campo-postagem').invoke('val', 'Texto Colado via Área de Transferência').trigger('input')
    cy.get('#btn-publicar').click()
    cy.get('#mensagem-alerta').should('contain', 'Postado com sucesso!')
  })

})
