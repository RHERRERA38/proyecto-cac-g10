const BASEURL = 'http://127.0.0.1:5000';


let btnGuardaReserva = document.querySelector('#btn-reserva');

if (btnGuardaReserva !== null) {
    btnGuardaReserva.addEventListener('click', function (e) {
        e.preventDefault();
        saveReserva();
    });
}

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };
    try {
        const response = await fetch(url, options);  // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();  // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while fetching data. Please try again.');
    }
}


/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveReserva() {
    const nombre = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const nro_telefono = document.querySelector('#telf').value.trim();
    const cant_comensales = document.querySelector('#cant').value.trim();
    const fecha = document.querySelector('#date').value;
    const hora = document.querySelector('#time').value;
    const local = document.querySelector('#sedes').selectedIndex;
    const preferencias = document.querySelector('#comments').value.trim();
    const confirmacion = 0;
    console
    //VALIDACION DE FORMULARIO
    if (!nombre || !email || !nro_telefono || !cant_comensales || !fecha || !hora || !local) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }
    // Crea un objeto con los datos de la película
    const reservaData = {
        nombre,
        email,
        nro_telefono,
        cant_comensales,
        fecha,
        hora,
        local,
        preferencias,
        confirmacion,
    };
    let result = null;


    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/reservas`, 'POST', reservaData);


    const formReserva = document.querySelector('#formReserva');
    formReserva.reset();
    Swal.fire({
        title: 'Exito!',
        text: result?.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })

}
