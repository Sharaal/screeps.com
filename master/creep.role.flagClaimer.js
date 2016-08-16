'use strict';

module.exports = {
  startActivity: 'flagClaimNeutralController',
  activities: {
    'flagClaimNeutralController': require('./creep.activity.flagClaimNeutralController')('suicide'),
    'suicide':                    require('./creep.activity.suicide')
  },
  roomConditions: room => {
    var claimFlag = Game.flags.claim;
    if (!claimFlag) {
      return;
    }
    var rooms = _.filter(Game.rooms, room => room.controller.my);
    if (rooms.length >= Game.gcl.level) {
      return;
    }
    if (!_.find(Game.map.describeExits(room.name), room => room.name === claimFlag.room.name)) {
      return;
    }
    return true;
  }
};
