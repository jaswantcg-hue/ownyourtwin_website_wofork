/**
 * LLM Configuration
 * 
 * Configuration options for LLM providers (OpenAI, Gemini, Claude).
 * API keys are read from environment variables.
 * 
 * To configure:
 * 1. Create a .env file in the project root
 * 2. Add your API keys:
 *    - OPENAI_API_KEY=your_openai_key
 *    - GEMINI_API_KEY=your_gemini_key
 *    - ANTHROPIC_API_KEY=your_claude_key
 * 3. Set LLM_PROVIDER to 'openai', 'gemini', or 'claude'
 * 4. Set USE_REAL_LLM=true to enable real API calls
 */

import { env } from '$env/dynamic/private';

// -----------------------------------------------------------------
// Types
// -----------------------------------------------------------------

/**
 * Supported LLM providers
 */
export type LLMProvider = 'openai' | 'gemini' | 'claude';

/**
 * Configuration for each provider
 */
export interface ProviderConfig {
    /** API key for the provider */
    apiKey: string;
    /** Base URL for API requests (optional, uses default if not set) */
    baseUrl?: string;
    /** Default model to use */
    defaultModel: string;
    /** Maximum tokens for responses */
    maxTokens: number;
    /** Temperature for response randomness (0-1) */
    temperature: number;
}

/**
 * Complete LLM configuration
 */
export interface LLMConfig {
    /** Which provider to use */
    provider: LLMProvider;
    /** Whether to use real API calls or mock responses */
    useRealLLM: boolean;
    /** Provider-specific configurations */
    providers: Record<LLMProvider, ProviderConfig>;
}

// -----------------------------------------------------------------
// Default Configuration
// -----------------------------------------------------------------

/**
 * Default models for each provider
 * These are cost-effective models good for general chat
 */
export const DEFAULT_MODELS: Record<LLMProvider, string> = {
    openai: 'gpt-3.5-turbo',
    gemini: 'gemini-pro',
    claude: 'claude-3-haiku-20240307',
} as const;

/**
 * Get API key from environment variables
 * Returns empty string if not configured
 */
function getApiKey(provider: LLMProvider): string {
    switch (provider) {
        case 'openai':
            return env.OPENAI_API_KEY || '';
        case 'gemini':
            return env.GEMINI_API_KEY || '';
        case 'claude':
            return env.ANTHROPIC_API_KEY || '';
        default:
            return '';
    }
}

/**
 * Create the LLM configuration from environment variables
 * 
 * @returns Complete LLM configuration
 */
export function createLLMConfig(): LLMConfig {
    // Determine which provider to use (default: openai)
    const provider = (env.LLM_PROVIDER as LLMProvider) || 'openai';

    // Whether to use real API calls (default: false - use mock)
    const useRealLLM = env.USE_REAL_LLM === 'true';

    return {
        provider,
        useRealLLM,
        providers: {
            openai: {
                apiKey: getApiKey('openai'),
                baseUrl: 'https://api.openai.com/v1',
                defaultModel: DEFAULT_MODELS.openai,
                maxTokens: 500,
                temperature: 0.7,
            },
            gemini: {
                apiKey: getApiKey('gemini'),
                baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
                defaultModel: DEFAULT_MODELS.gemini,
                maxTokens: 500,
                temperature: 0.7,
            },
            claude: {
                apiKey: getApiKey('claude'),
                baseUrl: 'https://api.anthropic.com/v1',
                defaultModel: DEFAULT_MODELS.claude,
                maxTokens: 500,
                temperature: 0.7,
            },
        },
    };
}

/**
 * Validate that the configuration is ready for real API calls
 * 
 * @param config - LLM configuration to validate
 * @returns Object with isValid boolean and optional error message
 */
export function validateConfig(config: LLMConfig): { isValid: boolean; error?: string } {
    if (!config.useRealLLM) {
        // Mock mode doesn't need validation
        return { isValid: true };
    }

    const providerConfig = config.providers[config.provider];

    if (!providerConfig.apiKey) {
        return {
            isValid: false,
            error: `Missing API key for ${config.provider}. Set ${config.provider.toUpperCase()}_API_KEY in .env`,
        };
    }

    return { isValid: true };
}
