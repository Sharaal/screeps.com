'use strict';

module.exports.garbageCollector = () => {
  for(var roomName in Memory.harvestSourcePositions) {
    if(!Game.rooms[roomName]) {
      delete Memory.harvestSourcePositions[roomName];
    }
  }
};

function getHarvestSourcePositions(roomName) {
  if (!Memory.harvestSourcePositions) {
    Memory.harvestSourcePositions = {};
  }
  if (!Memory.harvestSourcePositions[roomName]) {
    var harvestSourcePosition = {
      positions: {},
      roomAmount: 0,
      sourceAmounts: {}
    };
    var room = Game.rooms[roomName];
    if (room) {
      var sources = room.find(FIND_SOURCES);
      _.each(sources, source => {
        var top = source.pos.y - 1;
        var left = source.pos.x - 1;
        var bottom = source.pos.y + 1;
        var right = source.pos.x + 1;
        var objects = room.lookAtArea(top, left, bottom, right);
        _.each([source.pos.x - 1, source.pos.x, source.pos.x + 1], x => {
          _.each([source.pos.y - 1, source.pos.y, source.pos.y + 1], y => {
            var foundWall = false;
            _.each(objects[x][y], object => {
              if (object.type === 'terrain' && object.terrain === 'wall') {
                foundWall = true;
              }
            });
            if (!foundWall) {
              if (!harvestSourcePosition.positions[x]) {
                harvestSourcePosition.positions[x] = {};
              }
              harvestSourcePosition.positions[x][y] = source.id;
              ++harvestSourcePosition.roomAmount;
              if (!harvestSourcePosition.sourceAmounts[source.id]) {
                harvestSourcePosition.sourceAmounts[source.id] = 0;
              }
              ++harvestSourcePosition.sourceAmounts[source.id];
            }
          });
        });
      });
    }
    Memory.harvestSourcePositions[roomName] = harvestSourcePosition;
  }
  return Memory.harvestSourcePositions[roomName];
}

module.exports.getAmountByRoomName = roomName => {
  return getHarvestSourcePositions(roomName).roomAmount;
};

module.exports.getAmountBySource = source => {
  return getHarvestSourcePositions(source.pos.roomName).sourceAmounts[source.id] || 0;
};

module.exports.getSource = pos => {
  var positions = getHarvestSourcePositions(pos.roomName).positions;
  if (positions[pos.x] && positions[pos.x][pos.y]) {
    return Game.getObjectById(positions[pos.x][pos.y]);
  }
};
