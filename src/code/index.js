/* eslint-disable no-use-before-define */
import { type, Ship } from './newShip';
import Player from './newPlayer';
import Gameboard from './newGameboard';

// eslint-disable-next-line func-names
const DOM = (function () {
  const playerGameboard = document.querySelector('#player');
  const enemyGameboard = document.querySelector('#enemy');
  const playerGameboardCells = Array.from(playerGameboard.children);
  const enemyGameboardCells = Array.from(enemyGameboard.children);

  playerGameboard.addEventListener('click', (e) => {
    // const cells = Array.from(e.target.parentNode.children);
    // console.log(playerGameboardCells.indexOf(e.target));
  });

  enemyGameboard.addEventListener('click', (e) => {
    game.gameLoop(enemyGameboardCells.indexOf(e.target));
    console.log(enemyGameboardCells.indexOf(e.target));
  });

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  return { setMessage, playerGameboardCells, enemyGameboardCells };
}());

const game = (function () {
  const player = new Player('player');
  const computer = new Player('Computer');
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();

  function initialiseGame() {
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function randomShipPlacement(boolean) {
    if (boolean === true) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
  }

  function gameLoop(index) {
    enemyGameboard.receiveAttack(index);
    enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
    if (isGameOver()) {
      DOM.setMessage('Player wins!');
    }

    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
    playerGameboard.renderToDOM(DOM.playerGameboardCells);
    if (isGameOver()) {
      DOM.setMessage('Computer wins!');
    }
  }

  function isGameOver() {
    if (enemyGameboard.allShipsSunk() || playerGameboard.allShipsSunk() === false) return true;
  }

  // function renderPlayerGameboard() {
  //   DOM.playerGameboardCells.forEach((cell) => {
  //     const i = DOM.playerGameboardCells.indexOf(cell);
  //     if (playerGameboard.this.board[i].hit) {
  //       cell.classList.add('hit');
  //     }
  //     if (playerGameboard.this.board[i].miss) {
  //       // eslint-disable-next-line no-param-reassign
  //       cell.innerText = 'X';
  //     }
  //   });
  // }

  // function renderEnemyGameboard() {
  //   DOM.enemyGameboardCells.forEach((cell) => {
  //     const i = DOM.enemyGameboardCells.indexOf(cell);
  //     console.log(i);
  //     console.log(enemyGameboard.this.board);
  //     console.log(enemyGameboard.this.board[i]);
  //     if (enemyGameboard.this.board[i].hit) {
  //       cell.classList.add('hit');
  //     }
  //     if (enemyGameboard.this.board[i].miss) {
  //       // eslint-disable-next-line no-param-reassign
  //       cell.innerText = 'X';
  //     }
  //     console.log(cell);
  //   });
  // }

  return {
    gameLoop, randomShipPlacement, playerGameboard, enemyGameboard, initialiseGame,
  };
}());

game.initialiseGame();

// console.log(game.playerGameboard);
// console.log(game.enemyGameboard);

game.randomShipPlacement(true);

export { DOM, game };
