'use strict';
const container = document.querySelector('.container');
const item0 = document.querySelector('.item--0');
const item1 = document.querySelector('.item--1');
const item2 = document.querySelector('.item--2');
const item3 = document.querySelector('.item--3');
const item4 = document.querySelector('.item--4');
const item5 = document.querySelector('.item--5');
const item6 = document.querySelector('.item--6');
const item7 = document.querySelector('.item--7');
const item8 = document.querySelector('.item--8');
const newGame = document.querySelector('.new--game');
const p = document.querySelector('p');
let cells = [item0, item1, item2, item3, item4, item5, item6, item7, item8];
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
let won;
let playing = true;
container.addEventListener('click', e => {
  const clicked = e.target;
  cells.forEach(cell => {
    if (clicked === cell && cell.textContent === '') {
      if (playing) {
        console.log(cell);
        p.textContent = '';
        cell.textContent = turn;
        let cellIndex = cells.indexOf(cell);
        gameBoard[cellIndex] = turn;
        console.log(gameBoard);
        if (gameBoard.every(board => board !== '')) {
          p.textContent = 'DRAW';
        }
        win(turn);
        turn === 'X' ? (turn = 'O') : (turn = 'X');
        if (!won) p.textContent = `${turn} turn`;
      } else if (clicked === cell && cell.textContent !== '') {
        p.textContent = 'Cell already picked, please pick another cell';
      }
    }
  });
});
let win = function (turn) {
  winningConditions.forEach(win => {
    if (win.every(el => gameBoard[el] === turn)) {
      p.textContent = `Player ${turn} wins`;
      won = true;
      playing = false;
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      win.forEach(el => (cells[el].style.backgroundColor = 'green'));
    }
  });
};

newGame.addEventListener('click', () => {
  cells.forEach(cell => (cell.textContent = ''));
  cells.forEach(cell => (cell.style.backgroundColor = ''));
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  p.textContent = '';
  playing = true;
  won = false;
  turn = 'X';
});
