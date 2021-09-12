import { tsThisType } from '@babel/types';
import { type, Ship } from './newShip';

// eslint-disable-next-line no-unused-vars
class Gameboard {
  constructor(val = 100) {
    this.val = val;
    this.board = [];
    this.fleet = [];
    this.lastHit = {
      hit: false,
      location: null,
    };
  }

  initialiseBoard() {
    for (let i = 0; i < this.val; i += 1) {
      this.board.push({
        hasShip: false, shipType: null, hit: false, miss: false,
      });
    }
  }

  clearBoard() {
    this.board = [];
    this.fleet = [];
  }

  renderToDOM(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hit) DOMBoard[i].classList.add('hit');
      // eslint-disable-next-line no-param-reassign
      if (index.miss) DOMBoard[i].innerText = 'X';
    });
  }

  revealShips(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hasShip === true) {
        DOMBoard[i].classList.add('reveal-cell');
      }
    });
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  generateFleet() {
    Object.keys(type).forEach((shipObj) => {
      const ship = new Ship(type[shipObj]);
      this.fleet.push(ship);
    });
    console.log(this.fleet);
  }

  grabShip(shipType) {
    let ship = null;
    switch (shipType) {
      case 'carrier':
        [ship] = this.fleet;
        break;
      case 'battleship':
        [, ship] = this.fleet;
        break;
      case 'cruiser':
        [, , ship] = this.fleet;
        break;
      case 'submarine':
        [, , , ship] = this.fleet;
        break;
      case 'destroyer':
        [, , , , ship] = this.fleet;
        break;
      default:
        return false;
    }
    console.log(ship);
    return ship;
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical === true) {
      if (this.validPlacement(ship, startCoord)) {
        return true;
      }
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i * 10].shipType = ship.type;
        this.board[startCoord + i * 10].hasShip = true;
      }
    }
    if (ship.isVertical === false) {
      if (this.validPlacement(ship, startCoord)) {
        return true;
      }
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true;
      }
    }
    return null;
  }

  randomShipPlacement() {
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.callRandomNumber(2) === 0) {
        this.fleet[i].isVertical = false;
      } else {
        this.fleet[i].isVertical = true;
      }
    }
    for (let i = 0; i < this.fleet.length; i += 1) {
      if (this.placeShip(this.fleet[i], this.callRandomNumber(this.val)) === true) {
        this.clearBoard();
        this.initialiseBoard();
        this.generateFleet();
        return this.randomShipPlacement();
      }
    }
    return null;
  }

  receiveAttack(coord) {
    if (this.board[coord].miss || this.board[coord].hit === true) return false;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
    if (this.board[coord].hasShip === false) this.board[coord].miss = true;
    return true;
  }

  getNameOfShip(coord) {
    if (this.board[coord].hasShip) return this.board[coord].shipType;
    return false;
  }

  hpHit(name) {
    const shipArr = this.board.filter((coord) => coord.shipType === name);
    const findCorrectShip = this.fleet.filter((ship) => ship.type === name);
    for (let i = 0; i < shipArr.length; i += 1) {
      if (shipArr[i].hit) findCorrectShip[0].hit(i);
    }
  }

  filterByShipType(name) {
    const shipArr = this.board.filter((index) => index.shipType === name);
    return shipArr;
  }

  validPlacement(ship, startCoord) {
    if (ship.isVertical === true) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i * 10].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
    }
    if (ship.isVertical === false) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i)) {
          console.log('Out of bounds!');
          return true;
        }
        if (i >= 1) {
          const rounded = Math.ceil(startCoord / 10) * 10;
          if (startCoord + i >= rounded) {
            console.log('continues on next line!');
            return true;
          }
        }
        if (this.board[startCoord + i].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
    }
    return false;
  }

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    // console.log(this.fleet);
    // console.log(this.fleet.every((ship) => ship.isDestroyed()));
    return this.fleet.every((ship) => ship.isDestroyed());
  }
}
export default Gameboard;
