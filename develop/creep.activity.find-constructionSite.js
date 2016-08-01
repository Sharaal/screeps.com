'use strict';

module.exports = creep => {
  var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (!constructionSite) {
    return true;
  }
  creep.memory.target = 'constructionSite';
  creep.memory.range = 3;
  creep.memory.constructionSite = constructionSite.id;
  return true;
};
