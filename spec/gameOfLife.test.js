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

  describe('.livingConditions', function(){
    h = [{ loc: [ 2, 1 ], tally: 2, status: 1 },
         { loc: [ 2, 2 ], tally: 3, status: 0 },
         { loc: [ 0, 0 ], tally: 1, status: 1 }]
    it('returns true when living cell has two neighbours', function() {
      expect(board.livingConditions(h[0])).toBe(true);
    });

    it('returns true when dead cell has three live neighbours', function() {
      expect(board.livingConditions(h[1])).toBe(true);
    });

    it('returns false when live cell has one live neighbour', function() {
      expect(board.livingConditions(h[2])).toBe(false);
    });
  });

  describe('.countNeighbours', function(){

    it('tallies one with one live neighbour', function() {
      k = { loc: [ -1, -1 ], tally: 1, status: 0 }
      board.alive([0,0])
      board.countNeighbours()
      expect(board.neighbTally[0]).toMatchObject(k);
    });

    it('tallies two with two live neighbours', function() {
      l = { loc: [ -1, 1 ], tally: 2, status: 0 }
      board.alive([0,0])
      board.alive([0,1])
      board.countNeighbours()
      expect(board.neighbTally[2]).toMatchObject(l);
    });
  })

  describe('.tick', function(){
    it('updates live with new locations', function() {
      board.alive([0,0])
      board.alive([0,1])
      board.alive([1,0])
      board.tick()
      expect(board.live[2]).toMatchObject([1,1])
    })
  })

  // test('adds 1 + 2 to equal 3', () => {
  //   skip
  //   expect(sum(1, 2)).toBe(3);
  // });
  //
  // test('two plus two is four', () => {
  //   skip
  //   expect(sum(2, 2)).not.toBe(5);
  // });
  //
  // test('object assignment', () => {
  //   const data = {one: 1};
  //   data['two'] = 2;
  //   expect(data).toEqual({one: 1, two: 2});
  // });
  // beforeEach(function() {
  //   thermostat = new Thermostat();
  // });
  //
})
