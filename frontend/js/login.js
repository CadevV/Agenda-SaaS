const emailLogin = document.getElementById('emailLogin')
const senhaLogin = document.getElementById('passLogin')
const btnEntrar = document.getElementById('btnEntrar')
const formLogin = document.querySelector('.formLogin')
const feedbackLogin = document.querySelector('.feedbackLogin')
const btnViewPass = document.querySelector('.viewPass')
const btnUnViewPass = document.querySelector('.unViewPass')

let tentativas = 0

function rateLimit(){
    if (tentativas > 4) {
        setTimeout(() => {
            tentativas = 0
        }, 60000);

        return
    }
    tentativas++
    console.log(tentativas)
}

function login(){
    let tempAdmEmail = "adm123@gmail.com"
    let tempAdmName = "adm123"
    let tempAdmPass = "adm67"
    
    let emailNameUser = emailLogin.value.trim()
    let senhaUser = senhaLogin.value

    if(emailNameUser == "" || senhaUser == "") return

    if(tentativas > 5) {
        feedbackLogin.textContent = "Ultrapassou o nivel de tentativas "
        return
    }

    if(emailNameUser == tempAdmName && senhaUser == tempAdmPass || emailNameUser == tempAdmEmail && senhaUser == tempAdmPass){
        tentativas = 0
        feedbackLogin.classList.add('certo')
        feedbackLogin.classList.remove('erro')
        feedbackLogin.textContent = "Senha e usuario Corretos"

        setTimeout(() => {
            window.location.href = "dashboard.html"
        }, 1000)
    } else {
        feedbackLogin.classList.remove('certo')
        feedbackLogin.classList.add('erro')
        feedbackLogin.textContent = "Senha ou usuario Incorreto"

        rateLimit()
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