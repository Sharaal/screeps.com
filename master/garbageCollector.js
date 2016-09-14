'use strict';

const garbageCollectors = [
  () => {
    for(let creepName in Memory.creeps) {
      if(!Game.creeps[creepName]) {
        delete Memory.creeps[creepName];
      }
    }
  },
  () => {
    for (let spawnName in Memory.spawns) {
      if (!Game.spawns[spawnName]) {
        delete Memory.spawns[spawnName];
      }
    }
  }
];

module.exports.addGarbageCollector = garbageCollector => {
  garbageCollectors.push(garbageCollector);
};

module.exports.garbageCollect = () => {
  for (let garbageCollector of garbageCollectors) {
    garbageCollector();
  }
};
