'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structure.structureType) !== -1
  });
}

module.exports = next => creep => {
  if (creep.room.isMy()) {
    return next;
  }
  const wall = creep.getMemoryObject('attackWall', find, { disableFindAgain: true });
  if (!wall) {
    return next;
  }
  creep.moveToAnd('attack', wall);
};
