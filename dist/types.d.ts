import { z } from 'zod';
export declare const TOOLS: {
    readonly CODEX: "codex";
    readonly REVIEW: "review";
    readonly PING: "ping";
    readonly HELP: "help";
    readonly LIST_SESSIONS: "listSessions";
};
export type ToolName = typeof TOOLS[keyof typeof TOOLS];
export interface ToolDefinition {
    name: ToolName;
    description: string;
    inputSchema: {
        type: 'object';
        properties: Record<string, unknown>;
        required: string[];
    };
}
export interface ToolResult {
    content: Array<{
        type: 'text';
        text: string;
    }>;
    isError?: boolean;
    _meta?: Record<string, unknown>;
}
export interface ServerConfig {
    name: string;
    version: string;
}
export declare const SandboxMode: z.ZodEnum<{
    "read-only": "read-only";
    "workspace-write": "workspace-write";
    "danger-full-access": "danger-full-access";
}>;
export declare const CodexToolSchema: z.ZodObject<{
    prompt: z.ZodString;
    workingDirectory: z.ZodOptional<z.ZodString>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        medium: "medium";
        high: "high";
    }>>;
}, z.core.$strip>;
export declare const ReviewToolSchema: z.ZodObject<{
    prompt: z.ZodOptional<z.ZodString>;
    uncommitted: z.ZodOptional<z.ZodBoolean>;
    base: z.ZodOptional<z.ZodString>;
    commit: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    workingDirectory: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const PingToolSchema: z.ZodObject<{
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const HelpToolSchema: z.ZodObject<{}, z.core.$strip>;
export declare const ListSessionsToolSchema: z.ZodObject<{}, z.core.$strip>;
export type CodexToolArgs = z.infer<typeof CodexToolSchema>;
export type ReviewToolArgs = z.infer<typeof ReviewToolSchema>;
export type PingToolArgs = z.infer<typeof PingToolSchema>;
export type ListSessionsToolArgs = z.infer<typeof ListSessionsToolSchema>;
export interface CommandResult {
    stdout: string;
    stderr: string;
}
//# sourceMappingURL=types.d.ts.map