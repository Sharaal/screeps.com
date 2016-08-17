'use strict';

StructureTower.prototype.attackHostile = function () {
  var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (target) {
    this.attack(target);
    return true;
  }
};

StructureTower.prototype.repairStructure = function () {
  var structures = this.room.find(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType !== STRUCTURE_WALL
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length > 0) {
    structures = _.sortBy(structures, structure => structure.hits);
    this.repair(structures[0]);
    return true;
  }
};

StructureTower.prototype.repairWall = function () {
  var structures = this.room.find(FIND_STRUCTURES, {
    filter: structure =>
      structure.structureType === STRUCTURE_WALL
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length > 0) {
    structures = _.sortBy(structures, structure => structure.hits);
    this.repair(structures[0]);
    return true;
  }
};
