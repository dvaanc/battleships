import Ship from './newShip';
import Player from './newPlayer';
import Gameboard from './newGameboard';

// eslint-disable-next-line func-names
const DOM = (function () {


}());

const game = (function () {
  const player = new Player("Player");
  const computer = new Player("Computer");
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();
  
}());

export { DOM, game };
