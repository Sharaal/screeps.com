'use strict';

var changeRoles = require('./util.migration.changeRoles');

module.exports = roles => {
  changeRoles(roles, 'sourceAllrounder',    'rescuer');
  changeRoles(roles, 'sourceUpgrader',      'rescuer');
  changeRoles(roles, 'storageBuilder',      'worker');
  changeRoles(roles, 'storageCarrier',      'carrier');
  changeRoles(roles, 'storageSourcer',      'sourcer');
  changeRoles(roles, 'storageSpawnBuilder', 'spawnBuilder');
  changeRoles(roles, 'storageUpgrader',     'worker');
};
