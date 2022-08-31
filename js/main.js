function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada){
    let resultado = "";

    if(jugada == 1){
        resultado = "Piedra 🪨";
    }else if(jugada == 2){
        resultado = "Papel 📄";
    }else if(jugada == 3){
        resultado = "Tijera ✄";
    }else{
        resultado = "Elige una opción válida";
    }
    return resultado
}

let jugador = 0;
let pc = 0;
triunfos = 0;
perdidas = 0;
empates = 0;



while(triunfos < 3 && perdidas < 3){
    pc = aleatorio(1,3);
    jugador = prompt("Elige 1 para Piedra, 2 para Papel o 3 para Tijera");

    alert("Jugador eligió: " + eleccion(jugador));
    alert("PC eligió: " + eleccion(pc));
    

    //COMBATE
    if(pc == jugador){
        alert("Empate");
        empates = empates + 1;
    } else if(jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2){
        alert("Ganaste!!!")
        triunfos = triunfos + 1;
    } else {
        alert("Perdiste :(")
        perdidas = perdidas + 1;
    }
}

alert("Ganaste " + triunfos + " veces. Perdiste " + perdidas + " veces. Empataron " + empates + " veces.");
