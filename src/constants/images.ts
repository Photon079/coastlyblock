// Image constants for the Forest Guardian platform
// Using reliable Unsplash URLs for consistent image loading
export const IMAGES = {
  // Background images - using verified Unsplash URLs
  FOREST_BACKGROUND: 'https://images.unsplash.com/photo-1653149875526-e2533c6af095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBhZXJpYWwlMjB2aWV3JTIwcml2ZXIlMjBjYW5vcHl8ZW58MXx8fHwxNzU3NTgzMjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
  // Project images - using verified Unsplash URLs
  AMAZON_PROJECT: 'https://images.unsplash.com/photo-1701091490268-2ae3de5f5f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjByYWluZm9yZXN0JTIwcmVzdG9yYXRpb258ZW58MXx8fHwxNzU3NTgzMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  SAHEL_PROJECT: 'https://images.unsplash.com/photo-1624964561619-1d3850b2d9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWhlbCUyMGRlc2VydCUyMHJlZm9yZXN0YXRpb258ZW58MXx8fHwxNzU3NTgzMjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  MANGROVE_PROJECT: 'https://images.unsplash.com/photo-1746474078818-63ed9aed7fd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGNvYXN0YWwlMjByZXN0b3JhdGlvbnxlbnwxfHx8fDE3NTc1MjA0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  MOUNTAIN_PROJECT: 'https://images.unsplash.com/photo-1730470824798-9a50f3a7c752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMHJlc3RvcmF0aW9ufGVufDF8fHx8MTc1NzU4MzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  
  // Fallback background for cases where main background fails
  FOREST_BACKGROUND_FALLBACK: 'https://images.unsplash.com/photo-1728029651352-ca3be8053568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYW5vcHklMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NzU4Nzk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
} as const;

// Backup external URLs (keep for future reference but not used by default)
export const EXTERNAL_IMAGES = {
  FOREST_BACKGROUND: 'https://images.unsplash.com/photo-1653149875526-e2533c6af095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBhZXJpYWwlMjB2aWV3JTIwcml2ZXIlMjBjYW5vcHl8ZW58MXx8fHwxNzU3NTgzMjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  AMAZON_PROJECT: 'https://images.unsplash.com/photo-1701091490268-2ae3de5f5f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjByYWluZm9yZXN0JTIwcmVzdG9yYXRpb258ZW58MXx8fHwxNzU3NTgzMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  SAHEL_PROJECT: 'https://images.unsplash.com/photo-1624964561619-1d3850b2d9c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWhlbCUyMGRlc2VydCUyMHJlZm9yZXN0YXRpb258ZW58MXx8fHwxNzU3NTgzMjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',  
  MANGROVE_PROJECT: 'https://images.unsplash.com/photo-1746474078818-63ed9aed7fd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGNvYXN0YWwlMjByZXN0b3JhdGlvbnxlbnwxfHx8fDE3NTc1MjA0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  MOUNTAIN_PROJECT: 'https://images.unsplash.com/photo-1730470824798-9a50f3a7c752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMHJlc3RvcmF0aW9ufGVufDF8fHx8MTc1NzU4MzI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
} as const;