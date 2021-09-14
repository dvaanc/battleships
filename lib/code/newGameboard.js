"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("@babel/types");

var _newShip = require("./newShip");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    }
  }, {
    key: "grabShip",
    value: function grabShip(shipType) {
      var ship = null;

      switch (shipType) {
        case 'carrier':
          var _this$fleet = _slicedToArray(this.fleet, 1);

          ship = _this$fleet[0];
          break;

        case 'battleship':
          var _this$fleet2 = _slicedToArray(this.fleet, 2);

          ship = _this$fleet2[1];
          break;

        case 'cruiser':
          var _this$fleet3 = _slicedToArray(this.fleet, 3);

          ship = _this$fleet3[2];
          break;

        case 'submarine':
          var _this$fleet4 = _slicedToArray(this.fleet, 4);

          ship = _this$fleet4[3];
          break;

        case 'destroyer':
          var _this$fleet5 = _slicedToArray(this.fleet, 5);

          ship = _this$fleet5[4];
          break;

        default:
          return false;
      }

      console.log(ship);
      return ship;
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, startCoord) {
      if (ship.isVertical) {
        for (var i = 0; i < ship.length; i += 1) {
          this.board[startCoord + i * 10].shipType = ship.type;
          this.board[startCoord + i * 10].hasShip = true;
        }

        ship.isPlaced = true;
      }

      if (!ship.isVertical) {
        for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
          this.board[startCoord + _i2].shipType = ship.type;
          this.board[startCoord + _i2].hasShip = true;
        }

        ship.isPlaced = true;
      }

      return null;
    }
  }, {
    key: "randomShipPlacement",
    value: function randomShipPlacement() {
      for (var i = 0; i < this.fleet.length; i += 1) {
        if (this.callRandomNumber(2) === 0) {
          this.fleet[i].isVertical = false;
        } else {
          this.fleet[i].isVertical = true;
        }
      }

      for (var _i3 = 0; _i3 < this.fleet.length; _i3 += 1) {
        var randomCoord = this.callRandomNumber(this.val);
        var ship = this.fleet[_i3];

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
    key: "invalidPlacement",
    value: function invalidPlacement(ship, startCoord) {
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
      }

      if (ship.isVertical === false) {
        for (var _i4 = 0; _i4 < ship.length; _i4 += 1) {
          if (this.isOutOfBounds(startCoord + _i4)) {
            console.log('Out of bounds!');
            return true;
          }

          if (_i4 >= 1) {
            var rounded = Math.ceil(startCoord / 10) * 10;

            if (startCoord + _i4 >= rounded) {
              console.log('continues on next line!');
              return true;
            }
          }

          if (this.board[startCoord + _i4].hasShip === true) {
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