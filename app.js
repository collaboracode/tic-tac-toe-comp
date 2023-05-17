// TODO
// Remove 'undefined' from cells not clicked yet
// Add difficulty selector for computer
// Work on computer logic based on difficulty
// Status message on Game End


let gameActive = false;
let playerChoice = ''
let computerChoice = ''
const gameBoard = Array.from({length: 9}); // initialize with undefined values
const board = document.querySelector('.board')


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

function Player(player, choice) {
    this.player = player;
    this.choice = choice;
}

const humanPlayer = new Player('Human', 'X');
const computerPlayer = new Player('Computer', 'O');

// if (playerChoice === 'X') {
//   var currentPlayer = humanPlayer
// } else {
//   var currentPlayer = computerPlayer
// }

let currentPlayer = playerChoice === 'X' ? humanPlayer : computerPlayer;

const cells = document.querySelectorAll('.cell')

function renderBoard(gameBoard) {
  cells.forEach((cell, index) => {
      cell.innerHTML = gameBoard[index]
  })

  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].innerHTML = gameBoard[i];
  // }
}

function toggleAllCells(disable = true) {
  cells.forEach(cell => disable ? cell.setAttribute('disabled', true) : cell.removeAttribute('disabled'));
}

//when user clicks on X button the value 'X' gets stored
//in the playerChoice variable
//and the button O gets disabled
 const choiceX = document.getElementById('choiceX')
 choiceX.addEventListener('click' , (e) => {
    playerChoice = 'X'
    gameActive = true;
    toggleAllCells(false);
    choiceO.setAttribute('disabled', 'true')
    computerChoice = 'O'
 })

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
//when user clicks on O button the value 'O' gets stored
//in the playerChoice variable
//and the button X gets disabled
 const choiceO = document.getElementById('choiceO')
 choiceO.addEventListener('click' ,(e) => {
    playerChoice = 'O'
    gameActive = true;
    toggleAllCells(false);
    choiceX.setAttribute('disabled', 'true')
    computerChoice = 'X'
 })

 //a forEach loop that appends the chosen value to the DOM
 //after the user clicks on a cell

 cells.forEach((cell, index) => {

  cell.addEventListener('click', (e) => {
    
    gameBoard[index]= playerChoice

    renderBoard(gameBoard)
    checkForWinner()
    computerMove()
  });

  if (!gameActive) cell.setAttribute('disabled', true);
 });

 let winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
];
 
 function computerMove() {
  // CURRENT LOGIC IS EASY MODE (RANDOM)
  // Medium Difficulty - 1 Block
  // Hard Difficulty - ALWAYS block
  //a variable that returns a random number from 0 to 8
 let index = Math.floor(Math.random() * 8)
  //if the generated number lands on a cell in the array that is defined
 while(gameBoard[index] != undefined){
  //then it generates another random num
   index = Math.floor(Math.random() * 8)
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


function checkForWinner(){
  for(let combo of winningCombos){
    if(gameBoard[combo[0]]&& gameBoard[combo[0]] === gameBoard[combo[1]] && gameBoard[combo[0]] === gameBoard[combo[2]]) {
        disableAllCells();
        return true
    }
  }
  return false
}