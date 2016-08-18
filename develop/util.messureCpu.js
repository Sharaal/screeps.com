'use strict';

let lastCpu;
module.exports = (message, data) => {
  if (!message) {
    lastCpu = Game.cpu.getUsed();
    return;
  }
  const currentCpu = Game.cpu.getUsed();
  const difference = Math.floor(currentCpu - lastCpu);
  if (difference > 1) {
    console.log(currentCpu - lastCpu, message, data ? JSON.stringify(data) : '');
  }
  lastCpu = currentCpu;
};
