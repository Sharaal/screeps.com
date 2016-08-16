'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports = () => {
  for(var creepName in Memory.creeps) {
    if(!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
    }
  }
  for (var spawnName in Memory.spawns) {
    if (!Game.spawns[spawnName]) {
      delete Memory.spawns[spawnName];
    }
  }
  harvestSourcePositions.garbageCollector();
};
