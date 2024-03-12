document.addEventListener('DOMContentLoaded', async () => {
    await handleNavigation();
    //CREAR CUIDADANOS
    await mostrarListaCiudadanos();
    cargarFormularioCiudadanos();
    //VERIFICAR CUIDADANOS
    cargarFormularioADN();

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
        sectionToShow.style.display = 'block';
    }
}

const sectionMap = {
    'Inicio': 'Inicio',
    // QUIENES SOMOS
    'Quienes Somos': 'infoNosotros',
    'Nosotros': 'infoNosotros',
    'Mision': 'infoMision',
    'Vision': 'infoVision',
    // Cuidadano y Analisis 
    'Sistemas Cuidadanos': 'agregarADN',
    'Agregar ADN': 'agregarADN',
    'Verificar ADN': 'verificarADN',

};


function handleNavigation(linkText) {
    console.log('Hiciste clic en:', linkText);
    const sectionId = sectionMap[linkText] || 'Inicio';
    navigateToSection(sectionId);
}