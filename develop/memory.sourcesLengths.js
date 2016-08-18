'use strict';

function init() {
  if (!Memory.sourcesLengths) {
    Memory.sourcesLengths = {};
  }
}

module.exports.garbageCollector = () => {
  init();
  for(let roomName in Memory.sourcesLengths) {
    if(!Game.rooms[roomName]) {
      delete Memory.sourcesLengths[roomName];
    }
  }
};

module.exports.getSourcesLength = roomName => {
  init();
  if (typeof Memory.sourcesLengths[roomName] !== 'number') {
    const room = Game.rooms[roomName];
    if(room) {
      Memory.sourcesLengths[roomName] = room.find(FIND_SOURCES).length;
    }
  }
  return Memory.sourcesLengths[roomName];
};
