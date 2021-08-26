import { test } from '@jest/globals'
import Player from '../code/newPlayer'

test('playerName', () => {
  const player1 = new Player("Danny");
  expect(player1.name).toBe("Danny");
})