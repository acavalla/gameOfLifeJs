const _ = require('lodash');
module.exports = class Board {
  constructor() {
    this.live = []
    this.NEIGHBOURS = [[-1, -1], [-1, 0], [-1, 1],
                  [0, -1], [0, 1],
                  [1, -1], [1, 0], [1, 1]]
    this.newLive = []
  }

  alive(location) {
    this.live.push(location)
  }

  dead(location) {
    this.live = this.live.filter(function(value) {
        return !_.isEqual(value, location)
    });
  }

  tick() {
    this.countNeighbours()
    this.updateLive()
  }

  countNeighbours() {
    var startRow = this.live.sort()[0][0]-1
    var endRow = this.live[this.live.length-1][0]+1
    var startCol = 0
    var endCol = 0
    for(var i=0; i<this.live.length; i++) {
      if (startCol >= this.live[i][1]){
        startCol = this.live[i][1] -1
      }
    }
    for(var i=0; i<this.live.length; i++) {
      if (endCol <= this.live[i][1]){
        endCol = this.live[i][1] + 1
      }
    }
    for (var i= startRow; i<endRow; i++) {
      for (var j = startCol; j<endCol; j++) {
        this.labelNeighbours(i, j)
      }
    }
  }

  labelNeighbours = (row, column) => {
    var count = 0
    var spot = [row, column]
    for (var k = 0; k < this.NEIGHBOURS.length; k++) {
      var neighbour = [row + this.NEIGHBOURS[k][0], column + this.NEIGHBOURS[k][1]]
      if (this.including(this.live,neighbour)) {
        count += 1
      }
    }
    if (this.livingConditions(count,spot)) {
      this.newLive.push(spot)
    }
  }

  livingConditions(count,spot) {
    return (count === 3 || (count === 2 && this.including(this.live, spot)))
  }

  including(x, y) {
    return (JSON.stringify(x).includes(JSON.stringify(y)))
  }

  updateLive() {
    this.live = this.newLive
    this.newLive = []
  }
}
