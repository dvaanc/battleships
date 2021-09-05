/* eslint-disable no-use-before-define */
import { type, Ship } from './newShip';
import Player from './newPlayer';
import Gameboard from './newGameboard';

// eslint-disable-next-line func-names
const DOM = (function () {
  const playerGameboard = document.querySelector('#player');
  const enemyGameboard = document.querySelector('#enemy');
  const gameboards = document.querySelectorAll('.gameboard');
  const gameboardHolder = document.querySelector('.gameboardHolder');
  const playerGameboardCells = Array.from(playerGameboard.children);
  const enemyGameboardCells = Array.from(enemyGameboard.children);
  const restart = document.querySelector('#restart');
  const cell = document.querySelectorAll('.cell');

  // playerGameboard.addEventListener('click', (e) => {
  //   // const cells = Array.from(e.target.parentNode.children);
  //   // console.log(playerGameboardCells.indexOf(e.target));
  // });

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardCells.indexOf(e.target));
      console.log(enemyGameboardCells.indexOf(e.target));
    }
  });

  restart.addEventListener('click', (e) => {
    game.restartGame();
  });

  function clearBoard() {
    cell.forEach((e) => {
      e.innerText = '';
      e.classList.remove('cell');
    });
  }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function gameOver() {
    gameboards.forEach((e) => {
      e.classList.add('disable');
    });
  }

  return {
    clearBoard, setMessage, gameOver, playerGameboardCells, enemyGameboardCells,
  };
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

  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord) === true) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
      if (isGameOver()) {
        DOM.gameOver();
        DOM.setMessage('Player wins!');
      }
    } else {
      return null;
    }
    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
    playerGameboard.renderToDOM(DOM.playerGameboardCells);
    if (isGameOver() === true) {
      DOM.gameOver();
      DOM.setMessage('Computer wins!');
    }
    return null;
  }

  function restartGame() {
    DOM.clearBoard();
    playerGameboard.clearGameboard();
    playerGameboard.initialiseBoard();
    playerGameboard.generateFleet();

    enemyGameboard.clearGameboard();
    enemyGameboard.initialiseBoard();
    enemyGameboard.generateFleet();
  }

  function isGameOver() {
    if (playerGameboard.allShipsSunk() === true) return true;
    if (enemyGameboard.allShipsSunk() === true) return true;
    return false;
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
    gameLoop, randomShipPlacement, playerGameboard, enemyGameboard, initialiseGame, restartGame,
  };
}());

game.initialiseGame();
game.randomShipPlacement(true);

export { DOM, game };
