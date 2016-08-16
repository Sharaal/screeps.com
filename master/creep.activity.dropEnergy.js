'use strict';

module.exports = harvest => creep => {
  creep.drop(RESOURCE_ENERGY);
  return harvest;
};
