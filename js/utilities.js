let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navigation');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

const tiposdedocumento = ["Cedula de Ciudadania", "Cedula de Extrangeria", "Tarjeta de Identidad"]
const cargartiposdocs = () => {
    let options = ''
    for (let i = 0; i < tiposdedocumento.length; i++) {
        options += `<option value="${tiposdedocumento[i]}">${tiposdedocumento[i]}</option>`
    }
    return options
}

const sexos = ["Masculino", "Femenino", "Otro"]
const cargarsexos = () => {
    let options = ''
    for (let i = 0; i < sexos.length; i++) {
        options += `<option value="${sexos[i]}">${sexos[i]}</option>`
    }
    return options
}
const horarios = [
    { "horario1": '08:00 - 10:00' },
    { "horario2": '10:00 - 12:00' },
    { "horario3": '12:00 - 14:00' },
    { "horario4": '14:00 - 16:00' },
    { "horario5": '16:00 - 18:00' }
];
const tiposDeHorarios = () => {
    let options = '';
    for (const horario of horarios) {
        const key = Object.keys(horario)[0];
        const value = horario[key];
        options += `<option value="${value}">${value}</option>`;
    }
    return options;
}

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
const tiposDeDias=()=>{
    let options= ''
    for (let i = 0; i < dias.length; i++){
        options += `<option value="${dias[i]}">${dias[i]}</option>`
    }
    return options
}
const tiposDeSalones = () => {
    let options = '';
    for (let i = 0; i < listaSalones.length; i++) {
      const salon = listaSalones[i];
      options += `<option value="${salon.id}">Salón ${salon.numero_identificacion}, ${salon.edificio}, Piso ${salon.piso}</option>`;
    }
    return options;
}