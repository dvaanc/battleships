"use strict";

var _globals = require("@jest/globals");

var _newPlayer = _interopRequireDefault(require("../code/newPlayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('test Player class', function () {
  var player1 = new _newPlayer["default"]("Danny");
  (0, _globals.test)('player name', function () {
    expect(player1.name).toBe("Danny");
  });
  (0, _globals.test)('randomMove', function () {
    expect(player1.randomMove()).toBeLessThan(99);
    expect(player1.randomMove()).toBeGreaterThan(0);
  });
});