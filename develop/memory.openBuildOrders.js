'use strict';

function init() {
  if (!Memory.openBuildOrders) {
    Memory.openBuildOrders = {};
  }
}

module.exports.garbageCollector = () => {
  init();
  for(let roomName in Memory.openBuildOrders) {
    if(!Game.rooms[roomName]) {
      delete Memory.openBuildOrders[roomName];
    }
  }
};

module.exports.set = (roomName, buildOrders) => {
  init();
  Memory.openBuildOrders[roomName] = buildOrders;
};

module.exports.finished = (roomName) => {
  init();
  return Memory.openBuildOrders[roomName] && Memory.openBuildOrders[roomName].length === 0;
};
