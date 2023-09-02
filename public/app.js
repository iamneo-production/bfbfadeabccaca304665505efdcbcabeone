// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let cellsElements = document.querySelectorAll('.cell'); 

let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player moves
const ticTacToe = (element, index) => {
    if (cells[index] === '' && !checkWin()) {
        cells[index] = currentPlayer;
        element.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // Display the current player's turn
        result.textContent = `Current Player: ${currentPlayer}`;
    }
};

// Function to check for a win
const checkWin = () => {
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            result.textContent = `${currentPlayer} wins!`;
            cellsElements.forEach(cell => cell.removeEventListener('click', handleClick)); // Disable cell clicks
            return true; // Return true to indicate a win
        }
    }
    return false; // No winner yet
};

// Function to reset the game
const resetGame = () => {
    cells = ['', '', '', '', '', '', '', '', ''];
    cellsElements.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick); // Re-enable cell clicks
    });
    currentPlayer = 'X';
    result.textContent = 'Current Player: X';
};

// Function to handle cell clicks
const handleClick = (event) => {
    const cellElement = event.target;
    const index = Array.from(cellsElements).indexOf(cellElement);
    ticTacToe(cellElement, index);
};

// Add click event listeners to cells
cellsElements.forEach(cell => cell.addEventListener('click', handleClick));

document.querySelector('#reset').addEventListener('click', resetGame);
