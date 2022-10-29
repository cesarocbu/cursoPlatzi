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
backgroundMapa.src = './assets/mokemap.png'
let alturaQueBuscamos;
let anchoDeMapa = window.innerWidth - 20
let anchoMaximoMapa = 650

if(anchoDeMapa > anchoMaximoMapa){
    anchoDeMapa = anchoMaximoMapa - 20
}

alturaQueBuscamos = anchoDeMapa * 600 / 800

mapa.width = anchoDeMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10){
    this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.x = x
        this.y = y
        this.ancho = 50
        this.alto = 50
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;

    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 4, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', aleatorio(0,550), aleatorio(0,350))

let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 4, './assets/capipepo.png', aleatorio(0,550), aleatorio(0,350))

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', aleatorio(0,550), aleatorio(0,350))

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

hipodogeEnemigo.ataques.push(
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'AGUA', id: 'boton-agua'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'FUEGO', id: 'boton-fuego'}
)
capipepoEnemigo.ataques.push(
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'TIERRA', id: 'boton-tierra'},
    {nombre: 'FUEGO', id: 'boton-fuego'},
    {nombre: 'AGUA', id: 'boton-agua'}
)
ratigueyaEnemigo.ataques.push(
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

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
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
    objetoMascotaJugador.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    
    if(objetoMascotaJugador.velocidadX !== 0 || objetoMascotaJugador.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
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

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = objetoMascotaJugador.y
    const abajoMascota = objetoMascotaJugador.y + objetoMascotaJugador.alto
    const derechaMascota = objetoMascotaJugador.x + objetoMascotaJugador.ancho
    const izquierdaMascota = objetoMascotaJugador.x


    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo){
        return;
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener('load', iniciarJuego);