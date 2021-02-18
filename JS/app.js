const $startBtn = document.querySelector("#start-round");
const state = document.querySelector("#state");
const roundNumber = document.querySelector("#round-number");
const squares = document.querySelectorAll(".cuadro");

const machineMovements = [];
let userMovements = [];
let round = 0;

$startBtn.onclick = function () {
  roundHandler();
};

function machineTurn() {
  disableUserInput();
  state.textContent = "Machine turn";
  let randomNumber = getRandom();
  machineMovements.push(randomNumber);
  for (let i = 0; i < machineMovements.length; i++) {
    const machineNumber = machineMovements[i];
    const selectedSquare = squares[machineNumber - 1];
    setTimeout(function () {
      highlight(selectedSquare);
    }, (i + 1) * 1000);
  }
}

function roundHandler() {
  round++;
  roundNumber.textContent = round;
  machineTurn();
  const playerDelay = (machineMovements.length + 1) * 1000;
  setTimeout(function () {
    playerMovements();
  }, playerDelay);
}

function playerMovements() {
  userMovements = [];
  state.textContent = "Your turn!";
  squares.forEach((square) => {
    square.onclick = function () {
      highlight(square);
      let n = square.getAttribute("data-number");
      userMovements.push(n);
      const $machinePosition = machineMovements[userMovements.length - 1];
      if (square.dataset.number != $machinePosition) {
        setTimeout(function name(params) {
          youLoose();
        }, 300);
      } else if (userMovements.length === machineMovements.length) {
        setTimeout(function () {
          roundHandler();
        }, 500);
      }
    };
  });
}
function disableUserInput() {
  squares.forEach((square) => {
    square.onclick = function () {};
  });
}

function getRandom() {
  return Math.floor(Math.random() * 4) + 1;
}
function highlight($square) {
  $square.style.opacity = 1;
  setTimeout(function () {
    $square.style.opacity = 0.5;
  }, 500);
}
function youLoose() {
  const $gameContent = document.querySelector(".game");
  const $header = document.querySelector("header");
  $gameContent.classList.add("hidden");
  const $looseContent = document.querySelector("#loose");
  $looseContent.style.display = "flex";
  $header.classList.add("hidden");
}

const $restartbtn = document.querySelector(".content__btn-play-again");
$restartbtn.onclick = function () {
  location.reload();
};
