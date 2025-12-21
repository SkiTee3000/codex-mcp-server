import {
  TOOLS,
  type ToolResult,
  type CodexToolArgs,
  CodexToolSchema,
} from '../types.js';
import { ToolExecutionError, ValidationError } from '../errors.js';
import { executeCommand } from '../utils/command.js';
import { ZodError } from 'zod';

export class CodexToolHandler {
  async execute(args: unknown): Promise<ToolResult> {
    try {
      const {
        prompt,
        workingDirectory,
        reasoningEffort,
      }: CodexToolArgs = CodexToolSchema.parse(args);

      // Build command arguments with fixed settings
      const selectedModel = 'gpt-5.1-codex';
      
      const cmdArgs = [
        '--enable', 'web_search_request',
        'exec',
        '--model', selectedModel,
        '--sandbox', 'read-only',
        '--skip-git-repo-check'
      ];

      // Add reasoning effort via config if provided
      if (reasoningEffort) {
        cmdArgs.push('-c', `model_reasoning_effort="${reasoningEffort}"`);
      }

      // Add working directory if provided
      if (workingDirectory) {
        cmdArgs.push('-C', workingDirectory);
      }

      // Add the prompt
      cmdArgs.push(prompt);

      const result = await executeCommand('codex', cmdArgs);
      // Codex CLI may output to stderr, so check both
      const response = result.stdout || result.stderr || 'No output from Codex';

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
        _meta: {
          model: selectedModel,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(TOOLS.CODEX, error.message);
      }
      throw new ToolExecutionError(
        TOOLS.CODEX,
        'Failed to execute codex command',
        error
      );
    }
  }
}

// Tool handler registry
export const toolHandlers = {
  [TOOLS.CODEX]: new CodexToolHandler(),
} as const;
