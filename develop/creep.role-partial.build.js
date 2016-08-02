'use strict';

module.exports = next => {
  return {
    'find-constructionSite': {
      run: require('./creep.activity.find-constructionSite'),
      next: creep => {
        if (creep.memory.constructionSite) {
          return 'build';
        }
        return next;
      }
    },
    build: {
      run: require('./creep.activity.build'),
      next: creep => {
        if (creep.carry.energy) {
          return 'find-constructionSite';
        }
        return 'harvest';
      }
    },
  }
};
