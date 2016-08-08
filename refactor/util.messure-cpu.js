'use strict';

var lastCpu;
module.exports = (message, data) => {
  if (!message) {
    lastCpu = Game.cpu.getUsed();
    return;
  }
  var currentCpu = Game.cpu.getUsed();
  var difference = Math.floor(currentCpu - lastCpu);
  if (difference > 1) {
    console.log(currentCpu - lastCpu, message, data ? JSON.stringify(data) : '');
  }
  lastCpu = currentCpu;
};
