import { test } from '@jest/globals'
import Player from '../code/newPlayer'

describe('test Player class', () => {
  const player1 = new Player("Danny");
  test('player name', () => {
    expect(player1.name).toBe("Danny");
  });
  test('randomMove', () => {
    expect(player1.randomMove()).toBeLessThan(99);
    expect(player1.randomMove()).toBeGreaterThan(0);
  })

})