const watching = require('node-watch');
const colors = require('colors');

import { log } from './log';
import { executeCommand } from './execute_command';

import { playSuccessSoundAsync, playFailSoundAsync } from './sound';

export const watch = (directory: string, commandToExecute: string, excludePatterns: Array<string>) => {
    watching(
        directory,
        {
            recursive: true,
            filter(f: string, skip: boolean) {
                for (const excludePattern of excludePatterns) {
                    if (f.includes(excludePattern)) return skip;
                }

                return true;
            },
        },
        function (evt: any, updatedFileName: string) {
            log(updatedFileName);
            execute(directory, commandToExecute);
        },
    );

    log(`Start watching directory, ${directory} and excluding_patterns=${JSON.stringify(excludePatterns)}`);
};

const execute = async (directory: string, commandToExecute: string) => {
    const result = await executeCommand(directory, commandToExecute);

    log(result.message);

    if (result.type === 'SUCCESS') {
        playSuccessSoundAsync();
        log(colors.green('✅  Command run successfully ✅'));
    } else {
        playFailSoundAsync();
        log(colors.red('🚨  Command run with error 🚨'));
    }
};
