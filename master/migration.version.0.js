'use strict';

const changeRoles = require('./util.migration.changeRoles');

module.exports = roles => {
  changeRoles(roles, 'carrier',                                    'storageCarrier');
  changeRoles(roles, 'harvestEnergyStorage-buildConstructionSite', 'storageBuilder');
  changeRoles(roles, 'harvestEnergyStorage-buildSpawn',            'storageSpawnBuilder');
  changeRoles(roles, 'harvestEnergyStorage-transferStructure',     'storageCarrier');
  changeRoles(roles, 'harvestEnergyStorage-upgradeController',     'storageUpgrader');
  changeRoles(roles, 'harvestSource-allround',                     'sourceAllrounder');
  changeRoles(roles, 'harvestSource-transferEnergyStorage',        'storageSourcer');
  changeRoles(roles, 'harvestSource-upgradeController',            'sourceUpgrader');
};
