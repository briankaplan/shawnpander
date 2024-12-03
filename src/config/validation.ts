type ValidationResult = {
  isValid: boolean;
  errors: string[];
}

const requiredEnvVars = {
  // Spotify
  NEXT_PUBLIC_SPOTIFY_CLIENT_ID: 'string',
  SPOTIFY_CLIENT_SECRET: 'string',
  SPOTIFY_REDIRECT_URI: 'string',
  NEXT_PUBLIC_SPOTIFY_ARTIST_ID: 'string',

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: 'string',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'string',

  // Security
  NEXT_PUBLIC_CRYPTO_KEY: 'string',
  TOKEN_ENCRYPTION_ENABLED: 'boolean',
  TOKEN_REFRESH_BUFFER: 'number',
  TOKEN_MAX_REFRESH_ATTEMPTS: 'number',
  TOKEN_REFRESH_RETRY_DELAY: 'number',
} as const;

export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];

  Object.entries(requiredEnvVars).forEach(([key, type]) => {
    const value = process.env[key];

    if (value === undefined) {
      errors.push(`Missing required environment variable: ${key}`);
      return;
    }

    switch (type) {
      case 'boolean':
        if (!['true', 'false'].includes(value.toLowerCase())) {
          errors.push(`${key} must be a boolean (true/false)`);
        }
        break;
      case 'number':
        if (isNaN(Number(value))) {
          errors.push(`${key} must be a number`);
        }
        break;
      case 'string':
        if (value.trim() === '') {
          errors.push(`${key} cannot be empty`);
        }
        break;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
} 