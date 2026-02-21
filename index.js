const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
    res.send('ZecaInfo')
})


let mysql = require('mysql')
let conexao = mysql.createConnection({
    host: "108.179.193.209",
    user: "gutoxa27_alunos",
    password: "JD_eXLNHp1ZG",
    database: "gutoxa27_bd_loja"
})

conexao.connect(function (erro) {
    if (erro) {
        console.log("Deu ruim na conexão \n");
        throw erro;
    } else {
        console.log("Conexão deu bom \n")
    }
})

// Read All - [GET] / produtos

app.get("/produtos", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query("SELECT * FROM gutoxa27_bd_loja.produtos", function (erro, lista_produtos, campos) {
        res.send(lista_produtos)
    })
})

app.get("/produtos/:categoria/", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}'`, function (erro, dados, campos) {
        res.send(dados)
    })
})


app.get("/produtos/:categoria/:ordem", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    console.log(ordem)
    conexao.query(`SELECT * FROM produtos where categoria ='${categoria}' order by ${ordem} asc `, function (erro, dados, campos) {
        res.send(dados)
    })
})

app.post("/produto/", function (req, res) {
    const data = req.body
    conexao.query(`INSERT INTO produtos set?`, [data], function (erro, resultado) {
        if (erro) {
            res.json(erro)
        }
        res.send(resultado.insertId);
    });
})

//red One - [GET] / produto
app.get("/produto/:id", function (req, res) {
    const id = req.params.id
    conexao.query("SELECT * FROM produtos where id= ? ", [id], function (erro, dados, campos) {
        res.json(dados)
    })
})

//update - [PUT] / produto/:id
app.put("/produto/:id", function (req, res) {
    const id = req.params.id
    const data = req.body

    conexao.query(`UPDATE produtos set ? where id= ${id}`, [data], function (erro, resultado) {
        if (erro) {
            res.send(erro)
        }
        res.send({"status":200, "message": "Atualizado com sucesso!"})
    })
})

//Delete - [DELETE] / produto/:id
app.delete("/produto/:id", function (req, res) {
    const id = req.params.id

    conexao.query(`delete from produtos where id= ${id}`, function (erro, resultado) {
        if (erro) {
            res.send(erro)
        }
        res.send({"status":200, "message": "Excluído com sucesso!"})
    })
})

//Unidades
app.post("/unidades/", function (req, res) {
    const data = req.body
    conexao.query(`INSERT INTO produtos set?`, [data], function (erro, resultado) {
        if (erro) {
            res.json(erro);
        }
        res.send(resultado.insertId);
    });
})


app.get("/unidades", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query("SELECT * FROM gutoxa27_bd_loja.unidades", function (erro, lista_unidades, campos) {
        console.log(lista_unidades);
        res.send(lista_unidades)
    })
})

//Login
app.post("/login/", function (req, res) {
    const ususario = req.body.usuario
    const senha = req.body.senha
    conexao.query(`SELECT * FROM usuarios where usuario='${ususario}' and senha='${senha}'`, function (erro, resultado, campos) {
        if (erro) {
            res.send(erro)
        } else {
            if (resultado.length > 0) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        }
    })
})

//Usuarios
app.post("/usuarios/", function (req, res) {
    const dadosform = req.body

    // conexao.query(`INSERT INTO usuarios (usuario, senha, nome, sobrenome, cidade, estado, permissao) VALUES ('${ususario}', '${senha}', '${nome}', '${sobrenome}', '${cidade}', '${estado}', ${permissao})`, function (erro, resultado) {
    conexao.query(`INSERT INTO usuarios SET ?`, dadosform, function (erro, resultado) {
        if (erro) {
            res.json(erro);
        }
        res.send(resultado.insertId);
    })
})

app.listen(3000)
