class Reserva {
  constructor(id, nombre, email, nroTelefono, cantComensales, fecha, hora, local, preferencias, confirmacion) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.nroTelefono = nroTelefono;
    this.cantComensales = cantComensales;
    this.fecha = fecha;
    this.hora = hora;
    this.local = local;
    this.preferencias = preferencias;
    this.confirmacion = confirmacion;
  }
}

function showReservas() {
  // Realizar una solicitud GET para obtener las reservas desde el backend
  fetch('/api/reservas')
    .then(response => response.json())
    .then(reservas => {
      const tbodyReservas = document.querySelector('#list-table-reservas tbody');
      tbodyReservas.innerHTML = '';

      reservas.forEach(reserva => {
        const tr = `
          <tr>
            <td>${reserva.nombre}</td>
            <td>${reserva.email}</td>
            <td>${reserva.nroTelefono}</td>
            <td>${reserva.cantComensales}</td>
            <td>${reserva.fecha}</td>
            <td>${reserva.hora}</td>
            <td>${reserva.local}</td>
            <td>${reserva.preferencias}</td>
            <td>
              <button class="btn-cac" onclick='confirmReserva(${reserva.id})'><i class="fa fa-check"></i></button>
              <button class="btn-cac" onclick='deleteReserva(${reserva.id})'><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        `;
        tbodyReservas.insertAdjacentHTML('beforeend', tr);
      });
    })
    .catch(error => {
      console.error('Error al obtener las reservas:', error);
    });
}

function confirmReserva(reservaId) {
  // Realizar una solicitud PUT para confirmar la reserva en el backend
  fetch(`/api/reservas/confirm/${reservaId}`, {
    method: 'PUT'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      showReservas(); // Actualizar la tabla de reservas después de confirmar
    })
    .catch(error => {
      console.error('Error al confirmar la reserva:', error);
    });
}

function deleteReserva(reservaId) {
  // Realizar una solicitud DELETE para eliminar la reserva en el backend
  fetch(`/api/reservas/${reservaId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      showReservas(); // Actualizar la tabla de reservas después de eliminar
    })
    .catch(error => {
      console.error('Error al eliminar la reserva:', error);
    });
}

// Cargar las reservas al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  showReservas();
});
