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

  clearGameboard() {
    this.board = [];
    this.fleet = [];
    this.lastHit.hit = false;
    this.lastHit.location = null;
  }

  renderToDOM(DOMBoard) {
    this.board.forEach((index) => {
      const i = this.board.indexOf(index);
      if (index.hit) DOMBoard[i].classList.add('hit');
      // eslint-disable-next-line no-param-reassign
      if (index.miss) DOMBoard[i].innerText = 'X';
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

  placeShip(ship, startCoord) {
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
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i * 10].shipType = ship.type;
        this.board[startCoord + i * 10].hasShip = true;
        console.log(this.board[startCoord + i * 10]);
      }
    }
    if (ship.isVertical === false) {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i)) {
          console.log('Out of bounds!');
          return true;
        }
        if (this.board[startCoord + i].hasShip === true) {
          console.log('Error! Placement clashes with another placed ship!');
          return true;
        }
      }
      for (let i = 0; i < ship.length; i += 1) {
        this.board[startCoord + i].shipType = ship.type;
        this.board[startCoord + i].hasShip = true;
        // console.log(this.board[startCoord + i]);
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
        this.clearGameboard();
        this.initialiseBoard();
        return this.randomShipPlacement();
      }
    }
    return null;
    // console.log(this.fleet[0]);
    // this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
  }

  receiveAttack(coord) {
    console.log(this.board[coord]);
    if (this.board[coord].miss || this.board[coord].hit) return false;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
      return true;
    }
    if (this.board[coord].hasShip === false) {
      this.board[coord].miss = true;
      return true;
    }
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

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    // const ShipsOnlyArr = this.board.filter((i) => i.hasShip === true);
    // console.log(ShipsOnlyArr.every((i) => i.hit === true));
    // return ShipsOnlyArr.every((i) => i.hit === true);
    return this.fleet.every((ship) => ship.isDestroyed() === true);
  }
}
export default Gameboard;
