async function testarBackend(){
    const resposta = await fetch("http://127.0.0.1:5000/health")
    const dados = await resposta.json()

    console.log(dados)
}

async function cadastrarUsuario(nome, senha) {
    fetch('http://127.0.0.1:5000/cadastro', {
        method: "post",

        body: JSON.stringify({
            nome_conta: nome,
            senha_conta: senha
        })
    })
}

testarBackend()