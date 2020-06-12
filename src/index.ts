import { spawnSync, execSync } from 'child_process';
import { unlink, writeFile } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

export interface ProgramOptions {
  command?: string
  type?: string
}

async function _runPython(pythonPath: string, params: string[] = [], { command, type }: ProgramOptions) {
  try {
    if (type === 'exec') {
      const files = pythonPath.split('/');
      const fileName = files[files.length - 1];
      pythonPath = pythonPath.replace(`/${fileName}`, '');
      try {
        const result = execSync(`cd ${pythonPath} && ${command} ${fileName} ` + params.join(' '), {
          encoding: 'utf8'
        });
        return result;
      } catch (error) {
        throw error;
      }
    }

    if (type === 'spawn') {
      const spwanParmas = [pythonPath];
      if (params) {
        for (const param of params) {
          spwanParmas.push(param);
        }
      }
      const { stdout, stderr } = spawnSync(command as string, spwanParmas, {
        encoding: 'utf8'
      });
      if (stdout) {
        return stdout;
      }
      if (stderr) {
        throw new Error(stderr);
      }
    }
  } catch (error) {
    throw error;
  }
}

function _getFileName() {
  const timestamp = new Date().getTime() + '';
  const num = 4;
  const random = parseInt((Math.random() * 9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1) + '')
  return timestamp.substring(timestamp.length - 6) + random;
}

async function _handleResult(path: string, params: string[], options: ProgramOptions) {
  try {
    const result = await _runPython(path, params, options);
    return result;
  } catch (error) {
    error.name = 'PythonExecError';
    error.message = error.message.replace(/File.+,.+line/, 'line').replace(/^Command failed[\s\S]*line/, 'line');
    throw error;
  }
}

const _runByPath = async (path: string, params: string[] = [], options: ProgramOptions) => {
  try {
    return await _handleResult(path, params, options);
  } catch (error) {
    throw error;
  }
}

const writeFileAsync = (path: string, content: string) => {
  return new Promise((resolve, reject) => {
    writeFile(path, content, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  })
}

const unlinkAsync = (path: string) => {
  return new Promise((resolve, reject) => {
    unlink(path, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  })
}

const _runByText = async (text: string, params: string[] = [], options: ProgramOptions) => {
  const fileName = _getFileName()
  const tmpPath = join(tmpdir(), `${fileName}.py`);
  try {
    await writeFileAsync(tmpPath, text);
  } catch (error) {
    throw error;
  }
  try {
    return await _runByPath(tmpPath, params, options);
  } catch (error) {
    throw error;
  } finally {
    if (tmpPath) {
      try {
        await unlinkAsync(tmpPath)
      } catch (error) {
        throw error
      }
    }
  }
}

export const execByPath = async (path: string, params: string[] = []) => {
  return await _runByPath(path, params, { command: 'python', type: 'exec' });
}

export const execByText = async (text: string, params: string[] = []) => {
  return await _runByText(text, params, { command: 'python', type: 'exec' });
}

export const spawnByPath = async (path: string, params: string[] = []) => {
  return await _runByPath(path, params, { command: 'python', type: 'spawn' });
}

export const spawnByText = async (text: string, params: string[] = []) => {
  return await _runByText(text, params, { command: 'python', type: 'spawn' });
}

export const execByPath3 = async (path: string, params: string[] = []) => {
  return await _runByPath(path, params, { command: 'python3', type: 'exec' });
}

export const execByText3 = async (text: string, params: string[] = []) => {
  return await _runByText(text, params, { command: 'python3', type: 'exec' });
}

export const spawnByPath3 = async (path: string, params: string[] = []) => {
  return await _runByPath(path, params, { command: 'python3', type: 'spawn' });
}

export const spawnByText3 = async (text: string, params: string[] = []) => {
  return await _runByText(text, params, { command: 'python3', type: 'spawn' });
}
