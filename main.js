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
      this.board.push({ hasShip: false, hit: false, miss: false });
    }
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  generateFleet() {
    Object.keys(_newShip__WEBPACK_IMPORTED_MODULE_0__.type).forEach((key) => {
      const ship = new _newShip__WEBPACK_IMPORTED_MODULE_0__.Ship(_newShip__WEBPACK_IMPORTED_MODULE_0__.type[key]);
      this.fleet.push(ship);
      console.log(this.fleet);
    });
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        if (this.board[startCoord + i * 10].hasShip !== false) {
          console.log('Error! Placement clashes with another placed ship!');
          return this.placeShip(ship, startCoord);
        }
        this.board[startCoord + i * 10].hasShip = ship.type;
      }
    }
    if (!ship.isVertical) {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        if (this.board[startCoord + i].hasShip !== false) {
          console.log('Error! Placement clashes with another placed ship!');
          return this.placeShip(ship, startCoord);
        }
        this.board[startCoord + i].hasShip = ship.type;
      }
    }
    return null;
  }

  randomShipPlacement() {
    for (let i = 0; i <= this.fleet.length; i += 1) {
      this.placeShip(this.fleet[i], this.callRandomNumber(this.val));
    }
  }

  receiveAttack(coord) {
    if (this.board[coord].miss) return;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
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

  // callRandomNumber(val) {
  //   return this.constructor.randomNumber(val);
  // }

  randomMove() {
    const coord = this.callRandomNumber(100);
    if (this.pastHits.some((pastHit) => pastHit === coord)) return this.callRandomNumber(100);
    this.pastHits.push(coord);
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
    console.log(playerGameboardCells.indexOf(e.target));
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
    if(boolean === true) playerGameboard.randomShipPlacement();
  }

  function gameLoop(index) {

  }

  function render(gameboard) {
    DOM.playerGameboardCells.forEach((cell) => {
      const i = DOM.playerGameboardCells.indexOf(cell);
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
    render, gameLoop, initialiseGame, randomShipPlacement,
  };
}());



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsY0FBYztBQUNsQyx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQiwwQ0FBSTtBQUNwQix1QkFBdUIsMENBQUksQ0FBQywwQ0FBSTtBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QnRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7OztVQzFDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ3VDO0FBQ047QUFDTTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRUQ7QUFDQSxxQkFBcUIsK0NBQU07QUFDM0IsdUJBQXVCLCtDQUFNO0FBQzdCLDhCQUE4QixrREFBUztBQUN2Qyw2QkFBNkIsa0RBQVM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRW9CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlLCBTaGlwfSBmcm9tICcuL25ld1NoaXAnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHZhbCA9IDEwMCkge1xuICAgIHRoaXMudmFsID0gdmFsO1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgdGhpcy5sYXN0SGl0ID0ge1xuICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIGxvY2F0aW9uOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXNlQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goeyBoYXNTaGlwOiBmYWxzZSwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICBnZW5lcmF0ZUZsZWV0KCkge1xuICAgIE9iamVjdC5rZXlzKHR5cGUpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHR5cGVba2V5XSk7XG4gICAgICB0aGlzLmZsZWV0LnB1c2goc2hpcCk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZsZWV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKSB7XG4gICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5ocC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5oYXNTaGlwICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciEgUGxhY2VtZW50IGNsYXNoZXMgd2l0aCBhbm90aGVyIHBsYWNlZCBzaGlwIScpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPSBzaGlwLnR5cGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2hpcC5pc1ZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBzaGlwLmhwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciEgUGxhY2VtZW50IGNsYXNoZXMgd2l0aCBhbm90aGVyIHBsYWNlZCBzaGlwIScpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID0gc2hpcC50eXBlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5taXNzKSByZXR1cm47XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRdLmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQuaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5sb2NhdGlvbiA9IGNvb3JkO1xuICAgIH1cbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5zb21lKChjZWxsKSA9PiBjZWxsLmhhc1NoaXAgIT09IGZhbHNlICYmIGNlbGwuaGl0ID09PSBmYWxzZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBudWxsO1xuICB9XG5cbiAgLy8gY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgLy8gICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgLy8gfVxuXG4gIHJhbmRvbU1vdmUoKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICBpZiAodGhpcy5wYXN0SGl0cy5zb21lKChwYXN0SGl0KSA9PiBwYXN0SGl0ID09PSBjb29yZCkpIHJldHVybiB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICB0aGlzLnBhc3RIaXRzLnB1c2goY29vcmQpO1xuICAgIHJldHVybiBjb29yZDtcbiAgfVxuXG4gIGNsZWFyUGFzdEhpdHMoKSB7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3QgdHlwZSA9IHtcbiAgY2Fycmllcjoge1xuICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB0eXBlOiAnYmF0dGxlc2hpcCcsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICBjcnVpc2VyOiB7XG4gICAgdHlwZTogJ2NydWlzZXInLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgc3VibWFyaW5lOiB7XG4gICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBkZXN0cm95ZXI6IHtcbiAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG59O1xuXG5jbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3Ioc2hpcCwgdmVydGljYWwgPSB0cnVlKSB7XG4gICAgdGhpcy50eXBlID0gc2hpcC50eXBlO1xuICAgIHRoaXMubGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgdGhpcy5ocCA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgaGl0KGluZGV4KSB7XG4gICAgdGhpcy5ocFtpbmRleF0gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLmhwO1xuICB9XG5cbiAgaXNEZXN0cm95ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHAuZXZlcnkoKGhwKSA9PiBocCA9PT0gdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdHlwZSwgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IHsgdHlwZSwgU2hpcCB9IGZyb20gJy4vbmV3U2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vbmV3UGxheWVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9uZXdHYW1lYm9hcmQnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmRDZWxscyA9IEFycmF5LmZyb20ocGxheWVyR2FtZWJvYXJkLmNoaWxkcmVuKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmRDZWxscyA9IEFycmF5LmZyb20oZW5lbXlHYW1lYm9hcmQuY2hpbGRyZW4pO1xuXG4gIHBsYXllckdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgLy8gY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKGUudGFyZ2V0LnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgfSk7XG5cbiAgZW5lbXlHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGdhbWUuZ2FtZUxvb3AoZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldE1lc3NhZ2Uoc3RyKSB7XG4gICAgY29uc3QgbWVzc2FnZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbiAgICBtZXNzYWdlRWwuaW5uZXJUZXh0ID0gc3RyO1xuICB9XG5cbiAgcmV0dXJuIHsgc2V0TWVzc2FnZSwgcGxheWVyR2FtZWJvYXJkQ2VsbHMsIGVuZW15R2FtZWJvYXJkQ2VsbHMgfTtcbn0oKSk7XG5cbmNvbnN0IGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpc2VHYW1lKCkge1xuICAgIHBsYXllckdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbVNoaXBQbGFjZW1lbnQoYm9vbGVhbikge1xuICAgIGlmKGJvb2xlYW4gPT09IHRydWUpIHBsYXllckdhbWVib2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lTG9vcChpbmRleCkge1xuXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIoZ2FtZWJvYXJkKSB7XG4gICAgRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihjZWxsKTtcbiAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgaWYgKGdhbWVib2FyZFtpXS5oaXQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChnYW1lYm9hcmRbaV0ubWlzcykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgY2VsbC5pbm5lclRleHQgPSAnWCc7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICB9KTtcblxuICAgIERPTS5lbmVteUdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBET00uZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGNlbGwpO1xuICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICBpZiAoZ2FtZWJvYXJkW2ldLmhpdCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgfVxuICAgICAgaWYgKGdhbWVib2FyZFtpXS5taXNzKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdYJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGNlbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXIsIGdhbWVMb29wLCBpbml0aWFsaXNlR2FtZSwgcmFuZG9tU2hpcFBsYWNlbWVudCxcbiAgfTtcbn0oKSk7XG5cbmV4cG9ydCB7IERPTSwgZ2FtZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9