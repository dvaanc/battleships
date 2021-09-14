"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ship = exports.type = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-unused-vars
var type = {
  carrier: {
    type: 'carrier',
    length: 5
  },
  battleship: {
    type: 'battleship',
    length: 4
  },
  cruiser: {
    type: 'cruiser',
    length: 3
  },
  submarine: {
    type: 'submarine',
    length: 3
  },
  destroyer: {
    type: 'destroyer',
    length: 2
  }
};
exports.type = type;

var Ship = /*#__PURE__*/function () {
  function Ship(ship) {
    var vertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Ship);

    this.type = ship.type;
    this.length = ship.length;
    this.hp = Array(this.length).fill(null);
    this.isVertical = vertical;
    this.isPlaced = null;
  }

  _createClass(Ship, [{
    key: "hit",
    value: function hit(index) {
      this.hp[index] = true;

      if (this.isDestroyed()) {
        console.log("".concat(this.type, " has been destroyed!"));
      }

      return this.hp;
    }
  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this.hp.every(function (hp) {
        return hp === true;
      });
    }
  }]);

  return Ship;
}();

exports.Ship = Ship;