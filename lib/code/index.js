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
  var playerGameboardCells = Array.from(playerGameboard.children);
  var enemyGameboardCells = Array.from(enemyGameboard.children); // const restartButton = document.querySelector('#restart');
  // playerGameboard.addEventListener('click', (e) => {
  //   // const cells = Array.from(e.target.parentNode.children);
  //   // console.log(playerGameboardCells.indexOf(e.target));
  // });

  enemyGameboard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardCells.indexOf(e.target));
      console.log(enemyGameboardCells.indexOf(e.target));
    }
  }); // restartButton.addEventListener('click', () => {
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
    var messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  } // function disableClicks() {
  //   enemyGameboard.classList.add('disable');
  // }


  return {
    setMessage: setMessage,
    playerGameboardCells: playerGameboardCells,
    enemyGameboardCells: enemyGameboardCells // disableClicks,
    // clearBoard,

  };
}();

exports.DOM = DOM;

var game = function () {
  var player = new _newPlayer["default"]('player');
  var computer = new _newPlayer["default"]('Computer');
  var playerGameboard = new _newGameboard["default"]();
  var enemyGameboard = new _newGameboard["default"]();

  function initialiseGame() {
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function randomShipPlacement(_boolean) {
    if (_boolean === true) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
  } // function gameLoop(index) {
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
        console.log('enemy all ships sunk'); // DOM.disableClicks();
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
  } // function restartGame() {
  //   playerGameboard.clearBoard();
  //   playerGameboard.initialiseGame();
  //   initialiseGame();
  //   randomShipPlacement(true);
  // }


  return {
    gameLoop: gameLoop,
    randomShipPlacement: randomShipPlacement,
    playerGameboard: playerGameboard,
    enemyGameboard: enemyGameboard,
    initialiseGame: initialiseGame // restartGame,

  };
}();

exports.game = game;
game.initialiseGame();
game.randomShipPlacement(true);