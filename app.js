// TODO
// Add difficulty selector for computer
// Work on computer logic based on difficulty
// Status message on Game End

let gameActive = false;
let gameWon = false;
let playerChoice = ''
let computerChoice = ''
let playerTurn = true;
// const gameBoard = Array.from({length: 9}); // initialize with undefined values
const gameBoard = ['', '', '', '', '', '', '', '', ''];
const board = document.querySelector('.board')
const cells = document.querySelectorAll('.cell')
let gameStatus = document.querySelector('.game--status')

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winningMessage = () => playerTurn ? 'You Won!' : 'Computer Won';
const drawMessage = 'Draw!';

//when user clicks on X button the value 'X' gets stored
//in the playerChoice variable
//and the button O gets disabled
const choiceX = document.getElementById('choiceX');
choiceX.addEventListener('click', (e) => {
   playerChoice = 'X'
   computerChoice = 'O'
   gameActive = true;
   toggleAllCells(false);
   choiceO.setAttribute('disabled', 'true')
});

//when user clicks on O button the value 'O' gets stored
//in the playerChoice variable
//and the button X gets disabled
const choiceO = document.getElementById('choiceO');
choiceO.addEventListener('click', (e) => {
   playerChoice = 'O'
   computerChoice = 'X'
   gameActive = true;
   toggleAllCells(false);
   choiceX.setAttribute('disabled', 'true')
})

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
  cells.forEach((cell, index) => {
      cell.innerHTML = gameBoard[index]
  })

  // playerTurn = Math.round(Math.random()) === 1;

  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].innerHTML = gameBoard[i];
  // }
}

function toggleAllCells(disable = true) {
  cells.forEach(cell => disable ? cell.setAttribute('disabled', true) : cell.removeAttribute('disabled'));
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

 //a forEach loop that appends the chosen value to the DOM
 //after the user clicks on a cell

 cells.forEach((cell, index) => {

  cell.addEventListener('click', (e) => {
    gameBoard[index] = playerChoice
    
    renderBoard()
    checkForWinner()
    playerTurn = !playerTurn;
    // computerMove()
  });

  if (!gameActive) cell.setAttribute('disabled', true);
 });
 
function computerMove() {
  if (!playerTurn) {
      // CURRENT LOGIC IS EASY MODE (RANDOM)
      // Medium Difficulty - 1 Block
      // Hard Difficulty - ALWAYS block
      //a variable that returns a random number from 0 to 8
    // let index = Math.floor(Math.random() * 8)
    //   //if the generated number lands on a cell in the array that is defined
    // while(gameBoard[index] != undefined){
    //   //then it generates another random num
    //     index = Math.floor(Math.random() * 8)

  }
}

  // TODO - Add a switch statement to see how many moves Player has on board
  const playerMoves = gameBoard.filter(v => v === playerChoice).length;

  switch (playerMoves) {
    case 0:

      break;
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
  }

  gameBoard[index] = computerChoice
  renderBoard(gameBoard)
  if (gameBoard.every(cell => cell !== undefined)) {
    //all cells are filled, prevent any further moves
      cells.forEach(cell => cell.setAttribute('disabled', true));
      return
    } 
}

function checkForWinner() {
  // for(let combo of winningCombos){
  //   if(gameBoard[combo[0]]&& gameBoard[combo[0]] === gameBoard[combo[1]] && gameBoard[combo[0]] === gameBoard[combo[2]]) {
  //       disableAllCells();
  //       return true
  //   }
  // }
  // return false

    if (gameBoard.filter(v => v !== '').length > 4) {
      let len = winningCombos.length;
  
      for (let i = 0; i < len; i++) {
        const winCondition = winningCombos[i]

        const a = gameBoard[winCondition[0]]
        const b = gameBoard[winCondition[1]]
        const c = gameBoard[winCondition[2]]

        if(a !== '' && a === b && b === c) {
            gameWon = true;
            break
        }
      }

      if (roundWon) {
        gameStatus.innerHTML = winningMessage()
        gameActive = false
        return
      }

      let roundDraw = !gameBoard.includes('')

      if (roundDraw) {
        gameStatus.innerHTML = drawMessage
        gameActive = false
        return
      }
    }

    return false;
}