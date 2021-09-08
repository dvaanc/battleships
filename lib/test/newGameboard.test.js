"use strict";

var _newGameboard = _interopRequireDefault(require("../code/newGameboard"));

var _newShip = require("../code/newShip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('test Gameboard class', function () {
  var gameboard = new _newGameboard["default"]();
  var carrier = new _newShip.Ship(_newShip.type.carrier, false);
  test('initialise board', function () {
    gameboard.initialiseBoard();
    expect(gameboard.board).toHaveLength(100); // expect(gameboard.board).toHaveProperty('hasShip', 'hit', 'miss');
  });
  test('placeShip', function () {
    gameboard.placeShip(carrier, 3);
    expect(gameboard.board[(3, 4, 5, 6, 7)]).toHaveProperty('hasShip', 'carrier');
  });
  test('receiveAttack', function () {
    gameboard.receiveAttack(3);
    expect(gameboard.board[3]).toHaveProperty('hit', true);
  });
  test('allShipsSunk', function () {});
});