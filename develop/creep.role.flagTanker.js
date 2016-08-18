'use strict';

const spawnFlagName = 'tank spawn';
const targetFlagName = 'tank target';

module.exports = {
  activities: {
    'moveToFlagRoom': require('./creep.activity.moveToFlagRoom')('moveToFlagRoom', { flagName: targetFlagName })
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
      body: { tough: 45, move: 5 },
      mapAmount: 1
    };
  }
};
