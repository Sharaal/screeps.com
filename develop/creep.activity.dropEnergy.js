'use strict';

function run(creep) {
  creep.drop(RESOURCE_ENERGY);
  return true;
}

module.exports = harvest => {
  return {
    'dropEnergy': {
      run,
      next: harvest
    }
  };
};
