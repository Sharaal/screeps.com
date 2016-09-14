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
    if (room.hasFlag(/spawn builder target/)) {
      return;
    }
    const roomAmount = room.getSourcesAmount() * 2;
    return {
      priority: availableRoomAmount => roomAmount / (availableRoomAmount || 1),
      body: { carry: 2, move: 2 },
      roomAmount: roomAmount
    };
  }
};
