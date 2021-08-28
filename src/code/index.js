import { type, Ship } from './newShip';
import Player from './newPlayer';
import Gameboard from './newGameboard';

// eslint-disable-next-line func-names
const DOM = (function () {
  const playerGameboard = document.querySelector('#player');
  const enemyGameboard = document.querySelector('#enemy');

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function updatePlayerGameboard(gameboard) {
    const playerGameboardCells = Array.from(playerGameboard.children);
    playerGameboardCells.forEach((cell) => {
      const i = playerGameboardCells.indexOf(cell);
      console.log(i);
      if (gameboard[i].hit) {
        cell.classList.add('hit');
      }
      if (gameboard[i].miss) {
        // eslint-disable-next-line no-param-reassign
        cell.innerText = 'X';
      }
      console.log(cell);
    });
  }

  function updateEnemyGameboard(gameboard) {
    const enemyGameboardCells = Array.from(enemyGameboard.children);
    enemyGameboardCells.forEach((cell) => {
      const i = enemyGameboardCells.indexOf(cell);
      console.log(i);
      if (gameboard[i].hit) {
        cell.classList.add('hit');
      }
      if (gameboard[i].miss) {
        // eslint-disable-next-line no-param-reassign
        cell.innerText = 'X';
      }
      console.log(cell);
    });
  }

  return { setMessage, updatePlayerGameboard, updateEnemyGameboard };
}());

const game = (function () {
  const player = new Player('player');
  const computer = new Player('Computer');
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();

  function render() {

  }

  function randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  return { };
}());

export { DOM, game };
