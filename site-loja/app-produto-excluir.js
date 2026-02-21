function fnExcluirProduto(id) {
    fetch('http://localhost:3000/produto/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            console.dir(dados)
        })
        .catch(erro => console.log(erro.message))
}

function fnExcluirProduto(id, elemento) {
    let confirmar = confirm("Deseja realmente excluir este produto?")
    if (confirmar) {

        fetch('http://localhost:3000/produto/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resposta => resposta.json())
            .then((dados) => {
                elemento.closest("tr").remove()
            })
            .catch(erro => console.log(erro.message))
    }
}