'use strict';

module.exports = needEnergy => creep => {
  creep.drop(RESOURCE_ENERGY);
  return needEnergy;
};
