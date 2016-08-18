'use strict';

StructureTower.prototype.attackHostile = function () {
  var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (target) {
    this.attack(target);
    return true;
  }
};

function getDamagedStructures(room, validate) {
  var structures = room.find(FIND_STRUCTURES, {
    filter: structure =>
      validate(structure.structureType)
      &&
      structure.hits < structure.hitsMax
  });
  return structures;
}

function getMostDamagedStructure(room, validate) {
  var structures = getDamagedStructures(room, validate);
  if (structures.length > 0) {
    structures = _.sortBy(structures, structure => structure.hits);
    return structures[0];
  }
}

function repairMostDamagedStructure(room, validate) {
  var structure = getMostDamagedStructure(room, validate);
  if (structure) {
    this.repair(structure);
    return true;
  }
}

StructureTower.prototype.repairStructure = function () {
  return repairMostDamagedStructure(this.room, structureType => structureType !== STRUCTURE_WALL);
};

StructureTower.prototype.repairWall = function () {
  return repairMostDamagedStructure(this.room, structureType => structureType === STRUCTURE_WALL);
};
