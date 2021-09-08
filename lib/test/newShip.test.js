"use strict";

var _newShip = require("../code/newShip");

describe('test Ship class', function () {
  var ship1 = new _newShip.Ship(_newShip.type.carrier);
  test('type', function () {
    expect(ship1.type).toBe("carrier");
  });
  test('length', function () {
    expect(ship1.length).toBe(5);
  });
  test('hp', function () {
    expect(ship1.hp).toStrictEqual([null, null, null, null, null]);
  });
  test('hit method', function () {
    ship1.hit(0);
    ship1.hit(2);
    expect(ship1.hp).toStrictEqual([true, null, true, null, null]);
  });
});