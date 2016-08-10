'use strict';

module.exports = tower => {
  var structures = tower.room.find(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.structureType !== STRUCTURE_WALL
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length > 0) {
    structures = _.sortBy(structures, structure => structure.hits);
    tower.repair(structures[0]);
    return true;
  }
};
