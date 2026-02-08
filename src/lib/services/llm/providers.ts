/**
 * LLM Providers
 * 
 * Provider-specific implementations for OpenAI, Gemini, and Claude.
 * Each provider implements the same interface for consistent usage.
 * 
 * @example
 * ```typescript
 * const response = await callOpenAI(config, messages);
 * ```
 */

import type { ProviderConfig, LLMProvider } from './config';

// -----------------------------------------------------------------
// Types
// -----------------------------------------------------------------

/**
 * Message format for chat conversations
 */
export interface ChatMessage {
    /** Role of the message sender */
    role: 'system' | 'user' | 'assistant';
    /** Content of the message */
    content: string;
}

/**
 * Request parameters for chat completion
 */
export interface ChatCompletionRequest {
    /** Array of messages in the conversation */
    messages: ChatMessage[];
    /** Model to use (optional, uses default from config) */
    model?: string;
    /** Temperature for randomness (optional, uses default from config) */
    temperature?: number;
    /** Maximum tokens in response (optional, uses default from config) */
    maxTokens?: number;
}

/**
 * Response from chat completion
 */
export interface ChatCompletionResponse {
    /** The generated text response */
    content: string;
    /** Model that was used */
    model: string;
    /** Token usage statistics */
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    /** Provider that was used */
    provider: LLMProvider;
}

// -----------------------------------------------------------------
// OpenAI Provider
// -----------------------------------------------------------------

/**
 * Call OpenAI Chat Completions API
 * 
 * Uses the chat/completions endpoint with the specified model.
 * Supports GPT-3.5-turbo, GPT-4, and other chat models.
 * 
 * @param config - OpenAI provider configuration
 * @param request - Chat completion request parameters
 * @returns Promise resolving to chat completion response
 * @throws Error if API call fails
 */
export async function callOpenAI(
    config: ProviderConfig,
    request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
            model: request.model || config.defaultModel,
            messages: request.messages,
            temperature: request.temperature ?? config.temperature,
            max_tokens: request.maxTokens ?? config.maxTokens,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    return {
        content: data.choices[0]?.message?.content || '',
        model: data.model,
        usage: data.usage ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
        } : undefined,
        provider: 'openai',
    };
}

// -----------------------------------------------------------------
// Gemini Provider
// -----------------------------------------------------------------

/**
 * Call Google Gemini API
 * 
 * Uses the generateContent endpoint. Gemini has a different
 * message format, so we convert from the standard format.
 * 
 * @param config - Gemini provider configuration
 * @param request - Chat completion request parameters
 * @returns Promise resolving to chat completion response
 * @throws Error if API call fails
 */
export async function callGemini(
    config: ProviderConfig,
    request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
    const model = request.model || config.defaultModel;

    // Convert messages to Gemini format
    // Gemini uses 'parts' array instead of 'content' string
    const contents = request.messages
        .filter(msg => msg.role !== 'system') // Gemini handles system differently
        .map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

    // Get system instruction if present
    const systemMessage = request.messages.find(msg => msg.role === 'system');

    const response = await fetch(
        `${config.baseUrl}/models/${model}:generateContent?key=${config.apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents,
                systemInstruction: systemMessage ? { parts: [{ text: systemMessage.content }] } : undefined,
                generationConfig: {
                    temperature: request.temperature ?? config.temperature,
                    maxOutputTokens: request.maxTokens ?? config.maxTokens,
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        model,
        usage: data.usageMetadata ? {
            promptTokens: data.usageMetadata.promptTokenCount || 0,
            completionTokens: data.usageMetadata.candidatesTokenCount || 0,
            totalTokens: data.usageMetadata.totalTokenCount || 0,
        } : undefined,
        provider: 'gemini',
    };
}

// -----------------------------------------------------------------
// Claude Provider
// -----------------------------------------------------------------

/**
 * Call Anthropic Claude API
 * 
 * Uses the messages endpoint with Claude's format.
 * Claude uses 'anthropic-version' header for API versioning.
 * 
 * @param config - Claude provider configuration
 * @param request - Chat completion request parameters
 * @returns Promise resolving to chat completion response
 * @throws Error if API call fails
 */
export async function callClaude(
    config: ProviderConfig,
    request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
    // Extract system message (Claude handles it separately)
    const systemMessage = request.messages.find(msg => msg.role === 'system');
    const messages = request.messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
            role: msg.role,
            content: msg.content,
        }));

    const response = await fetch(`${config.baseUrl}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: request.model || config.defaultModel,
            messages,
            system: systemMessage?.content,
            max_tokens: request.maxTokens ?? config.maxTokens,
            temperature: request.temperature ?? config.temperature,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    return {
        content: data.content?.[0]?.text || '',
        model: data.model,
        usage: data.usage ? {
            promptTokens: data.usage.input_tokens,
            completionTokens: data.usage.output_tokens,
            totalTokens: data.usage.input_tokens + data.usage.output_tokens,
        } : undefined,
        provider: 'claude',
    };
}
