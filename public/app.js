// JavaScript logic for Tic Tac Toe game
const cells = document.querySelectorAll('.cell');
const resultText = document.getElementById('result');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function handleMove(index) {
    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = currentPlayer;
      const clickedButton = document.getElementsByClassName('btn')[index];
      
      // Set the button's text to the current player's symbol
      clickedButton.innerText = currentPlayer;
      
      // Check for a win or draw
      if (checkWin()) {
        gameActive = false;
        displayResult(`${currentPlayer} wins!`);
      } else if (checkDraw()) {
        gameActive = false;
        displayResult("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnDisplay();
      }
    }
  }
  
// Function to check for a win
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === player);
    });
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.value = '';
        cell.disabled = false;
    });
    currentPlayer = 'X';
    resultText.textContent = `Player ${currentPlayer}'s Turn`;
    gameOver = false;
}

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);
