class Board {
  constructor() {
    this.live = []
    this.NEIGHBOURS = [[-1, -1], [-1, 0], [-1, 1],
                  [0, -1], [0, 1],
                  [1, -1], [1, 0], [1, 1]]
    this.newLive = []
    // const liveColour = "gray"
  }

  alive = (location) => {
    this.live.push(location)
  }

  dead = (location) => {
    this.live = this.live.filter(function(value) {
      return !JSON.stringify(value).includes(JSON.stringify(location))
    });
  }

  tick = () => {
    this._countNeighbours()
    this._updateLive()
  }

  _countNeighbours = () => {
    this._calcLimits()
    for (var i= this._startRow; i<=this._endRow; i++) {
      for (var j = this._startCol; j<=this._endCol; j++) {
        this._labelNeighbours(i, j)
      }
    }
  }

  _calcLimits = () => {
    this._rowLimits()
    this._colLimits()
  }

  _rowLimits = () => {
    this._startRow = this.live.sort()[0][0]-1
    this._endRow = this.live[this.live.length-1][0]+1
  }

  _colLimits = () => {
    this._startCol = this.live[0][1]
    this._endCol = this.live[0][1]
    for(var i=0; i<this.live.length; i++) {
      var x = this.live[i][1]
      if (this._startCol >= x) this._startCol = x - 1;
      if (this._endCol <= x) this._endCol = x + 1;
    }
  }

  _labelNeighbours = (row, column) => {
    var count = 0
    var spot = [row, column]
    for (var k = 0; k < this.NEIGHBOURS.length; k++) {
      var neighbour = [row + this.NEIGHBOURS[k][0], column + this.NEIGHBOURS[k][1]]
      console.log(`k: ${k}, spot: ${spot}, neighbour: ${neighbour}, count: ${count}`)
      if (this._isIncluding(this.live, neighbour)) {
        count += 1
        console.log(`k: ${k}, spot: ${spot}, neighbour: ${neighbour}, count: ${count}`)

      }
    }
    console.log("after for")
    if (this._livingConditions(count,spot)) {
      this.newLive.push(spot)
    }
  }

  _livingConditions = (count,spot) => {
    return count === 3 || (count === 2 && this._isIncluding(this.live, spot))
  }

  _isIncluding = (x, y) => {
    return JSON.stringify(x).includes(JSON.stringify(y))
  }

  _updateLive = () => {
    this.live = this.newLive
    this.newLive = []
  }
}
// module.exports = Board;
