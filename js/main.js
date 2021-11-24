/* função para trocar de tema */
function ScopoTheme() {
    let button = document.querySelector('.button-theme');
    let body = document.querySelector('body');
    function chargeIconDark() {
        document.querySelector('.button-theme').innerHTML = ` 
        <ion-icon class="moon-theme-icon theme" name="moon-outline"></ion-icon> `;
    }
    function chargeIconSun() {
        document.querySelector('.button-theme').innerHTML = ` 
        <ion-icon class="sun-theme-icon theme" name="sunny-outline"></ion-icon> `;
    }
    button.addEventListener('click', function () {
        if (window.getComputedStyle(body).backgroundColor === 'rgb(0, 0, 0)') {
            chargeIconDark();
            body.classList.remove('back-black');
            body.classList.add('back-white');
        } else {
            chargeIconSun();
            body.classList.remove('back-white');
            body.classList.add('back-black');
        }
    });
}
ScopoTheme()


/* função para abrir o adicionar tarefas */
function ScopoNewTask() {
    let BtnopenNew = document.querySelector('.btn-addTask');
    let InputOpenNew = document.querySelector('.check');

    BtnopenNew.addEventListener('click', function () {
        if (!InputOpenNew.checked) { InputOpenNew.checked = true, InputAdd.focus() }
        else { InputOpenNew.checked = false; }

    });
}
ScopoNewTask()


/* puxa html */
let BtnAdd = document.querySelector('.btn-new');
let InputAdd = document.querySelector('.input-addTask');
let TimeAdd = document.querySelector('.time-new ');
let ul = document.querySelector('.ul-addedTask');


/* função que adciona uma tarefa nova */
function addTask() {
    function GetNameTask() {
        let name = document.querySelector('.input-addTask').value.trim();
        if (name.length > 10) {
            name = name.slice(0, 10);
            name += '...';
        }
        return name;
    }
    function GetDateTask() {
        let date = document.querySelector('.time-new ').value;
        return date
    }

    let NameTask = GetNameTask()
    let DateTask = GetDateTask();

    if (NameTask) {
        if (DateTask) {
            let li = document.createElement('li');
            let pName = document.createElement('p');
            let pDate = document.createElement('p');
            let button = document.createElement('button');

            pName.innerText = NameTask;
            pDate.innerText = DateTask;

            button.innerText = 'Apagar';
            button.setAttribute('class', 'RemoveTask btn color btn-color');

            pName.setAttribute('class', 'p-name');
            pDate.setAttribute('class', 'p-date');

            li.appendChild(pName);
            li.appendChild(pDate);
            li.appendChild(button);
            ul.appendChild(li);
            InputAdd.value = '';
            TimeAdd.value = '';
            document.querySelector('.check').checked = false;
            addMemoryName();
            addMemoryDate();
        } else return alert('Insira uma data correta');
    } else return alert('Insira o nome da tarefa');

}


/* botões click para adcionar uma tarefa */
BtnAdd.addEventListener('click', function () {
    addTask()
});
InputAdd.addEventListener('keypress', function (e) {
    switch (e.keyCode) {
        case 13:
            TimeAdd.focus();
            break;
        default:
            break;
    }
});
TimeAdd.addEventListener('keypress', function (e) {
    switch (e.keyCode) {
        case 13:
            addTask();
            break;
        default:
            break;
    }
});


/* botão apagar tarefa */
document.addEventListener('click', function (e) {
    let el = e.target;
    if (el.classList.contains('RemoveTask')) {
        el.parentElement.remove();
        addMemoryName();
        addMemoryDate();
    }
})


/* função para salvar na memoria Nome E Data */
function addMemoryName() {
    let AllPName = ul.querySelectorAll('.p-name');
    let pNameList = [];
    for (let T of AllPName) {
        let pName = T.innerText;
        pNameList.push(pName);
        let pNameJSON = JSON.stringify(pNameList);
        localStorage.setItem('pNameStorage', pNameJSON);
    }
}
function addMemoryDate() {
    let AllPDate = ul.querySelectorAll('.p-date');
    let pDateList = [];
    for (let T of AllPDate) {
        let pDate = T.innerText;
        pDateList.push(pDate);
        let pDateJSON = JSON.stringify(pDateList);
        localStorage.setItem('pDateStorage', pDateJSON);
    }
}


/* pegar conteúdo salvo */
function ReloadMemory() {
    let nameSave = localStorage.getItem('pNameStorage');
    let nameArray = JSON.parse(nameSave);

    let DateSave = localStorage.getItem('pDateStorage');
    let dateArray = JSON.parse(DateSave);
    for (let a of nameArray) {
        reloadName(a)
    }
    for (let b of dateArray) {
    }
}
ReloadMemory();


/* função adcionar conteúdo salvo */
function reloadName(name) {
    let li = document.createElement('li');
    let pName = document.createElement('p');
    let button = document.createElement('button');

    pName.innerText = name;

    button.innerText = 'Apagar';
    button.setAttribute('class', 'RemoveTask btn color btn-color');

    pName.setAttribute('class', 'p-name');

    li.appendChild(pName);
    li.appendChild(button);
    ul.appendChild(li);
    InputAdd.value = '';
    TimeAdd.value = '';
}


