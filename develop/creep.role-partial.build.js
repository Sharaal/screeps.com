'use strict';

module.exports = next => {
  return {
    'find-constructionSite': {
      run: require('./creep.activity.find-constructionSite'),
      next: creep => {
        if (creep.memory.constructionSite) {
          return 'move-to constructionSite';
        }
        return next;
      }
    },
    'move-to constructionSite': {
      run: require('./creep.activity.move-to'),
      next: 'build'
    },
    build: {
      run: require('./creep.activity.build'),
      next: creep => {
        if (creep.carry.energy) {
          return next;
        }
        return 'move-to source';
      }
    },
  }
};
