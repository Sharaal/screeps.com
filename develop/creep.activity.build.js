'use strict';

var memoryRandomSelect = require('./util.memory-random-select');

module.exports = creep => {
  var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

  var constructionSite = memoryRandomSelect(creep, 'constructionSite', constructionSites);
  if (!constructionSite) {
    return true;
  }

  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  } else {
    if (creep.carry.energy === 0) {
      return true;
    }
  }
};
