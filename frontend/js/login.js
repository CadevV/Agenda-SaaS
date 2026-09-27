const emailLogin = document.getElementById('emailLogin')
const senhaLogin = document.getElementById('passLogin')
const btnEntrar = document.getElementById('btnEntrar')
const formLogin = document.querySelector('.formLogin')
const feedbackLogin = document.querySelector('.feedbackLogin')
const btnViewPass = document.querySelector('.viewPass')

function login(){
    let tempAdmEmail = "adm123@gmail.com"
    let tempAdmName = "adm123"
    let tempAdmPass = "adm67"
    
    let emailNameUser = emailLogin.value
    let senhaUser = senhaLogin.value

    if(emailNameUser == tempAdmName || emailNameUser == tempAdmEmail & senhaUser == tempAdmPass){
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
    }
}

function rateLimit(){
    let tentativas = 0
    
    if (tentativas < 5) {
        setInterval(() => {
            tentativas = 0
        }, 60000);

        return
    }
    tentativas++
}

function showPass(){
    if(senhaLogin.type === "text"){
        senhaLogin.type = "password"
    } else {
        senhaLogin.type = "text"
    }
}

btnEntrar.addEventListener('click', () => {
    login()
    rateLimit()
})

btnViewPass.addEventListener('click', showPass)

formLogin.addEventListener('submit', ()=>{
    event.preventDefault();
})