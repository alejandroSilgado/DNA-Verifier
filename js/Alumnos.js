let listaEstudiantes=[];

const cargarEstudiantes= async()=>{
   
  try{
      listaEstudiantes.length=0;
      const respuesta=await fetch('http://localhost:3000/alumnos');

      if(!respuesta.ok){
         throw new Error('Error al cargar Estudiantes. Estado: ',respuesta.status);
      }
      const Estudiantes=await respuesta.json();
      listaEstudiantes.push(...Estudiantes);

  }catch(error){
      console.error("Error al cargar Estudiantes",error.message);
  }

  console.log(listaEstudiantes)
}


const cargarFormularioEstudiantes=()=>{
    const EstudiantesForm = document.getElementById('Estudiantes-form');
    EstudiantesForm.innerHTML = `
      <form>
          <label for="nombreEstudiante">Nombre del Estudiante:</label>
          <input type="text" id="nombreEstudiante" required>
          <label for="apellidoEstudiante">Apellido del Estudiante:</label>
          <input type="text" id="apellidoEstudiante" required>
          <label for="sexoest">Sexo:</label>
            <select id="sexoest" required>
                ${cargarsexos()}
            </select> 
          <label for="nacimientoest">Fecha de Nacimiento:</label>
          <input type="text" id="nacimientoest" required>
          <label for="search-input-docs">Tipo de Documento:</label>
            <select id="tipodocumentoest" required>
                ${cargartiposdocs()}
            </select> 
          <label for="numdocumentoest">Numero de documento:</label>
          <input type="number" id="numdocumentoest" required> 
          <label for="ciudadestudiante">Ciudad de Residencia</label>
          <input type="text" id="ciudadestudiante" required>
          <label for="direccionest">Direccion:</label>
          <input type="text" id="direccionest" required>
          <label for="telefonoest">Telefono:</label>
          <input type="number" id="telefonoest" required>
          <label for="programaest">Programa:</label>
          <div class="search-container.prog">
            <input type="text" id="search-input-docs" placeholder="Buscar Programas...">
            <ul id="search-results-docs"></ul>
          </div>
          <button type="button" onclick="crearEstudiante()">Crear Estudiante</button>
          <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar clientes -->
      </form>
  `;

  const searchInputdocs = document.getElementById('search-input-docs');
  const searchResultsdocs = document.getElementById('search-results-docs');
  
  function displayResultsDOCS(results) {
    searchResultsdocs.innerHTML = '';
  
    if (results.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No se encontraron programas';
      searchResultsdocs.appendChild(li);
      return;
    }
  
    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = result.nombre;
      li.addEventListener('click', function() {
        searchInputdocs.value = result.nombre;
        searchResultsdocs.innerHTML = '';
      });
      searchResultsdocs.appendChild(li);
    });
  }
  
  searchInputdocs.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();
      const filteredPrograms = listaProgramas.filter(programa => programa.nombre.toLowerCase().includes(inputValue));
      displayResultsDOCS(filteredPrograms);
  });
}

const crearEstudiante= async ()=>{
  const nombreInput=document.getElementById('nombreEstudiante');
  const apellidoInput=document.getElementById('apellidoEstudiante');
  const sexoInput=document.getElementById('sexoest');
  const nacimientoInput=document.getElementById('nacimientoest');
  const tipodocInput=document.getElementById('tipodocumentoest');
  const nrodocInput=document.getElementById('numdocumentoest');
  const ciudadInput=document.getElementById('ciudadestudiante');
  const direccionInput=document.getElementById('direccionest');
  const telefonoInput=document.getElementById('telefonoest');
  const programaInput=document.getElementById('search-input-docs');
  
  const nombre=nombreInput.value;
  const apellido=apellidoInput.value;
  const sexo=sexoInput.value;
  const fechanacimiento=nacimientoInput.value;
  const tipodocumento=tipodocInput.value;
  const numerodocumento=nrodocInput.value;
  const ciudad=ciudadInput.value;
  const direccion=direccionInput.value;
  const telefono=telefonoInput.value;
  const programaIngresado=programaInput.value;

  async function relacionarid(programaIngresado) {
    const programaSeleccionado = listaProgramas.find(programa => programa.nombre === programaIngresado);

    if (programaSeleccionado) {
        const programaId = programaSeleccionado.id;
        console.log('ID del programa seleccionado:', programaId);
        return programaId;
    } else {
        console.log('Programa no encontrado en el JSON de programas');
        return null;
    }
}

 const programaId = await relacionarid(programaIngresado);
 const nuevoidest = (listaEstudiantes.length + 1).toString();
  
  const nuevoEstudiante={
      id: nuevoidest,
      nombre: nombre,
      apellido: apellido,
      tipo_documento: tipodocumento,
      numero_documento: numerodocumento,
      ciudad_residencia: ciudad,
      direccion: direccion,
      telefono: telefono,
      fecha_nacimiento: fechanacimiento,
      sexo: sexo,
      programa_id: programaId
  }

  await cargarEstudiantes();
  await guardarEstudiante(nuevoEstudiante);
  await limpiarformulario();

  alert('Estudiante creado con éxito!');
  console.log("Estudiante Creado éxito!")
  return nuevoEstudiante;
}

const limpiarFormulario = () => {
  const limpiarValorInput = id => document.getElementById(id).value = '';

  limpiarValorInput('nombreEstudiante');
  limpiarValorInput('apellidoEstudiante');
  limpiarValorInput('sexoest');
  limpiarValorInput('nacimientoest');
  limpiarValorInput('tipodocumentoest');
  limpiarValorInput('numdocumentoest');
  limpiarValorInput('ciudadestudiante');
  limpiarValorInput('direccionest');
  limpiarValorInput('telefonoest');
  limpiarValorInput('programaest');
};

const guardarEstudiante= async(nuevoEstudiante)=>{
  try{

      const respuesta=await fetch('http://localhost:3000/alumnos',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(nuevoEstudiante),
      });

      if(!respuesta.ok){
         throw new Error('Error al crear el Estudiante. Estado: ',respuesta.status);
      }
      const EstudianteCreado=await respuesta.json();
      
      console.log('EstudianteCreado creado:', EstudianteCreado);

  }catch(error){
      console.error("Error al cargar Estudiantes",error.message);
  }
}

const mostrarListaEst = async () => {
  await cargarEstudiantes();

  const busquedaEstudiantes = document.getElementById('busqueda-Estudiantes');  

  busquedaEstudiantes.innerHTML = `
    <div class="search-container.est">
      <input type="text" id="search-input" placeholder="Buscar Estudiantes...">
      <ul id="search-results"></ul>
    </div>
  `;

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  function displayResults(results) {
    searchResults.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Nombre: ${result.nombre}, Apellido: ${result.apellido}, Documento: ${result.numero_documento}, Programa ID: ${result.programa_id}`;
      searchResults.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Estudiantes';
    searchResults.appendChild(li);
    return;
  }
}

  searchInput.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaEstudiantes.filter(estudiante => 
      estudiante.numero_documento.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaEstudiantes);
};





