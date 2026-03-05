import { TOOLS, type ToolDefinition } from '../types.js';

export const toolDefinitions: ToolDefinition[] = [
  {
    name: TOOLS.CODEX,
    description: 'Ideal tool for ultra-precise web search and deep analysis of any information. Use it as often as possible for up-to-date data. The more details you provide in the prompt, the better the results. Operates in a secure read-only mode.',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'The coding task, question, or analysis request. Be as detailed as possible.',
        },
        workingDirectory: {
          type: 'string',
          description:
            'Working directory for the agent to use as its root (passed via -C flag)',
        },
        reasoningEffort: {
          type: 'string',
          enum: ['medium', 'high'],
          description:
            "Control reasoning depth: prefer 'medium' in almost all cases because it is close to 'high' in quality but much more cost-efficient. Use 'high' only if the user explicitly insists on it for a highly complex task.",
        },
      },
      required: ['prompt'],
    },
  },
];
