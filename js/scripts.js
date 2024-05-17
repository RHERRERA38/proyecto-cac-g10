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

// JS de contacto

document.addEventListener('DOMContentLoaded', function () {
    const locationButtons = document.querySelectorAll('.location-btn');
    const mapIframe = document.getElementById('map-iframe');

    function showLocation(location) {
        const mapSrc = {
            'belgrano': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.705593065969!2d-58.45934236010858!3d-34.56100885535597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d366bb8c37%3A0xaf0e4f04645827e0!2sMendoza%202350%2C%20C1428DKN%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1715724302606!5m2!1sen!2sar',
            'caballito': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.1110705652536!2d-58.44484756010518!3d-34.626633358820975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca37b9f98613%3A0xe77b7f5653b27e32!2sAv.%20Pedro%20Goyena%201052%2C%20C1424%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1715724313186!5m2!1sen!2sar',
            'pto-madero': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8568381294494!2d-58.36642146010622!3d-34.60778145782492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33529328fe935%3A0xc382b7640b3bf76e!2sOlga%20Cossettini%20785%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1715724330046!5m2!1sen!2sar',
            'mar-del-plata': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.7440317995124!2d-57.53996205992231!3d-38.029746446529145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584ddcc1e5e7153%3A0xe94229591e47aef5!2sLeandro%20N.%20Alem%203980%2C%20B7602DWX%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1715724344462!5m2!1sen!2sar',
            'cordoba': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.9853541882712!2d-64.18217666026534!3d-31.414529596268146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a29c4e27ced3%3A0xc760c2f750258583!2sAv.%20Emilio%20Olmos%20265%2C%20X5000EOC%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1715724359898!5m2!1sen!2sar'
        };
        if (mapSrc.hasOwnProperty(location)) {
            mapIframe.src = mapSrc[location];
        } else {
            console.error('Ubicación no válida:', location);
        }
    }

    locationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.dataset.location;
            showLocation(location);
        });
    });

    // Mostrar el mapa de Belgrano por defecto
    showLocation('belgrano');
});