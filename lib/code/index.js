"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.DOM = void 0;

var _newPlayer = _interopRequireDefault(require("./newPlayer"));

var _newGameboard = _interopRequireDefault(require("./newGameboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    ship.addEventListener('click', function (e) {
      if (e.target.classList.contains('part')) {
        game.toggleShipAxis(e.currentTarget.id);
        return e.target.parentNode.classList.toggle('vertical');
      }

      if (e.target.classList.contains('ship')) {
        return e.target.classList.toggle('vertical');
      }

      return null;
    });
    ship.addEventListener('dragstart', function (e) {
      currentShipType = e.currentTarget.id;
      e.target.style.opacity = 1;
    }, false);
    ship.addEventListener('dragend', function (e) {
      if (game.placeShip(currentShipType, currentCell)) {
        e.currentTarget.removeAttribute('draggable');
        e.currentTarget.style.pointerEvents = 'none';
        e.currentTarget.style.opacity = 0.4;
      }
    }, false);
  });
  placeShipsGameboard.addEventListener('dragenter', function (e) {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
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
  placeRandomButton.addEventListener('click', function () {
    game.randomShipPlacement(true);
  }, false);
  enemyGameboard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
    }
  });
  startButton.addEventListener('click', function () {
    game.startGame();
  }, false);
  restartButton.addEventListener('click', function () {
    game.restartGame();
  });

  function resetShips() {
    ships.forEach(function (shipType) {
      var ship = shipType;
      ship.classList.remove('vertical');
      ship.style.pointerEvents = 'auto';
      ship.style.opacity = 1;
      ship.setAttribute('draggable', 'true');
    });
  }

  function hidePlaceShipsGameboard() {
    placeShipsModalContainer.style.opacity = 0;
    placeShipsModalContainer.style.pointerEvents = 'none';
  }

  function showPlaceShipsGameboard() {
    placeShipsModalContainer.style.opacity = 1;
    placeShipsModalContainer.style.pointerEvents = 'auto';
  }

  function clearBoard(gameboard) {
    gameboard.forEach(function (cell) {
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

  return {
    setMessage: setMessage,
    placeShipsGameboardArr: placeShipsGameboardArr,
    playerGameboardArr: playerGameboardArr,
    enemyGameboardArr: enemyGameboardArr,
    toggleClicks: toggleClicks,
    clearBoard: clearBoard,
    hidePlaceShipsGameboard: hidePlaceShipsGameboard,
    showPlaceShipsGameboard: showPlaceShipsGameboard,
    resetShips: resetShips
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

  function toggleShipAxis(shipType) {
    var shipObj = playerGameboard.grabShip(shipType);

    if (shipObj.isVertical === true) {
      shipObj.isVertical = false;
    }

    shipObj.isVertical = true;
    return null;
  }

  function placeShip(shipType, index) {
    var shipObj = playerGameboard.grabShip(shipType);

    if (!playerGameboard.invalidPlacement(shipObj, index)) {
      playerGameboard.placeShip(shipObj, index);
      playerGameboard.revealShips(DOM.placeShipsGameboardArr);
      return true;
    }

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

  function randomShipPlacement(_boolean2) {
    initialiseGame();
    if (_boolean2) playerGameboard.randomShipPlacement();
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

    return false;
  }

  function restartGame() {
    DOM.clearBoard(DOM.playerGameboardArr);
    DOM.clearBoard(DOM.enemyGameboardArr);
    DOM.clearBoard(DOM.placeShipsGameboardArr);
    DOM.setMessage('');
    initialiseGame();
    player.clearPastHits();
    computer.clearPastHits();
    DOM.resetShips();
    DOM.toggleClicks();
    DOM.showPlaceShipsGameboard();
  }

  return {
    gameLoop: gameLoop,
    randomShipPlacement: randomShipPlacement,
    playerGameboard: playerGameboard,
    enemyGameboard: enemyGameboard,
    initialiseGame: initialiseGame,
    restartGame: restartGame,
    placeShip: placeShip,
    startGame: startGame,
    toggleShipAxis: toggleShipAxis
  };
}();

exports.game = game;
game.initialiseGame();