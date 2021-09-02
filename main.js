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
        // console.log(this.board[startCoord + i]);
      }
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
      if (this.placeShip(this.fleet[i], this.callRandomNumber(this.val)) === true) {
        this.clearBoard();
        this.initialiseBoard();
        return this.randomShipPlacement();
      }
    }
    return null;
    // console.log(this.fleet[0]);
    // this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
  }

  receiveAttack(coord) {
    console.log(this.board[coord]);
    if (this.board[coord].miss || this.board[coord].hit) return false;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
    if (!this.board[coord].hasShip) {
      this.board[coord].miss = true;
    }
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

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    // const ShipsOnlyArr = this.board.filter((i) => i.hasShip === true);
    // console.log(ShipsOnlyArr.every((i) => i.hit === true));
    // return ShipsOnlyArr.every((i) => i.hit === true);
    return this.fleet.every((ship) => ship.isDestroyed() === true);
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
    // for (let i = 0; i < arr.length; i += 1) {
    //   if (arr[i].hit) this.hp[i] = true;
    // }
    this.hp[index] = true;
    return null;
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

  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord)) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
      if (isGameOver()) {
        DOM.setMessage('Player wins!');
      }
    }
    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
    playerGameboard.renderToDOM(DOM.playerGameboardCells);
    if (isGameOver() === true) {
      DOM.setMessage('Computer wins!');
    }
    return null;
  }

  function isGameOver() {
    if (playerGameboard.allShipsSunk() === true) {
      DOM.setMessage('Computer wins!');
    }
    if (enemyGameboard.allShipsSunk() === true) {
      DOM.setMessage('Player wins!');
    }
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
game.randomShipPlacement(true);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBTTtBQUMzQix1QkFBdUIsK0NBQU07QUFDN0IsOEJBQThCLGtEQUFTO0FBQ3ZDLDZCQUE2QixrREFBUzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRXFCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9uZXdTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvY29kZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlLCBTaGlwfSBmcm9tICcuL25ld1NoaXAnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHZhbCA9IDEwMCkge1xuICAgIHRoaXMudmFsID0gdmFsO1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgdGhpcy5sYXN0SGl0ID0ge1xuICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIGxvY2F0aW9uOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXNlQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goe1xuICAgICAgICBoYXNTaGlwOiBmYWxzZSwgc2hpcFR5cGU6IG51bGwsIGhpdDogZmFsc2UsIG1pc3M6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gIH1cblxuICByZW5kZXJUb0RPTShET01Cb2FyZCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmJvYXJkLmluZGV4T2YoaW5kZXgpO1xuICAgICAgaWYgKGluZGV4LmhpdCkgRE9NQm9hcmRbaV0uY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGlmIChpbmRleC5taXNzKSBET01Cb2FyZFtpXS5pbm5lclRleHQgPSAnWCc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIGdlbmVyYXRlRmxlZXQoKSB7XG4gICAgT2JqZWN0LmtleXModHlwZSkuZm9yRWFjaCgoc2hpcE9iaikgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHR5cGVbc2hpcE9ial0pO1xuICAgICAgdGhpcy5mbGVldC5wdXNoKHNoaXApO1xuICAgIH0pO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIHN0YXJ0Q29vcmQpIHtcbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcyhzdGFydENvb3JkICsgaSAqIDEwKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgYm91bmRzIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uc2hpcFR5cGUgPSBzaGlwLnR5cGU7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ091dCBvZiBib3VuZHMhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jYWxsUmFuZG9tTnVtYmVyKDIpID09PSAwKSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mbGVldFtpXS5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSkgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbGVhckJvYXJkKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mbGVldFswXSk7XG4gICAgLy8gdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFswXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5ib2FyZFtjb29yZF0pO1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5taXNzIHx8IHRoaXMuYm9hcmRbY29vcmRdLmhpdCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkXS5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQubG9jYXRpb24gPSBjb29yZDtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkXS5taXNzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXROYW1lT2ZTaGlwKGNvb3JkKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHJldHVybiB0aGlzLmJvYXJkW2Nvb3JkXS5zaGlwVHlwZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBocEhpdChuYW1lKSB7XG4gICAgY29uc3Qgc2hpcEFyciA9IHRoaXMuYm9hcmQuZmlsdGVyKChjb29yZCkgPT4gY29vcmQuc2hpcFR5cGUgPT09IG5hbWUpO1xuICAgIGNvbnN0IGZpbmRDb3JyZWN0U2hpcCA9IHRoaXMuZmxlZXQuZmlsdGVyKChzaGlwKSA9PiBzaGlwLnR5cGUgPT09IG5hbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNoaXBBcnJbaV0uaGl0KSBmaW5kQ29ycmVjdFNoaXBbMF0uaGl0KGkpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3V0T2ZCb3VuZHMoY29vcmQpIHtcbiAgICBpZiAoY29vcmQgPCAwIHx8IGNvb3JkID4gdGhpcy5ib2FyZC5sZW5ndGggLSAxKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgLy8gY29uc3QgU2hpcHNPbmx5QXJyID0gdGhpcy5ib2FyZC5maWx0ZXIoKGkpID0+IGkuaGFzU2hpcCA9PT0gdHJ1ZSk7XG4gICAgLy8gY29uc29sZS5sb2coU2hpcHNPbmx5QXJyLmV2ZXJ5KChpKSA9PiBpLmhpdCA9PT0gdHJ1ZSkpO1xuICAgIC8vIHJldHVybiBTaGlwc09ubHlBcnIuZXZlcnkoKGkpID0+IGkuaGl0ID09PSB0cnVlKTtcbiAgICByZXR1cm4gdGhpcy5mbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc0Rlc3Ryb3llZCgpID09PSB0cnVlKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gICAgdGhpcy5jdXJyZW50TW92ZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIHJhbmRvbU1vdmUoKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICBpZiAodGhpcy5wYXN0SGl0cy5zb21lKChwYXN0SGl0KSA9PiBwYXN0SGl0ID09PSBjb29yZCkpIHJldHVybiB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICB0aGlzLnBhc3RIaXRzLnB1c2goY29vcmQpO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBjb29yZDtcbiAgICByZXR1cm4gY29vcmQ7XG4gIH1cblxuICBjbGVhclBhc3RIaXRzKCkge1xuICAgIHRoaXMucGFzdEhpdHMgPSBbXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHR5cGUgPSB7XG4gIGNhcnJpZXI6IHtcbiAgICB0eXBlOiAnY2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICB9LFxuICBiYXR0bGVzaGlwOiB7XG4gICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAgY3J1aXNlcjoge1xuICAgIHR5cGU6ICdjcnVpc2VyJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHN1Ym1hcmluZToge1xuICAgIHR5cGU6ICdzdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgZGVzdHJveWVyOiB7XG4gICAgdHlwZTogJ2Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxufTtcblxuY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKHNoaXAsIHZlcnRpY2FsID0gdHJ1ZSkge1xuICAgIHRoaXMudHlwZSA9IHNoaXAudHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHRoaXMuaHAgPSBBcnJheSh0aGlzLmxlbmd0aCkuZmlsbChudWxsKTtcbiAgICB0aGlzLmlzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgLy8gICBpZiAoYXJyW2ldLmhpdCkgdGhpcy5ocFtpXSA9IHRydWU7XG4gICAgLy8gfVxuICAgIHRoaXMuaHBbaW5kZXhdID0gdHJ1ZTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzRGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzLmhwLmV2ZXJ5KChocCkgPT4gaHAgPT09IHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCB7IHR5cGUsIFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCB7IHR5cGUsIFNoaXAgfSBmcm9tICcuL25ld1NoaXAnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL25ld1BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vbmV3R2FtZWJvYXJkJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IERPTSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXInKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkQ2VsbHMgPSBBcnJheS5mcm9tKHBsYXllckdhbWVib2FyZC5jaGlsZHJlbik7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkQ2VsbHMgPSBBcnJheS5mcm9tKGVuZW15R2FtZWJvYXJkLmNoaWxkcmVuKTtcblxuICBwbGF5ZXJHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIC8vIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShlLnRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXJHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gIH0pO1xuXG4gIGVuZW15R2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBnYW1lLmdhbWVMb29wKGVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICB9KTtcblxuICBmdW5jdGlvbiBzZXRNZXNzYWdlKHN0cikge1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG4gICAgbWVzc2FnZUVsLmlubmVyVGV4dCA9IHN0cjtcbiAgfVxuXG4gIHJldHVybiB7IHNldE1lc3NhZ2UsIHBsYXllckdhbWVib2FyZENlbGxzLCBlbmVteUdhbWVib2FyZENlbGxzIH07XG59KCkpO1xuXG5jb25zdCBnYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcignQ29tcHV0ZXInKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXNlR2FtZSgpIHtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgZW5lbXlHYW1lYm9hcmQuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21TaGlwUGxhY2VtZW50KGJvb2xlYW4pIHtcbiAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkgcGxheWVyR2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lTG9vcChjb29yZCkge1xuICAgIGlmIChlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKSkge1xuICAgICAgZW5lbXlHYW1lYm9hcmQuaHBIaXQoZW5lbXlHYW1lYm9hcmQuZ2V0TmFtZU9mU2hpcChjb29yZCkpO1xuICAgICAgZW5lbXlHYW1lYm9hcmQucmVuZGVyVG9ET00oRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMpO1xuICAgICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVyLnJhbmRvbU1vdmUoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb21wdXRlci5jdXJyZW50TW92ZSk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlbmRlclRvRE9NKERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscyk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoJ0NvbXB1dGVyIHdpbnMhJyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBpZiAocGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICBET00uc2V0TWVzc2FnZSgnQ29tcHV0ZXIgd2lucyEnKTtcbiAgICB9XG4gICAgaWYgKGVuZW15R2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSB0cnVlKSB7XG4gICAgICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gcmVuZGVyUGxheWVyR2FtZWJvYXJkKCkge1xuICAvLyAgIERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIC8vICAgICBjb25zdCBpID0gRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gIC8vICAgICBpZiAocGxheWVyR2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0uaGl0KSB7XG4gIC8vICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIC8vICAgICB9XG4gIC8vICAgICBpZiAocGxheWVyR2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0ubWlzcykge1xuICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgLy8gICAgICAgY2VsbC5pbm5lclRleHQgPSAnWCc7XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvLyBmdW5jdGlvbiByZW5kZXJFbmVteUdhbWVib2FyZCgpIHtcbiAgLy8gICBET00uZW5lbXlHYW1lYm9hcmRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIC8vICAgICBjb25zdCBpID0gRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihjZWxsKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGkpO1xuICAvLyAgICAgY29uc29sZS5sb2coZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZCk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldKTtcbiAgLy8gICAgIGlmIChlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldLmhpdCkge1xuICAvLyAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAvLyAgICAgfVxuICAvLyAgICAgaWYgKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0ubWlzcykge1xuICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgLy8gICAgICAgY2VsbC5pbm5lclRleHQgPSAnWCc7XG4gIC8vICAgICB9XG4gIC8vICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIHJldHVybiB7XG4gICAgZ2FtZUxvb3AsIHJhbmRvbVNoaXBQbGFjZW1lbnQsIHBsYXllckdhbWVib2FyZCwgZW5lbXlHYW1lYm9hcmQsIGluaXRpYWxpc2VHYW1lLFxuICB9O1xufSgpKTtcblxuZ2FtZS5pbml0aWFsaXNlR2FtZSgpO1xuZ2FtZS5yYW5kb21TaGlwUGxhY2VtZW50KHRydWUpO1xuXG5leHBvcnQgeyBET00sIGdhbWUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==