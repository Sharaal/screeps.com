'use strict';

module.exports = tower => {
  var structures = tower.room.find(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_WALL
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length > 0) {
    tower.repair(structures.sort((structureA, structureB) => structureA.hits > structureB.hits)[0]);
    return true;
  }
};
