'use strict';

module.exports = {
  startActivity: 'flagClaimNeutralController',
  activities: {
    'flagClaimNeutralController': require('./creep.activity.flagClaimNeutralController')('suicide'),
    'suicide':                    require('./creep.activity.suicide')
  },
  roomConditions: room => {
    const claimFlag = Game.flags['claim'];
    if (!claimFlag) {
      return;
    }
    const rooms = _.filter(Game.rooms, room => room.controller.my);
    if (rooms.length >= Game.gcl.level) {
      return;
    }
    if (!_.find(Game.map.describeExits(room.name), room => room.name === claimFlag.room.name)) {
      return;
    }
    return true;
  }
};
