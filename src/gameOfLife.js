
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
    this.live = this.live.filter(function(value, index, arr){
        return JSON.stringify(value) !== JSON.stringify(location);
    });
  }

  tick = () => {
    console.log("inside tick")
    this.countNeighbours()
    this.updateLive()
  }

  countNeighbours() {
    console.log("inside countNeighbours")
    this.neighbTally = []
    // var i;
    for (var i=0; i < this.live.length; i++) {
      this.labelNeighbours(this.live[i])
    }
    // return this.neighbTally
    // this.live.each do |loc|
    //   this.labelNeighbours(loc)
    // end
  }
  //
  labelNeighbours(loc) {
    console.log("inside labelNeighbours")
    for (var i=0; i < this.NEIGHBOURS.length; i++) {
      var spot = [loc[0] + this.NEIGHBOURS[i][0], loc[1] + this.NEIGHBOURS[i][1]]
      this.isInHash(spot) ? this.increaseCount(spot) : this.addToHash(spot)
    }
    // NEIGHBOURS.each do |nloc|
    //   spot = [loc[0] + nloc[0], loc[1] + nloc[1]]
    //   isInHash(spot) ? increaseCount(spot) : addToHash(spot)
    // end
  }

  isInHash(spot){
    // this.neighbTally.any? { |h| h[:location] == spot }
    return (this.neighbTally.map(o => JSON.stringify(Object.values(o['loc']))).includes(JSON.stringify(spot)))
  }
  // h.map(o => JSON.stringify(Object.values(o['loc']))).includes(JSON.stringify(spot))

  // match = (x) => JSON.stringify(x)

  increaseCount(spot) {
    // this.neighb_tally.select { |key| key[:location] == spot }[0][:tally] += 1
    for (var i=0; i<this.neighbTally.length; i++){
      if (JSON.stringify(this.neighbTally[i]['loc']) === JSON.stringify(spot)){
        this.neighbTally[i]['tally'] += 1
      }
    }
  }

  addToHash(spot) {
    this.neighbTally.push( { loc: spot,
                      tally: 1,
                      status: JSON.stringify(this.live).includes(JSON.stringify(spot)) ? 1 : 0 } )
  }

  updateLive = () => {
    this.live = []
    console.log(this.neighbTally)
    this.neighbTally = this.neighbTally.filter(x => this.livingConditions(x));
    for (var i=0; i<this.neighbTally.length; i++){
      this.alive(this.neighbTally[i]['loc'])
    }
  }

  livingConditions(hash) {
    return (hash.tally === 3 || (hash.tally === 2 && hash.status === 1))
  }
}
