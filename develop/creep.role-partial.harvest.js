'use strict';

module.exports = next => {
  return {
    'find-source': {
      do: require('./creep.activity.find-source'),
      next: 'move-to source'
    },
    'move-to source': {
      do: require('./creep.activity.move-to'),
      next: 'harvest'
    },
    harvest: {
      do: require('./creep.activity.harvest'),
      next
    }
  }
};
