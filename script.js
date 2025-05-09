// script.js
let reservas = [];
let editIndex = null;

const form = document.getElementById("reservaForm");
const tabla = document.getElementById("tablaReservas");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const actividad = document.getElementById("actividad").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !matricula || !actividad || !fecha) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!/^[A-Za-z0-9]{8}$/.test(matricula)) {
        alert("El código de matrícula debe tener 8 caracteres alfanuméricos.");
        return;
    }

    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        alert("La fecha debe ser actual o futura.");
        return;
    }

    const nuevaReserva = { nombre, matricula, actividad, fecha };

    if (editIndex === null) {
        reservas.push(nuevaReserva);
    } else {
        reservas[editIndex] = nuevaReserva;
        editIndex = null;
    }

    form.reset();
    mostrarReservas();
});

function mostrarReservas() {
    tabla.innerHTML = "";
    reservas.forEach((reserva, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.matricula}</td>
            <td>${reserva.actividad}</td>
            <td>${reserva.fecha}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarReserva(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function editarReserva(index) {
    const reserva = reservas[index];
    document.getElementById("nombre").value = reserva.nombre;
    document.getElementById("matricula").value = reserva.matricula;
    document.getElementById("actividad").value = reserva.actividad;
    document.getElementById("fecha").value = reserva.fecha;
    editIndex = index;
}

function eliminarReserva(index) {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
        reservas.splice(index, 1);
        mostrarReservas();
    }
}
