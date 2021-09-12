"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.DOM = void 0;

var _newShip = require("./newShip");

var _newPlayer = _interopRequireDefault(require("./newPlayer"));

var _newGameboard = _interopRequireDefault(require("./newGameboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-use-before-define */
// eslint-disable-next-line func-names
var DOM = function () {
  var playerGameboard = document.querySelector('#player');
  var enemyGameboard = document.querySelector('#enemy');
  var playerGameboardArr = Array.from(playerGameboard.children);
  var enemyGameboardArr = Array.from(enemyGameboard.children);
  var restartButton = document.querySelector('#restart');
  var ships = document.querySelectorAll('.ship');
  var placeShipsGameboard = document.querySelector('#placeShips-gameboard');
  var placeShipsCells = placeShipsGameboard.children;
  var placeShipsGameboardArr = Array.from(placeShipsGameboard.children);
  var placeRandomButton = document.querySelector('#place-random');
  var startButton = document.querySelector('#start');
  var currentShipType = null;
  var currentCell = null;
  ships.forEach(function (ship) {
    ship.addEventListener('dragstart', function (e) {
      currentShipType = e.currentTarget.id;
      e.target.style.opacity = 0.4;
    }, false);
    ship.addEventListener('dragend', function (e) {
      currentShipType = null;
      e.target.style.opacity = 1;
      currentShipType = '';
    }, false);
    ship.addEventListener('dragend', function (e) {
      console.log(e.target);
      console.log(currentCell);
      e.currentTarget.removeAttribute('draggable');
    });
  });
  placeShipsGameboard.addEventListener('dragenter', function (e) {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        // console.log(placeShipsGameboardArr.indexOf(e.target));
        // console.log(currentShipType);
        var i = placeShipsGameboardArr.indexOf(e.target);
        currentCell = i;
        e.target.classList.add('over');
      }
    }
  }, false);
  placeShipsGameboard.addEventListener('dragleave', function (e) {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        e.target.classList.remove('over');
      }
    }
  }, false);
  enemyGameboard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
      console.log(enemyGameboardArr.indexOf(e.target));
    }
  });
  restartButton.addEventListener('click', function () {
    game.restartGame();
  });

  function clearBoard() {
    playerGameboardArr.forEach(function (cell) {
      cell.classList.remove('hit');
      cell.innerText = '';
    });
    enemyGameboardArr.forEach(function (cell) {
      cell.classList.remove('hit');
      cell.innerText = '';
    });
  }

  function setMessage(str) {
    var messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function toggleClicks(_boolean) {
    if (_boolean) {
      return enemyGameboard.classList.add('disable');
    }

    enemyGameboard.classList.remove('disable');
    return false;
  }

  function toggleCells(gameboard) {
    gameboard.classList.toggle('reveal-cell');
  }

  return {
    setMessage: setMessage,
    placeShipsGameboardArr: placeShipsGameboardArr,
    playerGameboardArr: playerGameboardArr,
    enemyGameboardArr: enemyGameboardArr,
    toggleClicks: toggleClicks,
    clearBoard: clearBoard
  };
}();

exports.DOM = DOM;

var game = function () {
  var player = new _newPlayer["default"]('player');
  var computer = new _newPlayer["default"]('Computer');
  var playerGameboard = new _newGameboard["default"]();
  var enemyGameboard = new _newGameboard["default"]();
  var placeShipsGameboard = new _newGameboard["default"]();

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
    var shipObj = placeShipsGameboard.generateShip(ship);

    if (placeShipsGameboard.validPlacement(shipObj, index)) {
      placeShipsGameboard.placeShip(shipObj, index);
      placeShipsGameboard.renderToDOM(DOM.placeShipsGameboardArr);
      return true;
    }

    console.log('something went wrong!');
    return false;
  }

  placeShipsGameboard.grabShip('carrier');

  function randomShipPlacement(_boolean2) {
    if (_boolean2 === true) playerGameboard.randomShipPlacement();
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
    gameLoop: gameLoop,
    randomShipPlacement: randomShipPlacement,
    playerGameboard: playerGameboard,
    enemyGameboard: enemyGameboard,
    initialiseGame: initialiseGame,
    restartGame: restartGame,
    placeShip: placeShip
  };
}();

exports.game = game;
game.initialiseGame();