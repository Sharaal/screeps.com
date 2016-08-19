'use strict';

const garbageCollector = require('./garbageCollector');

function init() {
  if (!Memory.harvestSourcePositions) {
    Memory.harvestSourcePositions = {};
  }
}

garbageCollector.addGarbageCollector(() => {
  init();
  for(let roomName in Memory.harvestSourcePositions) {
    if(!Game.rooms[roomName]) {
      delete Memory.harvestSourcePositions[roomName];
    }
  }
});

function getHarvestSourcePosition(roomName) {
  const harvestSourcePosition = {};
  const room = Game.rooms[roomName];
  if (room) {
    const sources = room.find(FIND_SOURCES);
    _.each(sources, source => {
      harvestSourcePosition[source.id] = 0;
      const objects = room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1);
      _.each([source.pos.y - 1, source.pos.y, source.pos.y + 1], y => {
        _.each([source.pos.x - 1, source.pos.x, source.pos.x + 1], x => {
          if (y === source.pos.y && x === source.pos.x) {
            return;
          }
          let foundWall = false;
          _.each(objects[y][x], object => {
            if (object.type === 'terrain' && object.terrain === 'wall') {
              foundWall = true;
            }
          });
          if (!foundWall) {
            ++harvestSourcePosition[source.id];
          }
        });
      });
    });
  }
  return harvestSourcePosition;
}

function getHarvestSourcePositions(roomName) {
  init();
  if (roomName === 'sim' || !Memory.harvestSourcePositions[roomName]) {
    Memory.harvestSourcePositions[roomName] = getHarvestSourcePosition(roomName);
  }
  return Memory.harvestSourcePositions[roomName];
}

module.exports.getAmountByRoomName = roomName => {
  return _.sum(getHarvestSourcePositions(roomName));
};

module.exports.getAmountBySource = source => {
  return getHarvestSourcePositions(source.pos.roomName)[source.id];
};
