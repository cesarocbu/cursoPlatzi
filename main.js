//iniciarJuego
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionBotonReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
//seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
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
//crear opcionDeMokepones
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
//mostrarAtaques
const contenedorAtaques = document.getElementById('contenedor-ataques');

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let inputHipo;
let inputCapi;
let inputRati;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];

class Mokepon {
    constructor(nombre, foto, vida,){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png', 5)

let capipepo = new Mokepon('Capipepo', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png', 4)

let ratigueya = new Mokepon('Ratigueya', 'https://raw.githubusercontent.com/platzi/curso-programacion-basica/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'FUEGO', id: 'boton-fuego'}
)
capipepo.ataques.push(
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'FUEGO', id: 'boton-fuego'},
    {nombre: 'AGUA', id: 'boton-agua'}
)
ratigueya.ataques.push(
    {nombre: 'FUEGO', id: 'boton-fuego'},
    {nombre: 'FUEGO', id: 'boton-fuego'},
    {nombre: 'FUEGO', id: 'boton-fuego'},
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'TIERRA', id: 'boton-tierra'}
)

mokepones.push(hipodoge, capipepo, ratigueya);


function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
    sectionBotonReiniciar.style.display = 'none';
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label  class="tarjeta-mokepon" for=${mokepon.nombre} >
                <p>${mokepon.nombre} </p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} >
            </label> <br>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipo = document.getElementById('Hipodoge');
        inputCapi = document.getElementById('Capipepo');
        inputRati = document.getElementById('Ratigueya');
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}



function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        console.log(ataqueJugador[i]);
    }

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
        spanMascotaJugador.innerHTML = inputHipo.id;
        mascotaJugador = inputHipo.id;
    } else if(inputCapi.checked){
        spanMascotaJugador.innerHTML = inputCapi.id;
        mascotaJugador = inputCapi.id;
    } else if(inputRati.checked){
        spanMascotaJugador.innerHTML = inputRati.id;
        mascotaJugador = inputRati.id;
    } else{
        alert("Debes seleccionar una mascota")
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque btnAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones =  document.querySelectorAll('.btnAtaque');

    console.log(botones);
}

function secuenciaDeAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === 'FUEGO') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador);
                boton.style.background =  '#A35709'
            } else if(e.target.textContent === 'TIERRA'){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador);
                boton.style.background =  '#A35709'
            } else if(e.target.textContent === 'AGUA'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador);
                boton.style.background =  '#A35709'
            }

            ataqueAleatorioEnemigo();
        })
    })

}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length -1);
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
    secuenciaDeAtaque();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1);
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA');
    } else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if(ataqueJugador.length === 5){
        combate();
    }
}


function reiniciarJuego (){
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);