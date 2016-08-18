'use strict';

const harvestSourcePositions = require('./memory.harvestSourcePositions');

const empty = 'harvestSource';

module.exports = {
  activities: {
    'harvestSource':           require('./creep.activity.harvestSource')          ('transferEnergyStorage',   empty),
    'transferEnergyStorage':   require('./creep.activity.transferEnergyStorage')  ('transferEnergyContainer', empty, { range: 3 }),
    'transferEnergyContainer': require('./creep.activity.transferEnergyContainer')('dropEnergy',              empty, { range: 3 }),
    'dropEnergy':              require('./creep.activity.dropEnergy')             (empty)
  },
  spawn: room => {
    let workBodypartAmount = 2;
    if (room.energyCapacityAvailable >= 500) {
      workBodypartAmount = 4;
    }
    if (room.energyCapacityAvailable >= 900) {
      workBodypartAmount = 8;
    }
    let roomAmount = 0;
    _.each(room.find(FIND_SOURCES), source => {
      roomAmount += Math.min(harvestSourcePositions.getAmountBySource(source), 8 / workBodypartAmount);
    });
    return {
      priority: availableRoomAmount => roomAmount / (availableRoomAmount || 1),
      body: { carry: 1, move: 1, work: workBodypartAmount },
      roomAmount: roomAmount
    };
  }
};
