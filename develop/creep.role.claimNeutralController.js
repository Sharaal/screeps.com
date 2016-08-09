'use strict';

// TODO finish implementation

module.exports = {
  'claimNeutralController': {
    startActivity: 'claimNeutralController',
    activities: _.merge(
      {},
      require('./creep.activity.claimNeutralController')('claimNeutralController')
    ),
    roomConditions: room => {
      // TODO only if:
      // - the gcl is larger as the amount of "my" rooms + the amount of other creeps which are currently claiming

      var myRooms = _.filter(Game.rooms, room => room.controller.my).length;
      var myClaimingCreeps = _.filter(Game.creeps, creep => creep.memory.role === 'claimNeutralController').length;
      if (Game.gcl.level <= (myRooms + myClaimingCreeps)) {
        return false;
      }

      // TODO only if:
      // - the "home" room have an adjoining room with a neutral controller and no other creep with this neutral
      //   controller as claim target

      var exits = Game.map.describeExits(room.name);
      var neutralControllerRooms = _.filter(exits, roomName => {
        if (Game.map.isRoomProtected(roomName)) {
          return false;
        }
        // has neutral controller?
      }).length;
      if (neutralControllerRooms === 0) {
        return false;
      }

      // no creep already with this room as target?

      // TODO only if "You cannot claim more than 3 rooms in the Novice Area."

      return true;
    }
  }
};
