import Gameboard from '../code/newGameboard';
import { type, Ship } from '../code/newShip';

describe('test Gameboard class', () => {
  const gameboard = new Gameboard();
  const carrier = new Ship(type.carrier, false);
  test('initialise board', () => {
    gameboard.initialiseBoard();
    expect(gameboard.board).toHaveLength(100);
    // expect(gameboard.board).toHaveProperty('hasShip', 'hit', 'miss');
  })
  test('placeShip', () => {
    gameboard.placeShip(carrier, 3);
    expect(gameboard.board[3, 4, 5, 6, 7]).toHaveProperty('hasShip', 'carrier');
  })
  test('receiveAttack', () => {
    gameboard.receiveAttack(3);
    expect(gameboard.board[3]).toHaveProperty('hit', true);
  })
  test('allShipsSunk', () => {
    
  })
})