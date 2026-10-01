async function testarBackend(){
    const resposta = await fetch("http://127.0.0.1:5000/health")
    const dados = await resposta.json()

    console.log(dados)
}

async function cadastrarUsuario(nome, senha) {
    const resposta = await fetch('http://127.0.0.1:5000/cadastro', {
        method: "post",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome_conta: nome,
            senha_conta: senha
        })
    })
    console.log(resposta)
}
testarBackend()