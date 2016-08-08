'use strict';

var harvest = 'harvestSource';
module.exports = {
  startActivity: harvest,
  activities: _.merge(
    {},
    require('./creep.activity.harvestSource')    ('upgradeController', harvest),
    require('./creep.activity.upgradeController')('upgradeController', harvest)
  ),
  conditions: room => room.find(FIND_SOURCES).length > 0
};
