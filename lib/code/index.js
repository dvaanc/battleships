"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.DOM = void 0;

var _newShip = require("./newShip");

var _newPlayer = _interopRequireDefault(require("./newPlayer"));

var _newGameboard = _interopRequireDefault(require("./newGameboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// eslint-disable-next-line func-names
var DOM = function () {
  var playerGameboard = document.querySelector('#player');
  var enemyGameboard = document.querySelector('#enemy');
  var playerGameboardArr = Array.from(playerGameboard.children);
  var enemyGameboardArr = Array.from(enemyGameboard.children);
  var restartButton = document.querySelector('#restart');
  var placeShipsModalContainer = document.querySelector('#placeShips');
  var ships = document.querySelectorAll('.ship');
  var placeShipsGameboard = document.querySelector('#placeShips-gameboard');
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
      console.log(game.placeShipsGameboard.fleet[0].type);
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
  placeRandomButton.addEventListener('click', function (e) {
    game.randomShipPlacement(true);
    placeShipsModalContainer.style.opacity = 0;
    placeShipsModalContainer.style.pointerEvents = 'none';
  }, false);
  enemyGameboard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
      console.log(enemyGameboardArr.indexOf(e.target));
    }
  });
  startButton.addEventListener('click', function () {}, false);
  restartButton.addEventListener('click', function () {
    game.restartGame();
  });

  function clearBoard(gameboard) {
    gameboard.forEach(function (cell) {
      // cell2 var is the parameter, had to declare another var to meet eslint requirements
      var cell2 = cell;
      cell.classList.remove('hit');
      cell.classList.remove('reveal-cell');
      cell2.innerText = '';
    });
  }

  function setMessage(str) {
    var messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function toggleClicks(_boolean) {
    if (_boolean) {
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

  function initialiseGame() {
    playerGameboard.clearBoard();
    enemyGameboard.clearBoard();
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function placeShip(shipType, index) {
    var shipObj = playerGameboard.grabShip(shipType);

    if (playerGameboard.validPlacement(shipObj, index)) {
      playerGameboard.placeShip(shipObj, index);
      playerGameboard.renderToDOM(DOM.placeShipsGameboardArr);
      return true;
    }

    console.log('something went wrong!');
    return false;
  }

  function randomShipPlacement(_boolean2) {
    initialiseGame();
    if (_boolean2) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
    playerGameboard.revealShips(DOM.playerGameboardArr);
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
game.initialiseGame(); // const [first, second, third, fourth, fifth] = game.placeShipsGameboard.fleet;

var ship = null;

var _game$playerGameboard = _slicedToArray(game.playerGameboard.fleet, 5);

ship = _game$playerGameboard[4];
console.log(ship); // console.log(first, second, third, fourth, fifth);

game.playerGameboard.grabShip('carrier');