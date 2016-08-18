'use strict';

const harvestSourcePositions = require('./memory.harvestSourcePositions');
const openBuildOrders = require('./memory.openBuildOrders');

module.exports = () => {
  for(let creepName in Memory.creeps) {
    if(!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
    }
  }
  for (let spawnName in Memory.spawns) {
    if (!Game.spawns[spawnName]) {
      delete Memory.spawns[spawnName];
    }
  }
  harvestSourcePositions.garbageCollector();
  openBuildOrders.garbageCollector();
};
