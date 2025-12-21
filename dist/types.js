import { z } from 'zod';
// Tool constants
export const TOOLS = {
    CODEX: 'codex',
    REVIEW: 'review',
    PING: 'ping',
    HELP: 'help',
    LIST_SESSIONS: 'listSessions',
};
// Sandbox mode enum
export const SandboxMode = z.enum([
    'read-only',
    'workspace-write',
    'danger-full-access',
]);
// Zod schemas for tool arguments
export const CodexToolSchema = z.object({
    prompt: z.string(),
    workingDirectory: z.string().optional(),
    reasoningEffort: z.enum(['medium', 'high']).optional(),
});
// Review tool schema
export const ReviewToolSchema = z.object({
    prompt: z.string().optional(),
    uncommitted: z.boolean().optional(),
    base: z.string().optional(),
    commit: z.string().optional(),
    title: z.string().optional(),
    model: z.string().optional(),
    workingDirectory: z.string().optional(),
});
export const PingToolSchema = z.object({
    message: z.string().optional(),
});
export const HelpToolSchema = z.object({});
export const ListSessionsToolSchema = z.object({});
//# sourceMappingURL=types.js.map