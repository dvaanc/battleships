"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("@babel/types");

var _newShip = require("./newShip");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-unused-vars
var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, Gameboard);

    this.val = val;
    this.board = [];
    this.fleet = [];
    this.lastHit = {
      hit: false,
      location: null
    };
  }

  _createClass(Gameboard, [{
    key: "initialiseBoard",
    value: function initialiseBoard() {
      for (var i = 0; i < this.val; i += 1) {
        this.board.push({
          hasShip: false,
          shipType: null,
          hit: false,
          miss: false
        });
      }
    }
  }, {
    key: "clearBoard",
    value: function clearBoard() {
      this.board = [];
      this.fleet = [];
    }
  }, {
    key: "renderToDOM",
    value: function renderToDOM(DOMBoard) {
      var _this = this;

      this.board.forEach(function (index) {
        var i = _this.board.indexOf(index);

        if (index.hit) DOMBoard[i].classList.add('hit'); // eslint-disable-next-line no-param-reassign

        if (index.miss) DOMBoard[i].innerText = 'X';
      });
    }
  }, {
    key: "revealShips",
    value: function revealShips(DOMBoard) {
      var _this2 = this;

      this.board.forEach(function (index) {
        var i = _this2.board.indexOf(index);

        if (index.hasShip === true) {
          DOMBoard[i].classList.add('reveal-cell');
        }
      });
    }
  }, {
    key: "callRandomNumber",
    value: function callRandomNumber(val) {
      return this.constructor.randomNumber(val);
    }
  }, {
    key: "generateFleet",
    value: function generateFleet() {
      var _this3 = this;

      Object.keys(_newShip.type).forEach(function (shipObj) {
        var ship = new _newShip.Ship(_newShip.type[shipObj]);

        _this3.fleet.push(ship);
      });
      console.log(this.fleet);
    }
  }, {
    key: "grabShip",
    value: function grabShip(shipType) {
      var findCorrectShip = this.fleet.filter(function (ship) {
        return ship.type === shipType;
      });
      console.log(findCorrectShip); // switch (shipType) {
      //   case 'carrier':
      //     ship = new Ship(type.carrier);
      //     break;
      //   case 'battleship':
      //     ship = new Ship(type.battleship);
      //     break;
      //   case 'cruiser':
      //     ship = new Ship(type.cruiser);
      //     break;
      //   case 'submarine':
      //     ship = new Ship(type.submarine);
      //     break;
      //   case 'destroyer':
      //     ship = new Ship(type.destroyer);
      //     break;
      //   default:
      //     return false;
      // }
      // return ship;
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, startCoord) {
      if (this.validPlacement(ship, startCoord)) {
        return true;
      }

      for (var i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true; // console.log(this.board[startCoord + i]);
      }

      return null;
    }
  }, {
    key: "randomShipPlacement",
    value: function randomShipPlacement() {
      // console.log(this.fleet);
      for (var i = 0; i < this.fleet.length; i += 1) {
        if (this.callRandomNumber(2) === 0) {
          this.fleet[i].isVertical = false;
        } else {
          this.fleet[i].isVertical = true;
        }
      }

      for (var _i = 0; _i < this.fleet.length; _i += 1) {
        if (this.placeShip(this.fleet[_i], this.callRandomNumber(this.val)) === true) {
          this.clearBoard();
          this.initialiseBoard();
          this.generateFleet();
          return this.randomShipPlacement();
        }
      } // console.log(this.board);


      return null; // console.log(this.fleet[0]);
      // this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(coord) {
      if (this.board[coord].miss || this.board[coord].hit === true) return false;

      if (this.board[coord].hasShip) {
        this.board[coord].hit = true;
        this.lastHit.hit = true;
        this.lastHit.location = coord;
      }

      if (this.board[coord].hasShip === false) this.board[coord].miss = true;
      return true;
    }
  }, {
    key: "getNameOfShip",
    value: function getNameOfShip(coord) {
      if (this.board[coord].hasShip) return this.board[coord].shipType;
      return false;
    }
  }, {
    key: "hpHit",
    value: function hpHit(name) {
      var shipArr = this.board.filter(function (coord) {
        return coord.shipType === name;
      });
      var findCorrectShip = this.fleet.filter(function (ship) {
        return ship.type === name;
      });

      for (var i = 0; i < shipArr.length; i += 1) {
        if (shipArr[i].hit) findCorrectShip[0].hit(i);
      }
    }
  }, {
    key: "filterByShipType",
    value: function filterByShipType(name) {
      var shipArr = this.board.filter(function (index) {
        return index.shipType === name;
      });
      return shipArr;
    }
  }, {
    key: "validPlacement",
    value: function validPlacement(ship, startCoord) {
      if (ship.isVertical === true) {
        for (var i = 0; i < ship.length; i += 1) {
          if (this.isOutOfBounds(startCoord + i * 10)) {
            console.log('Out of bounds!');
            return true;
          }

          if (this.board[startCoord + i * 10].hasShip === true) {
            console.log('Error! Placement clashes with another placed ship!');
            return true;
          }
        }

        for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
          this.board[startCoord + _i2 * 10].shipType = ship.type;
          this.board[startCoord + _i2 * 10].hasShip = true;
          console.log(this.board[startCoord + _i2 * 10]);
        }
      }

      if (ship.isVertical === false) {
        for (var _i3 = 0; _i3 < ship.length; _i3 += 1) {
          if (this.isOutOfBounds(startCoord + _i3)) {
            console.log('Out of bounds!');
            return true;
          }

          if (_i3 >= 1) {
            var rounded = Math.ceil(startCoord / 10) * 10;

            if (startCoord + _i3 >= rounded) {
              console.log('continues on next line!');
              return true;
            }
          }

          if (this.board[startCoord + _i3].hasShip === true) {
            console.log('Error! Placement clashes with another placed ship!');
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(coord) {
      if (coord < 0 || coord > this.board.length - 1) return true;
      return false;
    }
  }, {
    key: "allShipsSunk",
    value: function allShipsSunk() {
      // console.log(this.fleet);
      // console.log(this.fleet.every((ship) => ship.isDestroyed()));
      return this.fleet.every(function (ship) {
        return ship.isDestroyed();
      });
    }
  }], [{
    key: "randomNumber",
    value: function randomNumber(val) {
      return Math.floor(Math.random() * val);
    }
  }]);

  return Gameboard;
}();

var _default = Gameboard;
exports["default"] = _default;