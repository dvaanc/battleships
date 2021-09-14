/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code/newGameboard.js":
/*!**********************************!*\
  !*** ./src/code/newGameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newShip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newShip */ "./src/code/newShip.js");


// eslint-disable-next-line no-unused-vars
class Gameboard {
  constructor(val = 100) {
    this.val = val;
    this.board = [];
    this.fleet = [];
    this.lastHit = {
      hit: false,
      location: null,
    };
  }

  initialiseBoard() {
    for (let i = 0; i < this.val; i += 1) {
      this.board.push({
        hasShip: false, shipType: null, hit: false, miss: false,
      });
    }
  }

  clearBoard() {
    this.board = [];
    this.fleet = [];
  }

  renderToDOM(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hit) DOMBoard[i].classList.add('hit');
      // eslint-disable-next-line no-param-reassign
      if (index.miss) DOMBoard[i].innerText = 'X';
    });
  }

  revealShips(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hasShip === true) {
        DOMBoard[i].classList.add('reveal-cell');
      }
    });
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  generateFleet() {
    Object.keys(_newShip__WEBPACK_IMPORTED_MODULE_0__.type).forEach((shipObj) => {
      const ship = new _newShip__WEBPACK_IMPORTED_MODULE_0__.Ship(_newShip__WEBPACK_IMPORTED_MODULE_0__.type[shipObj]);
      this.fleet.push(ship);
    });
  }

  grabShip(shipType) {
    let ship = null;
    switch (shipType) {
      case 'carrier':
        [ship] = this.fleet;
        break;
      case 'battleship':
        [, ship] = this.fleet;
        break;
      case 'cruiser':
        [, , ship] = this.fleet;
        break;
      case 'submarine':
        [, , , ship] = this.fleet;
        break;
      case 'destroyer':
        [, , , , ship] = this.fleet;
        break;
      default:
        return false;
    }
    return ship;
  }

  placeShip(shipObj, startCoord) {
    const ship = shipObj;
    if (ship.isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i * 10].shipType = ship.type;
        this.board[startCoord + i * 10].hasShip = true;
      }
      ship.isPlaced = true;
    }
    if (!ship.isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true;
      }
      ship.isPlaced = true;
    }
    return null;
  }

  randomShipPlacement() {
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.callRandomNumber(2) === 0) {
        this.fleet[i].isVertical = false;
      } else {
        this.fleet[i].isVertical = true;
      }
    }
    for (let i = 0; i < this.fleet.length; i += 1) {
      const randomCoord = this.callRandomNumber(this.val);
      const ship = this.fleet[i];
      if (this.invalidPlacement(ship, randomCoord) === true) {
        this.clearBoard();
        this.initialiseBoard();
        this.generateFleet();
        return this.randomShipPlacement();
      }
      this.placeShip(ship, randomCoord);
    }
    return null;
  }

  receiveAttack(coord) {
    if (this.board[coord].miss || this.board[coord].hit === true) return false;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
    if (this.board[coord].hasShip === false) this.board[coord].miss = true;
    return true;
  }

  getNameOfShip(coord) {
    if (this.board[coord].hasShip) return this.board[coord].shipType;
    return false;
  }

  hpHit(name) {
    const shipArr = this.board.filter((coord) => coord.shipType === name);
    const findCorrectShip = this.fleet.filter((ship) => ship.type === name);
    for (let i = 0; i < shipArr.length; i += 1) {
      if (shipArr[i].hit) findCorrectShip[0].hit(i);
    }
  }

  filterByShipType(name) {
    const shipArr = this.board.filter((index) => index.shipType === name);
    return shipArr;
  }

  invalidPlacement(ship, startCoord) {
    if (ship.isVertical === true) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          // console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i * 10].hasShip === true) {
          // console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
    }
    if (ship.isVertical === false) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i)) {
          // console.log('Out of bounds!');
          return true;
        }
        if (i >= 1) {
          const rounded = Math.ceil(startCoord / 10) * 10;
          if (startCoord + i >= rounded) {
            // console.log('continues on next line!');
            return true;
          }
        }
        if (this.board[startCoord + i].hasShip === true) {
          // console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
    }
    return false;
  }

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsPlaced() {
    return this.fleet.every((ship) => ship.isPlaced === true);
  }

  allShipsSunk() {
    // console.log(this.fleet);
    // console.log(this.fleet.every((ship) => ship.isDestroyed()));
    return this.fleet.every((ship) => ship.isDestroyed());
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/code/newPlayer.js":
/*!*******************************!*\
  !*** ./src/code/newPlayer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// eslint-disable-next-line no-unused-vars
class Player {
  constructor(name) {
    this.name = name;
    this.pastHits = [];
    this.currentMove = null;
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  randomMove() {
    const coord = this.callRandomNumber(100);
    if (this.pastHits.some((pastHit) => pastHit === coord)) {
      return this.randomMove();
    }
    this.pastHits.push(coord);
    this.currentMove = coord;
    return coord;
  }

  clearPastHits() {
    this.pastHits = [];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/code/newShip.js":
/*!*****************************!*\
  !*** ./src/code/newShip.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "type": () => (/* binding */ type),
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
// eslint-disable-next-line no-unused-vars
const type = {
  carrier: {
    type: 'carrier',
    length: 5,
  },
  battleship: {
    type: 'battleship',
    length: 4,
  },
  cruiser: {
    type: 'cruiser',
    length: 3,
  },
  submarine: {
    type: 'submarine',
    length: 3,
  },
  destroyer: {
    type: 'destroyer',
    length: 2,
  },
};

class Ship {
  constructor(ship, vertical = false) {
    this.type = ship.type;
    this.length = ship.length;
    this.hp = Array(this.length).fill(null);
    this.isVertical = vertical;
    this.isPlaced = false;
  }

  hit(index) {
    this.hp[index] = true;
    if (this.isDestroyed()) return true;
    return this.hp;
  }

  isDestroyed() {
    return this.hp.every((hp) => hp === true);
  }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/code/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM),
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _newPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newPlayer */ "./src/code/newPlayer.js");
/* harmony import */ var _newGameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newGameboard */ "./src/code/newGameboard.js");



const DOM = (() => {
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
        game.toggleShipAxis(e.currentTarget.id);
        return e.target.parentNode.classList.toggle('vertical');
      }
      if (e.target.classList.contains('ship')) {
        return e.target.classList.toggle('vertical');
      }
      return null;
    });
    ship.addEventListener('dragstart', (e) => {
      currentShipType = e.currentTarget.id;
      e.target.style.opacity = 1;
    }, false);
    ship.addEventListener('dragend', (e) => {
      if (game.placeShip(currentShipType, currentCell)) {
        e.currentTarget.removeAttribute('draggable');
        e.currentTarget.style.pointerEvents = 'none';
        e.currentTarget.style.opacity = 0.4;
      }
    }, false);
  });

  placeShipsGameboard.addEventListener('dragenter', (e) => {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
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

  placeRandomButton.addEventListener('click', () => {
    game.randomShipPlacement(true);
  }, false);

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
    }
  });

  startButton.addEventListener('click', () => {
    game.startGame();
  }, false);

  restartButton.addEventListener('click', () => {
    game.restartGame();
  });

  function resetShips() {
    ships.forEach((shipType) => {
      const ship = shipType;
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
    gameboard.forEach((cell) => {
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

  return {
    setMessage,
    placeShipsGameboardArr,
    playerGameboardArr,
    enemyGameboardArr,
    toggleClicks,
    clearBoard,
    hidePlaceShipsGameboard,
    showPlaceShipsGameboard,
    resetShips,
  };
})();

const game = (() => {
  const player = new _newPlayer__WEBPACK_IMPORTED_MODULE_0__.default('player');
  const computer = new _newPlayer__WEBPACK_IMPORTED_MODULE_0__.default('Computer');
  const playerGameboard = new _newGameboard__WEBPACK_IMPORTED_MODULE_1__.default();
  const enemyGameboard = new _newGameboard__WEBPACK_IMPORTED_MODULE_1__.default();

  function initialiseGame() {
    playerGameboard.clearBoard();
    enemyGameboard.clearBoard();
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function toggleShipAxis(shipType) {
    const shipObj = playerGameboard.grabShip(shipType);
    if (shipObj.isVertical === true) {
      shipObj.isVertical = false;
    }
    shipObj.isVertical = true;
    return null;
  }

  function placeShip(shipType, index) {
    const shipObj = playerGameboard.grabShip(shipType);
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
    gameLoop,
    randomShipPlacement,
    playerGameboard,
    enemyGameboard,
    initialiseGame,
    restartGame,
    placeShip,
    startGame,
    toggleShipAxis,
  };
})();
game.initialiseGame();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3R2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3UGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3U2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSwgU2hpcCB9IGZyb20gJy4vbmV3U2hpcCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IodmFsID0gMTAwKSB7XG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuZmxlZXQgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXQgPSB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgbG9jYXRpb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpc2VCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh7XG4gICAgICAgIGhhc1NoaXA6IGZhbHNlLCBzaGlwVHlwZTogbnVsbCwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGVhckJvYXJkKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gIH1cblxuICByZW5kZXJUb0RPTShET01Cb2FyZCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmJvYXJkLmluZGV4T2YoaW5kZXgpO1xuICAgICAgaWYgKGluZGV4LmhpdCkgRE9NQm9hcmRbaV0uY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGlmIChpbmRleC5taXNzKSBET01Cb2FyZFtpXS5pbm5lclRleHQgPSAnWCc7XG4gICAgfSk7XG4gIH1cblxuICByZXZlYWxTaGlwcyhET01Cb2FyZCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmJvYXJkLmluZGV4T2YoaW5kZXgpO1xuICAgICAgaWYgKGluZGV4Lmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgRE9NQm9hcmRbaV0uY2xhc3NMaXN0LmFkZCgncmV2ZWFsLWNlbGwnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbCk7XG4gIH1cblxuICBjYWxsUmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJhbmRvbU51bWJlcih2YWwpO1xuICB9XG5cbiAgZ2VuZXJhdGVGbGVldCgpIHtcbiAgICBPYmplY3Qua2V5cyh0eXBlKS5mb3JFYWNoKChzaGlwT2JqKSA9PiB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAodHlwZVtzaGlwT2JqXSk7XG4gICAgICB0aGlzLmZsZWV0LnB1c2goc2hpcCk7XG4gICAgfSk7XG4gIH1cblxuICBncmFiU2hpcChzaGlwVHlwZSkge1xuICAgIGxldCBzaGlwID0gbnVsbDtcbiAgICBzd2l0Y2ggKHNoaXBUeXBlKSB7XG4gICAgICBjYXNlICdjYXJyaWVyJzpcbiAgICAgICAgW3NoaXBdID0gdGhpcy5mbGVldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYXR0bGVzaGlwJzpcbiAgICAgICAgWywgc2hpcF0gPSB0aGlzLmZsZWV0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NydWlzZXInOlxuICAgICAgICBbLCAsIHNoaXBdID0gdGhpcy5mbGVldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWJtYXJpbmUnOlxuICAgICAgICBbLCAsICwgc2hpcF0gPSB0aGlzLmZsZWV0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rlc3Ryb3llcic6XG4gICAgICAgIFssICwgLCAsIHNoaXBdID0gdGhpcy5mbGVldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBzaGlwO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXBPYmosIHN0YXJ0Q29vcmQpIHtcbiAgICBjb25zdCBzaGlwID0gc2hpcE9iajtcbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5zaGlwVHlwZSA9IHNoaXAudHlwZTtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHNoaXAuaXNQbGFjZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHNoaXAuaXNQbGFjZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jYWxsUmFuZG9tTnVtYmVyKDIpID09PSAwKSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mbGVldFtpXS5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCByYW5kb21Db29yZCA9IHRoaXMuY2FsbFJhbmRvbU51bWJlcih0aGlzLnZhbCk7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5mbGVldFtpXTtcbiAgICAgIGlmICh0aGlzLmludmFsaWRQbGFjZW1lbnQoc2hpcCwgcmFuZG9tQ29vcmQpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRmxlZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcCwgcmFuZG9tQ29vcmQpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0ubWlzcyB8fCB0aGlzLmJvYXJkW2Nvb3JkXS5oaXQgPT09IHRydWUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFtjb29yZF0uaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmxvY2F0aW9uID0gY29vcmQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwID09PSBmYWxzZSkgdGhpcy5ib2FyZFtjb29yZF0ubWlzcyA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXROYW1lT2ZTaGlwKGNvb3JkKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHJldHVybiB0aGlzLmJvYXJkW2Nvb3JkXS5zaGlwVHlwZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBocEhpdChuYW1lKSB7XG4gICAgY29uc3Qgc2hpcEFyciA9IHRoaXMuYm9hcmQuZmlsdGVyKChjb29yZCkgPT4gY29vcmQuc2hpcFR5cGUgPT09IG5hbWUpO1xuICAgIGNvbnN0IGZpbmRDb3JyZWN0U2hpcCA9IHRoaXMuZmxlZXQuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnR5cGUgPT09IG5hbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNoaXBBcnJbaV0uaGl0KSBmaW5kQ29ycmVjdFNoaXBbMF0uaGl0KGkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbHRlckJ5U2hpcFR5cGUobmFtZSkge1xuICAgIGNvbnN0IHNoaXBBcnIgPSB0aGlzLmJvYXJkLmZpbHRlcigoaW5kZXgpID0+IGluZGV4LnNoaXBUeXBlID09PSBuYW1lKTtcbiAgICByZXR1cm4gc2hpcEFycjtcbiAgfVxuXG4gIGludmFsaWRQbGFjZW1lbnQoc2hpcCwgc3RhcnRDb29yZCkge1xuICAgIGlmIChzaGlwLmlzVmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHN0YXJ0Q29vcmQgKyBpICogMTApKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ091dCBvZiBib3VuZHMhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdFcnJvciEgUGxhY2VtZW50IGNsYXNoZXMgd2l0aCBhbm90aGVyIHBsYWNlZCBzaGlwIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwLmlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcyhzdGFydENvb3JkICsgaSkpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnT3V0IG9mIGJvdW5kcyEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+PSAxKSB7XG4gICAgICAgICAgY29uc3Qgcm91bmRlZCA9IE1hdGguY2VpbChzdGFydENvb3JkIC8gMTApICogMTA7XG4gICAgICAgICAgaWYgKHN0YXJ0Q29vcmQgKyBpID49IHJvdW5kZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb250aW51ZXMgb24gbmV4dCBsaW5lIScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdXRPZkJvdW5kcyhjb29yZCkge1xuICAgIGlmIChjb29yZCA8IDAgfHwgY29vcmQgPiB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFNoaXBzUGxhY2VkKCkge1xuICAgIHJldHVybiB0aGlzLmZsZWV0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzUGxhY2VkID09PSB0cnVlKTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZsZWV0KTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZsZWV0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzRGVzdHJveWVkKCkpKTtcbiAgICByZXR1cm4gdGhpcy5mbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc0Rlc3Ryb3llZCgpKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gICAgdGhpcy5jdXJyZW50TW92ZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIHJhbmRvbU1vdmUoKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICBpZiAodGhpcy5wYXN0SGl0cy5zb21lKChwYXN0SGl0KSA9PiBwYXN0SGl0ID09PSBjb29yZCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJhbmRvbU1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5wYXN0SGl0cy5wdXNoKGNvb3JkKTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gY29vcmQ7XG4gICAgcmV0dXJuIGNvb3JkO1xuICB9XG5cbiAgY2xlYXJQYXN0SGl0cygpIHtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCB0eXBlID0ge1xuICBjYXJyaWVyOiB7XG4gICAgdHlwZTogJ2NhcnJpZXInLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIGNydWlzZXI6IHtcbiAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIGRlc3Ryb3llcjoge1xuICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbn07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaGlwLCB2ZXJ0aWNhbCA9IGZhbHNlKSB7XG4gICAgdGhpcy50eXBlID0gc2hpcC50eXBlO1xuICAgIHRoaXMubGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgdGhpcy5ocCA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICAgIHRoaXMuaXNQbGFjZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIHRoaXMuaHBbaW5kZXhdID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc0Rlc3Ryb3llZCgpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuXG4gIGlzRGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzLmhwLmV2ZXJ5KChocCkgPT4gaHAgPT09IHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCB7IHR5cGUsIFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBsYXllciBmcm9tICcuL25ld1BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vbmV3R2FtZWJvYXJkJztcblxuY29uc3QgRE9NID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmRBcnIgPSBBcnJheS5mcm9tKHBsYXllckdhbWVib2FyZC5jaGlsZHJlbik7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkQXJyID0gQXJyYXkuZnJvbShlbmVteUdhbWVib2FyZC5jaGlsZHJlbik7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuXG4gIGNvbnN0IHBsYWNlU2hpcHNNb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZVNoaXBzJyk7XG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcbiAgY29uc3QgcGxhY2VTaGlwc0dhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZVNoaXBzLWdhbWVib2FyZCcpO1xuICBjb25zdCBwbGFjZVNoaXBzR2FtZWJvYXJkQXJyID0gQXJyYXkuZnJvbShwbGFjZVNoaXBzR2FtZWJvYXJkLmNoaWxkcmVuKTtcbiAgY29uc3QgcGxhY2VSYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxhY2UtcmFuZG9tJyk7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Jyk7XG4gIGxldCBjdXJyZW50U2hpcFR5cGUgPSBudWxsO1xuICBsZXQgY3VycmVudENlbGwgPSBudWxsO1xuXG4gIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhcnQnKSkge1xuICAgICAgICBnYW1lLnRvZ2dsZVNoaXBBeGlzKGUuY3VycmVudFRhcmdldC5pZCk7XG4gICAgICAgIHJldHVybiBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsJyk7XG4gICAgICB9XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJykpIHtcbiAgICAgICAgcmV0dXJuIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3ZlcnRpY2FsJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgICBjdXJyZW50U2hpcFR5cGUgPSBlLmN1cnJlbnRUYXJnZXQuaWQ7XG4gICAgICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICB9LCBmYWxzZSk7XG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHtcbiAgICAgIGlmIChnYW1lLnBsYWNlU2hpcChjdXJyZW50U2hpcFR5cGUsIGN1cnJlbnRDZWxsKSkge1xuICAgICAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKTtcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICAgIGUuY3VycmVudFRhcmdldC5zdHlsZS5vcGFjaXR5ID0gMC40O1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbiAgfSk7XG5cbiAgcGxhY2VTaGlwc0dhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5wYXJlbnROb2RlID09PSBwbGFjZVNoaXBzR2FtZWJvYXJkKSB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgICAgY29uc3QgaSA9IHBsYWNlU2hpcHNHYW1lYm9hcmRBcnIuaW5kZXhPZihlLnRhcmdldCk7XG4gICAgICAgIGN1cnJlbnRDZWxsID0gaTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnb3ZlcicpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xuXG4gIHBsYWNlU2hpcHNHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZSA9PT0gcGxhY2VTaGlwc0dhbWVib2FyZCkge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXInKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICBwbGFjZVJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBnYW1lLnJhbmRvbVNoaXBQbGFjZW1lbnQodHJ1ZSk7XG4gIH0sIGZhbHNlKTtcblxuICBlbmVteUdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBnYW1lLmdhbWVMb29wKGVuZW15R2FtZWJvYXJkQXJyLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgICB9XG4gIH0pO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGdhbWUuc3RhcnRHYW1lKCk7XG4gIH0sIGZhbHNlKTtcblxuICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGdhbWUucmVzdGFydEdhbWUoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcmVzZXRTaGlwcygpIHtcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwVHlwZSkgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IHNoaXBUeXBlO1xuICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xuICAgICAgc2hpcC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICAgICAgc2hpcC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIHNoaXAuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGlkZVBsYWNlU2hpcHNHYW1lYm9hcmQoKSB7XG4gICAgcGxhY2VTaGlwc01vZGFsQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHBsYWNlU2hpcHNNb2RhbENvbnRhaW5lci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BsYWNlU2hpcHNHYW1lYm9hcmQoKSB7XG4gICAgcGxhY2VTaGlwc01vZGFsQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIHBsYWNlU2hpcHNNb2RhbENvbnRhaW5lci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2F1dG8nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJCb2FyZChnYW1lYm9hcmQpIHtcbiAgICBnYW1lYm9hcmQuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY29uc3QgY2VsbDIgPSBjZWxsO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsLWNlbGwnKTtcbiAgICAgIGNlbGwyLmlubmVyVGV4dCA9ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TWVzc2FnZShzdHIpIHtcbiAgICBjb25zdCBtZXNzYWdlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPSBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVDbGlja3MoYm9vbGVhbikge1xuICAgIGlmIChib29sZWFuKSB7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZScpO1xuICAgICAgZW5lbXlHYW1lYm9hcmQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZScpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHBsYXllckdhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlJyk7XG4gICAgZW5lbXlHYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0TWVzc2FnZSxcbiAgICBwbGFjZVNoaXBzR2FtZWJvYXJkQXJyLFxuICAgIHBsYXllckdhbWVib2FyZEFycixcbiAgICBlbmVteUdhbWVib2FyZEFycixcbiAgICB0b2dnbGVDbGlja3MsXG4gICAgY2xlYXJCb2FyZCxcbiAgICBoaWRlUGxhY2VTaGlwc0dhbWVib2FyZCxcbiAgICBzaG93UGxhY2VTaGlwc0dhbWVib2FyZCxcbiAgICByZXNldFNoaXBzLFxuICB9O1xufSkoKTtcblxuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGlzZUdhbWUoKSB7XG4gICAgcGxheWVyR2FtZWJvYXJkLmNsZWFyQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5jbGVhckJvYXJkKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIHBsYXllckdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gICAgZW5lbXlHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlU2hpcEF4aXMoc2hpcFR5cGUpIHtcbiAgICBjb25zdCBzaGlwT2JqID0gcGxheWVyR2FtZWJvYXJkLmdyYWJTaGlwKHNoaXBUeXBlKTtcbiAgICBpZiAoc2hpcE9iai5pc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBzaGlwT2JqLmlzVmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgc2hpcE9iai5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwVHlwZSwgaW5kZXgpIHtcbiAgICBjb25zdCBzaGlwT2JqID0gcGxheWVyR2FtZWJvYXJkLmdyYWJTaGlwKHNoaXBUeXBlKTtcbiAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pbnZhbGlkUGxhY2VtZW50KHNoaXBPYmosIGluZGV4KSkge1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwT2JqLCBpbmRleCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmV2ZWFsU2hpcHMoRE9NLnBsYWNlU2hpcHNHYW1lYm9hcmRBcnIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBpZiAocGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzUGxhY2VkKCkpIHtcbiAgICAgIGVuZW15R2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICAgIHBsYXllckdhbWVib2FyZC5yZXZlYWxTaGlwcyhET00ucGxheWVyR2FtZWJvYXJkQXJyKTtcbiAgICAgIERPTS5oaWRlUGxhY2VTaGlwc0dhbWVib2FyZCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiByYW5kb21TaGlwUGxhY2VtZW50KGJvb2xlYW4pIHtcbiAgICBpbml0aWFsaXNlR2FtZSgpO1xuICAgIGlmIChib29sZWFuKSBwbGF5ZXJHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmV2ZWFsU2hpcHMoRE9NLnBsYXllckdhbWVib2FyZEFycik7XG4gICAgRE9NLmhpZGVQbGFjZVNoaXBzR2FtZWJvYXJkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lTG9vcChjb29yZCkge1xuICAgIGlmIChlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKSkge1xuICAgICAgZW5lbXlHYW1lYm9hcmQuaHBIaXQoZW5lbXlHYW1lYm9hcmQuZ2V0TmFtZU9mU2hpcChjb29yZCkpO1xuICAgICAgZW5lbXlHYW1lYm9hcmQucmVuZGVyVG9ET00oRE9NLmVuZW15R2FtZWJvYXJkQXJyKTtcbiAgICAgIGlmIChlbmVteUdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhIEFsbCBlbmVteSBzaGlwcyBoYXZlIGJlZW4gZGVzdHJveWVkIScpO1xuICAgICAgICBET00udG9nZ2xlQ2xpY2tzKHRydWUpO1xuICAgICAgfVxuICAgICAgY29tcHV0ZXIucmFuZG9tTW92ZSgpO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29tcHV0ZXIuY3VycmVudE1vdmUpO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnJlbmRlclRvRE9NKERPTS5wbGF5ZXJHYW1lYm9hcmRBcnIpO1xuICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBET00uc2V0TWVzc2FnZSgnRW5lbXkgd2lucyEgQWxsIHBsYXllciBzaGlwcyBoYXZlIGJlZW4gZGVzdHJveWVkIScpO1xuICAgICAgICBET00udG9nZ2xlQ2xpY2tzKHRydWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIERPTS5jbGVhckJvYXJkKERPTS5wbGF5ZXJHYW1lYm9hcmRBcnIpO1xuICAgIERPTS5jbGVhckJvYXJkKERPTS5lbmVteUdhbWVib2FyZEFycik7XG4gICAgRE9NLmNsZWFyQm9hcmQoRE9NLnBsYWNlU2hpcHNHYW1lYm9hcmRBcnIpO1xuICAgIERPTS5zZXRNZXNzYWdlKCcnKTtcbiAgICBpbml0aWFsaXNlR2FtZSgpO1xuICAgIHBsYXllci5jbGVhclBhc3RIaXRzKCk7XG4gICAgY29tcHV0ZXIuY2xlYXJQYXN0SGl0cygpO1xuICAgIERPTS5yZXNldFNoaXBzKCk7XG4gICAgRE9NLnRvZ2dsZUNsaWNrcygpO1xuICAgIERPTS5zaG93UGxhY2VTaGlwc0dhbWVib2FyZCgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lTG9vcCxcbiAgICByYW5kb21TaGlwUGxhY2VtZW50LFxuICAgIHBsYXllckdhbWVib2FyZCxcbiAgICBlbmVteUdhbWVib2FyZCxcbiAgICBpbml0aWFsaXNlR2FtZSxcbiAgICByZXN0YXJ0R2FtZSxcbiAgICBwbGFjZVNoaXAsXG4gICAgc3RhcnRHYW1lLFxuICAgIHRvZ2dsZVNoaXBBeGlzLFxuICB9O1xufSkoKTtcbmdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcbmV4cG9ydCB7IERPTSwgZ2FtZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9