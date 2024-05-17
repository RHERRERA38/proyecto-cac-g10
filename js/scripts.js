const navbar = `
<nav>
    <div class="sidebar-header">
        <a class="logo-wrapper">
            <img src="./assets/img/rest-logo.png" alt="Logo">
            <h2 class="hidden">BISTRO</h2>
        </a>
        <button class="toggle-btn">
            <img src="./assets/svg/expand.svg" alt="expand button">
        </button>
    </div>
    <div class="sidebar-links">
        <a class="link" href="index.html">
            <img src="./assets/svg/home.svg" alt="">
            <span class="hidden">Inicio</span>
        </a>
        <a class="link" href="menu.html">
            <img src="./assets/svg/menu.svg" alt="">
            <span class="hidden">Menu</span>
        </a>
        <a class="link" href="reservas.html">
            <img src="./assets/svg/reservas.svg" alt="">
            <span class="hidden">Reservas</span>
        </a>
        </li>
        <a class="link" href="contacto.html">
            <img src="./assets/svg/ubicacion.svg" alt="">
            <span class="hidden">Ubicación y Contacto</span>
        </a>
    </div>
</nav>`;
document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);


const sidebarBtn = document.querySelector(".toggle-btn");
//const sidebar = document.querySelector("aside");
const main = document.querySelector(".main");

sidebarBtn.addEventListener("click", () => {
    document.body.classList.toggle("active");
    main.classList.toggle("siderbar-activate");
});

// Menu

function mostrarDiv(idBoton) {

    const idDiv = idBoton.replace('button-', '');

    const divs = document.querySelectorAll('.div-carta');

    divs.forEach(div => {
        div.classList.remove('show')
    })
    const divMostrar = document.getElementById(idDiv);

    divMostrar.classList.add('show');
    }


    const tabs = document.querySelectorAll('.a-tabs');

    tabs.forEach(tab => {

        tab.addEventListener('click', function () {

        tabs.forEach(t => {
            t.classList.remove('active');
        });
        this.classList.add('active');

        mostrarDiv(this.id);
    });
});

// Instrucciones asociadas al formulario de reservas

let btnReserva = document.querySelector('#btn-reserva');

if(btnReserva !== null) {
    btnReserva.addEventListener('click', function(e) {

        let name = document.querySelector('#name');
        let email = document.querySelector('#email');
        let telf = document.querySelector('#telf');
        let cant = document.querySelector('#cant');
        let date = document.querySelector('#date');
        let time = document.querySelector('#time');
        let sede = document.querySelector('#sedes');
        let isEmpty = false;
    
        if(name.value.trim()==''){
            name.classList.add('error');
            let errorname = document.querySelector('#error-name');
            errorname.innerHTML = 'Debe completar el campo Nombre';
            isEmpty = true;
        }
    
        if(email.value.trim()==''){
            email.classList.add('error');
            let erroremail = document.querySelector('#error-email');
            erroremail.innerHTML = 'Debe completar el campo email';
            isEmpty = true;
        }
    
        if(telf.value.trim()==''){
            telf.classList.add('error');
            let errortelf = document.querySelector('#error-telf');
            errortelf.innerHTML = 'Debe completar el campo N° Teléfono';
            isEmpty = true;
        }
    
        if(cant.value.trim()==''){
            cant.classList.add('error');
            let errorcant = document.querySelector('#error-cant');
            errorcant.innerHTML = 'Debe indicar la cantidad de comensales';
            isEmpty = true;
        }
    
        if(date.value.trim()==''){
            date.classList.add('error');
            let errordate = document.querySelector('#error-date');
            errordate.innerHTML = 'Debe indicar la fecha de la reserva';
            isEmpty = true;
        }
    
        if(time.value.trim()==''){
            time.classList.add('error');
            let errortime = document.querySelector('#error-time');
            errortime.innerHTML = 'Debe indicar hora de la reserva';
            isEmpty = true;
        }
    
        if(sede.value.trim()==''){
            sede.classList.add('error');
            let errorsede = document.querySelector('#error-sedes');
            errorsede.innerHTML = 'Debe seleccionar una sede';
            isEmpty = true;
        }
    
        if(isEmpty) {
            e.preventDefault();
        }
        
})

}

//Fin de scripts para formulario de reservas
