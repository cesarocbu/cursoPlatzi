let ataqueJugador;
let ataqueEnemigo;
let resultado;


function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO';
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }

    combate();
}


function combate(){
    if(ataqueEnemigo == ataqueJugador){
        resultado = 'EMPATE'
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        resultado = 'GANASTE'
    } else {
        resultado = 'PERDISTE'
    }
    console.log(resultado);
    crearMensaje();
}

function crearMensaje(){
    let seccionMensajes = document.getElementById('mensajes');


    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ',' + ' Tu enemigo usó ' + ataqueEnemigo + '. ' + resultado + '.';

    seccionMensajes.appendChild(parrafo);
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

    let mascotaAleatoria = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if(mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    } else if(mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)