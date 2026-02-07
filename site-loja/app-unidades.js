function fnMontarCardUnidades(unidades) {
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
            <div class="card h-100">
                <img src="${unidades.foto}" class="card-img-top" alt="${unidades.nome}">
                <div class="card-body">
                    <h5 class="card-title">${unidades.nome_da_loja}</h5>
                    <p class="card-text">
                        <strong>Endereço:</strong> ${unidades.endereco}<br>
                        <strong>Email:</strong> ${unidades.email}<br>
                        <strong>Telefone:</strong> ${unidades.telefone}
                    </p>
                </div>
            </div>
        </div>
    `
    document.querySelector(".lista-unidades").innerHTML += cartao
}


function fnCarregarDados() {
    fetch('http://localhost:3000/unidades', { method: 'GET' })
        .then(response => response.json())
        .then((unidades) => {
            unidades.forEach(unidades => {
                fnMontarCardUnidades(unidades)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()