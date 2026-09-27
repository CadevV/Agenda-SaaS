const emailLogin = document.getElementById('emailLogin')
const senhaLogin = document.getElementById('passLogin')
const btnEntrar = document.getElementById('btnEntrar')
const formLogin = document.querySelector('.formLogin')
const feedbackLogin = document.querySelector('.feedbackLogin')
const btnViewPass = document.querySelector('.viewPass')
const btnUnViewPass = document.querySelector('.unViewPass')

let tentativas = 0
let bloqueado = false

function limparFeedback(){
    setTimeout(()=>{
        feedbackLogin.textContent = ""
    }, 1000)
}

function rateLimit(){
    tentativas++

    if(tentativas >= 5){
        bloqueado = true
        feedbackLogin.textContent = "Ultrapassou o limite de tentativas. Aguarde 1 minuto"
        clearTimeout()
        setTimeout(() => {
            tentativas = 0
            bloqueado = false
            feedbackLogin.textContent = ""
        }, 60000)
    }
}

function login(){
    let tempAdmEmail = "adm123@gmail.com"
    let tempAdmName = "adm123"
    let tempAdmPass = "adm67"
    
    let emailNameUser = emailLogin.value.trim()
    let senhaUser = senhaLogin.value

    if(emailNameUser == "" || senhaUser == "") {
        if(emailNameUser == ""){
            feedbackLogin.textContent = "Preencha seu nome ou e-mail."
            limparFeedback()
        } else{
            feedbackLogin.textContent = "Digite sua senha"
            limparFeedback()
        }
        return
    }

    if(bloqueado === true) {
        feedbackLogin.textContent = "Ultrapassou limite de tentativas"
        return
    }

    if(emailNameUser == tempAdmName && senhaUser == tempAdmPass || emailNameUser == tempAdmEmail && senhaUser == tempAdmPass){
        tentativas = 0
        feedbackLogin.classList.add('certo')
        feedbackLogin.classList.remove('erro')
        feedbackLogin.textContent = "Senha e usuario Corretos"

        limparFeedback()

        setTimeout(() => {
            window.location.href = "dashboard.html"
        }, 1000)
    } else {
        feedbackLogin.classList.remove('certo')
        feedbackLogin.classList.add('erro')

        rateLimit()

        if(!bloqueado){
            feedbackLogin.textContent = "Senha ou usuario Incorreto"
            limparFeedback()
        }
    }
}

function showPass(){
    if(senhaLogin.type === "text"){
        senhaLogin.type = "password"

        btnUnViewPass.classList.add('on')
        btnViewPass.classList.remove('on')
    } else {
        senhaLogin.type = "text"

        btnUnViewPass.classList.remove('on')
        btnViewPass.classList.add('on')
    }
}

btnUnViewPass.addEventListener('click', showPass)
btnViewPass.addEventListener('click', showPass)

formLogin.addEventListener('submit', (event)=>{
    event.preventDefault();
    login()
})