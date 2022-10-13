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
let pokemon1 = ""
let pokemon2 = ""
let pokemon3 = ""
const audio = document.querySelector("#audio")
const botonMusica = document.querySelector("#musica")
const botonJackpot = document.querySelector("#botonJackpot")
const jackpot = document.querySelector("#jackpotContainer")
const botonRuleta = document.querySelector("#botonRuleta")
const botonBorrarHistorial = document.querySelector("#borrarHistorial")
const botonComenzar = document.querySelector("#comenzar")
const botonTirarDado = document.querySelector("#tirarDado")
const botonPlantarse = document.querySelector("#plantarse")
const botonReiniciar = document.querySelector("#reiniciar")

//Musica
botonMusica.addEventListener("click", musica)
audio.volume = 0.4;
function musica() {
    botonMusica.classList.toggle("fa-volume-xmark");
    audio.paused ? audio.play() : audio.pause();
    
      }


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
        return 1
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


//POKEMON JACKPOT

//Botón para hacer click y que comience el juego

botonJackpot.addEventListener("click", jackpotStart)

// Buscar el pokemon en la API


 function agregarPokemon1(pokemon) {

    document.querySelector(".containerImagen1").innerHTML = "";
    const imagen1 = document.createElement("img")
    imagen1.src = pokemon.sprites.front_default

    containerImagen1 = document.querySelector(".containerImagen1")
    containerImagen1.appendChild(imagen1)

    pokemon1 = {
        nombre: pokemon.name,
        especie: pokemon.types[0].type.name
    }
    
    
}

function agregarPokemon2(pokemon) {

    document.querySelector(".containerImagen2").innerHTML = "";
    const imagen2 = document.createElement("img")
    imagen2.src = pokemon.sprites.front_default

    containerImagen2 = document.querySelector(".containerImagen2")
    containerImagen2.appendChild(imagen2)

    pokemon2 = {
        nombre: pokemon.name,
        especie: pokemon.types[0].type.name
    }


    

}

function agregarPokemon3(pokemon) {

    document.querySelector(".containerImagen3").innerHTML = "";
    const imagen3 = document.createElement("img")
    imagen3.src = pokemon.sprites.front_default

    containerImagen3 = document.querySelector(".containerImagen3")
    containerImagen3.appendChild(imagen3)

    pokemon3 = {
        nombre: pokemon.name,
        especie: pokemon.types[0].type.name
    }
    revisarJackpot()

}

 function buscarPokemon1(numeroPokemon) {
    numeroPokemon = Math.floor(Math.random() * 150 + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
            agregarPokemon1(data)
        })

    
}

function buscarPokemon2(numeroPokemon) {
    numeroPokemon = Math.floor(Math.random() * 150 + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
            agregarPokemon2(data)
        })

}

function buscarPokemon3(numeroPokemon) {
    numeroPokemon = Math.floor(Math.random() * 150 + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
            agregarPokemon3(data)
        })


}

function revisarJackpot() {
   if (pokemon1.nombre == pokemon2.nombre && pokemon2.nombre == pokemon3.nombre) {
        Toastify({
        text: "¡3 iguales! ¡GANASTE!",
        className: "info",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #22240a, #13f14a)",
        }
        }).showToast()
   }
   else if (pokemon1.especie == pokemon2.especie && pokemon2.especie == pokemon3.especie) {

    Toastify({
        text: "¡Misma especie! ¡Felicitaciones!",
        className: "info",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #22240a, #13f14a)",
        }
    }).showToast();
   }

   else {
    Toastify({
        text: "¡Nada coincide! ¡Sigue jugando!",
        className: "info",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #ec4206, #8b3918)",
        }
    }).showToast();
   }

          
    
    
    
    

}

async function jackpotStart(pokemon1, pokemon2, pokemon3) {

    buscarPokemon1(pokemon1)
    buscarPokemon2(pokemon2)
    buscarPokemon3(pokemon3)
    
}