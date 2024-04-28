const sidebarBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("aside");

sidebarBtn.addEventListener("click", () => {
    document.body.classList.toggle("active");
});

// Instrucciones asociadas al formulario de reservas
let btnReserva = document.querySelector('#btn-reserva');

btnReserva.addEventListener('click', function() {
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let telf = document.querySelector('#telf');
    let cant = document.querySelector('#cant');
    let date = document.querySelector('#date');
    let time = document.querySelector('#time');
    let sede = document.querySelector('#sedes');

    if(name.value.trim()==''){
        name.classList.add('error');
        let errorname = document.querySelector('#error-name');
        errorname.innerHTML = 'Debe completar el campo Nombre';
    }

    if(email.value.trim()==''){
        email.classList.add('error');
        let erroremail = document.querySelector('#error-email');
        erroremail.innerHTML = 'Debe completar el campo email';
    }

    if(telf.value.trim()==''){
        telf.classList.add('error');
        let errortelf = document.querySelector('#error-telf');
        errortelf.innerHTML = 'Debe completar el campo N° Teléfono';
    }

    if(cant.value.trim()==''){
        cant.classList.add('error');
        let errorcant = document.querySelector('#error-cant');
        errorcant.innerHTML = 'Debe indicar la cantidad de comensales';
    }

    if(date.value.trim()==''){
        date.classList.add('error');
        let errordate = document.querySelector('#error-date');
        errordate.innerHTML = 'Debe indicar la fecha de la reserva';
    }

    if(time.value.trim()==''){
        time.classList.add('error');
        let errortime = document.querySelector('#error-time');
        errortime.innerHTML = 'Debe indicar hora de la reserva';
    }

    if(sede.value.trim()==''){
        sede.classList.add('error');
        let errorsede = document.querySelector('#error-sedes');
        errorsede.innerHTML = 'Debe seleccionar una sede';
    }

})

//Fin de scripts para formulario de reservas