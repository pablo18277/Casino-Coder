let color
let numero
let ganancia
let historialApuestas = []
let mensaje
let numeroDado
let cuentaDado
let historialUno = []
const botonRuleta = document.querySelector("#botonRuleta")
const botonBorrarHistorial = document.querySelector("#borrarHistorial")

//Función principal
//Uso de While para chequear si apuesta y numero son números posibles
function girarRuleta() {

    numero = Math.floor(Math.random() * 37)
    tomarApuesta(numero)

    if (((!isNaN(nuevaApuesta.dineroApostado)) && nuevaApuesta.dineroApostado > 0) && (!isNaN(nuevaApuesta.numeroElegido) && nuevaApuesta.numeroElegido >= 0 || numeroTomar <= 36)) {
        borrarResultado()
        revisionColor(numero)
        decirResultado()
        revisionGanancia(numero, nuevaApuesta.dineroApostado)
        decirGanadorPerdedor(mensaje)
        agregarHistorial()
    } else {
        alert("Ingrese una apuesta válida")
    }


}

//Declaro funciones secundarias

function tomarApuesta() {
    class Apuesta {
        constructor(numeroElegido, dineroApostado, numeroSorteado) {
            this.numeroElegido = numeroElegido
            this.dineroApostado = dineroApostado
            this.numeroSorteado = numeroSorteado
        }
    }
    let apuestaTomar = document.querySelector("#apuestaRuleta").value;
    let numeroTomar = document.querySelector("#numeroRuleta").value;
    numeroSorteado = numero

    nuevaApuesta = new Apuesta(numeroTomar, apuestaTomar, numero)

}

function revisionColor(numero) {
    if (numero % 2 === 0 && numero != 0) {
        document.querySelector("#decirResultado").style.color = "red"
        color = "Rojo"

    } else if (numero === 0) {
        color = ""
        document.querySelector("#decirResultado").style.color = "green"

    } else {
        color = "Negro"
        document.querySelector("#decirResultado").style.color = "black"

    }
    return color;
}

function revisionGanancia(numero, dineroApostado) {

    ganancia = parseInt(nuevaApuesta.dineroApostado) * 36;

    if (nuevaApuesta.numeroElegido == numero) {
        mensaje = "¡Has ganado! Recibirás " + ganancia + " dólares."



    } else {
        mensaje = "Has perdido :-( Intenta de nuevo!"


    }
}

function decirResultado() {
    document.querySelector("#decirResultado").innerHTML += "Ha salido " + color + " el " + numero
}

function borrarResultado() {
    document.querySelector("#decirResultado").innerHTML = ""
}


function decirGanadorPerdedor(mensaje) {
    document.querySelector("#ganadorPerdedor").innerHTML = mensaje
}

function agregarHistorial() {
    historialApuestas.push(nuevaApuesta)
    document.querySelector("#tabla").innerHTML += '<td class="table-dark">' + nuevaApuesta.numeroElegido + '</td> <td class="table-dark">' + nuevaApuesta.dineroApostado + '</td><td class="table-dark">' + nuevaApuesta.numeroSorteado + '</td>';
    
}

function borrarHistorial() {
    historialApuestas = []
    document.querySelector("#tabla").innerHTML = '<tbody>' + "" +  '</tbody>'; 
}

//Agrego listener al botón de girar ruleta

botonRuleta.addEventListener("click", girarRuleta)

botonBorrarHistorial.addEventListener("click", borrarHistorial) 

//Juego UNO

// function comenzar() {

// }

// function tirarDado() {
//     numeroDado = Math.floor(Math.random() * 7)
// return numeroDado;
// }

//Chequear siempre si sale el 1. SI sale hay que alertar derrota y mostrar hasta dónde llegó. 

//Si no sale uno, sumar el numeroDado a Suma y agregar al array historialUno el objeto jugadaUno con número de tiro (i), numeroDado y suma hasta ese momento.

// function plantarse() {

// }

//Detiene el juego. Hace un alert con el objeto de la jugadaUno. Borra el array y lleva la suma a 0

// function reinicio() {

// }

// Borra el array y lleva la suma a 0
