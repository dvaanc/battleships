// eslint-disable-next-line no-unused-vars
class Player {
  constructor(name) {
    this.name = name;
    this.pastHits = [];
    this.currentMove = null;
  }

  static randomNumber(val) {
    return Math.floor(Math.random() * val);
  }

  callRandomNumber(val) {
    return this.constructor.randomNumber(val);
  }

  randomMove() {
    const coord = this.callRandomNumber(100);
    if (this.pastHits.some((pastHit) => pastHit === coord)) return this.callRandomNumber(100);
    this.pastHits.push(coord);
    this.currentMove = coord;
    return coord;
  }

  clearPastHits() {
    this.pastHits = [];
  }
}

export default Player;
