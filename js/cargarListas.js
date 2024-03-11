let listaProgramas=[];
let listaPeriodos=[];
let listaTarifas=[];
let listaDepartamentos=[];
let listaSalones=[];

const cargarProgramas= async()=>{
   
  try{
      listaProgramas.length=0;
      const respuesta=await fetch('http://localhost:3000/programas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Programas. Estado: ',respuesta.status);
      }
      const Programas=await respuesta.json();
      listaProgramas.push(...Programas);

  }catch(error){
      console.error("Error al cargar Programas",error.message);
  }
}

const cargarPeriodos= async()=>{
  try{
    listaPeriodos.length=0;
      const respuesta=await fetch('http://localhost:3000/periodos');

      if(!respuesta.ok){
         throw new Error('Error al cargar Periodos. Estado: ',respuesta.status);
      }
      const Periodos=await respuesta.json();
      listaPeriodos.push(...Periodos);

  }catch(error){
      console.error("Error al cargar Periodos",error.message);
  }
}

const cargarTarifas= async()=>{
  try{
    listaTarifas.length=0;
      const respuesta=await fetch('http://localhost:3000/tarifas');

      if(!respuesta.ok){
         throw new Error('Error al cargar Tarifas. Estado: ',respuesta.status);
      }
      const Tarifas=await respuesta.json();
      listaTarifas.push(...Tarifas);

  }catch(error){
      console.error("Error al cargar Tarifas",error.message);
  }
  console.log(listaTarifas)
}

const cargarDepartamentos= async()=>{
  try{
    listaDepartamentos.length=0;
      const respuesta=await fetch('http://localhost:3000/departamentos');

      if(!respuesta.ok){
         throw new Error('Error al cargar Departamentos. Estado: ',respuesta.status);
      }
      const Departamentos=await respuesta.json();
      listaDepartamentos.push(...Departamentos);

  }catch(error){
      console.error("Error al cargar Departamentos",error.message);
  }
}

const cargarSalones= async()=>{
  try{
    listaSalones.length=0;
      const respuesta=await fetch('http://localhost:3000/salones');

      if(!respuesta.ok){
         throw new Error('Error al cargar Salones. Estado: ',respuesta.status);
      }
      const Salones=await respuesta.json();
      listaSalones.push(...Salones);

  }catch(error){
      console.error("Error al cargar Salones",error.message);
  }
}


const cargarListasExistentes = async () => {
  await mostrarListaProg();
  await mostrarListaPeriod();
  await mostrarListaTarifas();
  await mostrarListaDepts();
  await mostrarListaSalones();
};

//PROGRAMAS

const mostrarListaProg = async () => {
  await cargarProgramas();

  const ListadoProgramas = document.getElementById('listado-Programas');  

  ListadoProgramas.innerHTML = `
    <div class="search-container.prog">
      <input type="text" id="search-input-prog" placeholder="Buscar Programas...">
      <ul id="search-results-prog"></ul>
    </div>
  `;

  const searchInputProg = document.getElementById('search-input-prog');
  const searchResultsProg = document.getElementById('search-results-prog');

  function displayResults(results) {
    searchResultsProg.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Nombre: ${result.nombre}, Nivel: ${result.nivel}`;
      searchResultsProg.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron programas';
    searchResultsProg.appendChild(li);
    return;
  }
}

  searchInputProg.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaProgramas.filter(programa => 
      programa.nombre.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaProgramas);
}

//PERIODOS

const mostrarListaPeriod = async () => {
  await cargarPeriodos();

  const ListadoPeriodos = document.getElementById('listado-Periodos');  

  ListadoPeriodos.innerHTML = `
    <div class="search-container.period">
      <input type="text" id="search-input-period" placeholder="Buscar Periodos...">
      <ul id="search-results-period"></ul>
    </div>
  `;

  const searchInputPeriod = document.getElementById('search-input-period');
  const searchResultsPeriod = document.getElementById('search-results-period');

  function displayResults(results) {
    searchResultsPeriod.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Codigo: ${result.codigo}, Año: ${result.ano}, Semestre: ${result.semestre}`;
      searchResultsPeriod.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron periodos';
    searchResultsPeriod.appendChild(li);
    return;
  }
}

  searchInputPeriod.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaPeriodos.filter(periodos => 
      periodos.codigo.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaPeriodos);
}

//TARIFAS

const mostrarListaTarifas = async () => {
  await cargarTarifas();

  const listadoTarifas = document.getElementById('listado-Tarifas');  

  listadoTarifas.innerHTML = `
    <div class="search-container.tarifas">
      <input type="text" id="search-input-tarifas" placeholder="Buscar Periodos...">
      <ul id="search-results-tarifas"></ul>
    </div>
  `;

  const searchInputTarifas = document.getElementById('search-input-tarifas');
  const searchResultsTarifas = document.getElementById('search-results-tarifas');

  function displayResults(results) {
    searchResultsTarifas.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Costo Credito: ${result.costo_credito}, Programa ID: ${result.programa_id}, Periodo ID: ${result.periodo_id}`;
      searchResultsTarifas.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Tarifas';
    searchResultsTarifas.appendChild(li);
    return;
  }
}

  searchInputTarifas.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaTarifas.filter(tarifas => 
      tarifas.programa_id.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaTarifas);
}

//DEPARTAMENTOS

const mostrarListaDepts = async () => {
  await cargarDepartamentos();

  const listadoDepartamentos = document.getElementById('listado-Departamentos');  

  listadoDepartamentos.innerHTML = `
    <div class="search-container.depts">
      <input type="text" id="search-input-Dept" placeholder="Buscar Departamentos...">
      <ul id="search-results-Dept"></ul>
    </div>
  `;

  const searchInputDept = document.getElementById('search-input-Dept');
  const searchResultsDept = document.getElementById('search-results-Dept');

  function displayResults(results) {
    searchResultsDept.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Nombre: ${result.nombre}`;
      searchResultsDept.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Departamentos';
    searchResultsDept.appendChild(li);
    return;
  }
}

    searchInputDept.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaDepartamentos.filter(departamentos => 
      departamentos.nombre.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaDepartamentos);
}

//SALONES

const mostrarListaSalones = async () => {
  await cargarSalones();

  const listadoSalones = document.getElementById('listado-Salones');  

  listadoSalones.innerHTML = `
    <div class="search-container.salones">
      <input type="text" id="search-input-salones" placeholder="Buscar Salones...">
      <ul id="search-results-salones"></ul>
    </div>
  `;

  const searchInputSalones = document.getElementById('search-input-salones');
  const searchResultsSalones = document.getElementById('search-results-salones');

  function displayResults(results) {
    searchResultsSalones.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Num Ident: ${result.numero_identificacion}, Capacidad: ${result.capacidad_alumnos} , Edificio: ${result.edificio}`;
      searchResultsSalones.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Salones';
    searchResultsSalones.appendChild(li);
    return;
  }
}

    searchInputSalones.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaSalones.filter(salones => 
      salones.numero_identificacion.toLowerCase().includes(inputValue)
    );

    displayResults(filteredItems);
  });

  displayResults(listaSalones);
}
