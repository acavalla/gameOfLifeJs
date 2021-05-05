const _ = require('lodash');
module.exports = class Board {
  constructor() {
    this.live = []
    this.NEIGHBOURS = [[-1, -1], [-1, 0], [-1, 1],
                  [0, -1], [0, 1],
                  [1, -1], [1, 0], [1, 1]]
    this.newLive = []
  }

  alive = (location) => {
    this.live.push(location)
  }

  dead = (location) => {
    this.live = this.live.filter(function(value) {
        !_.isEqual(value, location)
    });
  }

  tick = () => {
    this.countNeighbours()
    this.updateLive()
  }

  countNeighbours = () => {
    this.calcLimits()
    for (var i= this.startRow; i<this.endRow; i++) {
      for (var j = this.startCol; j<this.endCol; j++) {
        this.labelNeighbours(i, j)
      }
    }
  }

  calcLimits = () => {
    this.rowLimits()
    this.colLimits()
  }

  rowLimits = () => {
    this.startRow = this.live.sort()[0][0]-1
    this.endRow = this.live[this.live.length-1][0]+1
  }

  colLimits = () => {
    [this.startCol, this.endCol] = [0, 0]
    for(var i=0; i<this.live.length; i++) {
      var x = this.live[i][1]
      if (this.endCol <= x) this.endCol = x + 1;
      if (this.startCol >= x) this.startCol = x - 1;
    }
  }

  labelNeighbours = (row, column) => {
    var count = 0
    var spot = [row, column]
    for (var k = 0; k < this.NEIGHBOURS.length; k++) {
      var neighbour = [row + this.NEIGHBOURS[k][0], column + this.NEIGHBOURS[k][1]]
      if (this.isIncluding(this.live, neighbour)) {
        count += 1
      }
    }
    if (this.livingConditions(count,spot)) {
      this.newLive.push(spot)
    }
  }

  livingConditions = (count,spot) => {
    return count === 3 || (count === 2 && this.isIncluding(this.live, spot))
  }

  isIncluding = (x, y) => {
    return JSON.stringify(x).includes(JSON.stringify(y))
  }

  updateLive = () => {
    this.live = this.newLive
    this.newLive = []
  }
}
