const senhaLogin = document.getElementById('passLogin')
const btnViewPass = document.querySelector('.viewPass')
const btnUnViewPass = document.querySelector('.unViewPass')
const formLogin = document.querySelector('.formLogin')

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
})