let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;



function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionBotonReiniciar = document.getElementById('reiniciar');
    sectionBotonReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);

    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego)
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
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if(ataqueEnemigo == ataqueJugador){
        crearMensaje('EMPATE')
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA' || ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO' || ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje('GANASTE')
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje('PERDISTE')
        vidasJugador--;
        spanVidasJugador.innerHTML= vidasJugador;
    }
    revisarVidas();
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal('GANASTE!')
    } else if(vidasJugador == 0){
        crearMensajeFinal('PERDISTE :(')
    }
}


function crearMensaje(resultado){
    let seccionMensajes = document.getElementById('resultado');
    let ataqueJug = document.getElementById('ataque-jugador');
    let ataqueEne = document.getElementById('ataque-enemigo');

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')


    seccionMensajes.innerHTML = resultado;
    ataqueJug.innerHTML = ataqueJugador;
    ataqueEne.innerHTML = ataqueEnemigo;

    ataqueJug.appendChild(nuevoAtaqueJugador);
    ataqueEne.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal){


    let seccionMensajes = document.getElementById('resultado');
    let parrafo = document.createElement('p')
    seccionMensajes.innerHTML = resultadoFinal;

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;

    let sectionBotonReiniciar = document.getElementById('reiniciar');
    sectionBotonReiniciar.style.display = 'block';


}

function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none';

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';

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
    } else{
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

function reiniciarJuego (){
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego)