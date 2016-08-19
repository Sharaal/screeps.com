'use strict';

const spawnFlagName = 'claim spawn';
const targetFlagName = 'claim target';

module.exports = {
  activities: {
    'moveToFlag':      require('./creep.activity.moveToFlag')     ('claimController', { flagName: targetFlagName }),
    'claimController': require('./creep.activity.claimController')('suicide'),
    'suicide':         require('./creep.activity.suicide')
  },
  spawn: room => {
    const flag = Game.flags[spawnFlagName];
    if (!flag) {
      return;
    }
    if (!flag.room || room.name !== flag.room.name) {
      return;
    }
    const rooms = _.filter(Game.rooms, room => room.controller.my);
    if (rooms.length >= Game.gcl.level) {
      return;
    }
    return {
      body: { claim: 1, move: 1 },
      mapAmount: 1
    };
  }
};
