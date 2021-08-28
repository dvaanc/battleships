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

  generateFleet() {
    Object.keys(type).forEach((key) => {
      const ship = new Ship(type[key]);
      this.fleet.push(ship);
    });
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        this.board[startCoord + i * 10].hasShip = ship.type;
      }
    } else {
      for (let i = 0; i <= ship.hp.length; i += 1) {
        this.board[startCoord + i].hasShip = ship.type;
      }
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
