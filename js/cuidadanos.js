let listaCiudadanos = [];

const cargarCiudadanos = async () => {
    try {
        listaCiudadanos.length = 0;

        const respuesta = await fetch('http://localhost:3000/ciudadanos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar ciudadanos. Estado: ' + respuesta.status);
        }

        const ciudadanos = await respuesta.json();
        listaCiudadanos.push(...ciudadanos);

    } catch (error) {
        console.error('Error al cargar ciudadanos', error.message);
    }

    console.log('Lista de ciudadanos:', listaCiudadanos);
};

const cargarFormularioCiudadanos = () => {
    const ciudadanosForm = document.getElementById('Cuidadanos-form');
    ciudadanosForm.innerHTML = `
    <form onsubmit="crearCiudadano(event)">
      <h2>Crear Ciudadano</h2>
      <label for="nombreCiudadano">Nombre del Ciudadano:</label>
      <input type="text" id="nombreCiudadano" placeholder="Ingrese el nombre del ciudadano" required>

      <label for="direccionCiudadano">Dirección del Ciudadano:</label>
      <input type="text" id="direccionCiudadano" placeholder="Ingrese la dirección del ciudadano" required>

      <label for="celularCiudadano">Número de Celular:</label>
      <input type="text" id="celularCiudadano" placeholder="Ingrese el número de celular" required>

      <label for="codigoADNCiudadano">Código ADN:</label>
      <input type="text" id="codigoADNCiudadano" placeholder="Ingrese el código ADN" required>

      <button type="submit">Crear Ciudadano</button>
    </form>
  `;
};

const crearCiudadano = async (event) => {
    event.preventDefault();
    const nombreInput = document.getElementById('nombreCiudadano');
    const direccionInput = document.getElementById('direccionCiudadano');
    const celularInput = document.getElementById('celularCiudadano');
    const codigoADNInput = document.getElementById('codigoADNCiudadano');

    const nombre = nombreInput.value;
    const direccion = direccionInput.value;
    const celular = celularInput.value;
    const codigoADN = codigoADNInput.value;

    const codigoADNExistente = listaCiudadanos.some(ciudadano => ciudadano.codigo_adn === codigoADN);
    if (codigoADNExistente) {
        alert('Error: El código de ADN ya existe en el sistema. Debe ser único.');
        return;
    }

    const nuevoCiudadano = {
        nombre_completo: nombre,
        direccion: direccion,
        celular: celular,
        codigo_adn: codigoADN
    };

    await cargarCiudadanos();
    await guardarCiudadano(nuevoCiudadano);
    await limpiarFormularioCiudadanos();

    alert('Ciudadano creado con éxito!');
    console.log('Ciudadano Creado con éxito!');
    return nuevoCiudadano;
};

const limpiarFormularioCiudadanos = () => {
    const limpiarValorInput = (id) => document.getElementById(id).value = '';

    limpiarValorInput('nombreCiudadano');
    limpiarValorInput('direccionCiudadano');
    limpiarValorInput('celularCiudadano');
    limpiarValorInput('codigoADNCiudadano');
};

const guardarCiudadano = async (nuevoCiudadano) => {
    try {
        const respuesta = await fetch('http://localhost:3000/ciudadanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el Ciudadano. Estado: ' + respuesta.status);
        }

        const ciudadanoCreado = await respuesta.json();
        console.log('Ciudadano creado:', ciudadanoCreado);

    } catch (error) {
        console.error('Error al cargar Ciudadanos', error.message);
    }
};

const mostrarListaCiudadanos = async () => {
    await cargarCiudadanos();

    const busquedaCiudadanos = document.getElementById('lista-Cuidadanos');

    busquedaCiudadanos.innerHTML = `
    <div class="search-container.ciudadanos">
      <h2>Listado de Ciudadanos</h2>
      <input type="text" class="input-gestion" id="search-input-CIUD" placeholder="Buscar Ciudadanos...">
      <ul class="+results-lists" id="search-results-CIUD"></ul>
    </div>
  `;

    const searchInputCIUD = document.getElementById('search-input-CIUD');
    const searchResultsCIUD = document.getElementById('search-results-CIUD');

    function displayResultsCIUD(results) {
        searchResultsCIUD.innerHTML = '';

        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${result.nombre_completo}, Dirección: ${result.direccion}, Celular: ${result.celular}, Código ADN: ${result.codigo_adn}`;
            searchResultsCIUD.appendChild(li);
        });

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron Ciudadanos';
            searchResultsCIUD.appendChild(li);
            return;
        }
    }

    searchInputCIUD.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const filteredCiudadanos = listaCiudadanos.filter(ciudadano =>
            ciudadano.nombre_completo.toLowerCase().includes(inputValue)
        );

        displayResultsCIUD(filteredCiudadanos);
    });

    displayResultsCIUD(listaCiudadanos);
};

