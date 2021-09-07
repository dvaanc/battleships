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

  clearGameboard() {
    this.board = [];
    this.fleet = [];
    this.lastHit.hit = false;
    this.lastHit.location = null;
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
        this.clearGameboard();
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
  const gameboards = document.querySelectorAll('.gameboard');
  const gameboardHolder = document.querySelector('.gameboardHolder');
  const playerGameboardCells = Array.from(playerGameboard.children);
  const enemyGameboardCells = Array.from(enemyGameboard.children);
  const restart = document.querySelector('#restart');
  const cell = document.querySelectorAll('.cell');

  playerGameboard.addEventListener('click', (e) => {
    // const cells = Array.from(e.target.parentNode.children);
    // console.log(playerGameboardCells.indexOf(e.target));
  });

  enemyGameboard.addEventListener('click', (e) => {
    game.gameLoop(enemyGameboardCells.indexOf(e.target));
    console.log(enemyGameboardCells.indexOf(e.target));
  });

  restart.addEventListener('click', (e) => {
    game.restartGame();
  });

  function clearBoard() {
    cell.forEach((e) => {
      e.innerText = '';
      e.classList.remove('cell');
    });
  }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function gameOver() {
    gameboards.forEach((e) => {
      e.classList.add('disable');
    });
  }

  return {
    clearBoard, setMessage, gameOver, playerGameboardCells, enemyGameboardCells,
  };
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
        DOM.gameOver();
        DOM.setMessage('Player wins!');
      }
    }
    computer.randomMove();
    playerGameboard.receiveAttack(computer.currentMove);
    playerGameboard.renderToDOM(DOM.playerGameboardCells);
    if (isGameOver() === true) {
      DOM.gameOver();
      DOM.setMessage('Computer wins!');
    }
    return null;
  }

  function restartGame() {
    DOM.clearBoard();
    playerGameboard.clearGameboard();
    playerGameboard.initialiseBoard();
    playerGameboard.generateFleet();

    enemyGameboard.clearGameboard();
    enemyGameboard.initialiseBoard();
    enemyGameboard.generateFleet();
  }

  function isGameOver() {
    if (playerGameboard.allShipsSunk() === true) return true;
    if (enemyGameboard.allShipsSunk() === true) return true;
    return false;
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
    gameLoop, randomShipPlacement, playerGameboard, enemyGameboard, initialiseGame, restartGame,
  };
}());

game.initialiseGame();
game.randomShipPlacement(true);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EscUJBQXFCLCtDQUFNO0FBQzNCLHVCQUF1QiwrQ0FBTTtBQUM3Qiw4QkFBOEIsa0RBQVM7QUFDdkMsNkJBQTZCLGtEQUFTOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL25ld1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9jb2RlL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUsIFNoaXB9IGZyb20gJy4vbmV3U2hpcCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IodmFsID0gMTAwKSB7XG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuZmxlZXQgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXQgPSB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgbG9jYXRpb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpc2VCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh7XG4gICAgICAgIGhhc1NoaXA6IGZhbHNlLCBzaGlwVHlwZTogbnVsbCwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGVhckdhbWVib2FyZCgpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5mbGVldCA9IFtdO1xuICAgIHRoaXMubGFzdEhpdC5oaXQgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RIaXQubG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgcmVuZGVyVG9ET00oRE9NQm9hcmQpIHtcbiAgICB0aGlzLmJvYXJkLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpID0gdGhpcy5ib2FyZC5pbmRleE9mKGluZGV4KTtcbiAgICAgIGlmIChpbmRleC5oaXQpIERPTUJvYXJkW2ldLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBpZiAoaW5kZXgubWlzcykgRE9NQm9hcmRbaV0uaW5uZXJUZXh0ID0gJ1gnO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICBnZW5lcmF0ZUZsZWV0KCkge1xuICAgIE9iamVjdC5rZXlzKHR5cGUpLmZvckVhY2goKHNoaXBPYmopID0+IHtcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcCh0eXBlW3NoaXBPYmpdKTtcbiAgICAgIHRoaXMuZmxlZXQucHVzaChzaGlwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKSB7XG4gICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkgKiAxMCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT3V0IG9mIGJvdW5kcyEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLnNoaXBUeXBlID0gc2hpcC50eXBlO1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpICogMTBdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHN0YXJ0Q29vcmQgKyBpKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXQgb2YgYm91bmRzIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5zaGlwVHlwZSA9IHNoaXAudHlwZTtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByYW5kb21TaGlwUGxhY2VtZW50KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMuY2FsbFJhbmRvbU51bWJlcigyKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmZsZWV0W2ldLmlzVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMucGxhY2VTaGlwKHRoaXMuZmxlZXRbaV0sIHRoaXMuY2FsbFJhbmRvbU51bWJlcih0aGlzLnZhbCkpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJHYW1lYm9hcmQoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZsZWV0WzBdKTtcbiAgICAvLyB0aGlzLnBsYWNlU2hpcCh0aGlzLmZsZWV0WzBdLCB0aGlzLmNhbGxSYW5kb21OdW1iZXIodGhpcy52YWwpKTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkW2Nvb3JkXSk7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLm1pc3MgfHwgdGhpcy5ib2FyZFtjb29yZF0uaGl0KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRdLmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQuaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5sb2NhdGlvbiA9IGNvb3JkO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXApIHtcbiAgICAgIHRoaXMuYm9hcmRbY29vcmRdLm1pc3MgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE5hbWVPZlNoaXAoY29vcmQpIHtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCkgcmV0dXJuIHRoaXMuYm9hcmRbY29vcmRdLnNoaXBUeXBlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhwSGl0KG5hbWUpIHtcbiAgICBjb25zdCBzaGlwQXJyID0gdGhpcy5ib2FyZC5maWx0ZXIoKGNvb3JkKSA9PiBjb29yZC5zaGlwVHlwZSA9PT0gbmFtZSk7XG4gICAgY29uc3QgZmluZENvcnJlY3RTaGlwID0gdGhpcy5mbGVldC5maWx0ZXIoKHNoaXApID0+IHNoaXAudHlwZSA9PT0gbmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2hpcEFycltpXS5oaXQpIGZpbmRDb3JyZWN0U2hpcFswXS5oaXQoaSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdXRPZkJvdW5kcyhjb29yZCkge1xuICAgIGlmIChjb29yZCA8IDAgfHwgY29vcmQgPiB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICAvLyBjb25zdCBTaGlwc09ubHlBcnIgPSB0aGlzLmJvYXJkLmZpbHRlcigoaSkgPT4gaS5oYXNTaGlwID09PSB0cnVlKTtcbiAgICAvLyBjb25zb2xlLmxvZyhTaGlwc09ubHlBcnIuZXZlcnkoKGkpID0+IGkuaGl0ID09PSB0cnVlKSk7XG4gICAgLy8gcmV0dXJuIFNoaXBzT25seUFyci5ldmVyeSgoaSkgPT4gaS5oaXQgPT09IHRydWUpO1xuICAgIHJldHVybiB0aGlzLmZsZWV0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzRGVzdHJveWVkKCkgPT09IHRydWUpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucGFzdEhpdHMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyByYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbCk7XG4gIH1cblxuICBjYWxsUmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJhbmRvbU51bWJlcih2YWwpO1xuICB9XG5cbiAgcmFuZG9tTW92ZSgpIHtcbiAgICBjb25zdCBjb29yZCA9IHRoaXMuY2FsbFJhbmRvbU51bWJlcigxMDApO1xuICAgIGlmICh0aGlzLnBhc3RIaXRzLnNvbWUoKHBhc3RIaXQpID0+IHBhc3RIaXQgPT09IGNvb3JkKSkgcmV0dXJuIHRoaXMuY2FsbFJhbmRvbU51bWJlcigxMDApO1xuICAgIHRoaXMucGFzdEhpdHMucHVzaChjb29yZCk7XG4gICAgdGhpcy5jdXJyZW50TW92ZSA9IGNvb3JkO1xuICAgIHJldHVybiBjb29yZDtcbiAgfVxuXG4gIGNsZWFyUGFzdEhpdHMoKSB7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29uc3QgdHlwZSA9IHtcbiAgY2Fycmllcjoge1xuICAgIHR5cGU6ICdjYXJyaWVyJyxcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIGJhdHRsZXNoaXA6IHtcbiAgICB0eXBlOiAnYmF0dGxlc2hpcCcsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICBjcnVpc2VyOiB7XG4gICAgdHlwZTogJ2NydWlzZXInLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgc3VibWFyaW5lOiB7XG4gICAgdHlwZTogJ3N1Ym1hcmluZScsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBkZXN0cm95ZXI6IHtcbiAgICB0eXBlOiAnZGVzdHJveWVyJyxcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG59O1xuXG5jbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3Ioc2hpcCwgdmVydGljYWwgPSB0cnVlKSB7XG4gICAgdGhpcy50eXBlID0gc2hpcC50eXBlO1xuICAgIHRoaXMubGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgdGhpcy5ocCA9IEFycmF5KHRoaXMubGVuZ3RoKS5maWxsKG51bGwpO1xuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IHZlcnRpY2FsO1xuICB9XG5cbiAgaGl0KGluZGV4KSB7XG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyAgIGlmIChhcnJbaV0uaGl0KSB0aGlzLmhwW2ldID0gdHJ1ZTtcbiAgICAvLyB9XG4gICAgdGhpcy5ocFtpbmRleF0gPSB0cnVlO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaXNEZXN0cm95ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHAuZXZlcnkoKGhwKSA9PiBocCA9PT0gdHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgdHlwZSwgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IHsgdHlwZSwgU2hpcCB9IGZyb20gJy4vbmV3U2hpcCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vbmV3UGxheWVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9uZXdHYW1lYm9hcmQnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllcicpO1xuICBjb25zdCBlbmVteUdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbmVteScpO1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZCcpO1xuICBjb25zdCBnYW1lYm9hcmRIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkSG9sZGVyJyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShwbGF5ZXJHYW1lYm9hcmQuY2hpbGRyZW4pO1xuICBjb25zdCBlbmVteUdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShlbmVteUdhbWVib2FyZC5jaGlsZHJlbik7XG4gIGNvbnN0IHJlc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcblxuICBwbGF5ZXJHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIC8vIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShlLnRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXJHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gIH0pO1xuXG4gIGVuZW15R2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBnYW1lLmdhbWVMb29wKGVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICB9KTtcblxuICByZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBnYW1lLnJlc3RhcnRHYW1lKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNsZWFyQm9hcmQoKSB7XG4gICAgY2VsbC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLmlubmVyVGV4dCA9ICcnO1xuICAgICAgZS5jbGFzc0xpc3QucmVtb3ZlKCdjZWxsJyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRNZXNzYWdlKHN0cikge1xuICAgIGNvbnN0IG1lc3NhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG4gICAgbWVzc2FnZUVsLmlubmVyVGV4dCA9IHN0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xuICAgIGdhbWVib2FyZHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNsZWFyQm9hcmQsIHNldE1lc3NhZ2UsIGdhbWVPdmVyLCBwbGF5ZXJHYW1lYm9hcmRDZWxscywgZW5lbXlHYW1lYm9hcmRDZWxscyxcbiAgfTtcbn0oKSk7XG5cbmNvbnN0IGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpc2VHYW1lKCkge1xuICAgIHBsYXllckdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbVNoaXBQbGFjZW1lbnQoYm9vbGVhbikge1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSBwbGF5ZXJHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdhbWVMb29wKGNvb3JkKSB7XG4gICAgaWYgKGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpKSB7XG4gICAgICBlbmVteUdhbWVib2FyZC5ocEhpdChlbmVteUdhbWVib2FyZC5nZXROYW1lT2ZTaGlwKGNvb3JkKSk7XG4gICAgICBlbmVteUdhbWVib2FyZC5yZW5kZXJUb0RPTShET00uZW5lbXlHYW1lYm9hcmRDZWxscyk7XG4gICAgICBpZiAoaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgIERPTS5nYW1lT3ZlcigpO1xuICAgICAgICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVyLnJhbmRvbU1vdmUoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb21wdXRlci5jdXJyZW50TW92ZSk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlbmRlclRvRE9NKERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscyk7XG4gICAgaWYgKGlzR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xuICAgICAgRE9NLmdhbWVPdmVyKCk7XG4gICAgICBET00uc2V0TWVzc2FnZSgnQ29tcHV0ZXIgd2lucyEnKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgICBET00uY2xlYXJCb2FyZCgpO1xuICAgIHBsYXllckdhbWVib2FyZC5jbGVhckdhbWVib2FyZCgpO1xuICAgIHBsYXllckdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuXG4gICAgZW5lbXlHYW1lYm9hcmQuY2xlYXJHYW1lYm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgIGlmIChlbmVteUdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSA9PT0gdHJ1ZSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gZnVuY3Rpb24gcmVuZGVyUGxheWVyR2FtZWJvYXJkKCkge1xuICAvLyAgIERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIC8vICAgICBjb25zdCBpID0gRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gIC8vICAgICBpZiAocGxheWVyR2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0uaGl0KSB7XG4gIC8vICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIC8vICAgICB9XG4gIC8vICAgICBpZiAocGxheWVyR2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0ubWlzcykge1xuICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgLy8gICAgICAgY2VsbC5pbm5lclRleHQgPSAnWCc7XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvLyBmdW5jdGlvbiByZW5kZXJFbmVteUdhbWVib2FyZCgpIHtcbiAgLy8gICBET00uZW5lbXlHYW1lYm9hcmRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIC8vICAgICBjb25zdCBpID0gRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihjZWxsKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGkpO1xuICAvLyAgICAgY29uc29sZS5sb2coZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZCk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldKTtcbiAgLy8gICAgIGlmIChlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldLmhpdCkge1xuICAvLyAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAvLyAgICAgfVxuICAvLyAgICAgaWYgKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmRbaV0ubWlzcykge1xuICAvLyAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgLy8gICAgICAgY2VsbC5pbm5lclRleHQgPSAnWCc7XG4gIC8vICAgICB9XG4gIC8vICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIHJldHVybiB7XG4gICAgZ2FtZUxvb3AsIHJhbmRvbVNoaXBQbGFjZW1lbnQsIHBsYXllckdhbWVib2FyZCwgZW5lbXlHYW1lYm9hcmQsIGluaXRpYWxpc2VHYW1lLCByZXN0YXJ0R2FtZSxcbiAgfTtcbn0oKSk7XG5cbmdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcbmdhbWUucmFuZG9tU2hpcFBsYWNlbWVudCh0cnVlKTtcblxuZXhwb3J0IHsgRE9NLCBnYW1lIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=