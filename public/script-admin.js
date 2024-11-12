// Verificar si el usuario está autenticado
if (!sessionStorage.getItem('usuarioId')) {
    window.location.href = 'login-rrhh.html';  // Redirigir a la página de login si no está autenticado
}

// Función para cargar las solicitudes de vacaciones
function cargarSolicitudes() {
    fetch('/api/solicitudes')  // Endpoint para obtener las solicitudes
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('solicitudes-container');
        container.innerHTML = '';  // Limpiar contenido actual

        if (data.length === 0) {
            container.innerHTML = '<p>No hay solicitudes pendientes.</p>';
        } else {
            data.forEach(solicitud => {
                const solicitudDiv = document.createElement('div');
                solicitudDiv.classList.add('solicitud');
                solicitudDiv.innerHTML = `
                    <p><strong>Empleado:</strong> ${solicitud.nombre} ${solicitud.apellido}</p>
                    <p><strong>Fecha Inicio:</strong> ${solicitud.fecha_inicio}</p>
                    <p><strong>Fecha Fin:</strong> ${solicitud.fecha_fin}</p>
                    <button onclick="aceptarSolicitud(${solicitud.id})">Aceptar</button>
                    <button onclick="denegarSolicitud(${solicitud.id})">Denegar</button>
                `;
                container.appendChild(solicitudDiv);
            });
        }
    })
    .catch(error => console.error('Error al cargar las solicitudes:', error));
}

// Función para aceptar una solicitud
function aceptarSolicitud(id) {
    fetch(`/api/solicitudes/${id}/aceptar`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        alert('Solicitud aceptada');
        cargarSolicitudes();  // Recargar las solicitudes
    })
    .catch(error => console.error('Error al aceptar la solicitud:', error));
}

// Función para denegar una solicitud
function denegarSolicitud(id) {
    fetch(`/api/solicitudes/${id}/denegar`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        alert('Solicitud denegada');
        cargarSolicitudes();  // Recargar las solicitudes
    })
    .catch(error => console.error('Error al denegar la solicitud:', error));
}

// Función para cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('usuarioId');  // Eliminar la sesión
    window.location.href = 'login-rrhh.html';  // Redirigir al login
}

// Cargar las solicitudes al inicio
cargarSolicitudes();