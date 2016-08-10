'use strict';

var build = require('./room.build');
var spawn = require('./room.spawn');
var time = require('./util.time');
var tower = require('./room.tower');

module.exports = roles => room => {
  if (!room.controller.my) {
    return;
  }
  if (time(10)) {
    build(room);
    spawn(roles)(room);
  }
  tower(room);
};
