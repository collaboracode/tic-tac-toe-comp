
let playerChoice = ''
let computerChoice = ''
const gameBoard = Array.from({length: 9}); // initialize with undefined values
const board = document.querySelector('.board')
let currentPlayer



function Player(player, choice) {
    this.player = player;
    this.choice = choice;
  }
  const humanPlayer = new Player('Human', 'X');
const computerPlayer = new Player('Computer', 'O');
if(playerChoice === 'X'){
  currentPlayer = humanPlayer
}else {currentPlayer = computerPlayer}


  function renderBoard(gameBoard){
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index]
    })
  }


//when user clicks on X button the value 'X' gets stored
//in the playerChoice variable
//and the button O gets disabled
 const choiceX = document.getElementById('choiceX')
 choiceX.addEventListener('click' ,() => {
    playerChoice = 'X'
    choiceO.setAttribute('disabled', 'true')
    computerChoice = 'O'
 })
//when user clicks on O button the value 'O' gets stored
//in the playerChoice variable
//and the button X gets disabled
 const choiceO = document.getElementById('choiceO')
 choiceO.addEventListener('click' ,() => {
    playerChoice = 'O'
    choiceX.setAttribute('disabled', 'true')
    computerChoice = 'X'
 })


 const cells = document.querySelectorAll('.cell')
 //a forEach loop that appends the chosen value to the DOM
 //after the user clicks on a cell
 cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    gameBoard[index]= playerChoice
    renderBoard(gameBoard)
    checkForWinner()
    computerMove()
  })
 })


 
 function computerMove(){
//a variable that returns a random number from 0 to 8
 let index = Math.floor(Math.random() * 8)
//if the generated number lands on a cell in the array that is defined
 while(gameBoard[index] != undefined){
//then it generates another random num
   index = Math.floor(Math.random() * 8)
 }
 //if it is undefined, then it stores the index in the 
 //computerChoice variable

  gameBoard[index] = computerChoice
  renderBoard(gameBoard)
  if (gameBoard.every(cell => cell !== undefined)) {
    //all cells are filled, prevent any further moves
      cells.forEach(cell => cell.setAttribute('disabled', 'true'));
      return
    }
}

function disableAllCells(){
  cells.forEach(cell => cell.setAttribute('disabled', 'true'))
}


let winningCombos = [[0, 1, 2], 
[3, 4, 5], 
[6, 7, 8],
[0, 3, 6], 
[1, 4, 7], 
[2, 5, 8], 
[0, 4, 8], 
[2, 4, 6]
]

function checkForWinner(){
  for(let combo of winningCombos){
    if(gameBoard[combo[0]]&&
      gameBoard[combo[0]] === gameBoard[combo[1]] &&
      gameBoard[combo[0]] === gameBoard[combo[2]]){
        disableAllCells();
        return true
    }
  }
  return false
}






