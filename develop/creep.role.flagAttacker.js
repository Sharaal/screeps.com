'use strict';

const spawnFlagName = 'attack spawn';
const targetFlagName = 'attack target';

module.exports = {
  activities: {
    'moveToFlag':    require('./creep.activity.moveToFlag')   ('attackHostile', { flagName: targetFlagName }),
    'attackHostile': require('./creep.activity.attackHostile')('moveToFlag')
  },
  spawn: room => {
    const flag = Game.flags[spawnFlagName];
    if (!flag) {
      return;
    }
    if (!flag.room || room.name !== flag.room.name) {
      return;
    }
    return {
      body: { attack: 5, move: 5 },
      disableNotifyWhenAttacked: true
    };
  }
};
