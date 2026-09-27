const textAgenda = document.querySelector('.textAgenda')

let i = 0

function digitar(){
    let palavra = "agenda"

    if(palavra.length > i){
        textAgenda.textContent += palavra[i]
        i++
        setTimeout(digitar, 250);
    } else {
        textAgenda.classList.remove('on')
    }
}

function login(){
    
}

window.addEventListener("load", digitar)