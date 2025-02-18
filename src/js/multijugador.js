
const contadorV = document.getElementById("contadorV");
const contadorD = document.getElementById("contadorD");
const contadorE = document.getElementById("contadorE");
const ResetearTodo = document.getElementById("ResetearTodo");


const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");

const btnReset = document.getElementById("btnReset");
const mensajeTurno = document.getElementById("mensajeTurno");

const mensajeGane = document.getElementById("mensajeGane");

let listaBotonesDisponibles = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8];
let BtnTotales = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8];

let turno = "jugador 1"

let juego = true;

// Recuperar los contadores de localStorage
let victorias = JSON.parse(localStorage.getItem('victorias')) || 0;
let derrotas = JSON.parse(localStorage.getItem('derrotas')) || 0;
let empates = JSON.parse(localStorage.getItem('empates')) || 0;


// Mostrar los contadores recuperados del localStorage
contadorV.textContent = victorias;
contadorD.textContent = derrotas;
contadorE.textContent = empates;

mensajeTurno.textContent = "Turno del " + turno;

    
for (let index = 0; index < BtnTotales.length; index++) {
    const element = BtnTotales[index];

    element.addEventListener("click", function () {

        if(turno === "jugador 1") {

            if (element.textContent.trim() === "") {
                element.textContent = "X";
    
                listaBotonesDisponibles = listaBotonesDisponibles.filter(btn => btn !== element);
                turno = "jugador 2"
            }
        }

        else {

            if (element.textContent.trim() === "") {
                element.textContent = "O";
    
                listaBotonesDisponibles = listaBotonesDisponibles.filter(btn => btn !== element);
                turno = "jugador 1";
            }
        }
        mensajeTurno.textContent = "Turno del " + turno;
        QuienGana()


    });

            
}


function QuienGana() {
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]            // diagonales
    ];

    for (let comb of combinaciones) {
        if (BtnTotales[comb[0]].textContent === "X" && BtnTotales[comb[1]].textContent === "X" && BtnTotales[comb[2]].textContent === "X") {
            victorias++;
            localStorage.setItem("victorias", JSON.stringify(victorias)); // Actualizar en localStorage
            contadorV.textContent = victorias;

            mensajeTurno.textContent = ""
            mensajeGane.textContent = "¡Ha ganado el jugador 1!";

            juego = false;
        }

        if (BtnTotales[comb[0]].textContent === "O" && BtnTotales[comb[1]].textContent === "O" && BtnTotales[comb[2]].textContent === "O") {
            derrotas++;
            localStorage.setItem("derrotas", JSON.stringify(derrotas)); // Actualizar en localStorage
            contadorD.textContent = derrotas;
            mensajeTurno.textContent = ""

            mensajeGane.textContent = "¡Ha ganado el jugador 2!";

            juego = false;
        }
    }

    // Comprobar si hay empate (todas las casillas están llenas)
    
    if (listaBotonesDisponibles.length === 0 && juego == true) {
        empates++;
        localStorage.setItem("empates", JSON.stringify(empates)); // Actualizar en localStorage
        contadorE.textContent = empates;

        mensajeTurno.textContent = ""
        mensajeGane.textContent = "¡Empate!";

        
    }
}

// Agregar evento de clic en cada botón
for (let index = 0; index < BtnTotales.length; index++) {
    const element = BtnTotales[index];

    element.addEventListener("click", function () {
        if(juego == true) {
            
            if (element.textContent.trim() === '') {
                element.textContent = "X";
                listaBotonesDisponibles = listaBotonesDisponibles.filter(btn => btn !== element);
                maquina();
            }
        }
    });
}


// Función para reiniciar el juego
btnReset.addEventListener("click", function () {

    for (let btn of BtnTotales) {
        btn.textContent = "";
    }
    
    listaBotonesDisponibles = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8];
    mensajeGane.textContent = "";
    mensajeTurno.textContent = "Turno del jugador 1";

    turno = "jugador 1"

});

ResetearTodo.addEventListener("click", function (){
    let Remove = confirm("¿Deseas BORRAR todos los contadores?")

    if(Remove == true) {
        localStorage.clear()
        location.reload()
    }
})
