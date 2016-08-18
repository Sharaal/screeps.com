'use strict';

const spawnFlagName = 'tank spawn';
const targetFlagName = 'tank target';

module.exports = {
  activities: {
    'moveToFlag': require('./creep.activity.moveToFlag')('moveToFlag', { flagName: targetFlagName })
  },
  spawn: room => {
    const flag = Game.flags[spawnFlagName];
    if (!flag) {
      return;
    }
    if (!flag.room) {
      return;
    }
    if (room.name !== flag.room.name) {
      return;
    }
    return {
      body: { tough: 48, move: 2 },
      mapAmount: 1
    };
  }
};
