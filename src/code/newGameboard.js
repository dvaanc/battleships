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
      this.board.push({ 
        hasShip: false, shipType: null, hit: false, miss: false,
      });
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
    });
  }

  placeShip(ship, startCoord) {
    if (ship.isVertical) {
      for (let i = 0; i < ship.hp.length; i += 1) {
        if (this.isOutOfBounds(startCoord + i * 10)) {
          return this.placeShip(ship, this.callRandomNumber(this.val));
        }
        // if (this.board[startCoord + i * 10].hasShip !== false) {
        //   console.log('Error! Placement clashes with another placed ship!');
        //   return this.placeShip(ship, startCoord);
        // }
        // this.board[startCoord + i * 10] = ship.type;
        console.log(this.board[startCoord + i * 10]);
      }
    }
    // else {
    //   for (let i = 0; i <= ship.hp.length; i += 1) {
    //     // if (this.board[startCoord + i].hasShip !== false) {
    //     //   console.log('Error! Placement clashes with another placed ship!');
    //     //   return this.placeShip(ship, startCoord);
    //     // }
    //     this.board[startCoord + i].hasShip = ship.type;
    //   }
    // }
  }

  randomShipPlacement() {
    // for (let i = 0; i < this.fleet.length; i += 1) {
    //   // this.placeShip(this.fleet[i], this.callRandomNumber(this.val));
    //   this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
    // }
    console.log(this.fleet[0]);
    this.placeShip(this.fleet[0], this.callRandomNumber(this.val));
  }

  receiveAttack(coord) {
    if (this.board[coord].miss) return;
    if (this.board[coord].hasShip) {
      this.board[coord].hit = true;
      this.lastHit.hit = true;
      this.lastHit.location = coord;
    }
  }

  isOutOfBounds(coord) {
    if (coord < 0 || coord > this.board.length - 1) return true;
    return false;
  }

  allShipsSunk() {
    return this.board.some((cell) => cell.hasShip !== false && cell.hit === false);
  }
}
export default Gameboard;
