function GameBoard(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    gameBoard = [null, null, null, null, null, null, null, null, null, ]
  }

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
