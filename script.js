// Lista donde se guardan las reservas
let reservas = [];
let editIndex = null; // Índice si se está editando

// Referencias
const form = document.getElementById("reservaForm");
const tabla = document.getElementById("tablaReservas");

// Manejo del formulario al hacer submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const actividad = document.getElementById("actividad").value;
    const fecha = document.getElementById("fecha").value;

    // Validaciones básicas
    if (!nombre || !matricula || !actividad || !fecha) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!/^[A-Za-z0-9]{8}$/.test(matricula)) {
        alert("Matrícula inválida.");
        return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (new Date(fecha) < hoy) {
        alert("La fecha debe ser actual o futura.");
        return;
    }

    const nuevaReserva = { nombre, matricula, actividad, fecha };

    // Agregar o actualizar reserva
    if (editIndex === null) {
        reservas.push(nuevaReserva);
    } else {
        reservas[editIndex] = nuevaReserva;
        editIndex = null;
    }

    form.reset();
    mostrarReservas();
});

// Mostrar reservas en tabla
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

// Cargar datos para editar
function editarReserva(index) {
    const r = reservas[index];
    document.getElementById("nombre").value = r.nombre;
    document.getElementById("matricula").value = r.matricula;
    document.getElementById("actividad").value = r.actividad;
    document.getElementById("fecha").value = r.fecha;
    editIndex = index;
}

// Eliminar reserva
function eliminarReserva(index) {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
        reservas.splice(index, 1);
        mostrarReservas();
    }
}
