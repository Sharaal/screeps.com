'use strict';

const empty = 'withdrawEnergyStorage';

module.exports = {
  activities: {
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('repairWall',        'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('repairWall',        'pickupDroppedEnergy'),
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('repairWall',        empty),
    'repairWall':              require('./creep.activity.repairWall')             ('upgradeController', empty),
    'upgradeController':       require('./creep.activity.upgradeController')      ('upgradeController', empty)
  },
  spawn: room => {
    const structures = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        [STRUCTURE_RAMPART, STRUCTURE_WALL].indexOf(structure.structureType) !== -1
        &&
        structure.hits < structure.hitsMax
    });
    if (structures.length === 0) {
      return;
    }
    return {
      body: { carry: 4, move: 2, work: 2 },
      roomAmount: room.getSourcesAmount()
    };
  }
};
