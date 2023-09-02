
const cells = document.querySelectorAll('.cell');
const resultText = document.getElementById('result');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameOver = false;

function handleCellClick(index) {
    const cell = cells[index];
    if (cell.value === '' && !gameOver) {
        cell.value = currentPlayer;
        cell.disabled = true;

        if (checkWin(currentPlayer)) {
            resultText.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if ([...cells].every(cell => cell.value !== '')) {
            resultText.textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            resultText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].value === player);
    });
}

function resetGame() {
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
