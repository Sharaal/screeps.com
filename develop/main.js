'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');
var towerController = require('./tower.controller');

module.exports.loop = () => {
  memory();
  _.each(Game.spawns, spawnController);
  _.each(Game.creeps, creepController);
  _.each(Game.rooms, room => {
    var towers = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_TOWER
    });
    _.each(towers, towerController);
  });
};
