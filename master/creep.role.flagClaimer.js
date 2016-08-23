'use strict';

module.exports = {
  activities: {
    'moveToFlag':      require('./creep.activity.moveToFlag')     ('claimController', 'moveToFlag', { flagName: 'claim target' }),
    'claimController': require('./creep.activity.claimController')('suicide'),
    'suicide':         require('./creep.activity.suicide')
  },
  spawn: room => {
    if (!room.hasFlag(/^claim spawn/)) {
      return;
    }
    const rooms = _.filter(Game.rooms, room => room.isMy());
    if (rooms.length >= Game.gcl.level) {
      return;
    }
    return {
      body: { claim: 1, move: 1 },
      mapAmount: 1
    };
  }
};
