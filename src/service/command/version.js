'use strict';

const packageFile = require(`../../../package`);
const chalk = require(`chalk`);
const message = chalk.bold.blue(packageFile.version);

const run = () => {
  console.log(message);
};

module.exports = {
  run
};
