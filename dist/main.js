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
    Object.keys(_newShip__WEBPACK_IMPORTED_MODULE_0__.type).forEach((key) => {
      const ship = new _newShip__WEBPACK_IMPORTED_MODULE_0__.Ship(_newShip__WEBPACK_IMPORTED_MODULE_0__.type[key]);
      this.fleet.push(ship);
    });
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i < ship.hp.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          return this.placeShip(ship, this.callRandomNumber(this.val));
        }
        // if (this.board[startCoord + i * 10].hasShip !== false) {
        //   console.log('Error! Placement clashes with another placed ship!');
        //   return this.placeShip(ship, startCoord);
        // }
        // this.board[startCoord + i * 10] = ship.type;
        console.log(this.board[startCoord + i * 10]);
      }
    }
    // else {
    //   for (let i = 0; i <= ship.hp.length; i += 1) {
    //     // if (this.board[startCoord + i].hasShip !== false) {
    //     //   console.log('Error! Placement clashes with another placed ship!');
    //     //   return this.placeShip(ship, startCoord);
    //     // }
    //     this.board[startCoord + i].hasShip = ship.type;
    //   }
    // }
  }

  randomShipPlacement() {
    // for (let i = 0; i < this.fleet.length; i += 1) {
    //   // this.placeShip(this.fleet[i], this.callRandomNumber(this.val));
    //   this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
    // }
    console.log(this.fleet[0]);
    this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBOztBQUVxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3R2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3UGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvbmV3U2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2NvZGUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSwgU2hpcH0gZnJvbSAnLi9uZXdTaGlwJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3Rvcih2YWwgPSAxMDApIHtcbiAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5mbGVldCA9IFtdO1xuICAgIHRoaXMubGFzdEhpdCA9IHtcbiAgICAgIGhpdDogZmFsc2UsXG4gICAgICBsb2NhdGlvbjogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbGlzZUJvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWw7IGkgKz0gMSkge1xuICAgICAgdGhpcy5ib2FyZC5wdXNoKHsgXG4gICAgICAgIGhhc1NoaXA6IGZhbHNlLCBzaGlwVHlwZTogbnVsbCwgaGl0OiBmYWxzZSwgbWlzczogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tTnVtYmVyKHZhbCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWwpO1xuICB9XG5cbiAgY2FsbFJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5yYW5kb21OdW1iZXIodmFsKTtcbiAgfVxuXG4gIGdlbmVyYXRlRmxlZXQoKSB7XG4gICAgT2JqZWN0LmtleXModHlwZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAodHlwZVtrZXldKTtcbiAgICAgIHRoaXMuZmxlZXQucHVzaChzaGlwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYWNlU2hpcChzaGlwLCBzdGFydENvb3JkKSB7XG4gICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmhwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoc3RhcnRDb29yZCArIGkgKiAxMCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wbGFjZVNoaXAoc2hpcCwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKHRoaXMuYm9hcmRbc3RhcnRDb29yZCArIGkgKiAxMF0uaGFzU2hpcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAgICAgLy8gICByZXR1cm4gdGhpcy5wbGFjZVNoaXAoc2hpcCwgc3RhcnRDb29yZCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXSA9IHNoaXAudHlwZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ib2FyZFtzdGFydENvb3JkICsgaSAqIDEwXSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc2hpcC5ocC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIC8vICAgICAvLyBpZiAodGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0uaGFzU2hpcCAhPT0gZmFsc2UpIHtcbiAgICAvLyAgICAgLy8gICBjb25zb2xlLmxvZygnRXJyb3IhIFBsYWNlbWVudCBjbGFzaGVzIHdpdGggYW5vdGhlciBwbGFjZWQgc2hpcCEnKTtcbiAgICAvLyAgICAgLy8gICByZXR1cm4gdGhpcy5wbGFjZVNoaXAoc2hpcCwgc3RhcnRDb29yZCk7XG4gICAgLy8gICAgIC8vIH1cbiAgICAvLyAgICAgdGhpcy5ib2FyZFtzdGFydENvb3JkICsgaV0uaGFzU2hpcCA9IHNoaXAudHlwZTtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cblxuICByYW5kb21TaGlwUGxhY2VtZW50KCkge1xuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mbGVldC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIC8vICAgLy8gdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFtpXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gICAgLy8gICB0aGlzLnBsYWNlU2hpcCh0aGlzLmZsZWV0WzBdLCB0aGlzLmNhbGxSYW5kb21OdW1iZXIodGhpcy52YWwpKTtcbiAgICAvLyB9XG4gICAgY29uc29sZS5sb2codGhpcy5mbGVldFswXSk7XG4gICAgdGhpcy5wbGFjZVNoaXAodGhpcy5mbGVldFswXSwgdGhpcy5jYWxsUmFuZG9tTnVtYmVyKHRoaXMudmFsKSk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29vcmRdLm1pc3MpIHJldHVybjtcbiAgICBpZiAodGhpcy5ib2FyZFtjb29yZF0uaGFzU2hpcCkge1xuICAgICAgdGhpcy5ib2FyZFtjb29yZF0uaGl0ID0gdHJ1ZTtcbiAgICAgIHRoaXMubGFzdEhpdC5oaXQgPSB0cnVlO1xuICAgICAgdGhpcy5sYXN0SGl0LmxvY2F0aW9uID0gY29vcmQ7XG4gICAgfVxuICB9XG5cbiAgaXNPdXRPZkJvdW5kcyhjb29yZCkge1xuICAgIGlmIChjb29yZCA8IDAgfHwgY29vcmQgPiB0aGlzLmJvYXJkLmxlbmd0aCAtIDEpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5zb21lKChjZWxsKSA9PiBjZWxsLmhhc1NoaXAgIT09IGZhbHNlICYmIGNlbGwuaGl0ID09PSBmYWxzZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXN0SGl0cyA9IFtdO1xuICAgIHRoaXMuY3VycmVudE1vdmUgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIHJhbmRvbU51bWJlcih2YWwpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdmFsKTtcbiAgfVxuXG4gIGNhbGxSYW5kb21OdW1iZXIodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IucmFuZG9tTnVtYmVyKHZhbCk7XG4gIH1cblxuICByYW5kb21Nb3ZlKCkge1xuICAgIGNvbnN0IGNvb3JkID0gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgaWYgKHRoaXMucGFzdEhpdHMuc29tZSgocGFzdEhpdCkgPT4gcGFzdEhpdCA9PT0gY29vcmQpKSByZXR1cm4gdGhpcy5jYWxsUmFuZG9tTnVtYmVyKDEwMCk7XG4gICAgdGhpcy5wYXN0SGl0cy5wdXNoKGNvb3JkKTtcbiAgICB0aGlzLmN1cnJlbnRNb3ZlID0gY29vcmQ7XG4gICAgcmV0dXJuIGNvb3JkO1xuICB9XG5cbiAgY2xlYXJQYXN0SGl0cygpIHtcbiAgICB0aGlzLnBhc3RIaXRzID0gW107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb25zdCB0eXBlID0ge1xuICBjYXJyaWVyOiB7XG4gICAgdHlwZTogJ2NhcnJpZXInLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgYmF0dGxlc2hpcDoge1xuICAgIHR5cGU6ICdiYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIGNydWlzZXI6IHtcbiAgICB0eXBlOiAnY3J1aXNlcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICBzdWJtYXJpbmU6IHtcbiAgICB0eXBlOiAnc3VibWFyaW5lJyxcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIGRlc3Ryb3llcjoge1xuICAgIHR5cGU6ICdkZXN0cm95ZXInLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbn07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaGlwLCB2ZXJ0aWNhbCA9IHRydWUpIHtcbiAgICB0aGlzLnR5cGUgPSBzaGlwLnR5cGU7XG4gICAgdGhpcy5sZW5ndGggPSBzaGlwLmxlbmd0aDtcbiAgICB0aGlzLmhwID0gQXJyYXkodGhpcy5sZW5ndGgpLmZpbGwobnVsbCk7XG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gdmVydGljYWw7XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhwW2luZGV4XSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuaHA7XG4gIH1cblxuICBpc0Rlc3Ryb3llZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ocC5ldmVyeSgoaHApID0+IGhwID09PSB0cnVlKTtcbiAgfVxufVxuXG5leHBvcnQgeyB0eXBlLCBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgeyB0eXBlLCBTaGlwIH0gZnJvbSAnLi9uZXdTaGlwJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9uZXdQbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL25ld0dhbWVib2FyZCc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBET00gPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyJyk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZW15Jyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShwbGF5ZXJHYW1lYm9hcmQuY2hpbGRyZW4pO1xuICBjb25zdCBlbmVteUdhbWVib2FyZENlbGxzID0gQXJyYXkuZnJvbShlbmVteUdhbWVib2FyZC5jaGlsZHJlbik7XG5cbiAgcGxheWVyR2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAvLyBjb25zdCBjZWxscyA9IEFycmF5LmZyb20oZS50YXJnZXQucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gICAgLy8gY29uc29sZS5sb2cocGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihlLnRhcmdldCkpO1xuICB9KTtcblxuICBlbmVteUdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZ2FtZS5nYW1lTG9vcChlbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoZS50YXJnZXQpKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0TWVzc2FnZShzdHIpIHtcbiAgICBjb25zdCBtZXNzYWdlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuICAgIG1lc3NhZ2VFbC5pbm5lclRleHQgPSBzdHI7XG4gIH1cblxuICByZXR1cm4geyBzZXRNZXNzYWdlLCBwbGF5ZXJHYW1lYm9hcmRDZWxscywgZW5lbXlHYW1lYm9hcmRDZWxscyB9O1xufSgpKTtcblxuY29uc3QgZ2FtZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoJ3BsYXllcicpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoJ0NvbXB1dGVyJyk7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3QgZW5lbXlHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGlzZUdhbWUoKSB7XG4gICAgcGxheWVyR2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIGVuZW15R2FtZWJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuICAgIHBsYXllckdhbWVib2FyZC5nZW5lcmF0ZUZsZWV0KCk7XG4gICAgZW5lbXlHYW1lYm9hcmQuZ2VuZXJhdGVGbGVldCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tU2hpcFBsYWNlbWVudChib29sZWFuKSB7XG4gICAgLy8gaWYgKGJvb2xlYW4gPT09IHRydWUpIHBsYXllckdhbWVib2FyZC5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG4gICAgZW5lbXlHYW1lYm9hcmQucmFuZG9tU2hpcFBsYWNlbWVudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2FtZUxvb3AoaW5kZXgpIHtcbiAgICBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGluZGV4KTtcbiAgICBjb21wdXRlci5yYW5kb21Nb3ZlKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29tcHV0ZXIuY3VycmVudE1vdmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICBpZiAoZW5lbXlHYW1lYm9hcmQuYWxsU2hpcHNTdW5rKCkgPT09IGZhbHNlKSB7XG4gICAgICBET00uc2V0TWVzc2FnZShgJHtwbGF5ZXIubmFtZX0gd2lucyEgQ29tcHV0ZXJzIHNoaXBzIGhhdmUgYmVlbiBzdW5rIWApO1xuICAgIH1cbiAgICBpZiAocGxheWVyR2FtZWJvYXJkLmFsbFNoaXBzU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgRE9NLnNldE1lc3NhZ2UoYCR7Y29tcHV0ZXIubmFtZX0gd2lucyEgUGxheWVycyBzaGlwcyBoYXZlIGJlZW4gc3VuayFgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIoZ2FtZWJvYXJkKSB7XG4gICAgRE9NLnBsYXllckdhbWVib2FyZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNvbnN0IGkgPSBET00ucGxheWVyR2FtZWJvYXJkQ2VsbHMuaW5kZXhPZihjZWxsKTtcbiAgICAgIGlmIChnYW1lYm9hcmRbaV0uaGl0KSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZWJvYXJkW2ldLm1pc3MpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgRE9NLmVuZW15R2FtZWJvYXJkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY29uc3QgaSA9IERPTS5lbmVteUdhbWVib2FyZENlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgICBjb25zb2xlLmxvZyhpKTtcbiAgICAgIGlmIChnYW1lYm9hcmRbaV0uaGl0KSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoZ2FtZWJvYXJkW2ldLm1pc3MpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGNlbGwuaW5uZXJUZXh0ID0gJ1gnO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coY2VsbCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbmRlciwgZ2FtZUxvb3AsIHJhbmRvbVNoaXBQbGFjZW1lbnQsIHBsYXllckdhbWVib2FyZCwgZW5lbXlHYW1lYm9hcmQsIGluaXRpYWxpc2VHYW1lLFxuICB9O1xufSgpKTtcblxuZ2FtZS5pbml0aWFsaXNlR2FtZSgpO1xuXG4vLyBjb25zb2xlLmxvZyhnYW1lLnBsYXllckdhbWVib2FyZCk7XG4vLyBjb25zb2xlLmxvZyhnYW1lLmVuZW15R2FtZWJvYXJkKTtcblxuZ2FtZS5yYW5kb21TaGlwUGxhY2VtZW50KCk7XG5cbmV4cG9ydCB7IERPTSwgZ2FtZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9