const util = require('util');
const exec = util.promisify(require('child_process').exec);

import { log } from './log';

export const executeCommand = async(directory: string, command: string) => {
    log(`Start executing command, '${command}' at ${directory}`);

    try {
        const { stdout, stderr, error } = await exec(command, {
            cwd: directory
        });
        
        if (stderr) {
          //console.error('stderr:', stderr);
          return {
                type: "ERROR",
                message: stderr
            };
        }
        if (error) {
          //console.error('error:', error);
          return {
                type: "ERROR",
                message: error
            };
        }
        return {
            type: "SUCCESS",
            message: stdout
        };
    } catch (error) {
        return {
            type: "ERROR",
            message: error
        };
    }
}