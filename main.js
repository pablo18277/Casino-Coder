let color
let numero
let ganancia
let historialApuestas = []
let mensaje

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
    let apuestaTomar = document.getElementById("apuestaRuleta").value;
    let numeroTomar = document.getElementById("numeroRuleta").value;
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

function revisionGanancia() {

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
    document.querySelector("#tabla").innerHTML += '<tbody><td>' + nuevaApuesta.numeroElegido + '</td> <td>' + nuevaApuesta.dineroApostado + '</td><td>' + nuevaApuesta.numeroSorteado + '</td></tbody>';
    console.log(historialApuestas)
}