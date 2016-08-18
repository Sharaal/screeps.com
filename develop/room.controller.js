'use strict';

const build = require('./room.build');
const spawn = require('./room.spawn');
const time = require('./util.time');
const tower = require('./room.tower');

module.exports = roles => room => {
  if (time(10)) {
    build(room);
    spawn(roles)(room);
  }
  tower(room);
};
