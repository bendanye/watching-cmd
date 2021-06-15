const program = require('commander');

import { watch }  from './watch';

program
  .version('1.0.0')
  .description('An application for watching directory and run command whenever detect got changes')
  .requiredOption('-d, --directory <directory>', 'Directory to watch')
  .requiredOption('-c, --command <command>', 'Command to run')
  .parse(process.argv);

const options = program.opts();

const directory: string = options.directory;
const commandToExecute: string = options.command;

watch(directory, commandToExecute);