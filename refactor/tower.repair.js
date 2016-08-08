'use strict';

module.exports = tower => {
  var structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
    filter:
      structure => structure.hits < structure.hitsMax
      &&
      structure.structureType !== STRUCTURE_WALL
  });
  if (structure) {
    tower.repair(structure);
    return true;
  }
};
