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
    this.startCol = 0
    this.endCol = 0
    this.startLimit()
    this.endLimit()
    for (var i= startRow; i<endRow; i++) {
      for (var j = this.startCol; j<this.endCol; j++) {
        this.labelNeighbours(i, j)
      }
    }
  }

  endLimit(){
    for(var i=0; i<this.live.length; i++) {
      if (this.endCol <= this.live[i][1]){
        this.endCol = this.live[i][1] + 1
      }
    }
  }

  startLimit() {
    for(var i=0; i<this.live.length; i++) {
      if (this.startCol >= this.live[i][1]){
        this.startCol = this.live[i][1] -1
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
