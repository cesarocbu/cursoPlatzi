function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    let inputHipo = document.getElementById('Hipodoge');
    let inputCapi = document.getElementById('Capipepo');
    let inputRati = document.getElementById('Ratigueya');


    if(inputHipo.checked){
        alert("Hipodoge es tu mascota!")
    } else if(inputCapi.checked){
        alert("Capipepo es tu mascota!")
    } else if(inputRati.checked){
        alert("Ratigueya es tu mascota!")
    } else{
        alert("Debes seleccionar una mascota")
    }

}

window.addEventListener('load', iniciarJuego)