// Función para agregar un ingreso
function agregarIngreso() {
    const origen = document.getElementById('origen').value;
    const monto = parseFloat(document.getElementById('monto-ingreso').value);
    const fecha = document.getElementById('fecha-ingreso').value;

    if (origen && !isNaN(monto) && fecha) {
        const li = document.createElement('li');
        li.textContent = `${fecha} - ${origen}: S/ ${monto.toFixed(2)}`;
        document.getElementById('lista-ingresos').appendChild(li);
        document.getElementById('origen').value = '';
        document.getElementById('monto-ingreso').value = '';
        document.getElementById('fecha-ingreso').value = '';
        actualizarTotales();
        guardarDatos();
    } else {
        alert("Por favor, completa todos los campos del ingreso.");
    }
}

// Función para agregar un gasto
function agregarGasto() {
    const descripcion = document.getElementById('descripcion').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const categoria = document.getElementById('categoria').value;
    const responsable = document.getElementById('responsable').value;
    const fecha = document.getElementById('fecha-gasto').value;

    if (descripcion && !isNaN(monto) && categoria && responsable && fecha) {
        const li = document.createElement('li');
        li.textContent = `${fecha} - ${descripcion} (${categoria}) por ${responsable}: S/ ${monto.toFixed(2)}`;
        document.getElementById('lista-gastos').appendChild(li);
        document.getElementById('descripcion').value = '';
        document.getElementById('monto').value = '';
        document.getElementById('categoria').value = 'Papelería';
        document.getElementById('responsable').value = '';
        document.getElementById('fecha-gasto').value = '';
        actualizarTotales();
        guardarDatos();
    } else {
        alert("Por favor, completa todos los campos del gasto.");
    }
}

// Actualiza totales
function actualizarTotales() {
    let totalIngresos = 0;
    document.querySelectorAll('#lista-ingresos li').forEach(li => {
        const monto = parseFloat(li.textContent.split('S/ ')[1]);
        if (!isNaN(monto)) totalIngresos += monto;
    });

    let totalGastos = 0;
    document.querySelectorAll('#lista-gastos li').forEach(li => {
        const monto = parseFloat(li.textContent.split('S/ ')[1]);
        if (!isNaN(monto)) totalGastos += monto;
    });

    const saldo = totalIngresos - totalGastos;

    document.getElementById('total-ingresos').textContent = totalIngresos.toFixed(2);
    document.getElementById('total-gastos').textContent = totalGastos.toFixed(2);
    document.getElementById('saldo').textContent = saldo.toFixed(2);
}

// Descargar datos en Excel
function descargarExcel() {
    const wb = XLSX.utils.book_new();

    const ingresos = Array.from(document.querySelectorAll('#lista-ingresos li')).map(li => [li.textContent]);
    const gastos = Array.from(document.querySelectorAll('#lista-gastos li')).map(li => [li.textContent]);

    const wsIngresos = XLSX.utils.aoa_to_sheet([["Ingresos"]].concat(ingresos));
    const wsGastos = XLSX.utils.aoa_to_sheet([["Gastos"]].concat(gastos));

    XLSX.utils.book_append_sheet(wb, wsIngresos, "Ingresos");
    XLSX.utils.book_append_sheet(wb, wsGastos, "Gastos");

    XLSX.writeFile(wb, "reporte_caja_chica.xlsx");
}

// Guardar datos en localStorage
function guardarDatos() {
    const ingresos = Array.from(document.querySelectorAll('#lista-ingresos li')).map(li => li.textContent);
    const gastos = Array.from(document.querySelectorAll('#lista-gastos li')).map(li => li.textContent);
    localStorage.setItem('datosCaja', JSON.stringify({ ingresos, gastos }));
}

// Cargar datos desde localStorage
function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem('datosCaja'));
    if (datos) {
        datos.ingresos.forEach(texto => {
            const li = document.createElement('li');
            li.textContent = texto;
            document.getElementById('lista-ingresos').appendChild(li);
        });
        datos.gastos.forEach(texto => {
            const li = document.createElement('li');
            li.textContent = texto;
            document.getElementById('lista-gastos').appendChild(li);
        });
        actualizarTotales();
    }
}

// Mostrar usuario logueado
function mostrarNombreUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.nombre) {
        const bienvenida = document.getElementById('bienvenida-usuario');
        if (bienvenida) {
            bienvenida.textContent = `Bienvenido, ${usuario.nombre}`;
        }
    }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    mostrarNombreUsuario();
});