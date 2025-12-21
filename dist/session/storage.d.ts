export interface ConversationTurn {
    prompt: string;
    response: string;
    timestamp: Date;
}
export interface SessionData {
    id: string;
    createdAt: Date;
    lastAccessedAt: Date;
    turns: ConversationTurn[];
    codexConversationId?: string;
}
export interface SessionStorage {
    createSession(): string;
    getSession(sessionId: string): SessionData | undefined;
    updateSession(sessionId: string, data: Partial<SessionData>): void;
    deleteSession(sessionId: string): boolean;
    listSessions(): SessionData[];
    addTurn(sessionId: string, turn: ConversationTurn): void;
    resetSession(sessionId: string): void;
    setCodexConversationId(sessionId: string, conversationId: string): void;
    getCodexConversationId(sessionId: string): string | undefined;
}
export declare class InMemorySessionStorage implements SessionStorage {
    private sessions;
    private readonly maxSessions;
    private readonly sessionTtl;
    createSession(): string;
    getSession(sessionId: string): SessionData | undefined;
    updateSession(sessionId: string, data: Partial<SessionData>): void;
    deleteSession(sessionId: string): boolean;
    listSessions(): SessionData[];
    addTurn(sessionId: string, turn: ConversationTurn): void;
    resetSession(sessionId: string): void;
    setCodexConversationId(sessionId: string, conversationId: string): void;
    getCodexConversationId(sessionId: string): string | undefined;
    private cleanupExpiredSessions;
    private enforceMaxSessions;
}
//# sourceMappingURL=storage.d.ts.map