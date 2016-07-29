'use strict';

module.exports = creep => {
  var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (!constructionSites.length) {
    return true;
  }

  if (creep.memory.constructionSite && !constructionSites[creep.memory.constructionSite]) {
    delete creep.memory.constructionSite;
  }
  if (!creep.memory.constructionSite) {
    creep.memory.constructionSite = _.sample(_.keys(constructionSites));
  }

  var constructionSite = constructionSites[creep.memory.constructionSite];

  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  } else {
    if (creep.carry.energy === 0) {
      return true;
    }
  }
};
