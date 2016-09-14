'use strict';

const garbageCollector = require('./garbageCollector');

function init() {
  if (!Memory.sourcesAmounts) {
    Memory.sourcesAmounts = {};
  }
}

garbageCollector.addGarbageCollector(() => {
  init();
  for(let roomName in Memory.sourcesAmounts) {
    if(!Game.rooms[roomName]) {
      delete Memory.sourcesAmounts[roomName];
    }
  }
});

module.exports.getSourcesAmount = roomName => {
  init();
  if (roomName === 'sim' || typeof Memory.sourcesAmounts[roomName] !== 'number') {
    const room = Game.rooms[roomName];
    if(room) {
      Memory.sourcesAmounts[roomName] = room.find(FIND_SOURCES).length;
    }
  }
  return Memory.sourcesAmounts[roomName];
};
