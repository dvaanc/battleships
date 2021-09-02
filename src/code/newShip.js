// eslint-disable-next-line no-unused-vars
const type = {
  carrier: {
    type: 'carrier',
    length: 5,
  },
  battleship: {
    type: 'battleship',
    length: 4,
  },
  cruiser: {
    type: 'cruiser',
    length: 3,
  },
  submarine: {
    type: 'submarine',
    length: 3,
  },
  destroyer: {
    type: 'destroyer',
    length: 2,
  },
};

class Ship {
  constructor(ship, vertical = true) {
    this.type = ship.type;
    this.length = ship.length;
    this.hp = Array(this.length).fill(null);
    this.isVertical = vertical;
  }

  hit(index) {
    // for (let i = 0; i < arr.length; i += 1) {
    //   if (arr[i].hit) this.hp[i] = true;
    // }
    this.hp[index] = true;
    return null;
  }

  isDestroyed() {
    return this.hp.every((hp) => hp === true);
  }
}

export { type, Ship };
