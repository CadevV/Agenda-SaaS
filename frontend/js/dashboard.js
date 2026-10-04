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

        formCreateTask.reset()
        modalCreateNewTask.classList.remove('on')
    }

    if(tarefas.length > 0){
        tarefasHojeLista.innerHTML = ``

        tarefasHoje.length = 0
        tarefasHoje.push(...tarefas.filter(el => el.hoje === true))

        tarefasHoje.forEach(element =>{   
            const newTask = document.createElement('li')
            newTask.classList.add('tasks')

            newTask.innerHTML = 
            `
            <p><span>${element.nome}</span> <span>${element.data}</span> </p>
                
            <div>
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
}

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

pegarData()
pegarTotalTarefas()
pegarTarefasHoje()
concluirTask()
verificarTarefas()