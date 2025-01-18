const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`; // Corrected string interpolation
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    // Corrected condition to check if the cell is empty and the game is running
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer; 
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
    statusText.textContent = `${currentPlayer}'s turn`; 
}

function checkWinner() {
    let roundWon = false;
    
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "It's a draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options.fill(""); 
    running = true;
    
    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}