// TODO
// Add difficulty selector for computer
// Work on computer logic based on difficulty
// Status message on Game End

const difficultyEnum = {
  easy: 0,
  medium: 1,
  hard: 2
};

Object.freeze(difficultyEnum);

let gameActive = false;
let gameWon = false;
let playerChoice = ''
let computerChoice = ''
let playerTurn = true;
// const gameBoard = Array.from({length: 9}); // initialize with undefined
// values
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cell')
let gameStatus = document.getElementById('game--status')
let difficulty = 0;


const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],
  [2, 4, 6]
];

const winningMessage = () => playerTurn ? 'You Won!' : 'Computer Won';
const drawMessage = 'Draw!';

// when user clicks on X button the value 'X' gets stored
// in the playerChoice variable
// and the button O gets disabled
const choiceX = document.getElementById('choiceX');
choiceX.addEventListener('click', (e) => {
  playerChoice = 'X'
  computerChoice = 'O'
  gameActive = true;
  toggleAllCells(false);
  choiceO.setAttribute('disabled', 'true')
});

// when user clicks on O button the value 'O' gets stored
// in the playerChoice variable
// and the button X gets disabled
const choiceO = document.getElementById('choiceO');
choiceO.addEventListener('click', (e) => {
  playerChoice = 'O'
  computerChoice = 'X'
  gameActive = true;
  toggleAllCells(false);
  choiceX.setAttribute('disabled', 'true')
})


let easyMode = document.getElementById('easy')
let mediumMode = document.getElementById('medium')
let hardMode = document.getElementById('hard')

// easyMode.addEventListener('click', () => {

//   mediumMode.disabled = true
//   hardMode.disabled = true
// })

easyMode.addEventListener('click', function () {
  difficulty = difficultyEnum[this.id];
  mediumMode.disabled = true
  hardMode.disabled = true
})

mediumMode.addEventListener('click', function () {
  difficulty = difficultyEnum[this.id];
  easyMode.disabled = true
  hardMode.disabled = true
})

hardMode.addEventListener('click', function () {
  difficulty = difficultyEnum[this.id];
  mediumMode.disabled = true
  easyMode.disabled = true
})

// reset game
const reset = document.getElementById('reset'); 

reset.addEventListener('click', (e) => {
  document.getElementById('choiceX').removeAttribute('disabled');
  document.getElementById('choiceO').removeAttribute('disabled');
  document.getElementById('easy').removeAttribute('disabled');
  document.getElementById('medium').removeAttribute('disabled');
  document.getElementById('hard').removeAttribute('disabled');
  document.getElementById('game--status').innerText = '';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  let cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++){
    cells[i].innerText = '';

    if (cells[i].hasAttribute('disabled')) cells[i].removeAttribute('disabled');
  }
})

// const diffcultyContainer = document.getElementsByClassName('difficulty');

// diffcultyContainer.children().forEach(diffButton => {
//   diffButton.addEventListener('click', () => {
//     const diffButtonId = diffButton.id;

//     switch (diffButtonId) {
//       case 'easy':
//         document.getElementById('medium').disabled = true;
//         document.getElementById('hard').disabled = true;
//         break;
//       case 'medium':
//         document.getElementById('easy').disabled = true;
//         document.getElementById('hard').disabled = true;
//         break;
//       case 'hard':
//         document.getElementById('medium').disabled = true;
//         document.getElementById('easy').disabled = true;

//         break;
//     }
//   });
// });


// class Coach {
//   constructor(player, coach){
//     this.player = player;
//     this.coach = coach;
//   }

//   GetPlayer = () => {
//     return this.player;
//   }

//   SetPlayer = (newPlayerName) => {
//     this.player = newPlayerName;
//   }
// }

// const coach = new Coach('Player', 'Coach');
// console.log(coach.GetPlayer)

// function Player(player, choice) {
//     this.player = player;
//     this.choice = choice;
// }

// const humanPlayer = new Player('Human', 'X');
// const computerPlayer = new Player('Computer', 'O');

// if (playerChoice === 'X') {
//   var currentPlayer = humanPlayer
// } else {
//   var currentPlayer = computerPlayer
// }

// let currentPlayer = playerChoice === 'X' ? humanPlayer : computerPlayer;

function renderBoard() {
  cells.forEach((cell, index) => { cell.innerHTML = gameBoard[index] })

  // playerTurn = Math.round(Math.random()) === 1;

  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].innerHTML = gameBoard[i];
  // }
}

function toggleAllCells(disable = true) {
  cells.forEach(
    cell => disable ? cell.setAttribute('disabled', true) :
      cell.removeAttribute('disabled'));
}

//  choiceX.addEventListener('keyup', (e) => {
//     const key = e.keyCode;
//     switch (key) {
//       case 13:  // Enter

//         break;
//       case 27:  // Esc

//         break;
//       case 53: case 54:

//         break;
//     }
//  })

// a forEach loop that appends the chosen value to the DOM
// after the user clicks on a cell

cells.forEach((cell, index) => {
  cell.addEventListener('click', (e) => {
    if (gameActive) {
      gameBoard[index] = playerChoice
      cell.setAttribute('disabled', true)

      playerTurn = true;

      renderBoard()

      if (!checkForWinner()) {
        computerMove()
      }
    }
  });

  if (!gameActive) cell.setAttribute('disabled', true);
});
function computerMove() {
  playerTurn = false;
  // CURRENT LOGIC IS EASY MODE (RANDOM)


  // a variable that returns a random number from 0 to 8
  // let index = Math.floor(Math.random() * 8)
  //   //if the generated number lands on a cell in the array that is defined
  // while(gameBoard[index] != undefined){
  //   //then it generates another random num
  //     index = Math.floor(Math.random() * 8)
  function cpyBoard() {
    let boardCopy = [...gameBoard.slice()]
    boardCopy.forEach((space, i) => {
      boardCopy[i] =
      {
        value: space, location: i
      }
    })
    return boardCopy
  }
  function pickRandom(boardCopy) {
    const boardCopyFilteredByEmpty =
      boardCopy.filter(space => space.value === '')
    let newRandom = Math.floor(Math.random() * boardCopyFilteredByEmpty.length)
    const location = boardCopyFilteredByEmpty[newRandom].location
    return location
  }
  function pick(index) {
    gameBoard[index] = computerChoice
    cells[index].innerHTML = computerChoice
    cells[index].setAttribute('disabled', true)
  }
  switch (difficulty) {
    case difficultyEnum.easy:
      let boardCopy = cpyBoard()
      // const boardCopyFilteredByEmpty =
      //     boardCopy.filter(space => space.value === '')
      // let newRandom =
      //     Math.floor(Math.random() * boardCopyFilteredByEmpty.length)
      // const location = boardCopyFilteredByEmpty[newRandom].location
      const location = pickRandom(boardCopy)
      gameBoard[location] = computerChoice

      // let randomIndex = Math.floor(Math.random() * 8);

      // if (!gameBoard[randomIndex]) {
      //   gameBoard[randomIndex] = computerChoice;

      cells[location].innerHTML = computerChoice
      cells[location].setAttribute('disabled', true)

      checkForWinner();
      // if (!) playerTurn = true;
      // } else {
      //   computerMove();
      // }
      break;
    case difficultyEnum.medium:
      // Medium Difficulty - 1 Block

      // not hard enough
      let picked = false;
      winningCombos.forEach(combo => {
        let playerOwned = 0;
        let computerOwned = 0;
        let emptyIndex = -1;
        combo.forEach(position => {
          if (position === playerChoice) {
            playerOwned++
          } else if (position === computerChoice) {
            computerOwned++
          } else {
            emptyIndex = position
          }
        })
        if (computerOwned >= 2 || playerOwned >= 2) {
          // pick the remaining one
          picked = true
          pick(emptyIndex)
        }
        else if (computerOwned > 0 && emptyIndex >= 0) {
          // pick something else
          picked = true
          pick(emptyIndex)
        }
      })
      if (!picked) {
        // pick random
        picked = true
        let newBoardCopy = cpyBoard()
        let pickLocation = pickRandom(newBoardCopy)
        pick(pickLocation)
      }
      checkForWinner();
      break;
    case difficultyEnum.hard:
      // Hard Difficulty - ALWAYS block

      // if (gameBoard.filter(v => v !== '').length > 2) {
      //   for (let i = 0; i < winningCombos.length; i++) {
      //     const winCondition = winningCombos[i]

      //     const a = gameBoard[winCondition[0]]
      //     const b = gameBoard[winCondition[1]]
      //     const c = gameBoard[winCondition[2]]

      //     if (a !== '' && a === b) {
      //         gameBoard[winCondition[2]] = computerChoice;
      //         cells[winCondition[2]].innerHTML = computerChoice;
      //         cells[winCondition[2]].setAttribute('disabled', true);
      //         break;
      //     }

      //     if (b !== '' && b === c) {
      //       gameBoard[winCondition[0]] = computerChoice;
      //       cells[winCondition[0]].innerHTML = computerChoice;
      //       cells[winCondition[0]].setAttribute('disabled', true);
      //       break;
      //     }

      //     if (a !== '' && a === c) {
      //       gameBoard[winCondition[1]] = computerChoice;
      //       cells[winCondition[1]].innerHTML = computerChoice;
      //       cells[winCondition[1]].setAttribute('disabled', true);
      //       break;
      //     }
      //   }
      // } else {

      // }
      blockOrWin();
      // const moveCount = gameBoard.filter(v => v !== '').length;
      // console.log(moveCount)
      // switch (moveCount) {
      //   case 1:

      //     break;
      //   case 3:
      //     blockOrWin();
      //     break;
      //   case 5:
      //     blockOrWin();
      //     break;
      //   case 7:
      //     blockOrWin();
      //     break;
      // }
      break;
  }
}

//////////////////////////////////////////////////////////// newest addition
/// bellow

const blockOrWin =
  () => {
    for (let i = 0; i < winningCombos.length; i++) {
      const winCondition = winningCombos[i];

      const a = gameBoard[winCondition[0]];
      const b = gameBoard[winCondition[1]];
      const c = gameBoard[winCondition[2]];
      // if ((a && b && a == b) || (b && c && b == c) || (a && c && a == c)))
      // //?
      if (a && b && !c) {
        if (a === b) {
          gameBoard[winCondition[2]] = computerChoice;

          if (a === playerChoice) {
            // BLOCK
            let roundDraw = !gameBoard.includes('');

            if (roundDraw) {
              gameStatus.innerHTML = drawMessage
              gameActive = false
              return true;
            } else {
              return false;
            }
          }

          if (a === computerChoice) {
            // WIN
            gameStatus.innerHTML = winningMessage();
            gameActive = false
            return true;
          }
        } else {
          // Leave blank for now
        }
      }
    }
  }

function blockPlayerWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    const winCondition = winningCombos[i];

    const a = gameBoard[winCondition[0]];
    const b = gameBoard[winCondition[1]];
    const c = gameBoard[winCondition[2]];

    // block player if they are about to win
    if ((a === playerChoice && b === playerChoice && !c) ||
      (b === playerChoice && c === playerChoice && !a) ||
      (a === playerChoice && c === playerChoice && !b)) {
      if (a !== computerChoice && a !== playerChoice) {
        gameBoard[winCondition[0]] = computerChoice;
      } else if (b !== computerChoice && b !== playerChoice) {
        gameBoard[winCondition[1]] = computerChoice;
      } else if (c !== computerChoice && c !== playerChoice) {
        gameBoard[winCondition[2]] = computerChoice;
      }

      renderBoard();
      if (!checkForWinner()) {
        playerTurn = true;
      }
      return true;
    }
  }
  return false;
}

function findWinningMove() {
  for (let i = 0; i < winningCombos.length; i++) {
    const winCondition = winningCombos[i];

    const a = gameBoard[winCondition[0]];
    const b = gameBoard[winCondition[1]];
    const c = gameBoard[winCondition[2]];

    // check if computer has oportunity to win
    if ((a === computerChoice && b === computerChoice && !c) ||
      (b === computerChoice && c === computerChoice && !a) ||
      (a === computerChoice && c === computerChoice && !b)) {
      if (a !== computerChoice && a !== playerChoice) {
        gameBoard[winCondition[0]] = computerChoice;
      } else if (b !== computerChoice && b !== playerChoice) {
        gameBoard[winCondition[1]] = computerChoice;
      } else if (c !== computerChoice && c !== playerChoice) {
        gameBoard[winCondition[2]] = computerChoice;
      }

      renderBoard();
      if (!checkForWinner()) {
        playerTurn = true;
      }
      return true;
    }
  }
  return false;
}

function makeRandomMove() {
  // make a random move
  let randomIndex = Math.floor(Math.random() * 9);

  if (!gameBoard[randomIndex]) {
    gameBoard[randomIndex] = computerChoice;
    renderBoard();
    if (!checkForWinner()) {
      playerTurn = true;
    }
  } else {
    makeRandomMove();
  }
}

///////////////////////////////////////////////////// newest addition above

// TODO - Add a switch statement to see how many moves Player has on board
const playerMoves = gameBoard.filter(v => v === playerChoice).length;

switch (playerMoves) {
  case 0:
    gameStatus.textContent = 'Player has not made a move yet'
    break;
  case 1:
    gameStatus.textContent = 'Player has made 1 move'
    break;
  case 2:
    gameStatus.textContent = 'Player has made 2 moves'
    break;
  case 3:
    gameStatus.textContent = 'Player has made 3 moves'
    break;
  case 4:
    gameStatus.textContent = 'Player has made 4 move'
    break;
  case 5:
    gameStatus.textContent = 'Player has made 5 move'
    break;
}

// gameBoard[index] = computerChoice
renderBoard(gameBoard)
if (gameBoard.every(cell => cell !== undefined)) {
  // all cells are filled, prevent any further moves
  cells.forEach(cell => cell.setAttribute('disabled', true));
  // return
}


function checkForWinner() {
  // for(let combo of winningCombos){
  //   if(gameBoard[combo[0]]&& gameBoard[combo[0]] === gameBoard[combo[1]] &&
  //   gameBoard[combo[0]] === gameBoard[combo[2]]) {
  //       disableAllCells();
  //       return true
  //   }
  // }
  // return false

  if (gameBoard.filter(v => v !== '').length > 4) {
    let len = winningCombos.length;

    for (let i = 0; i < len; i++) {
      const winCondition = winningCombos[i];
      const a = gameBoard[winCondition[0]];
      const b = gameBoard[winCondition[1]];
      const c = gameBoard[winCondition[2]];

      if (a !== '' && a === b && b === c) {
        gameWon = true;
        break
      }
    }

    if (gameWon) {
      gameStatus.innerHTML = winningMessage();
      gameActive = false
      return true;
    }

    let roundDraw = !gameBoard.includes('')

    if (roundDraw) {
      gameStatus.innerHTML = drawMessage
      gameActive = false
      return true;
    }
  }

  return false;
}