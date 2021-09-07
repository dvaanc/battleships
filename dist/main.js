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
    // console.log(this.fleet);
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
        if (i >= 1) {
          const rounded = Math.ceil(startCoord / 10) * 10;
          console.log(rounded);
          if (startCoord + i >= rounded) {
            console.log('continues on next line!');
            return true;
          }
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
    // console.log(this.board);
    return null;
    // console.log(this.fleet[0]);
    // this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
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

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    // console.log(this.fleet);
    console.log(this.fleet.every((ship) => ship.isDestroyed()));
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

  // function gameLoop(index) {
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
        console.log('enemy all ships sunk');
      }
      // if (isGameOver()) {
      //   console.log(isGameOver());
      //   // DOM.gameOver();
      //   DOM.setMessage('Player wins!');
      // }
      computer.randomMove();
      playerGameboard.receiveAttack(computer.currentMove);
      playerGameboard.renderToDOM(DOM.playerGameboardCells);
      if (playerGameboard.allShipsSunk()) {
        console.log('player ships all sunk');
      }
    }

    // if (isGameOver()) {
    //   DOM.setMessage('Computer wins!');
    // }
  }

  // function isGameOver() {
  //   if (enemyGameboard.allShipsSunk() || playerGameboard.allShipsSunk() === false) return true;
  //   return false;
  // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQiwrQ0FBTTtBQUMzQix1QkFBdUIsK0NBQU07QUFDN0IsOEJBQThCLGtEQUFTO0FBQ3ZDLDZCQUE2QixrREFBUzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBOztBQUVxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3R2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3UGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3U2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSwgU2hpcCB9IGZyb20gJy4vbmV3U2hpcCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IodmFsID0gMTAwKSB7XG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuZmxlZXQgPSBbXTtcbiAgICB0aGlzLmxhc3RIaXQgPSB7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgICAgbG9jYXRpb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGluaXRpYWxpc2VCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaCh7XG4gICAgICAgIGhhc1NoaXA6IGZhbHNlLCBzaGlwVHlwZTogbnVsbCwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbGVhckJvYXJkKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgfVxuXG4gIHJlbmRlclRvRE9NKERPTUJvYXJkKSB7XG4gICAgdGhpcy5ib2FyZC5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaSA9IHRoaXMuYm9hcmQuaW5kZXhPZihpbmRleCk7XG4gICAgICBpZiAoaW5kZXguaGl0KSBET01Cb2FyZFtpXS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgaWYgKGluZGV4Lm1pc3MpIERPTUJvYXJkW2ldLmlubmVyVGV4dCA9ICdYJztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyByYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbCk7XG4gIH1cblxuICBjYWxsUmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJhbmRvbU51bWJlcih2YWwpO1xuICB9XG5cbiAgZ2VuZXJhdGVGbGVldCgpIHtcbiAgICBPYmplY3Qua2V5cyh0eXBlKS5mb3JFYWNoKChzaGlwT2JqKSA9PiB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAodHlwZVtzaGlwT2JqXSk7XG4gICAgICB0aGlzLmZsZWV0LnB1c2goc2hpcCk7XG4gICAgfSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5mbGVldCk7XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCwgc3RhcnRDb29yZCkge1xuICAgIGlmIChzaGlwLmlzVmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKHN0YXJ0Q29vcmQgKyBpICogMTApKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ091dCBvZiBib3VuZHMhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciEgUGxhY2VtZW50IGNsYXNoZXMgd2l0aCBhbm90aGVyIHBsYWNlZCBzaGlwIScpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5zaGlwVHlwZSA9IHNoaXAudHlwZTtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwLmlzVmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcyhzdGFydENvb3JkICsgaSkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT3V0IG9mIGJvdW5kcyEnKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA+PSAxKSB7XG4gICAgICAgICAgY29uc3Qgcm91bmRlZCA9IE1hdGguY2VpbChzdGFydENvb3JkIC8gMTApICogMTA7XG4gICAgICAgICAgY29uc29sZS5sb2cocm91bmRlZCk7XG4gICAgICAgICAgaWYgKHN0YXJ0Q29vcmQgKyBpID49IHJvdW5kZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250aW51ZXMgb24gbmV4dCBsaW5lIScpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yISBQbGFjZW1lbnQgY2xhc2hlcyB3aXRoIGFub3RoZXIgcGxhY2VkIHNoaXAhJyk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLmJvYXJkW3N0YXJ0Q29vcmQgKyBpXS5zaGlwVHlwZSA9IHNoaXAudHlwZTtcbiAgICAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0uaGFzU2hpcCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByYW5kb21TaGlwUGxhY2VtZW50KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZmxlZXQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMuY2FsbFJhbmRvbU51bWJlcigyKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmZsZWV0W2ldLmlzVmVydGljYWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmxlZXRbaV0uaXNWZXJ0aWNhbCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXMucGxhY2VTaGlwKHRoaXMuZmxlZXRbaV0sIHRoaXMuY2FsbFJhbmRvbU51bWJlcih0aGlzLnZhbCkpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYm9hcmQpO1xuICAgIHJldHVybiBudWxsO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZmxlZXRbMF0pO1xuICAgIC8vIHRoaXMucGxhY2VTaGlwKHRoaXMuZmxlZXRbMF0sIHRoaXMuY2FsbFJhbmRvbU51bWJlcih0aGlzLnZhbCkpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5taXNzIHx8IHRoaXMuYm9hcmRbY29vcmRdLmhpdCA9PT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLmJvYXJkW2Nvb3JkXS5oYXNTaGlwKSB7XG4gICAgICB0aGlzLmJvYXJkW2Nvb3JkXS5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmhpdCA9IHRydWU7XG4gICAgICB0aGlzLmxhc3RIaXQubG9jYXRpb24gPSBjb29yZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLmhhc1NoaXAgPT09IGZhbHNlKSB0aGlzLmJvYXJkW2Nvb3JkXS5taXNzID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE5hbWVPZlNoaXAoY29vcmQpIHtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCkgcmV0dXJuIHRoaXMuYm9hcmRbY29vcmRdLnNoaXBUeXBlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhwSGl0KG5hbWUpIHtcbiAgICBjb25zdCBzaGlwQXJyID0gdGhpcy5ib2FyZC5maWx0ZXIoKGNvb3JkKSA9PiBjb29yZC5zaGlwVHlwZSA9PT0gbmFtZSk7XG4gICAgY29uc3QgZmluZENvcnJlY3RTaGlwID0gdGhpcy5mbGVldC5maWx0ZXIoKHNoaXApID0+IHNoaXAudHlwZSA9PT0gbmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2hpcEFycltpXS5oaXQpIGZpbmRDb3JyZWN0U2hpcFswXS5oaXQoaSk7XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyQnlTaGlwVHlwZShuYW1lKSB7XG4gICAgY29uc3Qgc2hpcEFyciA9IHRoaXMuYm9hcmQuZmlsdGVyKChpbmRleCkgPT4gaW5kZXguc2hpcFR5cGUgPT09IG5hbWUpO1xuICAgIHJldHVybiBzaGlwQXJyO1xuICB9XG5cbiAgaXNPdXRPZkJvdW5kcyhjb29yZCkge1xuICAgIGlmIChjb29yZCA8IDAgfHwgY29vcmQgPiB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZsZWV0KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZsZWV0LmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzRGVzdHJveWVkKCkpKTtcbiAgICByZXR1cm4gdGhpcy5mbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc0Rlc3Ryb3llZCgpKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gICAgdGhpcy5jdXJyZW50TW92ZSA9IG51bGw7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIHJhbmRvbU1vdmUoKSB7XG4gICAgY29uc3QgY29vcmQgPSB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICBpZiAodGhpcy5wYXN0SGl0cy5zb21lKChwYXN0SGl0KSA9PiBwYXN0SGl0ID09PSBjb29yZCkpIHJldHVybiB0aGlzLmNhbGxSYW5kb21OdW1iZXIoMTAwKTtcbiAgICB0aGlzLnBhc3RIaXRzLnB1c2goY29vcmQpO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBjb29yZDtcbiAgICByZXR1cm4gY29vcmQ7XG4gIH1cblxuICBjbGVhclBhc3RIaXRzKCkge1xuICAgIHRoaXMucGFzdEhpdHMgPSBbXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbnN0IHR5cGUgPSB7XG4gIGNhcnJpZXI6IHtcbiAgICB0eXBlOiAnY2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICB9LFxuICBiYXR0bGVzaGlwOiB7XG4gICAgdHlwZTogJ2JhdHRsZXNoaXAnLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAgY3J1aXNlcjoge1xuICAgIHR5cGU6ICdjcnVpc2VyJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIHN1Ym1hcmluZToge1xuICAgIHR5cGU6ICdzdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgZGVzdHJveWVyOiB7XG4gICAgdHlwZTogJ2Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxufTtcblxuY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKHNoaXAsIHZlcnRpY2FsID0gdHJ1ZSkge1xuICAgIHRoaXMudHlwZSA9IHNoaXAudHlwZTtcbiAgICB0aGlzLmxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIHRoaXMuaHAgPSBBcnJheSh0aGlzLmxlbmd0aCkuZmlsbChudWxsKTtcbiAgICB0aGlzLmlzVmVydGljYWwgPSB2ZXJ0aWNhbDtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIHRoaXMuaHBbaW5kZXhdID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5ocDtcbiAgfVxuXG4gIGlzRGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzLmhwLmV2ZXJ5KChocCkgPT4gaHAgPT09IHRydWUpO1xuICB9XG59XG5cbmV4cG9ydCB7IHR5cGUsIFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCB7IHR5cGUsIFNoaXAgfSBmcm9tICcuL25ld1NoaXAnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL25ld1BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vbmV3R2FtZWJvYXJkJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IERPTSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXInKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5lbXknKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkQ2VsbHMgPSBBcnJheS5mcm9tKHBsYXllckdhbWVib2FyZC5jaGlsZHJlbik7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkQ2VsbHMgPSBBcnJheS5mcm9tKGVuZW15R2FtZWJvYXJkLmNoaWxkcmVuKTtcblxuICAvLyBwbGF5ZXJHYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAvLyAgIC8vIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShlLnRhcmdldC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgLy8gICAvLyBjb25zb2xlLmxvZyhwbGF5ZXJHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gIC8vIH0pO1xuXG4gIGVuZW15R2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGdhbWUuZ2FtZUxvb3AoZW5lbXlHYW1lYm9hcmRDZWxscy5pbmRleE9mKGUudGFyZ2V0KSk7XG4gICAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldE1lc3NhZ2Uoc3RyKSB7XG4gICAgY29uc3QgbWVzc2FnZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbiAgICBtZXNzYWdlRWwuaW5uZXJUZXh0ID0gc3RyO1xuICB9XG5cbiAgcmV0dXJuIHsgc2V0TWVzc2FnZSwgcGxheWVyR2FtZWJvYXJkQ2VsbHMsIGVuZW15R2FtZWJvYXJkQ2VsbHMgfTtcbn0oKSk7XG5cbmNvbnN0IGdhbWUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdDb21wdXRlcicpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpc2VHYW1lKCkge1xuICAgIHBsYXllckdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBlbmVteUdhbWVib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmdlbmVyYXRlRmxlZXQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbVNoaXBQbGFjZW1lbnQoYm9vbGVhbikge1xuICAgIGlmIChib29sZWFuID09PSB0cnVlKSBwbGF5ZXJHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLnJhbmRvbVNoaXBQbGFjZW1lbnQoKTtcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGdhbWVMb29wKGluZGV4KSB7XG4gIC8vICAgZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhpbmRleCk7XG4gIC8vICAgZW5lbXlHYW1lYm9hcmQucmVuZGVyVG9ET00oRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMpO1xuICAvLyAgIGlmIChpc0dhbWVPdmVyKCkpIHtcbiAgLy8gICAgIERPTS5zZXRNZXNzYWdlKCdQbGF5ZXIgd2lucyEnKTtcbiAgLy8gICB9XG4gIGZ1bmN0aW9uIGdhbWVMb29wKGNvb3JkKSB7XG4gICAgaWYgKGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpID09PSB0cnVlKSB7XG4gICAgICBlbmVteUdhbWVib2FyZC5ocEhpdChlbmVteUdhbWVib2FyZC5nZXROYW1lT2ZTaGlwKGNvb3JkKSk7XG4gICAgICBlbmVteUdhbWVib2FyZC5yZW5kZXJUb0RPTShET00uZW5lbXlHYW1lYm9hcmRDZWxscyk7XG4gICAgICBpZiAoZW5lbXlHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZW15IGFsbCBzaGlwcyBzdW5rJyk7XG4gICAgICB9XG4gICAgICAvLyBpZiAoaXNHYW1lT3ZlcigpKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKGlzR2FtZU92ZXIoKSk7XG4gICAgICAvLyAgIC8vIERPTS5nYW1lT3ZlcigpO1xuICAgICAgLy8gICBET00uc2V0TWVzc2FnZSgnUGxheWVyIHdpbnMhJyk7XG4gICAgICAvLyB9XG4gICAgICBjb21wdXRlci5yYW5kb21Nb3ZlKCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb21wdXRlci5jdXJyZW50TW92ZSk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucmVuZGVyVG9ET00oRE9NLnBsYXllckdhbWVib2FyZENlbGxzKTtcbiAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BsYXllciBzaGlwcyBhbGwgc3VuaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIChpc0dhbWVPdmVyKCkpIHtcbiAgICAvLyAgIERPTS5zZXRNZXNzYWdlKCdDb21wdXRlciB3aW5zIScpO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gIC8vICAgaWYgKGVuZW15R2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpIHx8IHBsYXllckdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSA9PT0gZmFsc2UpIHJldHVybiB0cnVlO1xuICAvLyAgIHJldHVybiBmYWxzZTtcbiAgLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIHJlbmRlclBsYXllckdhbWVib2FyZCgpIHtcbiAgLy8gICBET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAvLyAgICAgY29uc3QgaSA9IERPTS5wbGF5ZXJHYW1lYm9hcmRDZWxscy5pbmRleE9mKGNlbGwpO1xuICAvLyAgICAgaWYgKHBsYXllckdhbWVib2FyZC50aGlzLmJvYXJkW2ldLmhpdCkge1xuICAvLyAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAvLyAgICAgfVxuICAvLyAgICAgaWYgKHBsYXllckdhbWVib2FyZC50aGlzLmJvYXJkW2ldLm1pc3MpIHtcbiAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIC8vICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG5cbiAgLy8gZnVuY3Rpb24gcmVuZGVyRW5lbXlHYW1lYm9hcmQoKSB7XG4gIC8vICAgRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAvLyAgICAgY29uc3QgaSA9IERPTS5lbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gIC8vICAgICBjb25zb2xlLmxvZyhpKTtcbiAgLy8gICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkLnRoaXMuYm9hcmQpO1xuICAvLyAgICAgY29uc29sZS5sb2coZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZFtpXSk7XG4gIC8vICAgICBpZiAoZW5lbXlHYW1lYm9hcmQudGhpcy5ib2FyZFtpXS5oaXQpIHtcbiAgLy8gICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGlmIChlbmVteUdhbWVib2FyZC50aGlzLmJvYXJkW2ldLm1pc3MpIHtcbiAgLy8gICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIC8vICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAvLyAgICAgfVxuICAvLyAgICAgY29uc29sZS5sb2coY2VsbCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICByZXR1cm4ge1xuICAgIGdhbWVMb29wLCByYW5kb21TaGlwUGxhY2VtZW50LCBwbGF5ZXJHYW1lYm9hcmQsIGVuZW15R2FtZWJvYXJkLCBpbml0aWFsaXNlR2FtZSxcbiAgfTtcbn0oKSk7XG5cbmdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcblxuLy8gY29uc29sZS5sb2coZ2FtZS5wbGF5ZXJHYW1lYm9hcmQpO1xuLy8gY29uc29sZS5sb2coZ2FtZS5lbmVteUdhbWVib2FyZCk7XG5cbmdhbWUucmFuZG9tU2hpcFBsYWNlbWVudCh0cnVlKTtcblxuZXhwb3J0IHsgRE9NLCBnYW1lIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=