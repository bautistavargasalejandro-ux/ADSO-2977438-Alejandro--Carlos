// ===== Configuración: true = abrir en nueva pestaña; false = en la misma página
const OPEN_IN_NEW_TAB = true;

// Referencia al contenedor
const main = document.getElementById('content');

// Lee ?section=... de la URL
function getSectionFromURL() {
  const params = new URLSearchParams(location.search);
  return params.get('section'); // ingreso | pacientes | citas | reportes
}

// Snippet de enlace para volver a la página principal
function backLinkHTML() {
  return `
    <p class="back-wrap">
      <a class="back-link" href="index.html">← Volver al menú</a>
    </p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Botones del menú en index
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (OPEN_IN_NEW_TAB) {
        window.open(`index.html?section=${encodeURIComponent(section)}`, '_blank');
      } else {
        mostrarSeccion(section);
      }
    });
  });

  // Render directo si llegamos con ?section=...
  const initial = getSectionFromURL();
  if (initial) mostrarSeccion(initial);
});

// Render de secciones
function mostrarSeccion(seccion) {
  if (!main) return;

  const titles = {
    ingreso: 'Ingreso',
    pacientes: 'Registro de Pacientes',
    citas: 'Gestión de Citas',
    reportes: 'Generación de Reportes'
  };
  if (titles[seccion]) document.title = `${titles[seccion]} — Hospital San Andrés`;

  let html = '';
  switch (seccion) {
    case 'ingreso':
      html = `
        <h3>Ingreso</h3>
        <form id="formIngreso" autocomplete="on" novalidate>
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" required>

          <label for="password">Contraseña</label>
          <input type="password" id="password" name="password" required>

          <button type="submit">Ingresar</button>
        </form>
        ${backLinkHTML()}
      `;
      break;

    case 'pacientes':
      html = `
        <h3>Registro de Pacientes</h3>
        <form id="formPacientes" autocomplete="on" novalidate>
          <label for="nombrePaciente">Nombre</label>
          <input type="text" id="nombrePaciente" name="nombre" required>

          <label for="documentoPaciente">Documento de Identidad</label>
          <input type="text" id="documentoPaciente" name="documento" required>

          <label for="telefonoPaciente">Teléfono</label>
          <input type="tel" id="telefonoPaciente" name="telefono" required>

          <label for="fechaNacimientoPaciente">Fecha de nacimiento</label>
          <input type="date" id="fechaNacimientoPaciente" name="fechaNacimiento" required>

          <label for="correoPaciente">Correo electrónico</label>
          <input type="email" id="correoPaciente" name="correo" required>

          <button type="submit">Guardar Paciente</button>
        </form>
        ${backLinkHTML()}
      `;
      break;

    case 'citas':
      html = `
        <h3>Gestión de Citas</h3>
        <form id="formCitas" autocomplete="on" novalidate>
          <label for="nombreCita">Nombre del paciente</label>
          <input type="text" id="nombreCita" name="nombreCita" required>

          <label for="fechaCita">Fecha de la cita</label>
          <input type="date" id="fechaCita" name="fechaCita" required>

          <label for="horaCita">Hora</label>
          <input type="time" id="horaCita" name="horaCita" required>

          <button type="submit">Generar Cita</button>
        </form>
        ${backLinkHTML()}
      `;
      break;

    case 'reportes':
      html = `
        <h3>Generación de Reportes</h3>
        <form id="formReportes" autocomplete="on" novalidate>
          <label for="tipoReporte">Tipo de Reporte</label>
          <select id="tipoReporte" name="tipoReporte" required>
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="examenes">Exámenes de laboratorio</option>
            <option value="citas">Citas agendadas</option>
            <option value="ingresos">Ingresos hospitalarios</option>
          </select>

          <label for="fechaInicio">Fecha inicio</label>
          <input type="date" id="fechaInicio" name="fechaInicio" required>

          <label for="fechaFin">Fecha fin</label>
          <input type="date" id="fechaFin" name="fechaFin" required>

          <button type="submit">Generar Reporte</button>
        </form>
        ${backLinkHTML()}
      `;
      break;

    default:
      html = `
        <h3>Bienvenida/o</h3>
        <p>Selecciona una opción del menú para comenzar.</p>
      `;
  }

  main.innerHTML = html;
  attachHandlers(seccion);
}

// Handlers de formularios (demo)
function attachHandlers(seccion) {
  if (seccion === 'ingreso') {
    const form = document.getElementById('formIngreso');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Ingreso OK');
    });
  }

  if (seccion === 'pacientes') {
    const form = document.getElementById('formPacientes');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Paciente guardado');
      e.target.reset();
    });
  }

  if (seccion === 'citas') {
    const form = document.getElementById('formCitas');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cita generada');
      e.target.reset();
    });
  }

  if (seccion === 'reportes') {
    const form = document.getElementById('formReportes');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const ini = form.fechaInicio.value, fin = form.fechaFin.value;
      if (ini && fin && ini > fin) return alert('La fecha inicio no puede ser mayor a la fecha fin');
      alert('Generando reporte…');
    });
  }
}
