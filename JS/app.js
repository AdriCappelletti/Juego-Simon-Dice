// const square1 = document.querySelector("#cuadro1");
// const square2 = document.querySelector("#cuadro2");
// const square3 = document.querySelector("#cuadro3");
// const square4 = document.querySelector("#cuadro4");
const bt = document.querySelector("#start-round");
const state = document.querySelector("#state");
const roundNumber = document.querySelector("#round-number");
const squares = document.querySelectorAll(".cuadro");

const machineMovements = [];
let userMovements = [];
let round = 0;


// function startRound(){
// deshabilitar input del usuario
// juega la maquina con un retraso entre cada juego para que no se ensimen
// juega el usuario
// Se comparan los arrays y si ambos son iguales juega la maquina nuevamente
// }

bt.onclick = function () {
  roundHandler();
};

function machineTurn() {
  round++;
  roundNumber.textContent = round;
  state.textContent = "Machine turn";
  let randomNumber = getRandom();
  machineMovements.push(randomNumber);
  console.log(machineMovements);
  for (let i = 0; i < machineMovements.length; i++) {
    const machineNumber = machineMovements[i];
    const selectedSquare = squares[machineNumber - 1];
    setTimeout(function () {
      highlight(selectedSquare);
    }, (i + 1) * 1000);
  }
}

function roundHandler() {
  machineTurn();
  const PLAYER_DELAY = (machineMovements.length + 1) * 1000;
  setTimeout(function () {
    playerTurn();
  }, PLAYER_DELAY);
}

// entre cada cuadro(posicion del array) dejar un espacio antes de pasar a la proxima posicion
function playerTurn() {
  userMovements = [];
  state.textContent = "Your turn!";
  squares.forEach((square) => {
    square.onclick = function () {
      highlight(square);
      let n = square.getAttribute("data-number");
      userMovements.push(n);
      if (compareArrays(userMovements, machineMovements) === true) {
        roundHandler();
      }
    };
  });
}


function highlight($square) {
  $square.style.opacity = 1;
  setTimeout(function () {
    $square.style.opacity = 0.5;
  }, 500);
}

function compareArrays(arr1, arr2) {
  return arr1.toString() === arr2.toString();
}

function getRandom() {
  return Math.floor(Math.random() * 4) + 1;
}
