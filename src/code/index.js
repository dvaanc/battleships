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
  // const restartButton = document.querySelector('#restart');

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

  // restartButton.addEventListener('click', () => {

  // });

  // function clearBoard() {
  //   playerGameboardCells.forEach((cell) => {
  //     cell.classList.remove('hit');
  //     cell.innerText = '';
  //   });
  //   enemyGameboardCells.forEach((cell) => {
  //     cell.classList.remove('hit');
  //     cell.innerText = '';
  //   });
  // }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  // function disableClicks() {
  //   enemyGameboard.classList.add('disable');
  // }

  return {
    setMessage,
    playerGameboardCells,
    enemyGameboardCells,
    // disableClicks,
    // clearBoard,
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

  // function gameLoop(index) {
  //   enemyGameboard.receiveAttack(index);
  //   enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
  //   if (isGameOver()) {
  //     DOM.setMessage('Player wins!');
  //   }
  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord) === true) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
      if (enemyGameboard.allShipsSunk()) {
        console.log('enemy all ships sunk');
        // DOM.disableClicks();
      }
      computer.randomMove();
      playerGameboard.receiveAttack(computer.currentMove);
      playerGameboard.renderToDOM(DOM.playerGameboardCells);
      if (playerGameboard.allShipsSunk()) {
        console.log('player ships all sunk');
      }
      return true;
    }
    return console.log('attack did not occur due to clicking on a miss or already hit target');
  }

  // function restartGame() {
  //   playerGameboard.clearBoard();
  //   playerGameboard.initialiseGame();
  //   initialiseGame();
  //   randomShipPlacement(true);
  // }

  return {
    gameLoop,
    randomShipPlacement,
    playerGameboard,
    enemyGameboard,
    initialiseGame,
    // restartGame,
  };
}());
game.initialiseGame();
game.randomShipPlacement(true);
export { DOM, game };
