'use strict';

StructureTower.prototype.attackHostileCreep =
  function () {
    const target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
      this.attack(target);
      return true;
    }
  };

function repairMostDamagedStructure(room, validate, tower) {
  let structures = room.find(FIND_STRUCTURES, {
    filter: structure =>
      validate(structure.structureType)
      &&
      structure.hits < structure.hitsMax
  });
  if (structures.length === 0) {
    return;
  }
  structures = _.sortBy(structures, structure => structure.hits);
  const structure = structures[0];
  tower.repair(structure);
  return true;
}

StructureTower.prototype.repairStructure =
  function () {
    return repairMostDamagedStructure(
      this.room,
      structureType => [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structureType) === -1,
      this
    );
  };

StructureTower.prototype.repairWall =
  function () {
    return repairMostDamagedStructure(
      this.room,
      structureType => [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structureType) !== -1,
      this
    );
  };

StructureTower.prototype.rescueRampart =
  function () {
    let structures = this.room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.structureType === STRUCTURE_RAMPART
        &&
        structure.hits <= RAMPART_DECAY_AMOUNT
    });
    if (structures.length === 0) {
      return;
    }
    const structure = structures[0];
    this.repair(structure);
    return true;
  };
