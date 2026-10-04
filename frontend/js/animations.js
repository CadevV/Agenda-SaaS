const textAgenda = document.querySelector('.textAgenda')
const nameUser = document.querySelector('.nameUser')

let i = 0
function digitarLogin(){
    let palavra = "agenda"

    if(textAgenda && palavra.length > i){
        textAgenda.textContent += palavra[i]
        i++
        setTimeout(digitarLogin, 250);
    } else if(textAgenda){
        textAgenda.classList.remove('on')
    }
}

let index = 0
function bemVindoUser(){
    let palavra = "gui"

    if(nameUser && palavra.length > index){
        nameUser.textContent += palavra[index]
        index++
        setTimeout(bemVindoUser, 250)
    }
}

digitarLogin()
bemVindoUser()