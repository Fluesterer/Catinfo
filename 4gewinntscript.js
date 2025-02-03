// 4gewinntscript.js

const cols = 7;
const rows = 6;
let board = [];
let currentPlayer = 'red';
let gameOver = false;
const playerColor = 'red';
const aiColor = 'yellow';

const boardElement = document.querySelector('.board');
const messageElement = document.querySelector('.message');
const restartButton = document.getElementById('restartButton');
const playAgainButton = document.getElementById('playAgainButton');

// Spielfeld aufbauen
function setupBoard() {
  board = [];
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < cols; col++) {
      board[row][col] = null;
    }
  }
}

// Spielfeld rendern
function renderBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (board[row][col]) {
        cell.style.backgroundColor = board[row][col];
      }
      cell.addEventListener('click', () => dropDisc(col));
      boardElement.appendChild(cell);
    }
  }
}

// Überprüfen, ob der Spieler gewonnen hat
function checkWinner() {
  // Überprüfe jede Zeile
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols - 3; col++) {
      if (board[row][col] && 
          board[row][col] === board[row][col+1] && 
          board[row][col] === board[row][col+2] && 
          board[row][col] === board[row][col+3]) {
        return board[row][col];
      }
    }
  }

  // Überprüfe jede Spalte
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows - 3; row++) {
      if (board[row][col] && 
          board[row][col] === board[row+1][col] && 
          board[row][col] === board[row+2][col] && 
          board[row][col] === board[row+3][col]) {
        return board[row][col];
      }
    }
  }

  // Überprüfe Diagonalen (oben links nach unten rechts)
  for (let row = 0; row < rows - 3; row++) {
    for (let col = 0; col < cols - 3; col++) {
      if (board[row][col] && 
          board[row][col] === board[row+1][col+1] && 
          board[row][col] === board[row+2][col+2] && 
          board[row][col] === board[row+3][col+3]) {
        return board[row][col];
      }
    }
  }

  // Überprüfe Diagonalen (unten links nach oben rechts)
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col < cols - 3; col++) {
      if (board[row][col] && 
          board[row][col] === board[row-1][col+1] && 
          board[row][col] === board[row-2][col+2] && 
          board[row][col] === board[row-3][col+3]) {
        return board[row][col];
      }
    }
  }

  return null;
}

// Einen Spielstein ablegen
function dropDisc(col) {
  if (gameOver) return;

  // Spieler macht seinen Zug
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      renderBoard();
      const winner = checkWinner();
      if (winner) {
        gameOver = true;
        messageElement.textContent = `${winner} hat gewonnen!`;
        restartButton.classList.remove('hidden');
      } else {
        currentPlayer = currentPlayer === playerColor ? aiColor : playerColor;
        messageElement.textContent = `${currentPlayer === playerColor ? 'Rot' : 'Gelb'} ist dran!`;
        if (currentPlayer === aiColor) {
          aiTurn();
        }
      }
      return;
    }
  }
}

// AI-Logik: Ein sehr einfacher Zug
function aiTurn() {
  if (gameOver) return;

  // Die KI prüft die Spalten von links nach rechts, um einen gültigen Zug zu machen
  for (let col = 0; col < cols; col++) {
    for (let row = rows - 1; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = aiColor;
        renderBoard();
        const winner = checkWinner();
        if (winner) {
          gameOver = true;
          messageElement.textContent = `${winner} hat gewonnen!`;
          restartButton.classList.remove('hidden');
        } else {
          currentPlayer = playerColor;
          messageElement.textContent = 'Rot ist dran!';
        }
        return;
      }
    }
  }
}

// Neustart des Spiels
restartButton.addEventListener('click', () => {
  setupBoard();
  renderBoard();
  currentPlayer = playerColor;
  messageElement.textContent = 'Rot ist dran!';
  restartButton.classList.add('hidden');
  gameOver = false;
});

// Setup initial
setupBoard();
renderBoard();
messageElement.textContent = 'Rot ist dran!';
