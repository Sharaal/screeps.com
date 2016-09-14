'use strict';

const changeRoles = require('./util.migration.changeRoles');
const changeActivities = require('./util.migration.changeActivities');

module.exports = roles => {
  changeRoles(roles, 'sourceAllrounder',    'rescuer');
  changeRoles(roles, 'sourceUpgrader',      'rescuer');
  changeRoles(roles, 'storageBuilder',      'worker');
  changeRoles(roles, 'storageCarrier',      'carrier');
  changeRoles(roles, 'storageSourcer',      'sourcer');
  changeRoles(roles, 'storageSpawnBuilder', 'spawnBuilder');
  changeRoles(roles, 'storageUpgrader',     'worker');

  changeActivities('harvestDroppedEnergy',   'pickupDroppedEnergy');
  changeActivities('harvestEnergyContainer', 'withdrawEnergyContainer');
  changeActivities('harvestEnergyStorage',   'withdrawEnergyStorage');
};
