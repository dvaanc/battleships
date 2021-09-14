/* eslint-disable no-use-before-define */
import { type, Ship } from './newShip';
import Player from './newPlayer';
import Gameboard from './newGameboard';

// eslint-disable-next-line func-names
const DOM = (function () {
  const playerGameboard = document.querySelector('#player');
  const enemyGameboard = document.querySelector('#enemy');
  const playerGameboardArr = Array.from(playerGameboard.children);
  const enemyGameboardArr = Array.from(enemyGameboard.children);
  const restartButton = document.querySelector('#restart');

  const placeShipsModalContainer = document.querySelector('#placeShips');
  const ships = document.querySelectorAll('.ship');
  const placeShipsGameboard = document.querySelector('#placeShips-gameboard');
  const placeShipsGameboardArr = Array.from(placeShipsGameboard.children);
  const placeRandomButton = document.querySelector('#place-random');
  const startButton = document.querySelector('#start');
  let currentShipType = null;
  let currentCell = null;

  ships.forEach((ship) => {
    ship.addEventListener('click', (e) => {
      if (e.target.classList.contains('part')) {
        return e.target.parentNode.classList.toggle('vertical');
      }
      if (e.target.classList.contains('ship')) {
        return e.target.classList.toggle('vertical');
      }
      return null;
    });
    ship.addEventListener('dragstart', (e) => {
      currentShipType = e.currentTarget.id;
      e.target.style.opacity = 0.4;
    }, false);
    ship.addEventListener('dragend', (e) => {
      currentShipType = null;
      e.target.style.opacity = 1;
      currentShipType = '';
    }, false);
    ship.addEventListener('dragend', (e) => {
      const shipType = e.currentTarget.id;
      game.placeShip(shipType, currentCell);
      // e.currentTarget.removeAttribute('draggable');
    }, false);
  });

  placeShipsGameboard.addEventListener('dragenter', (e) => {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        // console.log(placeShipsGameboardArr.indexOf(e.target));
        // console.log(currentShipType);
        const i = placeShipsGameboardArr.indexOf(e.target);
        currentCell = i;
        e.target.classList.add('over');
      }
    }
  }, false);

  placeShipsGameboard.addEventListener('dragleave', (e) => {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        e.target.classList.remove('over');
      }
    }
  }, false);

  placeRandomButton.addEventListener('click', (e) => {
    game.randomShipPlacement(true);
  }, false);

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
      console.log(enemyGameboardArr.indexOf(e.target));
    }
  });

  startButton.addEventListener('click', () => {
    game.startGame();
  }, false);

  restartButton.addEventListener('click', () => {
    game.restartGame();
  });

  function hidePlaceShipsGameboard() {
    placeShipsModalContainer.style.opacity = 0;
    placeShipsModalContainer.style.pointerEvents = 'none';
  }

  function clearBoard(gameboard) {
    gameboard.forEach((cell) => {
      // cell2 var is the parameter, had to declare another var to meet eslint requirements
      const cell2 = cell;
      cell.classList.remove('hit');
      cell.classList.remove('reveal-cell');
      cell2.innerText = '';
    });
  }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function toggleClicks(boolean) {
    if (boolean) {
      playerGameboard.classList.add('disable');
      enemyGameboard.classList.add('disable');
      return true;
    }
    playerGameboard.classList.remove('disable');
    enemyGameboard.classList.remove('disable');
    return false;
  }

  function toggleCells(gameboard) {
    gameboard.classList.toggle('reveal-cell');
  }

  return {
    setMessage,
    placeShipsGameboardArr,
    playerGameboardArr,
    enemyGameboardArr,
    toggleClicks,
    clearBoard,
    hidePlaceShipsGameboard,
  };
}());

const game = (function () {
  const player = new Player('player');
  const computer = new Player('Computer');
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();

  function initialiseGame() {
    playerGameboard.clearBoard();
    enemyGameboard.clearBoard();
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function placeShip(shipType, index) {
    const shipObj = playerGameboard.grabShip(shipType);
    console.log(shipObj);
    if (!playerGameboard.invalidPlacement(shipObj, index)) {
      playerGameboard.placeShip(shipObj, index);
      playerGameboard.renderToDOM(DOM.placeShipsGameboardArr);
      return true;
    }
    console.log('something went wrong!');
    return false;
  }

  function startGame() {
    if (playerGameboard.allShipsPlaced()) {
      enemyGameboard.randomShipPlacement();
      playerGameboard.revealShips(DOM.playerGameboardArr);
      DOM.hidePlaceShipsGameboard();
      return true;
    }
    return false;
  }
  function randomShipPlacement(boolean) {
    initialiseGame();
    if (boolean) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
    playerGameboard.revealShips(DOM.playerGameboardArr);
    DOM.hidePlaceShipsGameboard();
  }

  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord)) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardArr);
      if (enemyGameboard.allShipsSunk()) {
        DOM.setMessage('Player wins! All enemy ships have been destroyed!');
        DOM.toggleClicks(true);
      }
      computer.randomMove();
      playerGameboard.receiveAttack(computer.currentMove);
      playerGameboard.renderToDOM(DOM.playerGameboardArr);
      if (playerGameboard.allShipsSunk()) {
        DOM.setMessage('Enemy wins! All player ships have been destroyed!');
        DOM.toggleClicks(true);
      }
      return true;
    }
    return console.log('attack did not occur due to clicking on a miss or already hit target');
  }

  function restartGame() {
    DOM.clearBoard(DOM.playerGameboardArr);
    DOM.clearBoard(DOM.enemyGameboardArr);
    DOM.clearBoard(DOM.placeShipsGameboardArr);
    initialiseGame();
    randomShipPlacement(true);
    player.clearPastHits();
    computer.clearPastHits();
    DOM.toggleClicks();
  }

  return {
    gameLoop,
    randomShipPlacement,
    playerGameboard,
    enemyGameboard,
    initialiseGame,
    restartGame,
    placeShip,
    startGame,
  };
}());
game.initialiseGame();
// const [first, second, third, fourth, fifth] = game.placeShipsGameboard.fleet;
let ship = null;
[, , , , ship] = game.playerGameboard.fleet;
console.log(ship);
// console.log(first, second, third, fourth, fifth);
game.playerGameboard.grabShip('carrier');
export { DOM, game };
