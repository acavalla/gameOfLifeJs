'use strict';

const sum = require('../src/gameOfLife.js');

describe('Thermostat', function() {

  // var thermostat;
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('two plus two is four', () => {
    expect(sum(2, 2)).not.toBe(5);
  });

  test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });
  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('initialization', function(){
    it('starts at temperature 20', function() {
      expect(thermostat.currentTemp).toBe(20);
    });
  });

  describe('up',function(){
    it('can increase the temperature', function(){
      thermostat.up();
      expect(thermostat.currentTemp).toBe(21);
    });
  });

  describe('down',function(){
    it('can decrease the temperature', function(){
      thermostat.down();
      expect(thermostat.currentTemp).toBe(19);
    });
  });

  describe('minimum temp',function(){
    it('cannot go below 10', function(){
      for ( let i = 0; i < 10; i++ ) {
        thermostat.down()
      };
      expect(thermostat.currentTemp).toBe(10);
      thermostat.down();
      expect(thermostat.currentTemp).toBe(10);
    });
  });

  describe('power saving mode',function(){
    it('default is on', function(){
      expect(thermostat.powerSave).toBe(true);
    });

    it('cannot go above 25 when on', function(){
      for ( let i = 0; i < 5; i++ ) {
        thermostat.up()
      };
      expect(thermostat.currentTemp).toBe(25);
      thermostat.up();
      expect(thermostat.currentTemp).toBe(25);
    })


    it('can be switched off', function(){
      thermostat.switchSaveOff();
      expect(thermostat.powerSave).toBe(false);
    });
  })

  describe('reset',function(){
    it('resets to 20', function(){
      thermostat.reset();
      expect(thermostat.currentTemp).toBe(20)
    });
  });

  describe('current energy usage',function(){
    it('is medium on initialization', function(){
      expect(thermostat.energyUsage()).toBe("medium-usage")
    })

    it('is low at 17', function() {
      for ( let i = 0; i < 3; i++ ) {
        thermostat.down();
      };
      expect(thermostat.energyUsage()).toBe("low-usage")
    })

    it('is high at 26 (PS must be off)', function() {
      thermostat.switchSaveOff()
      for ( let i = 0; i < 8; i++ ) {
        thermostat.up()
      };
      expect(thermostat.energyUsage()).toBe("high-usage")
    })
  });
});
