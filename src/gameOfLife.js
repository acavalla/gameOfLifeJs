
module.exports = class Board {
  constructor() {
    this.live = []
    this.NEIGHBOURS = [[-1, -1], [-1, 0], [-1, 1],
                  [0, -1], [0, 1],
                  [1, -1], [1, 0], [1, 1]]
  }

  alive(location) {
    this.live.push(location)
  }

  dead(location) {
    this.live = this.live.filter(function(value) {
        return JSON.stringify(value) !== JSON.stringify(location);
    });
  }

  tick = () => {
    this.countNeighbours()
    this.updateLive()
  }

  countNeighbours() {
    this.neighbTally = []
    for (var i=0; i < this.live.length; i++) {
      this.labelNeighbours(this.live[i])
    }
  }

  labelNeighbours(loc) {
    for (var i=0; i < this.NEIGHBOURS.length; i++) {
      var spot = [loc[0] + this.NEIGHBOURS[i][0], loc[1] + this.NEIGHBOURS[i][1]]
      this.isInHash(spot) ? this.increaseCount(spot) : this.addToHash(spot)
    }
  }

  isInHash(spot){
    return (this.neighbTally.map(o => JSON.stringify(Object.values(o['loc']))).includes(JSON.stringify(spot)))
  }

  increaseCount(spot) {
    for (var i=0; i<this.neighbTally.length; i++){
      if (JSON.stringify(this.neighbTally[i].loc) === JSON.stringify(spot)){
        this.neighbTally[i].tally += 1
      }
    }
  }

  addToHash(spot) {
    this.neighbTally.push( { loc: spot,
                      tally: 1,
                      status: JSON.stringify(this.live).includes(spot) ? 1 : 0 } )
  }

  updateLive = () => {
    this.live = []
    this.neighbTally = this.neighbTally.filter(x => this.livingConditions(x));
    for (var i=0; i<this.neighbTally.length; i++){
      this.alive(this.neighbTally[i].loc)
    }
  }

  livingConditions(hash) {
    return (hash.tally === 3 || (hash.tally === 2 && hash.status === 1))
  }
}
