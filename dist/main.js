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

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i < ship.hp.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i * 10].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
      for (let i = 0; i < ship.hp.length; i += 1) {
        this.board[startCoord + i * 10].shipType = ship.type;
        this.board[startCoord + i * 10].hasShip = true;
        console.log(this.board[startCoord + i * 10]);
      }
    } else {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
      for (let i = 0; i <= ship.hp.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true;
        console.log(this.board[startCoord + i]);
      }
    }
    return null;
  }

  randomShipPlacement() {
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.callRandomNumber(2) === 0) {
        this.fleet[i].isVertical = false;
      }
    }
    for (let i = 0; i < this.fleet.length; i += 1) {
      this.placeShip(this.fleet[i], this.callRandomNumber(this.val));
    }
    // console.log(this.fleet[0]);
    // this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
  }

  receiveAttack(coord) {
    if (this.board[coord].miss) return;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
  }

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    return this.board.some((cell) => cell.hasShip !== false && cell.hit === false);
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
    if (this.pastHits.some((pastHit) => pastHit === coord)) return this.callRandomNumber(100);
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
  constructor(ship, vertical = true) {
    this.type = ship.type;
    this.length = ship.length;
    this.hp = Array(this.length).fill(null);
    this.isVertical = vertical;
  }

  hit(index) {
    this.hp[index] = true;
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
/* harmony import */ var _newShip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newShip */ "./src/code/newShip.js");
/* harmony import */ var _newPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newPlayer */ "./src/code/newPlayer.js");
/* harmony import */ var _newGameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newGameboard */ "./src/code/newGameboard.js");
/* eslint-disable no-use-before-define */




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
  });

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  return { setMessage, playerGameboardCells, enemyGameboardCells };
}());

const game = (function () {
  const player = new _newPlayer__WEBPACK_IMPORTED_MODULE_1__.default('player');
  const computer = new _newPlayer__WEBPACK_IMPORTED_MODULE_1__.default('Computer');
  const playerGameboard = new _newGameboard__WEBPACK_IMPORTED_MODULE_2__.default();
  const enemyGameboard = new _newGameboard__WEBPACK_IMPORTED_MODULE_2__.default();

  function initialiseGame() {
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function randomShipPlacement(boolean) {
    // if (boolean === true) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
  }

  function gameLoop(index) {
    enemyGameboard.receiveAttack(index);
    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
  }

  function isGameOver() {
    if (enemyGameboard.allShipsSunk() === false) {
      DOM.setMessage(`${player.name} wins! Computers ships have been sunk!`);
    }
    if (playerGameboard.allShipsSunk() === false) {
      DOM.setMessage(`${computer.name} wins! Players ships have been sunk!`);
    }
  }

  function render(gameboard) {
    DOM.playerGameboardCells.forEach((cell) => {
      const i = DOM.playerGameboardCells.indexOf(cell);
      if (gameboard[i].hit) {
        cell.classList.add('hit');
      }
      if (gameboard[i].miss) {
        // eslint-disable-next-line no-param-reassign
        cell.innerText = 'X';
      }
    });

    DOM.enemyGameboardCells.forEach((cell) => {
      const i = DOM.enemyGameboardCells.indexOf(cell);
      console.log(i);
      if (gameboard[i].hit) {
        cell.classList.add('hit');
      }
      if (gameboard[i].miss) {
        // eslint-disable-next-line no-param-reassign
        cell.innerText = 'X';
      }
      console.log(cell);
    });
  }

  return {
    render, gameLoop, randomShipPlacement, playerGameboard, enemyGameboard, initialiseGame,
  };
}());

game.initialiseGame();

// console.log(game.playerGameboard);
// console.log(game.enemyGameboard);

game.randomShipPlacement();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUsIFNoaXB9IGZyb20gJy4vbmV3U2hpcCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IodmFsID0gMTAwKSB7XG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuZmxlZXQgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXQgPSB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgbG9jYXRpb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpc2VCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh7IFxuICAgICAgICBoYXNTaGlwOiBmYWxzZSwgc2hpcFR5cGU6IG51bGwsIGhpdDogZmFsc2UsIG1pc3M6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICBnZW5lcmF0ZUZsZWV0KCkge1xuICAgIE9iamVjdC5rZXlzKHR5cGUpLmZvckVhY2goKHNoaXBPYmopID0+IHtcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcCh0eXBlW3NoaXBPYmpdKTtcbiAgICAgIHRoaXMuZmxlZXQucHVzaChzaGlwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKSB7XG4gICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmhwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkgKiAxMCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT3V0IG9mIGJvdW5kcyEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ocC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5ocC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHN0YXJ0Q29vcmQgKyBpKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgYm91bmRzIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHNoaXAuaHAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0uc2hpcFR5cGUgPSBzaGlwLnR5cGU7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmFuZG9tU2hpcFBsYWNlbWVudCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmxlZXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLmNhbGxSYW5kb21OdW1iZXIoMikgPT09IDApIHtcbiAgICAgICAgdGhpcy5mbGVldFtpXS5pc1ZlcnRpY2FsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZmxlZXRbMF0pO1xuICAgIC8vIHRoaXMucGxhY2VTaGlwKHRoaXMuZmxlZXRbMF0sIHRoaXMuY2FsbFJhbmRvbU51bWJlcih0aGlzLnZhbCkpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5taXNzKSByZXR1cm47XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRdLmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQuaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5sb2NhdGlvbiA9IGNvb3JkO1xuICAgIH1cbiAgfVxuXG4gIGlzT3V0T2ZCb3VuZHMoY29vcmQpIHtcbiAgICBpZiAoY29vcmQgPCAwIHx8IGNvb3JkID4gdGhpcy5ib2FyZC5sZW5ndGggLSAxKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQuc29tZSgoY2VsbCkgPT4gY2VsbC5oYXNTaGlwICE9PSBmYWxzZSAmJiBjZWxsLmhpdCA9PT0gZmFsc2UpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGFzdEhpdHMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyByYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbCk7XG4gIH1cblxuICBjYWxsUmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJhbmRvbU51bWJlcih2YWwpO1xuICB9XG5cbiAgcmFuZG9tTW92ZSgpIHtcbiAgICBjb25zdCBjb29yZCA9IHRoaXMuY2FsbFJhbmRvbU51bWJlcigxMDApO1xuICAgIGlmICh0aGlzLnBhc3RIaXRzLnNvbWUoKHBhc3RIaXQpID0+IHBhc3RIaXQgPT09IGNvb3JkKSkgcmV0dXJuIHRoaXMuY2FsbFJhbmRvbU51bWJlcigxMDApO1xuICAgIHRoaXMucGFzdEhpdHMucHVzaChjb29yZCk7XG4gICAgdGhpcy5jdXJyZW50TW92ZSA9IGNvb3JkO1xuICAgIHJldHVybiBjb29yZDtcbiAgfVxuXG4gIGNsZWFyUGFzdEhpdHMoKSB7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3QgdHlwZSA9IHtcbiAgY2Fycmllcjoge1xuICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB0eXBlOiAnYmF0dGxlc2hpcCcsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICBjcnVpc2VyOiB7XG4gICAgdHlwZTogJ2NydWlzZXInLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgc3VibWFyaW5lOiB7XG4gICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBkZXN0cm95ZXI6IHtcbiAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG59O1xuXG5jbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3Ioc2hpcCwgdmVydGljYWwgPSB0cnVlKSB7XG4gICAgdGhpcy50eXBlID0gc2hpcC50eXBlO1xuICAgIHRoaXMubGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgdGhpcy5ocCA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgaGl0KGluZGV4KSB7XG4gICAgdGhpcy5ocFtpbmRleF0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG5cbiAgaXNEZXN0cm95ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHAuZXZlcnkoKGhwKSA9PiBocCA9PT0gdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdHlwZSwgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IHsgdHlwZSwgU2hpcCB9IGZyb20gJy4vbmV3U2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vbmV3UGxheWVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9uZXdHYW1lYm9hcmQnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmRDZWxscyA9IEFycmF5LmZyb20ocGxheWVyR2FtZWJvYXJkLmNoaWxkcmVuKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmRDZWxscyA9IEFycmF5LmZyb20oZW5lbXlHYW1lYm9hcmQuY2hpbGRyZW4pO1xuXG4gIHBsYXllckdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgLy8gY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKGUudGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgIC8vIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgfSk7XG5cbiAgZW5lbXlHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGdhbWUuZ2FtZUxvb3AoZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldE1lc3NhZ2Uoc3RyKSB7XG4gICAgY29uc3QgbWVzc2FnZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbiAgICBtZXNzYWdlRWwuaW5uZXJUZXh0ID0gc3RyO1xuICB9XG5cbiAgcmV0dXJuIHsgc2V0TWVzc2FnZSwgcGxheWVyR2FtZWJvYXJkQ2VsbHMsIGVuZW15R2FtZWJvYXJkQ2VsbHMgfTtcbn0oKSk7XG5cbmNvbnN0IGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpc2VHYW1lKCkge1xuICAgIHBsYXllckdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbVNoaXBQbGFjZW1lbnQoYm9vbGVhbikge1xuICAgIC8vIGlmIChib29sZWFuID09PSB0cnVlKSBwbGF5ZXJHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVMb29wKGluZGV4KSB7XG4gICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhpbmRleCk7XG4gICAgY29tcHV0ZXIucmFuZG9tTW92ZSgpO1xuICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvbXB1dGVyLmN1cnJlbnRNb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgaWYgKGVuZW15R2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoYCR7cGxheWVyLm5hbWV9IHdpbnMhIENvbXB1dGVycyBzaGlwcyBoYXZlIGJlZW4gc3VuayFgKTtcbiAgICB9XG4gICAgaWYgKHBsYXllckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSA9PT0gZmFsc2UpIHtcbiAgICAgIERPTS5zZXRNZXNzYWdlKGAke2NvbXB1dGVyLm5hbWV9IHdpbnMhIFBsYXllcnMgc2hpcHMgaGF2ZSBiZWVuIHN1bmshYCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyKGdhbWVib2FyZCkge1xuICAgIERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjb25zdCBpID0gRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgICBpZiAoZ2FtZWJvYXJkW2ldLmhpdCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVib2FyZFtpXS5taXNzKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdYJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIERPTS5lbmVteUdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBET00uZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGNlbGwpO1xuICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICBpZiAoZ2FtZWJvYXJkW2ldLmhpdCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVib2FyZFtpXS5taXNzKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdYJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGNlbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXIsIGdhbWVMb29wLCByYW5kb21TaGlwUGxhY2VtZW50LCBwbGF5ZXJHYW1lYm9hcmQsIGVuZW15R2FtZWJvYXJkLCBpbml0aWFsaXNlR2FtZSxcbiAgfTtcbn0oKSk7XG5cbmdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcblxuLy8gY29uc29sZS5sb2coZ2FtZS5wbGF5ZXJHYW1lYm9hcmQpO1xuLy8gY29uc29sZS5sb2coZ2FtZS5lbmVteUdhbWVib2FyZCk7XG5cbmdhbWUucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuXG5leHBvcnQgeyBET00sIGdhbWUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==