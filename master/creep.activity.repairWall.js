'use strict';

function find(creep) {
  let structures = creep.room.find(FIND_STRUCTURES, {
    filter: structure =>
      [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structure.structureType) !== -1
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length === 0) {
    return;
  }
  structures = _.sortBy(structures, structure => structure.hits);
  return structures[0];
}

module.exports = (next, empty) => creep => {
  if (!creep.room.isMy()) {
    return next;
  }
  if (creep.isEmpty()) {
    creep.removeMemoryObject('repairWall');
    return empty;
  }
  const wall = creep.getMemoryObject('repairWall', find);
  if (!wall) {
    return next;
  }
  creep.moveToAnd('repair', wall);
};
