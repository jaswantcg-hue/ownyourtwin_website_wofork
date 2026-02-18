/**
 * Chat API Endpoint
 * 
 * Handles chat message requests and generates responses using the LLM service.
 * Supports both real LLM calls and mock mode (default).
 * 
 * POST /api/chat
 * Body: { messages: ChatMessage[] }
 * Response: { content: string, model: string, provider: string }
 */

import { json, type RequestHandler } from '@sveltejs/kit';
import { createChatCompletion, getTwinSystemPrompt, type ChatMessage } from '$lib/services/llm';

/**
 * POST /api/chat
 * 
 * Generate a response to a conversation.
 * The system prompt is automatically prepended to establish twin personality.
 */
export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const userMessages: ChatMessage[] = body.messages || [];

        if (!userMessages.length) {
            return json({ error: 'No messages provided' }, { status: 400 });
        }

        // Build the full message array with system prompt
        const messages: ChatMessage[] = [
            getTwinSystemPrompt(),
            ...userMessages,
        ];

        // Generate completion using LLM service
        // This will use mock mode by default, or real API if configured
        const response = await createChatCompletion(messages);

        return json({
            content: response.content,
            model: response.model,
            provider: response.provider,
            usage: response.usage,
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
};
