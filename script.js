// Variáveis para armazenar o total de receitas e despesas
let receitas = 0
let despesas = 0

// Escuta o envio do formulário de lançamento
document
  .getElementById('form-lancamento')
  .addEventListener('submit', function (e) {
    e.preventDefault() // Impede o comportamento padrão (recarregar página)

    // Pega os valores digitados no formulário
    const tipo = document.getElementById('tipo').value
    const descricao = document.getElementById('descricao').value
    const valor = parseFloat(document.getElementById('valor').value)

    // Validação: se a descrição estiver vazia ou valor inválido, cancela
    if (!descricao || isNaN(valor)) return

    // Adiciona o lançamento na tabela
    adicionarLancamento(tipo, descricao, valor)

    // Reseta o formulário após o envio
    document.getElementById('form-lancamento').reset()
  })

/**
 * Função para adicionar um novo lançamento na tabela
 * @param {string} tipo - Tipo do lançamento ('receita' ou 'despesa')
 * @param {string} descricao - Descrição do lançamento
 * @param {number} valor - Valor numérico do lançamento
 */
function adicionarLancamento(tipo, descricao, valor) {
  const tabela = document.getElementById('lista-lancamentos')
  const linha = document.createElement('tr')
  const dataAtual = new Date().toLocaleDateString('pt-BR')

  // Cria a linha da tabela com os dados e um botão "Excluir"
  linha.innerHTML = `
  <td data-label="Data">${dataAtual}</td>
  <td>${tipo}</td>
  <td>${descricao}</td>
  <td>${formatarMoeda(valor)}</td>
  <td><button class="btn-excluir">Excluir</button></td>
`

  tabela.appendChild(linha)

  // Atualiza os totais de receitas ou despesas
  if (tipo === 'receita') receitas += valor
  else despesas += valor

  atualizarResumo()

  // Adiciona evento de click no botão "Excluir"
  linha.querySelector('.btn-excluir').addEventListener('click', function () {
    removerLancamento(linha, tipo, valor)
  })
}

/**
 * Função para remover um lançamento da tabela
 * @param {HTMLElement} linha - A linha da tabela que será removida
 * @param {string} tipo - Tipo do lançamento ('receita' ou 'despesa')
 * @param {number} valor - Valor que deve ser subtraído do total
 */
function removerLancamento(linha, tipo, valor) {
  linha.remove() // Remove a linha da tabela

  // Atualiza os totais de receitas ou despesas
  if (tipo === 'receita') receitas -= valor
  else despesas -= valor

  atualizarResumo()
}

/**
 * Atualiza o resumo de receitas, despesas e lucro líquido
 */
function atualizarResumo() {
  document.getElementById('total-receitas').textContent =
    formatarMoeda(receitas)
  document.getElementById('total-despesas').textContent =
    formatarMoeda(despesas)
  document.getElementById('lucro').textContent = formatarMoeda(
    receitas - despesas
  )
}

/**
 * Formata um número para o formato de moeda brasileira
 * @param {number} valor - Valor numérico
 * @returns {string} - Valor formatado como R$ 1.234,56
 */
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

document.getElementById('toggle-tema').addEventListener('click', () => {
  const body = document.body
  const botao = document.getElementById('toggle-tema')

  body.classList.toggle('dark')

  if (body.classList.contains('dark')) {
    botao.textContent = 'Modo Claro'
  } else {
    botao.textContent = '🌙 Modo Escuro'
  }
})
