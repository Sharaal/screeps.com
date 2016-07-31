'use strict';

module.exports = tower => {
  var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (target) {
    tower.attack(target);
  } else {
    if (tower.energy / tower.energyCapacity > 0.5) {
      var structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
      });
      if (structure) {
        tower.repair(structure);
      }    
    }
  }
};
