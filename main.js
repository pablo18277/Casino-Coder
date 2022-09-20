let color
let numero
let ganancia
let historialApuestas = []
let mensaje
let numeroDado
let recordParseado
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

function girarRuleta() {

    numero = Math.floor(Math.random() * 37)
    tomarApuesta(numero)

    if (((!isNaN(nuevaApuesta.dineroApostado)) && nuevaApuesta.dineroApostado > 0) && (!isNaN(nuevaApuesta.numeroElegido) && nuevaApuesta.numeroElegido >= 0 && nuevaApuesta.numeroElegido <= 36)) {
        borrarResultado()
        revisionColor(numero)
        decirResultado()
        revisionGanancia(numero, nuevaApuesta.dineroApostado)
        decirGanadorPerdedor(mensaje)
        agregarHistorial()
    } else {

        Toastify({
            text: "Ingrese una apuesta válida",
            className: "info",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #ec4206, #8b3918)",
            }
        }).showToast();

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
        Toastify({
            text: "¡Llueven dólares!",
            className: "info",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #22240a, #13f14a)",
            }
        }).showToast();



    } else {
        mensaje = "Has perdido :-( Intenta de nuevo!"
        Toastify({
            text: "¡Intenta de nuevo!",
            className: "info",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #a60fa3, #48825b)",
            }
        }).showToast();


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

//botones
botonComenzar.addEventListener("click", comenzar)
botonTirarDado.addEventListener("click", tirarDado)
botonPlantarse.addEventListener("click", plantarse)
botonReiniciar.addEventListener("click", reiniciar)

//Declaro clase
class jugadaUno {
    constructor(numeroDeTiroUno, cuentaUno) {
        this.numeroDeTiroUno = numeroDeTiroUno
        this.cuentaUno = cuentaUno
    }
}

// Buscar record en LS y parse

recordEnLocalStorage = localStorage.getItem("Record");
recordParseado = JSON.parse(recordEnLocalStorage);


//Si no hay LS que muestre vacío. Sino que muestre record de LS
if (recordParseado == null) {
    recordParseado = new jugadaUno(0, 0)
    document.querySelector("#recordActual").innerHTML = "No hay récord"
} else {

    document.querySelector("#recordActual").innerHTML = recordParseado.cuentaUno + " en " + recordParseado.numeroDeTiroUno + " tiros"
}

//Funciones

function tirarDado() {
    numeroDado = Math.floor(Math.random() * 6) + 1;
    if (numeroDado === 1) {
        Swal.fire({
            icon: 'error',
            title: '¡Salió el 1!',
            text: 'Tendrás que empezar de nuevo',
            footer: '¿Podrá alguien llegar a 100?'
        })

        reiniciar()
    } else {

        document.querySelector("#tiroActual").innerHTML = numeroDado
        numeroDeTiro++
        document.querySelector("#numeroDeTiro").innerHTML = numeroDeTiro
        cuentaDado = numeroDado + cuentaDado
        if (cuentaDado >= 100) {
            Swal.fire(
                '¡Felicitaciones!',
                'Llegaste a 100!',
                'success'
            )

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
    revisarRecord()
    reiniciar()

}

function revisarRecord() {

    if ((parseInt(jugadaActual.cuentaUno)) > (parseInt(recordParseado.cuentaUno))) {

        //Actualiza record
        const recordJugada = JSON.stringify(jugadaActual);
        localStorage.setItem("Record", recordJugada);
        const recordEnLocalStorage = localStorage.getItem("Record");
        recordParseado = JSON.parse(recordEnLocalStorage);
        Toastify({
            text: "¡Nuevo Récord!",
            className: "info",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #0f56a6, #13b9b4)",
            }
        }).showToast();

        document.querySelector("#recordActual").innerHTML = recordParseado.cuentaUno + " en " + recordParseado.numeroDeTiroUno + " tiros"

    }
    //Si no supera récord sigue
    else {
        return console.log("No se cumple")
    }
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
    recordParseado = new jugadaUno(0, 0)
    document.querySelector("#recordActual").innerHTML = recordParseado.cuentaUno + " en " + recordParseado.numeroDeTiroUno + " tiros"
}