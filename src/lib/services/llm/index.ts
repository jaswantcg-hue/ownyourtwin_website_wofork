/**
 * LLM Service
 * 
 * Main entry point for LLM (Large Language Model) integration.
 * Supports multiple providers: OpenAI, Gemini, and Claude.
 * 
 * Features:
 * - Unified interface for all providers
 * - Mock mode for development (default)
 * - Easy switching between providers via environment variables
 * - Comprehensive error handling with fallback to mock
 * 
 * @example
 * ```typescript
 * // Server-side usage (e.g., in +server.ts)
 * import { createChatCompletion } from '$lib/services/llm';
 * 
 * const response = await createChatCompletion([
 *   { role: 'system', content: 'You are a helpful digital twin.' },
 *   { role: 'user', content: 'Hello, how are you?' }
 * ]);
 * 
 * console.log(response.content);
 * ```
 * 
 * Configuration:
 * Set these environment variables in your .env file:
 * - LLM_PROVIDER: 'openai' | 'gemini' | 'claude' (default: 'openai')
 * - USE_REAL_LLM: 'true' | 'false' (default: 'false' - uses mock)
 * - OPENAI_API_KEY: Your OpenAI API key
 * - GEMINI_API_KEY: Your Google AI API key
 * - ANTHROPIC_API_KEY: Your Anthropic API key
 */

import { createLLMConfig, validateConfig, type LLMConfig, type LLMProvider } from './config';
import {
    callOpenAI,
    callGemini,
    callClaude,
    type ChatMessage,
    type ChatCompletionRequest,
    type ChatCompletionResponse
} from './providers';

// -----------------------------------------------------------------
// Re-export types for convenience
// -----------------------------------------------------------------

export type {
    LLMConfig,
    LLMProvider,
    ChatMessage,
    ChatCompletionRequest,
    ChatCompletionResponse
};

// -----------------------------------------------------------------
// Mock Responses
// -----------------------------------------------------------------

/**
 * Generate a contextual mock response
 * 
 * Used when USE_REAL_LLM is false (default) or when API calls fail.
 * Provides realistic-looking responses for development and testing.
 * 
 * @param userMessage - The user's message to respond to
 * @returns A mock response string
 */
function generateMockResponse(userMessage: string): string {
    const responses = [
        `That's really insightful. I notice you mentioned "${userMessage.slice(0, 30)}..." - can you tell me more about what prompted that thought?`,
        "I hear you. How does reflecting on this make you feel right now?",
        "Thank you for sharing that with me. What do you think this reveals about what matters to you?",
        "That's interesting. I'm curious - how has your perspective on this evolved over time?",
        "I appreciate you opening up. Would you like to explore this feeling a bit deeper?",
        "I sense there's more to this story. What else comes to mind when you think about it?",
        "That's a valuable observation about yourself. How might you apply this insight going forward?",
        "I understand. Self-reflection like this is really important for personal growth.",
        "That resonates with patterns I've noticed in our conversations. You seem to value authenticity.",
        "What you're describing sounds meaningful. Let's explore this together.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Create a mock completion response
 * 
 * @param messages - Chat messages (used to extract last user message)
 * @returns Mock ChatCompletionResponse
 */
function createMockCompletion(messages: ChatMessage[]): ChatCompletionResponse {
    // Find the last user message to generate contextual response
    const lastUserMessage = messages
        .slice()
        .reverse()
        .find(m => m.role === 'user');

    return {
        content: generateMockResponse(lastUserMessage?.content || ''),
        model: 'mock-model',
        usage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
        },
        provider: 'openai', // Mock uses openai as placeholder
    };
}

// -----------------------------------------------------------------
// Provider Router
// -----------------------------------------------------------------

/**
 * Route request to the appropriate provider
 * 
 * @param config - LLM configuration
 * @param request - Chat completion request
 * @returns Promise resolving to chat completion response
 */
async function routeToProvider(
    config: LLMConfig,
    request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
    const providerConfig = config.providers[config.provider];

    switch (config.provider) {
        case 'openai':
            return callOpenAI(providerConfig, request);
        case 'gemini':
            return callGemini(providerConfig, request);
        case 'claude':
            return callClaude(providerConfig, request);
        default:
            throw new Error(`Unknown provider: ${config.provider}`);
    }
}

// -----------------------------------------------------------------
// Main API
// -----------------------------------------------------------------

/**
 * Create a chat completion
 * 
 * This is the main function to call for generating LLM responses.
 * It automatically handles:
 * - Loading configuration from environment
 * - Choosing the correct provider
 * - Falling back to mock if real API is disabled or fails
 * 
 * @param messages - Array of chat messages
 * @param options - Optional overrides for model, temperature, maxTokens
 * @returns Promise resolving to ChatCompletionResponse
 * 
 * @example
 * ```typescript
 * const response = await createChatCompletion([
 *   { role: 'system', content: 'You are a helpful assistant.' },
 *   { role: 'user', content: 'What is the meaning of life?' }
 * ]);
 * ```
 */
export async function createChatCompletion(
    messages: ChatMessage[],
    options: Partial<Pick<ChatCompletionRequest, 'model' | 'temperature' | 'maxTokens'>> = {}
): Promise<ChatCompletionResponse> {
    // Load configuration from environment
    const config = createLLMConfig();

    // If mock mode is enabled (default), return mock response
    if (!config.useRealLLM) {
        // Simulate network delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        return createMockCompletion(messages);
    }

    // Validate configuration for real API calls
    const validation = validateConfig(config);
    if (!validation.isValid) {
        console.warn(`LLM Config invalid: ${validation.error}. Falling back to mock.`);
        return createMockCompletion(messages);
    }

    // Create the request
    const request: ChatCompletionRequest = {
        messages,
        ...options,
    };

    try {
        // Route to the appropriate provider
        return await routeToProvider(config, request);
    } catch (error) {
        // Log error and fall back to mock
        console.error('LLM API call failed:', error);
        console.warn('Falling back to mock response');
        return createMockCompletion(messages);
    }
}

/**
 * Create a chat completion with a specific provider
 * 
 * Use this when you need to explicitly specify which provider to use,
 * regardless of the environment configuration.
 * 
 * @param provider - Which provider to use
 * @param messages - Array of chat messages
 * @param apiKey - API key for the provider
 * @param options - Optional overrides
 * @returns Promise resolving to ChatCompletionResponse
 */
export async function createChatCompletionWithProvider(
    provider: LLMProvider,
    messages: ChatMessage[],
    apiKey: string,
    options: Partial<Pick<ChatCompletionRequest, 'model' | 'temperature' | 'maxTokens'>> = {}
): Promise<ChatCompletionResponse> {
    const config = createLLMConfig();
    const providerConfig = {
        ...config.providers[provider],
        apiKey,
    };

    const request: ChatCompletionRequest = {
        messages,
        ...options,
    };

    switch (provider) {
        case 'openai':
            return callOpenAI(providerConfig, request);
        case 'gemini':
            return callGemini(providerConfig, request);
        case 'claude':
            return callClaude(providerConfig, request);
        default:
            throw new Error(`Unknown provider: ${provider}`);
    }
}

/**
 * Get the default system prompt for the digital twin
 * 
 * This prompt establishes the twin's personality and behavior.
 * 
 * @returns System message for the digital twin
 */
export function getTwinSystemPrompt(): ChatMessage {
    return {
        role: 'system',
        content: `You are a thoughtful digital twin assistant for AuraAI, a personal reflection and self-discovery platform. 

Your role is to:
- Help users explore their thoughts and emotions through compassionate dialogue
- Ask insightful, open-ended questions that encourage self-reflection
- Identify patterns in what users share and gently point them out
- Be supportive, non-judgmental, and genuinely curious about the user's experiences
- Keep responses concise but meaningful (2-4 sentences typically)
- Use a warm, friendly tone while maintaining depth

You are NOT:
- A therapist or mental health professional
- Giving medical or clinical advice
- Dismissive of feelings or experiences

Remember: Your goal is to help users understand themselves better through meaningful conversation.`,
    };
}
