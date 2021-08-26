import { type, Ship } from '../code/newShip';

describe('test Ship class', () => {
    const ship1 = new Ship(type.carrier);
    test('type', () => {
      expect(ship1.type).toBe("carrier");
    });
    test('length', () => {
      expect(ship1.length).toBe(5);
    });
    test('hp', () => {
      expect(ship1.hp).toStrictEqual([null, null, null, null, null]);
    });
    test('hit method', () => {
      ship1.hit(0);
      ship1.hit(2);
      expect(ship1.hp).toStrictEqual([true, null, true, null, null]);
    });
})


