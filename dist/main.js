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
  }

  renderToDOM(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hit) DOMBoard[i].classList.add('hit');
      // eslint-disable-next-line no-param-reassign
      if (index.miss) DOMBoard[i].innerText = 'X';
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

  placeShip(ship, startCoord) {
    if (ship.isVertical === true) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i * 10].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i * 10].shipType = ship.type;
        this.board[startCoord + i * 10].hasShip = true;
        console.log(this.board[startCoord + i * 10]);
      }
    }
    if (ship.isVertical === false) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true;
        console.log(this.board[startCoord + i]);
      }
    }
    return null;
  }

  randomShipPlacement() {
    console.log(this.fleet);
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.callRandomNumber(2) === 0) {
        this.fleet[i].isVertical = false;
      } else {
        this.fleet[i].isVertical = true;
      }
    }
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.placeShip(this.fleet[i], this.callRandomNumber(this.val)) === true) {
        this.clearBoard();
        this.initialiseBoard();
        return this.randomShipPlacement();
      }
    }
    console.log(this.board);
    return null;
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

  filterByShipType(name) {
    const shipArr = this.board.filter((index) => index.shipType === name);
    return shipArr;
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
    console.log(enemyGameboardCells.indexOf(e.target));
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
    if (boolean === true) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
  }

  function gameLoop(index) {
    enemyGameboard.receiveAttack(index);
    enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
    if (isGameOver()) {
      DOM.setMessage('Player wins!');
    }

    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
    playerGameboard.renderToDOM(DOM.playerGameboardCells);
    if (isGameOver()) {
      DOM.setMessage('Computer wins!');
    }
  }

  function isGameOver() {
    if (enemyGameboard.allShipsSunk() || playerGameboard.allShipsSunk() === false) return true;
  }

  // function renderPlayerGameboard() {
  //   DOM.playerGameboardCells.forEach((cell) => {
  //     const i = DOM.playerGameboardCells.indexOf(cell);
  //     if (playerGameboard.this.board[i].hit) {
  //       cell.classList.add('hit');
  //     }
  //     if (playerGameboard.this.board[i].miss) {
  //       // eslint-disable-next-line no-param-reassign
  //       cell.innerText = 'X';
  //     }
  //   });
  // }

  // function renderEnemyGameboard() {
  //   DOM.enemyGameboardCells.forEach((cell) => {
  //     const i = DOM.enemyGameboardCells.indexOf(cell);
  //     console.log(i);
  //     console.log(enemyGameboard.this.board);
  //     console.log(enemyGameboard.this.board[i]);
  //     if (enemyGameboard.this.board[i].hit) {
  //       cell.classList.add('hit');
  //     }
  //     if (enemyGameboard.this.board[i].miss) {
  //       // eslint-disable-next-line no-param-reassign
  //       cell.innerText = 'X';
  //     }
  //     console.log(cell);
  //   });
  // }

  return {
    gameLoop, randomShipPlacement, playerGameboard, enemyGameboard, initialiseGame,
  };
}());

game.initialiseGame();

// console.log(game.playerGameboard);
// console.log(game.enemyGameboard);

game.randomShipPlacement(true);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlLCBTaGlwfSBmcm9tICcuL25ld1NoaXAnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHZhbCA9IDEwMCkge1xuICAgIHRoaXMudmFsID0gdmFsO1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgdGhpcy5sYXN0SGl0ID0ge1xuICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIGxvY2F0aW9uOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXNlQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goe1xuICAgICAgICBoYXNTaGlwOiBmYWxzZSwgc2hpcFR5cGU6IG51bGwsIGhpdDogZmFsc2UsIG1pc3M6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gIH1cblxuICByZW5kZXJUb0RPTShET01Cb2FyZCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmJvYXJkLmluZGV4T2YoaW5kZXgpO1xuICAgICAgaWYgKGluZGV4LmhpdCkgRE9NQm9hcmRbaV0uY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGlmIChpbmRleC5taXNzKSBET01Cb2FyZFtpXS5pbm5lclRleHQgPSAnWCc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIGdlbmVyYXRlRmxlZXQoKSB7XG4gICAgT2JqZWN0LmtleXModHlwZSkuZm9yRWFjaCgoc2hpcE9iaikgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHR5cGVbc2hpcE9ial0pO1xuICAgICAgdGhpcy5mbGVldC5wdXNoKHNoaXApO1xuICAgIH0pO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIHN0YXJ0Q29vcmQpIHtcbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcyhzdGFydENvb3JkICsgaSAqIDEwKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgYm91bmRzIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uc2hpcFR5cGUgPSBzaGlwLnR5cGU7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ091dCBvZiBib3VuZHMhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5mbGVldCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jYWxsUmFuZG9tTnVtYmVyKDIpID09PSAwKSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mbGVldFtpXS5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSkgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbGVhckJvYXJkKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5ib2FyZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mbGVldFswXSk7XG4gICAgLy8gdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFswXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLm1pc3MpIHJldHVybjtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFtjb29yZF0uaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmxvY2F0aW9uID0gY29vcmQ7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyQnlTaGlwVHlwZShuYW1lKSB7XG4gICAgY29uc3Qgc2hpcEFyciA9IHRoaXMuYm9hcmQuZmlsdGVyKChpbmRleCkgPT4gaW5kZXguc2hpcFR5cGUgPT09IG5hbWUpO1xuICAgIHJldHVybiBzaGlwQXJyO1xuICB9XG5cbiAgaXNPdXRPZkJvdW5kcyhjb29yZCkge1xuICAgIGlmIChjb29yZCA8IDAgfHwgY29vcmQgPiB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5zb21lKChjZWxsKSA9PiBjZWxsLmhhc1NoaXAgIT09IGZhbHNlICYmIGNlbGwuaGl0ID09PSBmYWxzZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICByYW5kb21Nb3ZlKCkge1xuICAgIGNvbnN0IGNvb3JkID0gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgaWYgKHRoaXMucGFzdEhpdHMuc29tZSgocGFzdEhpdCkgPT4gcGFzdEhpdCA9PT0gY29vcmQpKSByZXR1cm4gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgdGhpcy5wYXN0SGl0cy5wdXNoKGNvb3JkKTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gY29vcmQ7XG4gICAgcmV0dXJuIGNvb3JkO1xuICB9XG5cbiAgY2xlYXJQYXN0SGl0cygpIHtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCB0eXBlID0ge1xuICBjYXJyaWVyOiB7XG4gICAgdHlwZTogJ2NhcnJpZXInLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIGNydWlzZXI6IHtcbiAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIGRlc3Ryb3llcjoge1xuICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbn07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaGlwLCB2ZXJ0aWNhbCA9IHRydWUpIHtcbiAgICB0aGlzLnR5cGUgPSBzaGlwLnR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICB0aGlzLmhwID0gQXJyYXkodGhpcy5sZW5ndGgpLmZpbGwobnVsbCk7XG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhwW2luZGV4XSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuaHA7XG4gIH1cblxuICBpc0Rlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ocC5ldmVyeSgoaHApID0+IGhwID09PSB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgeyB0eXBlLCBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgeyB0eXBlLCBTaGlwIH0gZnJvbSAnLi9uZXdTaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9uZXdQbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL25ld0dhbWVib2FyZCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBET00gPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyJyk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZW15Jyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShwbGF5ZXJHYW1lYm9hcmQuY2hpbGRyZW4pO1xuICBjb25zdCBlbmVteUdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShlbmVteUdhbWVib2FyZC5jaGlsZHJlbik7XG5cbiAgcGxheWVyR2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAvLyBjb25zdCBjZWxscyA9IEFycmF5LmZyb20oZS50YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICB9KTtcblxuICBlbmVteUdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZ2FtZS5nYW1lTG9vcChlbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0TWVzc2FnZShzdHIpIHtcbiAgICBjb25zdCBtZXNzYWdlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPSBzdHI7XG4gIH1cblxuICByZXR1cm4geyBzZXRNZXNzYWdlLCBwbGF5ZXJHYW1lYm9hcmRDZWxscywgZW5lbXlHYW1lYm9hcmRDZWxscyB9O1xufSgpKTtcblxuY29uc3QgZ2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGlzZUdhbWUoKSB7XG4gICAgcGxheWVyR2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIHBsYXllckdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gICAgZW5lbXlHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tU2hpcFBsYWNlbWVudChib29sZWFuKSB7XG4gICAgaWYgKGJvb2xlYW4gPT09IHRydWUpIHBsYXllckdhbWVib2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gICAgZW5lbXlHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZUxvb3AoaW5kZXgpIHtcbiAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGluZGV4KTtcbiAgICBlbmVteUdhbWVib2FyZC5yZW5kZXJUb0RPTShET00uZW5lbXlHYW1lYm9hcmRDZWxscyk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoJ1BsYXllciB3aW5zIScpO1xuICAgIH1cblxuICAgIGNvbXB1dGVyLnJhbmRvbU1vdmUoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb21wdXRlci5jdXJyZW50TW92ZSk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlbmRlclRvRE9NKERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscyk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoJ0NvbXB1dGVyIHdpbnMhJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBpZiAoZW5lbXlHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkgfHwgcGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSBmYWxzZSkgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBmdW5jdGlvbiByZW5kZXJQbGF5ZXJHYW1lYm9hcmQoKSB7XG4gIC8vICAgRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgLy8gICAgIGNvbnN0IGkgPSBET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihjZWxsKTtcbiAgLy8gICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQudGhpcy5ib2FyZFtpXS5oaXQpIHtcbiAgLy8gICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQudGhpcy5ib2FyZFtpXS5taXNzKSB7XG4gIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAvLyAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdYJztcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIHJlbmRlckVuZW15R2FtZWJvYXJkKCkge1xuICAvLyAgIERPTS5lbmVteUdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgLy8gICAgIGNvbnN0IGkgPSBET00uZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGNlbGwpO1xuICAvLyAgICAgY29uc29sZS5sb2coaSk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0pO1xuICAvLyAgICAgaWYgKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0uaGl0KSB7XG4gIC8vICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIC8vICAgICB9XG4gIC8vICAgICBpZiAoZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZFtpXS5taXNzKSB7XG4gIC8vICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAvLyAgICAgICBjZWxsLmlubmVyVGV4dCA9ICdYJztcbiAgLy8gICAgIH1cbiAgLy8gICAgIGNvbnNvbGUubG9nKGNlbGwpO1xuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lTG9vcCwgcmFuZG9tU2hpcFBsYWNlbWVudCwgcGxheWVyR2FtZWJvYXJkLCBlbmVteUdhbWVib2FyZCwgaW5pdGlhbGlzZUdhbWUsXG4gIH07XG59KCkpO1xuXG5nYW1lLmluaXRpYWxpc2VHYW1lKCk7XG5cbi8vIGNvbnNvbGUubG9nKGdhbWUucGxheWVyR2FtZWJvYXJkKTtcbi8vIGNvbnNvbGUubG9nKGdhbWUuZW5lbXlHYW1lYm9hcmQpO1xuXG5nYW1lLnJhbmRvbVNoaXBQbGFjZW1lbnQodHJ1ZSk7XG5cbmV4cG9ydCB7IERPTSwgZ2FtZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9