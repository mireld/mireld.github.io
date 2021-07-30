console.log('Funcionando');

const formularioUI = document.querySelector('#formulario');
const toDoUI = document.querySelector('#pendiente');
const toDoDesc = document.querySelector('#descripcion');
const pendientesUI = document.querySelector('#listaActividades');
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
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toDoUI.value !== ''){
        console.log(toDoUI.value);
        CrearPendiente(toDoUI.value, toDoDesc.value);
        SaveLocal();
        printHTML();
    }
        
} );

document.addEventListener('DOMContentLoaded', printHTML());

pendientesUI.addEventListener('click', (e) => {
    e.preventDefault();
    let localStorageText = e.composedPath()[1].childNodes[7].innerText;
    let typeClick = e.target.textContent;
    console.log('LocalStorageText:' + localStorageText);
    let toDoIndex = findIndex(localStorageText);
    if (typeClick === 'delete'){
        // Accion de eliminar localStorage Item
        console.log('accion delete');
        pendientes.splice(toDoIndex, 1);
        SaveLocal();
        printHTML();
    } else if (typeClick === 'done'){
        console.log('accion done');
        pendientes[toDoIndex].estado = 'Realizado';
        SaveLocal();
        printHTML();
        // console.log(pendientes[toDoIndex].estado);
    }

});
