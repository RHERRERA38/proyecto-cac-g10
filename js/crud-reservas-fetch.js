const BASEURL = 'http://127.0.0.1:5000';

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
    return null; //Retorna null si ocurre un error
  }
}

/**
 * Función que permite crear un elemento <tr> para la tabla de reservas
 * por medio del uso de template string de JS.
 */
async function showReservas(){
    let reservas =  await fetchData(BASEURL+'/api/reservas', 'GET');
    console.log(reservas);
    const tableReservas = document.querySelector('#list-table-reservas tbody');
    tableReservas.innerHTML='';
    reservas.forEach((reserva, index) => {
      let tr = `<tr>
                    <td>${reserva.Nombre}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.Nro_Telefono}</td>
                    <td>${reserva.Cant_Comensales}</td>
                    <td>${reserva.Fecha}</td>
                    <td>${reserva.Hora}</td>
                    <td>${reserva.Local}</td>
                    <td>${reserva.Preferencias}</td>
                    <td>${reserva.Confirmacion}</td>
                    <td>
                        <button class="btn-rsv" onclick='editReserva(${reserva.Id_Reserva})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-rsv" onclick='confirmReserva(${reserva.Id_Reserva})'><i class="fa fa-check" ></button></i>
                        <button class="btn-rsv" onclick='deleteReserva(${reserva.Id_Reserva})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableReservas.insertAdjacentHTML("beforeend",tr);
    });
  }

  /**
   * Función que permite comunicarse con el servidor para crear o actualizar 
   * registro de reservas en la base de datos
   * @returns
   */
  async function saveReserva(){
    const idReserva = document.querySelector('#id-reserva').value;
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const cantComensales = document.querySelector('#cant_comensales').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const local = document.querySelector('#local').value;
    const preferencias = document.querySelector('#preferencias').value;
    //VALIDACION DEL FORMULARIO
    if (!nombre || !email || !telefono || !cantComensales || !fecha || !hora || !local || !preferencias) {
      Swal.fire({
        title: '¡Error!',
        text: 'Por favor completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      return;
    }
    //Crea un objeto con los datos de la reserva
    const reservData = {
      nombre: nombre,
      email: email,
      nro_telefono: telefono,
      cant_comensales: cantComensales,
      fecha: fecha,
      hora: hora,
      local: local,
      preferencias: preferencias,
      confirmacion: 0,
    };
  let result = null;
  // Si hay idReserva, realiza una petición PUT para actualizar la reserva existente
  if(idReserva!==""){
    result = await fetchData(`${BASEURL}/api/reservas/${idReserva}`, 'PUT', reservData);
  }
  else{
    //Si no hay idReserva, realiza una peticion POST para crear la reserva
    result = await fetchData(`${BASEURL}/api/reservas/`, 'POST', reservData);
  }

  const formReserva = document.querySelector('#form-edit-reserva');
  formReserva.reset();
  Swal.fire({
    title: '¡Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showReservas();
 }

/**
 * Función que permite cargar el formulario con los datos de la reserva
 * para su edición
 * @param {number} id Id de la reserva que se quiere eliminar. 
 */

async function editReserva(id){
    //Se busca en el servidor la reserva según su ID
    let response = await fetchData(`${BASEURL}/api/reservas/${id}`, 'GET');
    const idReserva = document.querySelector('#id-reserva');
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const cantComensales = document.querySelector('#cant_comensales');
    const fecha = document.querySelector('#fecha');
    const hora = document.querySelector('#hora');
    const local = document.querySelector('#local');
    const preferencias = document.querySelector('#preferencias');

    idReserva.value = response.Id_Reserva;
    nombre.value = response.Nombre;
    email.value = response.email;
    telefono.value = response.Nro_Telefono;
    cantComensales.value = response.Cant_Comensales;
    fecha.value = response.Fecha;
    hora.value = response.Hora;
    local.value = response.Local;
    preferencias.value = response.Preferencias;
}

/**
 * Función que permite confirmar una reserva
 * @param {number} id - Id de la reserva que se quiere confirmar
 */
async function confirmReserva(id){
    Swal.fire({
        title: "¿Está seguro de confirmar la reserva?",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/reservas/confirm/${id}`, 'PUT');
          showReservas();
          Swal.fire(response.message, "", "success");
        }
    });
}

/**
 * Función que permite eliminar una reserva
 * @param {number} id - Id de la reserva que se quiere eliminar
 */
function deleteReserva(id){
    Swal.fire({
        title: "¿Está seguro de eliminar la reserva?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/reservas/${id}`, 'DELETE');
          showReservas();
          Swal.fire(response.message, "", "success");
        }
    });
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveReserva = document.querySelector('#btn-save-reserva');
    btnSaveReserva.addEventListener('click',saveReserva);
    showReservas();
});
