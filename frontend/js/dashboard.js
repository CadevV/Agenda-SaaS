const btnMenuMobile = document.querySelector('.btnMobile')
const menuMobile = document.querySelector('.infoDash')
const btnLogout = document.querySelector('.btnLogout')
const boxDia = document.getElementById('boxDiaHoje')
const boxTotalTask = document.getElementById('boxTarefasTotais')
const boxTodayTask = document.getElementById('boxTarefasHojeTotais')
const boxTasksCompleted = document.getElementById('boxTarefasConcluidas')
const tarefasHojeLista = document.getElementById('tarefasHoje')
const modalCreateNewTask = document.querySelector('.modalNewTask')
const btnOpenModal = document.querySelector('.btnNewTask')
const btnCloseModal = document.querySelector('.btnCloseModal')
const formCreateTask = document.getElementById('formNewTask')
const dateTask = document.getElementById('dateTask')
const nameTask = document.getElementById('nameTask')
const obsTask = document.getElementById('obsTask')
const tasks = document.querySelectorAll('.tasks')

const tarefas = []
const tarefasHoje = []
const tarefasConcluidas = []

function mobileMenu(){
    menuMobile.classList.toggle('on')
    btnMenuMobile.classList.toggle('on')
}

function desLogar(){
    window.location.href = "index.html"
}

function pegarTotalTarefas(){
    const tamanhoTarefas = tarefas.length
    boxTotalTask.textContent = `${tamanhoTarefas.toString().padStart(2, "0")}`
}

function pegarTarefasHoje(){
    let contador = 0

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    tarefas.forEach(element => {
        const dataDaTarefa = new Date(element.data + "T00:00:00")

        element.hoje = dataDaTarefa.getTime() === hoje.getTime()

        if (element.hoje) {
            contador++
        }
    });

    boxTodayTask.textContent = contador.toString().padStart(2, "0")
}


function pegarData(){
    const hoje = new Date()

    const dia = String(hoje.getDate()).padStart(2, "0")
    const mes = String(hoje.getMonth() + 1).padStart(2, "0")

    boxDia.textContent = `${dia}/${mes}`
}

function verificarTarefas(){
    const msgNull = document.createElement('p')
    if(!tarefasHojeLista.querySelector('li')){
        msgNull.textContent = "Você não tem nenhuma Tarefa"

        msgNull.classList.add("semTarefas", "on")

        tarefasHojeLista.appendChild(msgNull)
    }
}

function concluirTask(){
    tarefasConcluidas.push(...tarefas.filter(el => el.concluido === true))

    boxTasksCompleted.textContent = tarefasConcluidas.length.toString().padStart(2, "0")
}

async function eventosTasks(event){
    const eventos = event.target.closest('.eventosTask')

    if(!eventos){
        return
    }

    const btnRemove = event.target.closest('.btnRemoveTask')
    const btnShow = event.target.closest('.btnShowTask')

    if(btnRemove){
        const tarefaClicada = eventos.closest('.tasks')
        const id = tarefaClicada.dataset.id

        await excluirTarefaApi(id)
        await carregarTarefas()
    }

    if(btnShow){
        const tarefaClicada = eventos.closest('.tasks')
        const id = Number(tarefaClicada.dataset.id)

        const tarefa = tarefas.find(element => element.id === id)

        console.log(tarefa)
    }

    
}
function renderizarTarefas(){
    tarefasHojeLista.innerHTML = ``

    tarefasHoje.length = 0
    tarefasHoje.push(...tarefas.filter(el => el.hoje === true))

    tarefasHoje.forEach(element =>{   
        const newTask = document.createElement('li')
        newTask.classList.add('tasks')
        newTask.dataset.id = element.id

        newTask.innerHTML = 
        `
        <p><span>${element.nome}</span> <span>${element.data}</span> </p>
                
        <div class="eventosTask">
            <button class="btnRemoveTask btnsTask"><i class="fa-solid fa-xmark"></i></button>
            <button class="btnShowTask btnsTask"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button class="btnReadyTask btnsTask"><i class="fa-solid fa-check"></i></button>
        <div>
        <span class="linhaTask"></span>
        `
        tarefasHojeLista.appendChild(newTask)
    })
    verificarTarefas()
}

async function carregarTarefas(){
    const tarefasSalvas = await buscarTarefasApi()

    const tarefasFormatadas = tarefasSalvas.map(element => {
        return {
            id: element.id,
            nome: element.tarefas,
            data: element.data,
            desc: element.obs,
            hoje: false,
            concluido: false
        }
    })

    tarefas.length = 0
    tarefas.push(...tarefasFormatadas)

    pegarTotalTarefas()
    pegarTarefasHoje()
    renderizarTarefas()

    console.log(tarefas)
}

async function criarTarefa(){
    let dataTaskDigitada = dateTask.value 
    let nomeTaskDigitada = nameTask.value
    let obsTaskDigitada = obsTask.value

    if(dataTaskDigitada != "" && nomeTaskDigitada != ""){
        const tarefaSalva = await criarTarefaApi(
            nomeTaskDigitada,
            dataTaskDigitada,
            obsTaskDigitada
        )
        
        console.log(tarefaSalva)
        
        const objNewTask = 
        {
            id: tarefaSalva.id
            ,data: tarefaSalva.data
            ,nome: tarefaSalva.tarefas
            ,desc: tarefaSalva.obs
            ,hoje: false
            ,concluido: false
        }

        tarefas.push(objNewTask)

        pegarTotalTarefas()
        pegarTarefasHoje()
        concluirTask()
        renderizarTarefas()

        formCreateTask.reset()
        modalCreateNewTask.classList.remove('on')
    }

    
}

btnMenuMobile.addEventListener('click', mobileMenu)

btnLogout.addEventListener('click', desLogar)

btnOpenModal.addEventListener('click', ()=>{
    modalCreateNewTask.classList.add('on')
})

btnCloseModal.addEventListener('click', ()=>{
    modalCreateNewTask.classList.remove('on')
})

formCreateTask.addEventListener('submit', (event)=>{
    event.preventDefault()
    criarTarefa()
})

tarefasHojeLista.addEventListener('click', eventosTasks)

pegarData()
pegarTotalTarefas()
pegarTarefasHoje()
concluirTask()
verificarTarefas()
carregarTarefas()