import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import chalk from 'chalk';
import { handleError } from './errors.js';
import { toolDefinitions } from './tools/definitions.js';
import { toolHandlers } from './tools/handlers.js';
export class CodexMcpServer {
    server;
    config;
    constructor(config) {
        this.config = config;
        this.server = new Server({
            name: config.name,
            version: config.version,
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    setupHandlers() {
        // List tools handler
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return { tools: toolDefinitions };
        });
        // Call tool handler
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                if (!this.isValidToolName(name)) {
                    throw new Error(`Unknown tool: ${name}`);
                }
                const handler = toolHandlers[name];
                return await handler.execute(args);
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: handleError(error, `tool "${name}"`),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    isValidToolName(name) {
        return name in toolHandlers;
    }
    async start() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error(chalk.green(`${this.config.name} started successfully`));
    }
}
//# sourceMappingURL=server.js.map