'use strict';

module.exports = empty => creep => {
  creep.drop(RESOURCE_ENERGY);
  return empty;
};
