function buscadorProgramas(searchInput, searchResults) {
    const searchInputPROG = document.getElementById(searchInput);
    const searchResultsPROG = document.getElementById(searchResults);

    function displayResultsDOCS(results) {
        searchResultsPROG.innerHTML = '';

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron programas';
            searchResultsPROG.appendChild(li);
            return;
        }

        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.nombre;
            li.addEventListener('click', function () {
                searchInputPROG.value = result.nombre;
                searchResultsPROG.innerHTML = '';
            });
            searchResultsPROG.appendChild(li);
        });
    }

    searchInputPROG.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const filteredPrograms = listaProgramas.filter(programa => programa.nombre.toLowerCase().includes(inputValue));
        displayResultsDOCS(filteredPrograms);
    });
}

function buscadorDepartamentos(searchInput1, searchResults1){
    const searchInputdpto = document.getElementById(searchInput1);
    const searchResultsdpto = document.getElementById(searchResults1);
    
    function displayResultsDPTOS(results) {
      searchResultsdpto.innerHTML = '';
    
      if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron departamentos';
        searchResultsdpto.appendChild(li);
        return;
      }
    
      results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result.nombre;
        li.addEventListener('click', function() {
          searchInputdpto.value = result.nombre;
          searchResultsdpto.innerHTML = '';
        });
        searchResultsdpto.appendChild(li);
      });
    }
    
    searchInputdpto.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        const filteredDptms = listaDepartamentos.filter(departamento => departamento.nombre.toLowerCase().includes(inputValue));
        displayResultsDPTOS(filteredDptms);
    });

  }
  
  function buscadorCursos(searchInput2, searchResults2){
      const searchInputCursos = document.getElementById(searchInput2);
      const searchResultsCursos = document.getElementById(searchResults2);
  
      function displayResultsDOCS(results) {
          searchResultsCursos.innerHTML = '';
  
          if (results.length === 0) {
              const li = document.createElement('li');
              li.textContent = 'No se encontraron programas';
              searchResultsCursos.appendChild(li);
              return;
          }
  
          results.forEach(result => {
              const li = document.createElement('li');
              li.textContent = result.nombre;
              li.addEventListener('click', function () {
                searchInputCursos.value = result.nombre;
                  searchResultsCursos.innerHTML = '';
              });
              searchResultsCursos.appendChild(li);
          });
      }
  
      searchInputCursos.addEventListener('input', function () {
          const inputValue = this.value.toLowerCase();
          const filteredCurses = listaCursos.filter(curso => curso.nombre.toLowerCase().includes(inputValue));
          displayResultsDOCS(filteredCurses);
      });
  }

  function buscadorDocentes(searchInput3, searchResults3) {
    const searchInputDOCNT = document.getElementById(searchInput3);
    const searchResultsDOCNT = document.getElementById(searchResults3);

    function displayResultsDOCS(results) {
      searchResultsDOCNT.innerHTML = '';

      if (results.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No se encontraron docentes';
          searchResultsDOCNT.appendChild(li);
          return;
      }

      results.forEach(result => {
          const li = document.createElement('li');
          li.textContent = `${result.nombre} ${result.apellido}`;
          li.addEventListener('click', function () {
              searchInputDOCNT.value = `${result.nombre}`;
              searchResultsDOCNT.innerHTML = '';
          });
          searchResultsDOCNT.appendChild(li);
      });
  }

    searchInputDOCNT.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const filteredDcnts = listaDocentes.filter(docente => docente.nombre.toLowerCase().includes(inputValue));
        displayResultsDOCS(filteredDcnts);
    });
}

