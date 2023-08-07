'use strict';
const container = document.querySelector('.container');
const cells = Array.from(document.querySelectorAll('.container > div'));
const newGame = document.querySelector('.new--game');
const remark = document.querySelector('.remark');
const playWith = document.querySelector('.play--with');
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let turn = 'X';
let won = false;
let playing = true;
let clicked;
let cellIndex;

playWith.addEventListener('click', e => {
  if (e.target.classList.contains('player')) {
    newGame.style.display = 'block';
    playWith.style.display = 'none';
    container.style.display = 'grid';
    container.addEventListener('click', e => {
      clicked = e.target;
      cells.forEach(cell => {
        if (clicked === cell && cell.textContent === '') {
          if (playing) {
            remark.textContent = '';
            cell.textContent = turn;
            cellIndex = cells.indexOf(cell);
            gameBoard[cellIndex] = turn;
            if (gameBoard.every(board => board !== '')) {
              remark.textContent = 'DRAW';
            } else {
              win(turn);
              turn === 'X' ? (turn = 'O') : (turn = 'X');
              if (!won) remark.textContent = `${turn}'s turn`;
            }
          } else if (clicked === cell && cell.textContent !== '') {
            remark.textContent =
              'Cell already picked, please pick another cell';
          }
        }
      });
    });
  }
  if (e.target.classList.contains('comp')) {
    newGame.style.display = 'block';
    playWith.style.display = 'none';
    container.style.display = 'grid';
    if (turn === 'X') remark.textContent = 'Your Turn';
    container.addEventListener('click', e => {
      clicked = e.target;
      cells.forEach(cell => {
        if (cell === clicked && cell.textContent === '') {
          if (playing) {
            cell.textContent = turn;
            cellIndex = cells.indexOf(cell);
            gameBoard[cellIndex] = turn;
            if (gameBoard.every(board => board !== '')) {
              playing = false;
              remark.textContent = 'DRAW';
            }
            win(turn);
            turn === 'X' ? (turn = 'O') : (turn = 'X');
            if (turn === 'O' && !won && gameBoard.some(board => board === '')) {
              remark.textContent = 'Wait Computer is thinking...';
              setTimeout(computer, 1000);
            }
          }
        }
      });
    });
  }
});

newGame.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  cells.forEach(cell => (cell.style.backgroundColor = ''));
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  remark.textContent = '';
  playing = true;
  won = false;
  turn = 'X';
});

let win = function (turn) {
  winningConditions.forEach(win => {
    if (win.every(el => gameBoard[el] === turn)) {
      remark.textContent = `Player ${turn} wins`;
      won = true;
      playing = false;
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      win.forEach(el => (cells[el].style.backgroundColor = 'green'));
    }
  });
};

let random;
let computer = function () {
  remark.textContent = '';
  if (cells.every(cell => cell.textContent !== '')) {
    playing = false;
    return;
  }
  do {
    random = Math.trunc(Math.random() * 9);
  } while (cells[random].textContent !== '');
  cells[random].textContent = 'O';
  gameBoard[random] = 'O';
  win(turn);
  turn = 'X';
  if (turn === 'X' && playing) remark.textContent = 'Your Turn';
};

