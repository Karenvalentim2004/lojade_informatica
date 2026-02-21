function fnMontarLista(produto) {
    let lista = `
        <tbody id="lista-produtos">
                <tr>
                    <td><img src="${produto.foto}" alt="${produto.nome}" class="img-thumbnail" width="100" height="100"> </td>
                    <td>${produto.id}</td>
                    <td>${produto.titulo.substring(0, 20)}...</td>
                    <td>${produto.descricao.substring(0, 50)}</td>
                    <td>${produto.categoria}</td>
                    <td>R$ ${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td>${"⭐".repeat(produto.avaliacao)}</td>
                    <td>
                    <a href="um-produto.html?id=${produto.id}" class="btn"> <i class="bi bi-eye"></i> </a>
                    <a href="editar-produto.html?id=${produto.id}" class="btn"> <i class="bi bi-pencil"></i> </a>
                    <button type="button" class="btn" onclick="fnExcluirProduto(${produto.id}, event.target)"> <i class="bi bi-trash"></i> </button>
                </tr>

        </tbody>
    `
    document.querySelector("#lista-produtos").innerHTML += lista
}

function fnCarregarDados() {

    fetch('http://localhost:3000/produtos/', { method: 'GET' })
        .then(response => response.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarLista(produto)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()

