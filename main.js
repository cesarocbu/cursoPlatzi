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
//ver mapa
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');


let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let mascotaJugador;
let objetoMascotaJugador;
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
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let lienzo = mapa.getContext("2d");
let intervalo;
let backgroundMapa = new Image();
backgroundMapa.src = 'https://static.platzi.com/media/user_upload/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.jpg'

class Mokepon {
    constructor(nombre, foto, vida,){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image();
        this.mapaFoto.src = foto;
        this.velocidadX = 0;
        this.velocidadY = 0;

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
    sectionVerMapa.style.display = 'none';
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

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponentes(i,i)
            crearMensaje('EMPATE');
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA'){
            indexAmbosOponentes(i,i)
            crearMensaje('GANASTE');
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO'){
            indexAmbosOponentes(i,i)
            crearMensaje('GANASTE')
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if(ataqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA'){
            indexAmbosOponentes(i,i)
            crearMensaje('GANASTE')
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }   else{
            indexAmbosOponentes(i,i)
            crearMensaje('PERDISTE')
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    revisarVictorias()
}

function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('EMPATE!')
    } else if(vidasJugador > victoriasEnemigo){
        crearMensajeFinal('GANASTE!')
    } else{
        crearMensajeFinal('PERDISTE');
    }
}


function crearMensaje(resultado){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    seccionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueJug.appendChild(nuevoAtaqueJugador);
    ataqueEne.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    seccionMensajes.innerHTML = resultadoFinal;
    sectionBotonReiniciar.style.display = 'block';
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none';
    //sectionSeleccionarAtaque.style.display = 'flex';
    

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
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
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
                boton.disabled = true;
            } else if(e.target.textContent === 'TIERRA'){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador);
                boton.style.background =  '#A35709'
                boton.disabled = true;
            } else if(e.target.textContent === 'AGUA'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador);
                boton.style.background =  '#A35709'
                boton.disabled = true;
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

function pintarCanvas(){

    objetoMascotaJugador.x = objetoMascotaJugador.x + objetoMascotaJugador.velocidadX
    objetoMascotaJugador.y = objetoMascotaJugador.y + objetoMascotaJugador.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height);
    lienzo.drawImage(
        backgroundMapa,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        objetoMascotaJugador.mapaFoto,
        objetoMascotaJugador.x,
        objetoMascotaJugador.y,
        objetoMascotaJugador.ancho,
        objetoMascotaJugador.alto
    )
}

function moverDerecha(){
    objetoMascotaJugador.velocidadX = 2;
}

function moverIzquierda(){
    objetoMascotaJugador.velocidadX = -2;
}

function moverArriba(){
    objetoMascotaJugador.velocidadY = -2;
}

function moverAbajo(){
    objetoMascotaJugador.velocidadY = 2;
}

function detenerMovimiento(){
    objetoMascotaJugador.velocidadX = 0;
    objetoMascotaJugador.velocidadY = 0;
}

function teclaPresionada(){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mapa.width = 600
    mapa.height = 400
    objetoMascotaJugador = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 15)
    window.addEventListener('keydown', teclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

window.addEventListener('load', iniciarJuego);