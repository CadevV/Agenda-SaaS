import {showPass} from "./login.js"

const btnViewPass = document.querySelector('.viewPass')
const btnUnViewPass = document.querySelector('.unViewPass')

btnUnViewPass.addEventListener('click', showPass)
btnViewPass.addEventListener('click', showPass)