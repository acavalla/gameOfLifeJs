// 'use strict';
const { test, expect } = require('@jest/globals');
const Board = require('../src/gameOfLife.js');

describe('Board class', function() {

  let board = new Board

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
      l = { loc: [ 0, -1 ], tally: 2, status: 0 }
      board.alive([0,0])
      board.alive([0,1])
      board.countNeighbours()
      expect(board.neighbTally[3]).toMatchObject(l);
    });
  })

  describe('.tick', function(){
    let board = new Board
    it('updates live with new locations', function() {
      board.alive([0,0])
      board.alive([0,1])
      board.alive([1,0])
      // console.log(board)
      board.tick()
      // console.log(board.neighbTally[0])
      // expect(board.live).toContain([1,1])
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
  // describe('initialization', function(){
  //   it('starts at temperature 20', function() {
  //     expect(thermostat.currentTemp).toBe(20);
  //   });
  // });
  //
  // describe('up',function(){
  //   it('can increase the temperature', function(){
  //     thermostat.up();
  //     expect(thermostat.currentTemp).toBe(21);
  //   });
  // });
  //
  // describe('down',function(){
  //   it('can decrease the temperature', function(){
  //     thermostat.down();
  //     expect(thermostat.currentTemp).toBe(19);
  //   });
  // });
  //
  // describe('minimum temp',function(){
  //   it('cannot go below 10', function(){
  //     for ( let i = 0; i < 10; i++ ) {
  //       thermostat.down()
  //     };
  //     expect(thermostat.currentTemp).toBe(10);
  //     thermostat.down();
  //     expect(thermostat.currentTemp).toBe(10);
  //   });
  // });
  //
  // describe('power saving mode',function(){
  //   it('default is on', function(){
  //     expect(thermostat.powerSave).toBe(true);
  //   });
  //
  //   it('cannot go above 25 when on', function(){
  //     for ( let i = 0; i < 5; i++ ) {
  //       thermostat.up()
  //     };
  //     expect(thermostat.currentTemp).toBe(25);
  //     thermostat.up();
  //     expect(thermostat.currentTemp).toBe(25);
  //   })
  //
  //
  //   it('can be switched off', function(){
  //     thermostat.switchSaveOff();
  //     expect(thermostat.powerSave).toBe(false);
  //   });
  // })
  //
  // describe('reset',function(){
  //   it('resets to 20', function(){
  //     thermostat.reset();
  //     expect(thermostat.currentTemp).toBe(20)
  //   });
  // });
  //
  // describe('current energy usage',function(){
  //   it('is medium on initialization', function(){
  //     expect(thermostat.energyUsage()).toBe("medium-usage")
  //   })
  //
  //   it('is low at 17', function() {
  //     for ( let i = 0; i < 3; i++ ) {
  //       thermostat.down();
  //     };
  //     expect(thermostat.energyUsage()).toBe("low-usage")
  //   })
  //
  //   it('is high at 26 (PS must be off)', function() {
  //     thermostat.switchSaveOff()
  //     for ( let i = 0; i < 8; i++ ) {
  //       thermostat.up()
  //     };
  //     expect(thermostat.energyUsage()).toBe("high-usage")
  //   })
  // });
})
