document.addEventListener('DOMContentLoaded', async () => {
    await handleNavigation();
    await cargarListasExistentes();
    cargarFormularioEstudiantes();
    await mostrarListaAsignaturas();
    cargarFormularioAsignaturas()



    const links = document.querySelectorAll('.navigation a');
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            handleNavigation(link.textContent);
        });
    });
});

// Navegacion

const navigateToSection = (sectionId) => {
    const divs = document.querySelectorAll('main > section');
    
    divs.forEach(div => {
        if (div.id !== sectionId) {
            div.style.display = 'none';
        }
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'flex';
    }
}

const sectionMap = {
    'Inicio': 'Inicio',
    // Informes
    'Informes': 'inforMatriculas',
    'Inf. Matriculas': 'inforMatriculas',
    'Inf. Asignaturas': 'inforAsignatura',
    'Generar Horarios': 'Horarios',
    // Datos Existentes
    'Datos Existentes': 'Programas',
    'Programas': 'Programas',
    'Periodos': 'Periodos',
    'Tarifas': 'Tarifas',
    'Departamentos': 'Departamentos',
    'Salones': 'Salones',
    // Gestion
    'Gestion': 'Estudiantes',
    'Estudiantes': 'Estudiantes',
    'Docentes': 'Docentes',
    'Asignaturas': 'Asignaturas',
    // Matriculas
    'Matriculas' : 'Nueva-Matricula',
    'Nueva Matricula': 'Nueva-Matricula',
    'Lista de Matriculas': 'Lista-Matriculas'
};


function handleNavigation(linkText) {
    console.log('Hiciste clic en:', linkText);
    const sectionId = sectionMap[linkText] || 'Inicio';
    navigateToSection(sectionId);
}