console.log('Funcionando');

const formularioUI = document.querySelector('#formulario');
const toDoUI = document.querySelector('#pendiente');
const pendientesUI = document.querySelector('#listaActividades');
let pendientes = [];


const CrearPendiente = (pendiente) => {
    let item = {
        pendiente: pendiente,
        estado: 'Por Hacer'
    }
    pendientes.push(item);
    return item;
}

const template = (e) => 
`<div class="alert alert-primary" role="alert">
<span class="material-icons float-start">
    fact_check
</span>
<b class="m-2">${e.pendiente}</b> - ${e.estado}
<i class="material-icons float-end ms-2">delete</i>
<i class="material-icons float-end ms-2">done</i>
</div>`

const SaveLocal = () => {
    localStorage.setItem('Pendiente', JSON.stringify(pendientes));
}

const printHTML = () => {
    pendientesUI.innerHTML = '';
    pendientes = JSON.parse(localStorage.getItem('Pendiente'));
    console.log(pendientes);
    if (pendientes === null) {
        pendientes = [];
    } else {
        pendientes.forEach(element => {
            pendientesUI.innerHTML += template(element);
        });
    }

}

// Button script
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toDoUI.value !== ''){
        console.log(toDoUI.value);
        CrearPendiente(toDoUI.value);
        SaveLocal();
        toDoUI.value = '';
        printHTML();
    }
        
} )

document.addEventListener('DOMContentLoaded', printHTML());




// -----------------------------

// const template = (activity, stat) => 
// `<div class="alert alert-primary" role="alert">
// <span class="material-icons float-start">
//     fact_check
// </span>
// <b class="m-2">${activity}</b> - ${stat}
// <span class="material-icons float-end ms-2">delete</span>
// <span class="material-icons float-end ms-2">done</span>
// </div>`

// class Activity {
//     constructor(activity, stat){
//         this.activity = activity;
//         this.stat = stat;
//     }

//     getActivity (){
//         return template(this.activity, this.stat);
//     }
// }

// formularioUI.addEventListener('submit', (e) => {
//     e.preventDefault();    
//     let textUI = toDoUI.value;
//     const status = 'Pendiente';
//     console.log(textUI, status);
//     const printActivity = new Activity(textUI, status);
//     pendientesUI.innerHTML += printActivity.getActivity();
//     });