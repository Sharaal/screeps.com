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
    if (room.hasFlag(/spawn builder target/)) {
      return;
    }
    
    let body = { carry: 1, move: 1, work: 2 };
    if (room.energyCapacityAvailable >= 550) {
      body = { carry: 1, move: 2, work: 4 };
    }
    if (room.energyCapacityAvailable >= 1300) {
      body = { carry: 2, move: 4, work: 10 };
    }

    let sources;
    const flag = room.getFlag(/^source/);
    if (flag) {
      sources = [flag.pos.findClosestByRange(FIND_SOURCES)];
    } else {
      sources = room.find(FIND_SOURCES);
    }

    let roomAmount = 0;
    _.each(sources, source => {
      roomAmount += Math.min(harvestSourcePositions.getAmountBySource(source), Math.ceil(8 / body.work));
    });

    return {
      priority: availableRoomAmount => roomAmount / (availableRoomAmount || 1),
      body: body,
      roomAmount: roomAmount
    };
  }
};
