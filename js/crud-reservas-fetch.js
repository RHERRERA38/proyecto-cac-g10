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
  }
}

/**
 * Función que permite crear un elemento <tr> para la tabla de reservas
 * por medio del uso de template string de JS.
 */
async function showReservas(){
    let reservas =  await fetchData(BASEURL+'/api/reservas/', 'GET');
    const tableReservas = document.querySelector('#list-table-reservas tbody');
    tableReservas.innerHTML='';
    reservas.forEach((reserva, index) => {
      let tr = `<tr>
                    <td>${reserva.nombre}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.nroTelefono}</td>
                    <td>${reserva.cantComensales}</td>
                    <td>${reserva.fecha}</td>
                    <td>${reserva.hora}</td>
                    <td>${reserva.local}</td>
                    <td>${reserva.preferencias}</td>
                    <td>
                        <button class="btn-cac" onclick='confirmReserva(${reserva.id})'><i class="fa fa-check" ></button></i>
                        <button class="btn-cac" onclick='deleteReserva(${reserva.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableReservas.insertAdjacentHTML("beforeend",tr);
    });
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
    showReservas();
});
