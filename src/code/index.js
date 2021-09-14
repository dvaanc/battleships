import Player from './newPlayer';
import Gameboard from './newGameboard';

const DOM = (() => {
  const playerGameboard = document.querySelector('#player');
  const enemyGameboard = document.querySelector('#enemy');
  const playerGameboardArr = Array.from(playerGameboard.children);
  const enemyGameboardArr = Array.from(enemyGameboard.children);
  const restartButton = document.querySelector('#restart');

  const placeShipsModalContainer = document.querySelector('#placeShips');
  const ships = document.querySelectorAll('.ship');
  const placeShipsGameboard = document.querySelector('#placeShips-gameboard');
  const placeShipsGameboardArr = Array.from(placeShipsGameboard.children);
  const placeRandomButton = document.querySelector('#place-random');
  const startButton = document.querySelector('#start');
  let currentShipType = null;
  let currentCell = null;

  ships.forEach((ship) => {
    ship.addEventListener('click', (e) => {
      if (e.target.classList.contains('part')) {
        game.toggleShipAxis(e.currentTarget.id);
        return e.target.parentNode.classList.toggle('vertical');
      }
      if (e.target.classList.contains('ship')) {
        return e.target.classList.toggle('vertical');
      }
      return null;
    });
    ship.addEventListener('dragstart', (e) => {
      currentShipType = e.currentTarget.id;
      e.target.style.opacity = 1;
    }, false);
    ship.addEventListener('dragend', (e) => {
      if (game.placeShip(currentShipType, currentCell)) {
        e.currentTarget.removeAttribute('draggable');
        e.currentTarget.style.pointerEvents = 'none';
        e.currentTarget.style.opacity = 0.4;
      }
    }, false);
  });

  placeShipsGameboard.addEventListener('dragenter', (e) => {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        const i = placeShipsGameboardArr.indexOf(e.target);
        currentCell = i;
        e.target.classList.add('over');
      }
    }
  }, false);

  placeShipsGameboard.addEventListener('dragleave', (e) => {
    if (e.target.parentNode === placeShipsGameboard) {
      if (e.target.classList.contains('cell')) {
        e.target.classList.remove('over');
      }
    }
  }, false);

  placeRandomButton.addEventListener('click', () => {
    game.randomShipPlacement(true);
  }, false);

  enemyGameboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      game.gameLoop(enemyGameboardArr.indexOf(e.target));
    }
  });

  startButton.addEventListener('click', () => {
    game.startGame();
  }, false);

  restartButton.addEventListener('click', () => {
    game.restartGame();
  });

  function resetShips() {
    ships.forEach((shipType) => {
      const ship = shipType;
      ship.classList.remove('vertical');
      ship.style.pointerEvents = 'auto';
      ship.style.opacity = 1;
      ship.setAttribute('draggable', 'true');
    });
  }

  function hidePlaceShipsGameboard() {
    placeShipsModalContainer.style.opacity = 0;
    placeShipsModalContainer.style.pointerEvents = 'none';
  }

  function showPlaceShipsGameboard() {
    placeShipsModalContainer.style.opacity = 1;
    placeShipsModalContainer.style.pointerEvents = 'auto';
  }

  function clearBoard(gameboard) {
    gameboard.forEach((cell) => {
      const cell2 = cell;
      cell.classList.remove('hit');
      cell.classList.remove('reveal-cell');
      cell2.innerText = '';
    });
  }

  function setMessage(str) {
    const messageEl = document.querySelector('#message');
    messageEl.innerText = str;
  }

  function toggleClicks(boolean) {
    if (boolean) {
      playerGameboard.classList.add('disable');
      enemyGameboard.classList.add('disable');
      return true;
    }
    playerGameboard.classList.remove('disable');
    enemyGameboard.classList.remove('disable');
    return false;
  }

  return {
    setMessage,
    placeShipsGameboardArr,
    playerGameboardArr,
    enemyGameboardArr,
    toggleClicks,
    clearBoard,
    hidePlaceShipsGameboard,
    showPlaceShipsGameboard,
    resetShips,
  };
})();

const game = (() => {
  const player = new Player('player');
  const computer = new Player('Computer');
  const playerGameboard = new Gameboard();
  const enemyGameboard = new Gameboard();

  function initialiseGame() {
    playerGameboard.clearBoard();
    enemyGameboard.clearBoard();
    playerGameboard.initialiseBoard();
    enemyGameboard.initialiseBoard();
    playerGameboard.generateFleet();
    enemyGameboard.generateFleet();
  }

  function toggleShipAxis(shipType) {
    const shipObj = playerGameboard.grabShip(shipType);
    if (shipObj.isVertical === true) {
      shipObj.isVertical = false;
    }
    shipObj.isVertical = true;
    return null;
  }

  function placeShip(shipType, index) {
    const shipObj = playerGameboard.grabShip(shipType);
    if (!playerGameboard.invalidPlacement(shipObj, index)) {
      playerGameboard.placeShip(shipObj, index);
      playerGameboard.revealShips(DOM.placeShipsGameboardArr);
      return true;
    }
    return false;
  }

  function startGame() {
    if (playerGameboard.allShipsPlaced()) {
      enemyGameboard.randomShipPlacement();
      playerGameboard.revealShips(DOM.playerGameboardArr);
      DOM.hidePlaceShipsGameboard();
      return true;
    }
    return false;
  }
  function randomShipPlacement(boolean) {
    initialiseGame();
    if (boolean) playerGameboard.randomShipPlacement();
    enemyGameboard.randomShipPlacement();
    playerGameboard.revealShips(DOM.playerGameboardArr);
    DOM.hidePlaceShipsGameboard();
  }

  function gameLoop(coord) {
    if (enemyGameboard.receiveAttack(coord)) {
      enemyGameboard.hpHit(enemyGameboard.getNameOfShip(coord));
      enemyGameboard.renderToDOM(DOM.enemyGameboardArr);
      if (enemyGameboard.allShipsSunk()) {
        DOM.setMessage('Player wins! All enemy ships have been destroyed!');
        DOM.toggleClicks(true);
      }
      computer.randomMove();
      playerGameboard.receiveAttack(computer.currentMove);
      playerGameboard.renderToDOM(DOM.playerGameboardArr);
      if (playerGameboard.allShipsSunk()) {
        DOM.setMessage('Enemy wins! All player ships have been destroyed!');
        DOM.toggleClicks(true);
      }
      return true;
    }
    return false;
  }

  function restartGame() {
    DOM.clearBoard(DOM.playerGameboardArr);
    DOM.clearBoard(DOM.enemyGameboardArr);
    DOM.clearBoard(DOM.placeShipsGameboardArr);
    DOM.setMessage('');
    initialiseGame();
    player.clearPastHits();
    computer.clearPastHits();
    DOM.resetShips();
    DOM.toggleClicks();
    DOM.showPlaceShipsGameboard();
  }

  return {
    gameLoop,
    randomShipPlacement,
    playerGameboard,
    enemyGameboard,
    initialiseGame,
    restartGame,
    placeShip,
    startGame,
    toggleShipAxis,
  };
})();
game.initialiseGame();
export { DOM, game };
