let color
let numero
let ganancia
let historialApuestas = []
let mensaje
let numeroDado
let cuentaDado = 0
let historialUno = []
let numeroDeTiro = 0
const botonRuleta = document.querySelector("#botonRuleta")
const botonBorrarHistorial = document.querySelector("#borrarHistorial")
const botonComenzar = document.querySelector("#comenzar")
const botonTirarDado = document.querySelector("#tirarDado")
const botonPlantarse = document.querySelector("#plantarse")
const botonReiniciar = document.querySelector("#reiniciar")

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
    document.querySelector("#tabla").innerHTML = '<tbody>' + "" + '</tbody>';
}



botonRuleta.addEventListener("click", girarRuleta)

botonBorrarHistorial.addEventListener("click", borrarHistorial)


//Juego UNO

// Si no hay LS que muestre 0 y 0



//MUESTRA RECORD CON LS
    // recordEnLocalStorage = localStorage.getItem("Record");
    // recordParseado = JSON.parse(recordEnLocalStorage);
    // document.querySelector("#recordActual").innerHTML = recordParseado.cuentaUno + " en " + recordParseado.numeroDeTiroUno + " tiros"


class jugadaUno {
    constructor(numeroDeTiroUno, cuentaUno) {
        this.numeroDeTiroUno = numeroDeTiroUno
        this.cuentaUno = cuentaUno
    }
}


botonComenzar.addEventListener("click", comenzar)
botonTirarDado.addEventListener("click", tirarDado)
botonPlantarse.addEventListener("click", plantarse)
botonReiniciar.addEventListener("click", reiniciar)

function tirarDado() {
    numeroDado = Math.floor(Math.random() * 6) + 1;
    if (numeroDado === 1) {
        alert("Salió el 1! A empezar de nuevo!")
        reiniciar()
    } else {

        document.querySelector("#tiroActual").innerHTML = numeroDado
        numeroDeTiro++
        document.querySelector("#numeroDeTiro").innerHTML = numeroDeTiro
        cuentaDado = numeroDado + cuentaDado
        if (cuentaDado >= 100) {
            alert("GANASTE! Felicitaciones!")
            cuentaDado = 100
            document.querySelector("#cuentaDado").innerHTML = cuentaDado
            plantarse()

        } else {

            document.querySelector("#cuentaDado").innerHTML = cuentaDado
        }
    }

}

function comenzar() {
    reiniciar()
    borrarHistorialUno()
}



function agregarHistorialUno(jugadaActual) {
    historialUno.push(jugadaActual)
    document.querySelector("#tablaUno").innerHTML += '<td class="table-dark">' + jugadaActual.numeroDeTiroUno + '</td> <td class="table-dark">' + jugadaActual.cuentaUno + '</td>';

}

function plantarse() {

    let numeroDeTiroUno = document.querySelector("#numeroDeTiro").innerHTML;
    let cuentaUno = document.querySelector("#cuentaDado").innerHTML;
    jugadaActual = new jugadaUno(numeroDeTiroUno, cuentaUno);
    agregarHistorialUno(jugadaActual);
    reiniciar()
    revisarRecord()
    
}

function reiniciar() {
    document.querySelector("#tiroActual").innerHTML = "-"
    document.querySelector("#numeroDeTiro").innerHTML = "-"
    document.querySelector("#cuentaDado").innerHTML = "-"
    cuentaDado = 0
    numeroDeTiro = 0


}

function borrarHistorialUno() {
    historialUno = []
    document.querySelector("#tablaUno").innerHTML = '<tbody>' + "" + '</tbody>';
}

function revisarRecord() {

//if (jugadaActual.cuentaUno >= recordParseado.cuentaUno && jugadaActual.numeroDeTiroUno < recordParseado.numeroDeTiroUno) {

    const recordJugada = JSON.stringify(jugadaActual);
    localStorage.setItem("Record", recordJugada);
    const recordEnLocalStorage = localStorage.getItem("Record");
    recordParseado = JSON.parse(recordEnLocalStorage);
    
    
            document.querySelector("#recordActual").innerHTML = recordParseado.cuentaUno + " en " + recordParseado.numeroDeTiroUno + " tiros"
        }
    