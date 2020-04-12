'use strict';

const {CLI_DEFAULT_COMMAND, CLI_ARGS_INDEX} = require(`./constants`);
const commandManager = require(`./command`);
const cliArgs = process.argv.slice(CLI_ARGS_INDEX);
const [name, count] = cliArgs;

if (cliArgs.length === 0 || !commandManager[name]) {
  commandManager[CLI_DEFAULT_COMMAND].run();
  return;
}

commandManager[name].run(count);
