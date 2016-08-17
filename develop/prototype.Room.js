'use strict';

Room.prototype.hasStorage = Room.prototype.getStorage = function () {
  var structures = this.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_STORAGE });
  if (structures.length) {
    return structures[0];
  }
};
