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
    console.log(this.fleet);
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
      return true;
    }
    if (this.board[coord].hasShip === false) {
      this.board[coord].miss = true;
      return true;
    }
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

  // playerGameboard.addEventListener('click', (e) => {
  //   // const cells = Array.from(e.target.parentNode.children);
  //   // console.log(playerGameboardCells.indexOf(e.target));
  // });

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardCells.indexOf(e.target));
      console.log(enemyGameboardCells.indexOf(e.target));
    }
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
    if (enemyGameboard.receiveAttack(coord) === true) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardCells);
      if (isGameOver()) {
        DOM.setMessage('Player wins!');
      }
    } else {
      return null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVEO0FBQ0EscUJBQXFCLCtDQUFNO0FBQzNCLHVCQUF1QiwrQ0FBTTtBQUM3Qiw4QkFBOEIsa0RBQVM7QUFDdkMsNkJBQTZCLGtEQUFTOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUsIFNoaXAgfSBmcm9tICcuL25ld1NoaXAnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHZhbCA9IDEwMCkge1xuICAgIHRoaXMudmFsID0gdmFsO1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gICAgdGhpcy5sYXN0SGl0ID0ge1xuICAgICAgaGl0OiBmYWxzZSxcbiAgICAgIGxvY2F0aW9uOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBpbml0aWFsaXNlQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbDsgaSArPSAxKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goe1xuICAgICAgICBoYXNTaGlwOiBmYWxzZSwgc2hpcFR5cGU6IG51bGwsIGhpdDogZmFsc2UsIG1pc3M6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJCb2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gIH1cblxuICByZW5kZXJUb0RPTShET01Cb2FyZCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmJvYXJkLmluZGV4T2YoaW5kZXgpO1xuICAgICAgaWYgKGluZGV4LmhpdCkgRE9NQm9hcmRbaV0uY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGlmIChpbmRleC5taXNzKSBET01Cb2FyZFtpXS5pbm5lclRleHQgPSAnWCc7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIGdlbmVyYXRlRmxlZXQoKSB7XG4gICAgT2JqZWN0LmtleXModHlwZSkuZm9yRWFjaCgoc2hpcE9iaikgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHR5cGVbc2hpcE9ial0pO1xuICAgICAgdGhpcy5mbGVldC5wdXNoKHNoaXApO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZmxlZXQpO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIHN0YXJ0Q29vcmQpIHtcbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcyhzdGFydENvb3JkICsgaSAqIDEwKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgYm91bmRzIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uc2hpcFR5cGUgPSBzaGlwLnR5cGU7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hpcC5pc1ZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ091dCBvZiBib3VuZHMhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJhbmRvbVNoaXBQbGFjZW1lbnQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5jYWxsUmFuZG9tTnVtYmVyKDIpID09PSAwKSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mbGVldFtpXS5pc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZsZWV0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSkgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5jbGVhckJvYXJkKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mbGVldFswXSk7XG4gICAgLy8gdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFswXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5ib2FyZFtjb29yZF0pO1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5taXNzIHx8IHRoaXMuYm9hcmRbY29vcmRdLmhpdCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkXS5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQubG9jYXRpb24gPSBjb29yZDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRdLm1pc3MgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZU9mU2hpcChjb29yZCkge1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwKSByZXR1cm4gdGhpcy5ib2FyZFtjb29yZF0uc2hpcFR5cGU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaHBIaXQobmFtZSkge1xuICAgIGNvbnN0IHNoaXBBcnIgPSB0aGlzLmJvYXJkLmZpbHRlcigoY29vcmQpID0+IGNvb3JkLnNoaXBUeXBlID09PSBuYW1lKTtcbiAgICBjb25zdCBmaW5kQ29ycmVjdFNoaXAgPSB0aGlzLmZsZWV0LmZpbHRlcigoc2hpcCkgPT4gc2hpcC50eXBlID09PSBuYW1lKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBBcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzaGlwQXJyW2ldLmhpdCkgZmluZENvcnJlY3RTaGlwWzBdLmhpdChpKTtcbiAgICB9XG4gIH1cblxuICBpc091dE9mQm91bmRzKGNvb3JkKSB7XG4gICAgaWYgKGNvb3JkIDwgMCB8fCBjb29yZCA+IHRoaXMuYm9hcmQubGVuZ3RoIC0gMSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIC8vIGNvbnN0IFNoaXBzT25seUFyciA9IHRoaXMuYm9hcmQuZmlsdGVyKChpKSA9PiBpLmhhc1NoaXAgPT09IHRydWUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFNoaXBzT25seUFyci5ldmVyeSgoaSkgPT4gaS5oaXQgPT09IHRydWUpKTtcbiAgICAvLyByZXR1cm4gU2hpcHNPbmx5QXJyLmV2ZXJ5KChpKSA9PiBpLmhpdCA9PT0gdHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZmxlZXQuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNEZXN0cm95ZWQoKSA9PT0gdHJ1ZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICByYW5kb21Nb3ZlKCkge1xuICAgIGNvbnN0IGNvb3JkID0gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgaWYgKHRoaXMucGFzdEhpdHMuc29tZSgocGFzdEhpdCkgPT4gcGFzdEhpdCA9PT0gY29vcmQpKSByZXR1cm4gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgdGhpcy5wYXN0SGl0cy5wdXNoKGNvb3JkKTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gY29vcmQ7XG4gICAgcmV0dXJuIGNvb3JkO1xuICB9XG5cbiAgY2xlYXJQYXN0SGl0cygpIHtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCB0eXBlID0ge1xuICBjYXJyaWVyOiB7XG4gICAgdHlwZTogJ2NhcnJpZXInLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIGNydWlzZXI6IHtcbiAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIGRlc3Ryb3llcjoge1xuICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbn07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaGlwLCB2ZXJ0aWNhbCA9IHRydWUpIHtcbiAgICB0aGlzLnR5cGUgPSBzaGlwLnR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICB0aGlzLmhwID0gQXJyYXkodGhpcy5sZW5ndGgpLmZpbGwobnVsbCk7XG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIC8vICAgaWYgKGFycltpXS5oaXQpIHRoaXMuaHBbaV0gPSB0cnVlO1xuICAgIC8vIH1cbiAgICB0aGlzLmhwW2luZGV4XSA9IHRydWU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc0Rlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ocC5ldmVyeSgoaHApID0+IGhwID09PSB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgeyB0eXBlLCBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgeyB0eXBlLCBTaGlwIH0gZnJvbSAnLi9uZXdTaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9uZXdQbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL25ld0dhbWVib2FyZCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBET00gPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyJyk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZW15Jyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShwbGF5ZXJHYW1lYm9hcmQuY2hpbGRyZW4pO1xuICBjb25zdCBlbmVteUdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShlbmVteUdhbWVib2FyZC5jaGlsZHJlbik7XG5cbiAgLy8gcGxheWVyR2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgLy8gICAvLyBjb25zdCBjZWxscyA9IEFycmF5LmZyb20oZS50YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gIC8vICAgLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICAvLyB9KTtcblxuICBlbmVteUdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBnYW1lLmdhbWVMb29wKGVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICAgICAgY29uc29sZS5sb2coZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzZXRNZXNzYWdlKHN0cikge1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG4gICAgbWVzc2FnZUVsLmlubmVyVGV4dCA9IHN0cjtcbiAgfVxuXG4gIHJldHVybiB7IHNldE1lc3NhZ2UsIHBsYXllckdhbWVib2FyZENlbGxzLCBlbmVteUdhbWVib2FyZENlbGxzIH07XG59KCkpO1xuXG5jb25zdCBnYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcignQ29tcHV0ZXInKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXNlR2FtZSgpIHtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgZW5lbXlHYW1lYm9hcmQuaW5pdGlhbGlzZUJvYXJkKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21TaGlwUGxhY2VtZW50KGJvb2xlYW4pIHtcbiAgICBpZiAoYm9vbGVhbiA9PT0gdHJ1ZSkgcGxheWVyR2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBnYW1lTG9vcChjb29yZCkge1xuICAgIGlmIChlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkKSA9PT0gdHJ1ZSkge1xuICAgICAgZW5lbXlHYW1lYm9hcmQuaHBIaXQoZW5lbXlHYW1lYm9hcmQuZ2V0TmFtZU9mU2hpcChjb29yZCkpO1xuICAgICAgZW5lbXlHYW1lYm9hcmQucmVuZGVyVG9ET00oRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMpO1xuICAgICAgaWYgKGlzR2FtZU92ZXIoKSkge1xuICAgICAgICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb21wdXRlci5yYW5kb21Nb3ZlKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29tcHV0ZXIuY3VycmVudE1vdmUpO1xuICAgIHBsYXllckdhbWVib2FyZC5yZW5kZXJUb0RPTShET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMpO1xuICAgIGlmIChpc0dhbWVPdmVyKCkgPT09IHRydWUpIHtcbiAgICAgIERPTS5zZXRNZXNzYWdlKCdDb21wdXRlciB3aW5zIScpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgaWYgKHBsYXllckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoJ0NvbXB1dGVyIHdpbnMhJyk7XG4gICAgfVxuICAgIGlmIChlbmVteUdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoJ1BsYXllciB3aW5zIScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHJlbmRlclBsYXllckdhbWVib2FyZCgpIHtcbiAgLy8gICBET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAvLyAgICAgY29uc3QgaSA9IERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscy5pbmRleE9mKGNlbGwpO1xuICAvLyAgICAgaWYgKHBsYXllckdhbWVib2FyZC50aGlzLmJvYXJkW2ldLmhpdCkge1xuICAvLyAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAvLyAgICAgfVxuICAvLyAgICAgaWYgKHBsYXllckdhbWVib2FyZC50aGlzLmJvYXJkW2ldLm1pc3MpIHtcbiAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIC8vICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgLy8gZnVuY3Rpb24gcmVuZGVyRW5lbXlHYW1lYm9hcmQoKSB7XG4gIC8vICAgRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAvLyAgICAgY29uc3QgaSA9IERPTS5lbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhpKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmQpO1xuICAvLyAgICAgY29uc29sZS5sb2coZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZFtpXSk7XG4gIC8vICAgICBpZiAoZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZFtpXS5oaXQpIHtcbiAgLy8gICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGlmIChlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldLm1pc3MpIHtcbiAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIC8vICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAvLyAgICAgfVxuICAvLyAgICAgY29uc29sZS5sb2coY2VsbCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICByZXR1cm4ge1xuICAgIGdhbWVMb29wLCByYW5kb21TaGlwUGxhY2VtZW50LCBwbGF5ZXJHYW1lYm9hcmQsIGVuZW15R2FtZWJvYXJkLCBpbml0aWFsaXNlR2FtZSxcbiAgfTtcbn0oKSk7XG5cbmdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcbmdhbWUucmFuZG9tU2hpcFBsYWNlbWVudCh0cnVlKTtcblxuZXhwb3J0IHsgRE9NLCBnYW1lIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=