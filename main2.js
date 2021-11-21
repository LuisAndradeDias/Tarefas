/* PUXA O HTML */
let InputTask = document.querySelector('.input-task');
let Tasks = document.querySelector('.tasks');
let ButtonTasks = document.querySelector('.btn-tasks');



/* FUNÇÃO CRIAR LISTA ORDENADA */
function newLI() {
    let li = document.createElement('li');
    return li
}



/* FUNÇÃO CRIAR NUVO BOTÃO */
function newBTN(li) {
    let btn = document.createElement('button');
    btn.innerText = 'Apagar';
    btn.setAttribute('class', 'apagar btn');
    li.appendChild(btn);
}



/* FUNÇÃO DE ADCIONAR TAREFAS */
function newTask(task) {
    let li = newLI();
    li.innerText = task;
    newBTN(li);
    Tasks.appendChild(li);
    InputTask.value = '';
    InputTask.focus();
}



/* FUNÇÃO PARA APAGAR UMA TAREFA */
document.addEventListener('click', function (e) {
    let el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        AddTaskMemory();
    }
})



/* FUNÇÃO PARA USAR O ENTER */
InputTask.addEventListener('keypress', function (e) {
    switch (e.keyCode) {
        case 13:
            if (!InputTask.value) return
            newTask(InputTask.value);
            AddTaskMemory();
            break;
        default:
            break;
    }
})



/* FUNÇÃO CLICK ADICIONAR TAREFA */
ButtonTasks.addEventListener('click', function () {
    if (!InputTask.value) return
    newTask(InputTask.value);
    AddTaskMemory();
});



/* FUNÇÃO PARA ADCIONAR AS TAREFAS NA MEMORIA */
function AddTaskMemory() {
    let TasksLI = Tasks.querySelectorAll('li');
    let TaskList = [];
    for (let T of TasksLI) {
        let TaskText = T.innerText;
        TaskText = TaskText.replace('Apagar', ' ').trim();
        TaskList.push(TaskText);
        let TaskJSON = JSON.stringify(TaskList);
        localStorage.setItem('tasksStorage', TaskJSON);
    }
}



/* FUNÇÃO PARA RECARREAR AS TAREFAS AO ENTRAR NO SITE */
function ReloadTaskMemory() {
    let TaskSave = localStorage.getItem('tasksStorage');
    let TaskArray = JSON.parse(TaskSave);
    for (let Task of TaskArray) {
        newTask(Task)
    }
}
ReloadTaskMemory()