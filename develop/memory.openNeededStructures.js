'use strict';

const garbageCollector = require('./garbageCollector');

function init() {
  if (!Memory.openNeededStructures) {
    Memory.openNeededStructures = {};
  }
}

garbageCollector.addGarbageCollector(() => {
  init();
  for(let roomName in Memory.openNeededStructures) {
    if(!Game.rooms[roomName]) {
      delete Memory.openNeededStructures[roomName];
    }
  }
});

module.exports.setNeededStructures = (roomName, neededStructures) => {
  init();
  Memory.openNeededStructures[roomName] = neededStructures;
};

module.exports.isFinished = (roomName) => {
  init();
  return Memory.openNeededStructures[roomName] && Memory.openNeededStructures[roomName].length === 0;
};
