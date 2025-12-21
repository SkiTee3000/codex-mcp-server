import { execFile } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import { CommandExecutionError } from '../errors.js';
const execFileAsync = promisify(execFile);
export async function executeCommand(file, args = []) {
    try {
        console.error(chalk.blue('Executing:'), file, args.join(' '));
        const result = await execFileAsync(file, args, {
            shell: false,
            maxBuffer: 10 * 1024 * 1024, // 10MB
        });
        if (result.stderr) {
            console.error(chalk.yellow('Command stderr:'), result.stderr);
        }
        return {
            stdout: result.stdout,
            stderr: result.stderr,
        };
    }
    catch (error) {
        // If command failed but produced stdout, treat it as success
        // This handles cases where codex exits with error code but still returns valid output
        if (error && typeof error === 'object' && 'stdout' in error) {
            const execError = error;
            if (execError.stdout) {
                console.error(chalk.yellow('Command failed but produced output, using stdout'));
                return {
                    stdout: execError.stdout,
                    stderr: execError.stderr || '',
                };
            }
        }
        throw new CommandExecutionError([file, ...args].join(' '), `Command execution failed: ${error && typeof error === 'object' && 'stderr' in error ? error.stderr : String(error)}`, error);
    }
}
//# sourceMappingURL=command.js.map