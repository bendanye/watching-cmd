const program = require('commander');
const fs = require('fs');

import { watch } from './watch';
import { log } from './log';

program
    .version('1.0.0')
    .description('An application for watching directory and run command whenever detect got changes')
    .requiredOption('-d, --directory <directory>', 'Directory to watch')
    .requiredOption('-c, --command <command>', 'Command to run')
    .option('-i, --excludeConfigId <excludeConfigId>', 'Exclude Config Id to retrieve information of exclude_patterns')
    .option('-e, --excludeConfigPath <excludeConfigPath>', 'Exclude Config Path')
    .parse(process.argv);

const options = program.opts();

const directory: string = options.directory;
const commandToExecute: string = options.command;

const excludeConfigPath: string = options.excludeConfigPath;
const excludeConfigId: string = options.excludeConfigId;

if (!excludeConfigId && !excludeConfigPath) {
    watch(directory, commandToExecute, []);
} else if (excludeConfigId && excludeConfigPath) {
    const excludePatterns: Array<string> = getExcludePatterns(excludeConfigPath, excludeConfigId);
    watch(directory, commandToExecute, excludePatterns);
} else {
    log('Both --excludeConfigId and --excludeConfigPath must be set when one of those is specified');
}

function getExcludePatterns(path: string, configId: string) {
    const rawdata = fs.readFileSync(path);
    const config = JSON.parse(rawdata);
    return config[configId].excludePatterns;
}
