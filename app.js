function Player(player, choice) {
    this.player = player;
    this.choice = choice;
  }
  const gameBoard = ['X', 'O','X', 'O', 'X', 'O', 'X', 'O', 'X']

  const board = document.querySelector('.board')

  function renderBoard(gameBoard){
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index]
    })
  }

const humanPlayer = new Player('Human', 'X');
const computerPlayer = new Player('Computer', 'O');


let playerChoice = ''

 const choiceX = document.getElementById('choiceX')
 choiceX.addEventListener('click' ,() => {
    playerChoice = choiceX.value
    choiceO.setAttribute('disabled', 'true')
 })
 const choiceO = document.getElementById('choiceO')
 choiceO.addEventListener('click' ,() => {
    playerChoice = choiceO.value
    choiceX.setAttribute('disabled', 'true')
 })


 renderBoard(gameBoard)