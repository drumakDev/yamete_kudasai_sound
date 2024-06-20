import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

const mainPath = path.dirname(fs.realpathSync(__filename));
const soundPath = path.join(mainPath, './sounds/yamete_kudasai');
const windowsScript = path.join(mainPath, './forWindows.jscript');

const yamete = (): Promise<{ stdout: string; stderr: string }> => {
  const commandsForEachPlatform: { [key: string]: string } = {
    linux: `paplay ${soundPath}.ogg`,
    win32: `cscript /E:JScript /nologo "${windowsScript}" "${soundPath}.mp3"`,
    darwin: `afplay ${soundPath}.mp3`,
  };

  const platform = process.platform;
  const codeToExecute = commandsForEachPlatform[platform];

  if (!codeToExecute) {
    return Promise.reject(new Error(`Platform ${platform} is not supported`));
  }

  return execPromise(codeToExecute);
};

export default yamete;
