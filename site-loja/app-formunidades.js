function fnAlterarFoto() {
    if (foto.value != '') {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('${foto.value}')`
    } else {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('https://images.tcdn.com.br/img/img_prod/1062397/loja_florida_projeto_de_loja_de_roupas_11_1_73f289296d7793f86fe96aada8a6bf99.jpg')`
    }
    console.log(foto.value)
}

function fnLimparCampos() {
    document.getElementById("form-unidades").reset()
}

function fnCadastrarUnidades() {

    let formDados = {
        nome_da_loja: document.getElementById("nome_da_loja").value,
        foto: document.getElementById("foto").value,
        endereco: document.getElementById("endereco").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value
    }
    console.dir(formDados)

    fetch('http://localhost:3000/unidades/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })

        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
        })
        .catch(erro => console.log(erro.message))
}


let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-unidade")


foto.addEventListener("blur", function () {
    fnAlterarFoto()
})

btn_salvar.addEventListener("click", function () {
    fnCadastrarUnidades()
})