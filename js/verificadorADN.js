const formularioVerificacionADN = document.querySelector("#verificacion-form");

const cargarFormularioADN = () => {
    formularioVerificacionADN.innerHTML = `
        <label for="codigoADNUsuario">Ingrese el código de ADN:</label>
        <input type="text" id="codigoADNUsuario" required>
        <button onclick="verificarADN()">Verificar ADN</button>
        <div id="similitud-ADN"></div>
    `;
};

const verificarADN = () => {
    const codigoADNUsuario = document.getElementById('codigoADNUsuario').value;

    if (!codigoADNUsuario) {
        alert('Por favor, ingrese un código de ADN para verificar.');
        return;
    }

    const divSimilitudADN = document.getElementById('similitud-ADN');
    divSimilitudADN.innerHTML = '<p>Realizando verificación...</p>';

    function calcularSimilitud(codigo1, codigo2) {
        const longitud = codigo1.length;
        let coincidencias = 0;

        for (let i = 0; i < longitud; i++) {
            if (codigo1.charAt(i) === codigo2.charAt(i)) {
                coincidencias++;
            }
        }

        return (coincidencias / longitud) * 100;
    }

    function obtenerCiudadanosSimilares(codigo) {
        return listaCiudadanos
            .map((ciudadano) => ({
                nombre: ciudadano.nombre_completo,
                similitud: calcularSimilitud(codigo, ciudadano.codigo_adn),
            }))
            .sort((a, b) => b.similitud - a.similitud)
            .slice(0, 5);
    }

    const ciudadanosSimilares = obtenerCiudadanosSimilares(codigoADNUsuario);

    divSimilitudADN.innerHTML = '<h2>Resultados de Verificación</h2>';
    ciudadanosSimilares.forEach((ciudadano, index) => {
        const porcentaje = ciudadano.similitud.toFixed(2);
        divSimilitudADN.innerHTML += `<p>${index + 1}. Nombre: ${ciudadano.nombre}, Porcentaje de Similitud: ${porcentaje}%</p>`;
    });
};

