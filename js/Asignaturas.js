let listaAsignaturas=[];
let listaCursos=[];

const cargarAsignaturas= async()=>{
   
  try{
      listaAsignaturas.length=0;
      const respuesta=await fetch('http://localhost:3000/asignaturas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Asignaturas. Estado: ',respuesta.status);
      }
      const Asignaturas=await respuesta.json();
      listaAsignaturas.push(...Asignaturas);

  }catch(error){
      console.error("Error al cargar Asignaturas",error.message);
  }

  console.log(listaAsignaturas)
}

const cargarCursos= async()=>{

    try{
        listaCursos.length=0;
        const respuesta=await fetch('http://localhost:3000/cursos');
  
        if(!respuesta.ok){
           throw new Error('Error al cargar Cursos. Estado: ',respuesta.status);
        }
        const Cursos=await respuesta.json();
        listaCursos.push(...Cursos);
  
    }catch(error){
        console.error("Error al cargar Cursos",error.message);
    }
  
    console.log(listaCursos)
}

const cargarFormularioAsignaturas= async()=>{
    await cargarCursos();
    const AsignaturasForm = document.getElementById('Asignaturas-form');
    AsignaturasForm.innerHTML = `
    <form>
      <h2>Gestion de Asignaturas</h2>

      <label for="CursoAsignatura">Seleccione el Curso:</label>
      <div class="search-container.cursoasign">     
        <input type="text" id="search-input-cursoasign" placeholder="Buscar Cursos...">
        <ul id="search-results-cursoasign"></ul>
      </div>

      <label for="codigoASIGN">Codigo de Asignatura:</label>
      <input type="text" id="codigoASIGN" required placeholder="Ingrese el código de asignatura...">

      <label for="cantcreditosasign">Ingrese cantidad de Créditos:</label>
      <input type="number" id="cantcreditosasign" required placeholder="Ingrese la cantidad de créditos...">

      <label for="DocenteAsign">Seleccione Al Docente Encargado:</label>
      <div class="search-container.DocenteAsign">
        <input type="text" id="search-input-DocenteAsign" placeholder="Buscar Docentes...">
        <ul id="search-results-DocenteAsign"></ul>
      </div>

      <label for="cuposAsign">Max de Cupos Disponibles:</label>
      <input type="number" id="cuposAsign" required placeholder="Ingrese el número máximo de cupos...">

      <label for="ProgramaAsign">Seleccione un Programa:</label>
      <div class="search-container.ProgramaAsign">
        <input type="text" id="search-input-ProgramaAsign" placeholder="Buscar Programas...">
        <ul id="search-results-ProgramaAsign"></ul>
      </div>

            <label for="HorarioAsign">Seleccione un Horario:</label>
            <div id="horarioscont">
            <label for="dia-1">Día:</label>
            <select id="HorarioDia" required>
              ${tiposDeDias()}
            </select>
            <label for="hora-1">Horario:</label>
            <select id="HorarioHoras" required>
              ${tiposDeHorarios()}
            </select>
            <label for="salon-1">Salón:</label>
            <select id="HorarioSalon" required>
              ${tiposDeSalones()}
          </select>
        </div>
            <button type="submit">Crear Asignatura</button>
      </form>
  `;
  
  buscadorDocentes('search-input-DocenteAsign', 'search-results-DocenteAsign')
  buscadorCursos('search-input-cursoasign', 'search-results-cursoasign')
  buscadorProgramas('search-input-ProgramaAsign', 'search-results-ProgramaAsign')
}

const crearAsignatura = async (event) => {
  event.preventDefault();
  await cargarAsignaturas();
  const cursoInput = document.getElementById('search-input-cursoasign');
  const codigoInput = document.getElementById('codigoASIGN');
  const creditosInput = document.getElementById('cantcreditosasign');
  const DocenteInput = document.getElementById('search-input-DocenteAsign');
  const cuposInput = document.getElementById('cuposAsign');
  const ProgramaAInput = document.getElementById('search-input-ProgramaAsign');
  const DiaInput = document.getElementById('HorarioDia');
  const HoraInput = document.getElementById('HorarioHoras');
  const SalonInput = document.getElementById('HorarioSalon');
  const PeriodoInput = document.getElementById('PeriodoAsigna');

  const periodoAs = PeriodoInput.value;
  const cursoAs = cursoInput.value;
  const codigoAs = codigoInput.value;
  const creditosAs = creditosInput.value;
  const DocenteAs = DocenteInput.value;
  const cuposAs = cuposInput.value;
  const programaAs = ProgramaAInput.value;
  const Dia = DiaInput.value;
  const Hora = HoraInput.value;
  const Salon = SalonInput.value;

  const Horarios = {dia: Dia, horario: Hora, salon_id: Salon}
 
  const horarioOcupado = listaAsignaturas.some(asignatura => {
    return asignatura.horario_clases.some(horario => {
      return horario.dia === Dia && horario.horario === Hora && horario.salon_id === Salon;
    });
  });
  
  if (horarioOcupado) {
    alert('El horario seleccionado ya está ocupado. Por favor elija otro.');
    return null;
  }

  const getId = (entity, list) => {
    const result = list.find(element => entity === element.nombre);
    return result ? result.id : "Id no encontrada o la lista no existe";
  }

  const nuevaAsignatura = {
    id: Number(listaAsignaturas.length + 1),
    curso_id: Number(getId(cursoAs, listaCursos)),
    periodo: periodoAs,
    codigo: codigoAs,
    creditos: creditosAs,
    profesor_id: Number(getId(DocenteAs, listaDocentes)),
    cupos_disponibles: cuposAs,
    programa_id: Number(getId(programaAs, listaProgramas)),
    horario_clases: [Horarios],
  };

  await guardarAsignatura(nuevaAsignatura);
  await cargarCursos();

  alert('Asignatura creada con éxito!');

  return nuevaAsignatura;
}

const guardarAsignatura = async (nuevaAsignatura) => {
  try {

    const respuesta = await fetch('http://localhost:3000/asignaturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaAsignatura),
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la Asignatura. Estado: ', respuesta.status);
    }

    const AsignaturaCreada = await respuesta.json();

    console.log('Asignatura creada:', AsignaturaCreada);

  } catch (error) {
    console.error("Error al cargar Asignaturas", error.message);
  }
}

const mostrarListaAsignaturas = async () => {
  await cargarAsignaturas()

  
  const busquedaAsignaturas = document.getElementById('listado-Asignaturas');  

  busquedaAsignaturas.innerHTML = `
    <div class="search-container.Asignaturas">
    <h2>Listado de Asignaturas</h2>
      <input type="text" class="input-gestion" id="search-input-Asignaturas" placeholder="Buscar Asignaturas...">
      <ul class="results-lists" id="search-results-Asignaturas"></ul>
    </div>
    `;

  const searchInputAsignaturas = document.getElementById('search-input-Asignaturas');
  const searchResultsAsignaturas = document.getElementById('search-results-Asignaturas');

  function displayResultsAsignaturas(results) {
    searchResultsAsignaturas.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Periodo: ${result.periodo}, Codigo: ${result.codigo}, Horario: ${result.horario_clases[0].dia}, ${result.horario_clases[0].horario}, Creditos: ${result.creditos}, Docente ID: ${result.profesor_id}, Programa ID: ${result.programa_id}, Cupos: ${result.cupos_disponibles}`;
      searchResultsAsignaturas.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Asignaturas';
    searchResultsAsignaturas.appendChild(li);
    return;
  }
}

searchInputAsignaturas.addEventListener('input', function() {
  const inputValue = this.value;
  const filteredItems = listaAsignaturas.filter(asignatura => 
    asignatura.codigo.includes(inputValue)
  );

  displayResultsAsignaturas(filteredItems);
});


  displayResultsAsignaturas(listaAsignaturas);
};

