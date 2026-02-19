function fnLimparCampos() {
    document.getElementById("form-cadastro").reset()
}

function fnFazerCadastro() {
    let formDados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissao").value
    }
    fetch('http://localhost:3000/usuarios/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnLimparCampos()
           console.log(dados)
        })
        .catch(erro => console.log(erro.message))
}

let btn_cadastro = document.getElementById("btn-cadastro")
btn_cadastro.addEventListener("click", function () {
    console.log("oi")
    fnFazerCadastro()
})  