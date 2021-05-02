// 'use strict';
const { test, expect } = require('@jest/globals');
const Board = require('../src/gameOfLife.js');

describe('Board class', function() {
  beforeEach(function() {
    board = new Board();
  });

  describe('.alive', function(){
    it('saves live cells in an array', function() {
      board.alive([1,2])
      expect(board.live[0]).toMatchObject([1,2]);
    });
  });

  describe('.dead', function(){
    it('removes cells from an array', function() {
      board.alive([1,2])
      board.dead([1,2])
      expect(board.live).toMatchObject([]);
    });
  });

  describe('.countNeighbours', function(){
    it('knows a live cell with no neighbours dies', function() {
      board.alive([0,0])
      board.countNeighbours()
      expect(board.newLive).toMatchObject([])
    });

    it('knows a live cell with one neighbour dies', function() {
      board.alive([0,0])
      board.alive([0,1])
      board.countNeighbours()
      expect(board.newLive).toMatchObject([]);
    });

    it('knows a live cell with two neighbours lives', function() {
      board.alive([-1,2])
      board.alive([0,1])
      board.alive([1,0])
      board.countNeighbours()
      expect(board.newLive).toMatchObject([[0,1]]);
    });

    it('knows dead cell with three neighbours is born', function() {
      board.alive([-1,-1])
      board.alive([0,1])
      board.alive([1,0])
      board.countNeighbours()
      expect(board.newLive).toMatchObject([[0,0]]);
    });

    it('knows live cell with three neighbours lives', function() {
      board.alive([-1,2])
      board.alive([0,1])
      board.alive([1,0])
      board.alive([-1,0])
      board.countNeighbours()
      expect(board.newLive).toMatchObject([[-1,1], [0,0], [0,1]]);
    });
  })

  describe('.tick', function(){
    it('updates live with newLive', function() {
      board.alive([-1,2])
      board.alive([0,1])
      board.alive([1,0])
      board.alive([-1,0])
      board.tick()
      expect(board.live).toMatchObject([[-1,1], [0,0], [0,1]])
    })

    it('correctly calculates subsequent ticks', function() {
      board.alive([-1,2])
      board.alive([0,1])
      board.alive([1,0])
      board.alive([-1,0])
      board.tick()
      board.tick()
      expect(board.live).toMatchObject([[-1,0], [-1,1], [0,0], [0,1]])
    })
  })
})
