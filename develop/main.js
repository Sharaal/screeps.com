'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');
var towerController = require('./tower.controller');
var time = require('./util.time');

module.exports.loop = () => {
  if (time(100)) {
    memory();
  }
  if (time(10)) {
    _.each(Game.spawns, spawnController);
  }
  _.each(Game.creeps, creepController);
  _.each(Game.rooms, room => {
    var towers = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_TOWER
    });
    _.each(towers, towerController);
  });
};
