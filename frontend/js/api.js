async function testarBackend(){
    const resposta = await fetch("http://127.0.0.1:5000/health")
    const dados = await resposta.json()

    console.log(dados)
}

testarBackend()