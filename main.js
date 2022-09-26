//iniciarJuego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionBotonReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');
//seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipo = document.getElementById('Hipodoge');
const inputCapi = document.getElementById('Capipepo');
const inputRati = document.getElementById('Ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');
//seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
//combate
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
//crearMensaje
const seccionMensajes = document.getElementById('resultado');
const ataqueJug = document.getElementById('ataque-jugador');
const ataqueEne = document.getElementById('ataque-enemigo');
//crearMensajeFinal
const parrafo = document.createElement('p')

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;


class Mokepon {
    constructor(nombre, foto, vida,){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
    }
}

let Hipodoge = new Mokepon('Hipodoge', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png', 5)

let Capipepo = new Mokepon('Capipepo', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png', 4)

let Ratigueya = new Mokepon('Ratigueya', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png', 5)



function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
    sectionBotonReiniciar.style.display = 'none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
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
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    seccionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataqueJug.appendChild(nuevoAtaqueJugador);
    ataqueEne.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    seccionMensajes.innerHTML = resultadoFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionBotonReiniciar.style.display = 'block';

}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
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