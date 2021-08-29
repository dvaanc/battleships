import { type, Ship} from './newShip';

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
      this.board.push({ hasShip: false, hit: false, miss: false });
    }
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  generateFleet() {
    Object.keys(type).forEach((key) => {
      const ship = new Ship(type[key]);
      this.fleet.push(ship);
      console.log(this.fleet);
    });
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        if (this.board[startCoord + i * 10].hasShip !== false) {
          console.log('Error! Placement clashes with another placed ship!');
          return this.placeShip(ship, startCoord);
        }
        this.board[startCoord + i * 10].hasShip = ship.type;
      }
    }
    if (!ship.isVertical) {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        if (this.board[startCoord + i].hasShip !== false) {
          console.log('Error! Placement clashes with another placed ship!');
          return this.placeShip(ship, startCoord);
        }
        this.board[startCoord + i].hasShip = ship.type;
      }
    }
    return null;
  }

  randomShipPlacement() {
    for (let i = 0; i <= this.fleet.length; i += 1) {
      this.placeShip(this.fleet[i], this.callRandomNumber(this.val));
    }
  }

  receiveAttack(coord) {
    if (this.board[coord].miss) return;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
  }

  allShipsSunk() {
    return this.board.some((cell) => cell.hasShip !== false && cell.hit === false);
  }
}
export default Gameboard;
