'use strict';

module.exports = {
  'carrier':             require('./creep.role.carrier'),
  'flagAttacker':        require('./creep.role.flagAttacker'),
  'flagClaimer':         require('./creep.role.flagClaimer'),
  'neighboringReserver': require('./creep.role.neighboringSourcer'),
  'neighboringSourcer':  require('./creep.role.neighboringSourcer'),
  'rescuer':             require('./creep.role.rescuer'),
  'sourcer':             require('./creep.role.sourcer'),
  'spawnBuilder':        require('./creep.role.spawnBuilder'),
  'worker':              require('./creep.role.worker')
};
