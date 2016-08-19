'use strict';

const empty = 'pickupDroppedEnergy';

module.exports = {
  activities: {
    'pickupDroppedEnergy':     require('./creep.activity.pickupDroppedEnergy')    ('transferStructure',     'withdrawEnergyContainer'),
    'withdrawEnergyContainer': require('./creep.activity.withdrawEnergyContainer')('transferStructure',     'withdrawEnergyStorage'),
    'withdrawEnergyStorage':   require('./creep.activity.withdrawEnergyStorage')  ('transferStructure',     empty),
    'transferStructure':       require('./creep.activity.transferStructure')      ('transferEnergyStorage', empty),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferStructure',     empty)
  },
  spawn: room => {
    let sourcesAmount;
    if (room.hasFlag(/^source/)) {
      sourcesAmount = 1;
    } else {
      sourcesAmount = room.getSourcesAmount();
    }
    const roomAmount = sourcesAmount * 3;
    return {
      priority: availableRoomAmount => roomAmount / (availableRoomAmount || 1),
      body: { carry: 2, move: 1 },
      roomAmount: roomAmount
    };
  }
};
