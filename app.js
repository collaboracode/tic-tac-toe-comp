function Player(player, choice) {
    this.player = player;
    this.choice = choice;
  }

  function GameBoard(){
  gameBoard = [null, null, null, null, null, null, null, null, null, ]
  }



const humanPlayer = new Player('Human', 'X');
const computerPlayer = new Player('Computer', 'O');
const gameBoard = new GameBoard(humanPlayer, computerPlayer);


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
