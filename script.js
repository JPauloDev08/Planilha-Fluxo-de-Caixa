let receitas = 0
let despesas = 0

document
  .getElementById('form-lancamento')
  .addEventListener('submit', function (e) {
    e.preventDefault()

    const tipo = document.getElementById('tipo').value
    const descricao = document.getElementById('descricao').value
    const valor = parseFloat(document.getElementById('valor').value)

    if (descricao || isNaN(valor)) return

    const tabela = document.getElementById('lista-lancamentos')
    const linha = document.createElement('tr')

    linha.innerHTML = `
    <td>${tipo}</td>
    <td>${descricao}</td>
    <td>R${valor.toFixed(2)}</td>
    `

    tabela.appendChild(linha)

    if (tipo === 'receita') receitas += valor
    else despesas += valor

    document.getElementById('total-receitas').textContent = receitas.toFixed(2)
    document.getElementById('total-despesas').textContent = despesas.toFixed(2)
    document.getElementById('lucro').textContent = (
      receitas - despesas
    ).toFixed(2)

    document.getElementById('form-lancamento').reset()
  })
