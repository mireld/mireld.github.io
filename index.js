// console.log('Funcionando');
// Variables
const formularioUI = document.querySelector('#formulario');
const saveBtn = document.querySelector('#btn-save');
const updateBtn = document.querySelector('#btn-update');
const toDoUI = document.querySelector('#pendiente');
const toDoDesc = document.querySelector('#descripcion');
const pendientesUI = document.querySelector('#listaActividades');
let toDoIndex= 0;
let pendientes = [];


const CrearPendiente = (pendiente, descripcion) => {
    let item = {
        pendiente: pendiente,
        estado: 'Por Hacer',
        descripcion: descripcion
    }
    pendientes.push(item);
    return item;
}

const template = (e) => {
    if (e.estado === 'Por Hacer') {
        return `<div class="alert alert-warning flex-wrap" role="alert">
        <span class="material-icons float-start">
            fact_check
        </span>
        <span class="material-icons float-end ms-1">delete</span>
        <span class="material-icons float-end ms-1">done</span>
        <span class="material-icons float-end ms-1">edit</span>
        <b class="m-2 w-50">${e.pendiente}</b>
        <span class="w-25 fst-italic"> - ${e.estado}</span>
        <article class="w-75">- ${e.descripcion}</article> 
        </div>`
    } else if (e.estado === 'Realizado'){
        return `<div class="alert alert-success flex-wrap" role="alert">
        <span class="material-icons float-start">
            fact_check
        </span>
        <span class="material-icons float-end ms-1">delete</span>
        <span class="material-icons float-end ms-1">done</span>
        <span class="material-icons float-end ms-1">edit</span>
        <b class="m-2 w-50">${e.pendiente}</b>
        <span class="w-25 fst-italic"> - ${e.estado}</span>
        <article class="w-75">- ${e.descripcion}</article> 
        </div>`
    }
}

const SaveLocal = () => {
    localStorage.setItem('Pendiente', JSON.stringify(pendientes));
}

const printHTML = () => {
    pendientesUI.innerHTML = '';
    pendientes = JSON.parse(localStorage.getItem('Pendiente'));
    // console.log(pendientes);
    if (pendientes === null) {
        pendientes = [];
    } else {
        pendientes.forEach(element => {
            pendientesUI.innerHTML += template(element);
        });
    }
    toDoUI.value = '';
    toDoDesc.value = '';
}

const findIndex = (textToDo) => {
    return pendientes.findIndex((e) => {
        return e.pendiente === textToDo;
    })
};


// Button script / Actions UI

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (toDoUI.value !== ''){
        console.log('save to local: '+toDoUI.value);
        CrearPendiente(toDoUI.value, toDoDesc.value);
        SaveLocal();
        printHTML();
    }
        
} );

updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // let toDoIndex = findIndex(localStorageText);
    if (toDoUI.value !== ''){
        console.log('Update: ' + toDoUI.value);
        pendientes[toDoIndex].pendiente = toDoUI.value;
        pendientes[toDoIndex].descripcion = toDoDesc.value;
        SaveLocal();
        printHTML();
        toDoUI.classList.remove('list-group-item-warning');
        toDoDesc.classList.remove('list-group-item-warning');
        saveBtn.classList.remove('visually-hidden');
        updateBtn.classList.add('visually-hidden');

    }        
} );

document.addEventListener('DOMContentLoaded', printHTML());

pendientesUI.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.composedPath()[1]);
    let localStorageText = e.composedPath()[1].childNodes[9].innerText;
    let typeClick = e.target.textContent;
    console.log('LocalStorageText:' + localStorageText);
    toDoIndex = findIndex(localStorageText);
    if (typeClick === 'delete'){
        // Accion de eliminar localStorage Item
        // console.log('accion delete');
        pendientes.splice(toDoIndex, 1);
        SaveLocal();
        printHTML();
    } else if (typeClick === 'done'){
        // Accion de cambiar estado localStorage Item
        // console.log('accion done');
        pendientes[toDoIndex].estado = 'Realizado';
        SaveLocal();
        printHTML();
        // console.log(pendientes[toDoIndex].estado);
    } else if (typeClick === 'edit') {
        // Accion para editar el elemento
        toDoUI.value = pendientes[toDoIndex].pendiente;
        toDoDesc.value = pendientes[toDoIndex].descripcion;
        toDoUI.classList.add('list-group-item-warning');
        toDoDesc.classList.add('list-group-item-warning');
        saveBtn.classList.add('visually-hidden');
        updateBtn.classList.remove('visually-hidden');
    }
});
