let listaDocentes=[];

const cargarDocentes= async()=>{
   
  try{
      listaDocentes.length=0;
      const respuesta=await fetch('http://localhost:3000/profesores');

      if(!respuesta.ok){
         throw new Error('Error al cargar Docentes. Estado: ',respuesta.status);
      }
      const Docentes=await respuesta.json();
      listaDocentes.push(...Docentes);

  }catch(error){
      console.error("Error al cargar Docentes",error.message);
  }

  console.log(listaDocentes)
}

const cargarFormularioDocentes=()=>{
    const DocentesForm = document.getElementById('Docentes-form');
    DocentesForm.innerHTML = `
      <form>
      <h2>Crear Docentes</h2>
      <label for="nombreDocente">Nombre del Docente:</label>
      <input type="text" id="nombreDocente" placeholder="Ingrese el nombre del docente" required>
    
      <label for="apellidoDocente">Apellido del Docente:</label>
      <input type="text" id="apellidoDocente" placeholder="Ingrese el apellido del docente" required>
    
      <label for="tipodocumentodocnte">Tipo de Documento:</label>
      <select id="tipodocumentodocnte" required>
        ${cargartiposdocs()}
      </select>
    
      <label for="numdocumentodocnte">Número de documento:</label>
      <input type="number" id="numdocumentodocnte" placeholder="Ingrese el número de documento" required>
    
      <label for="DptoDocente">Departamentos:</label>
      <div class="search-container.dptodocnt">
        <input type="text" id="search-input-dptodocnt" placeholder="Buscar Departamentos...">
        <ul id="search-results-dptodocnt"></ul>
      </div>
    
      <a id="boton-crear-docente" href="#">Crear Docente</a>
    </form>
    
  `;
  document.getElementById("boton-crear-docente").addEventListener("click",crearDocente);


  buscadorDepartamentos('search-input-dptodocnt', 'search-results-dptodocnt');
}

const crearDocente= async ()=>{
  const nombreInput=document.getElementById('nombreDocente');
  const apellidoInput=document.getElementById('apellidoDocente');
  const tipodocInput=document.getElementById('tipodocumentodocnte');
  const nrodocInput=document.getElementById('numdocumentodocnte');
  const DptoInput=document.getElementById('search-input-dptodocnt');
  
  const nombre=nombreInput.value;
  const apellido=apellidoInput.value;
  const tipodocumento=tipodocInput.value;
  const numerodocumento=nrodocInput.value;
  const DptoIngresado=DptoInput.value;

  async function relacionarid(DptoIngresado) {
    const DptoSeleccionado = listaDepartamentos.find(departamento => departamento.nombre === DptoIngresado);

    if (DptoSeleccionado) {
        const DptoId = DptoSeleccionado.id;
        console.log('ID del programa seleccionado:', DptoId);
        return DptoId;
    } else {
        console.log('Programa no encontrado en el JSON de programas');
        return null;
    }
  }

  const DptoId = await relacionarid(DptoIngresado);
  const nuevoidDocnt = (listaDocentes.length + 1).toString();
  
  const nuevoDocente={
      id: nuevoidDocnt,
      tipo_documento: tipodocumento,
      numero_documento: numerodocumento,
      nombre: nombre,
      apellido: apellido,
      departamento_id: Number(DptoId)
  }

  await cargarDocentes();
  await guardarDocente(nuevoDocente);
  await limpiarFormularioDOCTS();

  alert("Docente Creado éxito!")
  return false, nuevoDocente;
}

const limpiarFormularioDOCTS = () => {
  const limpiarValorInput = id => document.getElementById(id).value = '';

  limpiarValorInput('nombreDocente');
  limpiarValorInput('apellidoDocente');
  limpiarValorInput('tipodocumentodocnte');
  limpiarValorInput('numdocumentodocnte');
  limpiarValorInput('search-input-dptodocnt');
};

const guardarDocente= async(nuevoDocente)=>{
  
  try{

      const respuesta=await fetch('http://localhost:3000/profesores',{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(nuevoDocente),
      });

      if(!respuesta.ok){
         throw new Error('Error al crear el Docente. Estado: ',respuesta.status);
      }
      
      const DocenteCreado=await respuesta.json();
      
      console.log('EstudianteCreado creado:', DocenteCreado);

  }catch(error){
      console.error("Error al cargar Docentes",error.message);
  }
  
}
  // LA FUNCION DE BUSQUEDA EN APARTADO DE GESTION ES MEJOR DEJARLA COMO ESTA
  
const mostrarListaDocts = async () => {
  await cargarDocentes()

  
  const busquedaDocentes = document.getElementById('lista-Docentes');  

  busquedaDocentes.innerHTML = `
    <div class="search-container.docnts">
    <h2>Listado de Docentes</h2>
      <input type="text" class="input-gestion" id="search-input-docnts" placeholder="Buscar Docentes...">
      <ul class="results-lists" id="search-results-docnts"></ul>
    </div>
  `;
  const searchInputDOCNTS = document.getElementById('search-input-docnts');
  const searchResultsDOCNTS = document.getElementById('search-results-docnts');

  function displayResultsDOCTS(results) {
    searchResultsDOCNTS.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Nombre: ${result.nombre}, Apellido: ${result.apellido}, Documento: ${result.numero_documento}, Dpto ID: ${result.departamento_id}`;
      searchResultsDOCNTS.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Docentes';
    searchResultsDOCNTS.appendChild(li);
    return;
  }
}

  searchInputDOCNTS.addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const filteredItems = listaDocentes.filter(docente => 
      docente.nombre.toLowerCase().includes(inputValue) || docente.numero_documento.toLowerCase().includes(inputValue)
    );

    displayResultsDOCTS(filteredItems);
  });

  displayResultsDOCTS(listaDocentes);
};