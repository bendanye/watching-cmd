const watching = require('node-watch');
const colors = require('colors');

import { log } from './log';
import { executeCommand } from './execute_command';

import { playSuccessSoundAsync, playFailSoundAsync } from './sound';

export const watch = (directory: string, commandToExecute: string) => {
    watching(directory, { recursive: true }, function (evt: any, updatedFileName: string) {
        execute(directory, commandToExecute);
    });
    
    log(`Start watching directory, ${directory}`);
}

const execute = async(directory: string, commandToExecute: string) => {
    
    const result = await executeCommand(directory, commandToExecute);

    log(result.message);
    
    if (result.type === "SUCCESS") {
        playSuccessSoundAsync();
        log(colors.green("✅  Command run successfully ✅"));
    } else {
        playFailSoundAsync();
        log(colors.red("🚨  Command run with error 🚨"));
    } 
}