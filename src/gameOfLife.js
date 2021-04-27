function sum(a, b) {
  return a + b;
}
module.exports = sum;
# frozen_string_literal: true

# Keeps track of and updates live cells

class Board {

  // attr_reader :dims, :live, :neighb_tally

  const DEF_DIMS = 2
  const NEIGHBOURS = [[-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]]

  constructor(dims = DEF_DIMS) {
    this.dims = dims
    this.live = []
  }

  alive(location) {
    live.push(location)
  }

  dead(location) {
    live.delete(location)
  }

  tick() {
    this.countNeighbours
    this.updateLive
  }

  countNeighbours() {
    this.neighbTally = []
    this.live.each do |loc|
      this.labelNeighbours(loc)
    end
  }

  labelNeighbours(loc) {
    NEIGHBOURS.each do |nloc|
      spot = [loc[0] + nloc[0], loc[1] + nloc[1]]
      isInHash(spot) ? increaseCount(spot) : addToHash(spot)
    end
  }

  isInHash(spot){
    this.neighbTally.any? { |h| h[:location] == spot }
  }

  increaseCount(spot) {
    this.neighb_tally.select { |key| key[:location] == spot }[0][:tally] += 1
  }

  addToHash(spot) {
    this.neighbTally.push( { location: spot,
                      tally: 1,
                      status: live.include?(spot) ? 1 : 0 } )
  }

  updateLive() {
    this.live = []
    this.neighbTally = this.neighbTally.select { |hash| this.livingConditions(hash) }
    this.neighbTally.each { |hash| this.alive(hash[:location]) }
  }

  livingConditions(hash) {
    hash[:tally] == 3 || (hash[:tally] == 2 && hash[:status] == 1)
  }
}
