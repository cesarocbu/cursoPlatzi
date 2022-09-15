function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    let inputHipo = document.getElementById('Hipodoge');
    let inputCapi = document.getElementById('Capipepo');
    let inputRati = document.getElementById('Ratigueya');
    let inputLango = document.getElementById('Langostelvis');
    let inputTuca = document.getElementById('Tucapalma');
    let inputpydos = document.getElementById('Pydos');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if(inputHipo.checked){
        spanMascotaJugador.innerHTML = 'Hipodoge'
    } else if(inputCapi.checked){
        spanMascotaJugador.innerHTML = 'Capipepo'
    } else if(inputRati.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
    } // else if(inputLango.checked){
    //     spanMascotaJugador.innerHTML = 'Langostelvis'
    // } else if(inputLango.checked){
    //     spanMascotaJugador.innerHTML = 'Tucapalma'
    // } else if(inputpydos.checked){
    //     spanMascotaJugador.innerHTML = 'Pydos'
    // }
     else{
        alert("Debes seleccionar una mascota")
    }

    seleccionarMascotaEnemigo();

}

function seleccionarMascotaEnemigo(){

    let ataqueAleatorio = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if(ataqueAleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if(ataqueAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else if(ataqueAleatorio == 3){
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)