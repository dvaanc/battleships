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

  const ships = document.querySelectorAll('.ship');
  const placeShipsGameboard = document.querySelector('#placeShips-gameboard');
  const placeShipsCells = placeShipsGameboard.children;
  const placeShipsGameboardArr = Array.from(placeShipsGameboard.children);
  const placeRandomButton = document.querySelector('#place-random');
  const startButton = document.querySelector('#start');
  let currentShipType = null;
  let currentCell = null;

  ships.forEach((ship) => {
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
      console.log(e.target);
      console.log(currentCell);
      e.currentTarget.removeAttribute('draggable');
    });
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

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
      console.log(enemyGameboardArr.indexOf(e.target));
    }
  });

  restartButton.addEventListener('click', () => {
    game.restartGame();
  });

  function clearBoard() {
    playerGameboardArr.forEach((cell) => {
      cell.classList.remove('hit');
      cell.innerText = '';
    });
    enemyGameboardArr.forEach((cell) => {
      cell.classList.remove('hit');
      cell.innerText = '';
    });
  }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function toggleClicks(boolean) {
    if (boolean) {
      return enemyGameboard.classList.add('disable');
    }
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
  };
}());

const game = (function () {
  const player = new Player('player');
  const computer = new Player('Computer');
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();
  const placeShipsGameboard = new Gameboard();

  function initialiseGame() {
    placeShipsGameboard.clearBoard();
    playerGameboard.clearBoard();
    enemyGameboard.clearBoard();
    placeShipsGameboard.initialiseBoard();
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    placeShipsGameboard.generateFleet();
  }

  function placeShip(ship, index) {
    const shipObj = placeShipsGameboard.generateShip(ship);
    if (placeShipsGameboard.validPlacement(shipObj, index)) {
      placeShipsGameboard.placeShip(shipObj, index);
      placeShipsGameboard.renderToDOM(DOM.placeShipsGameboardArr);
      return true;
    }
    console.log('something went wrong!');
    return false;
  }
  placeShipsGameboard.grabShip('carrier');

  function randomShipPlacement(boolean) {
    if (boolean === true) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
  }

  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord) === true) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardArr);
      if (enemyGameboard.allShipsSunk()) {
        console.log('enemy all ships sunk');
        DOM.toggleClicks(true);
      }
      computer.randomMove();
      playerGameboard.receiveAttack(computer.currentMove);
      playerGameboard.renderToDOM(DOM.playerGameboardArr);
      if (playerGameboard.allShipsSunk()) {
        console.log('player ships all sunk');
      }
      return true;
    }
    return console.log('attack did not occur due to clicking on a miss or already hit target');
  }

  function restartGame() {
    DOM.clearBoard();
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
  };
}());
game.initialiseGame();
export { DOM, game };
