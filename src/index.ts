const program = require('commander');

import { watch }  from './watch';

program
  .version('1.0.0')
  .description('An application for watching directory and run command whenever detect got changes')
  .requiredOption('-d, --directory', 'Directory to watch')
  .requiredOption('-c, --command', 'Command to run')
  .parse(process.argv);

const directory: string = !program.directory ? 'C:\\Users\\benjaminng\\Documents\\GitHub\\node-exploration': program.directory;
const commandToExecute: string = !program.command ? 'npm run test': program.command;

watch(directory, commandToExecute);