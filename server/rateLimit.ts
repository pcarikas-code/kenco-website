/**
 * Rate Limiting for Contact Form
 * Prevents spam and abuse by tracking submissions per IP and email
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
}

interface RateLimitStore {
  byIP: Map<string, RateLimitEntry>;
  byEmail: Map<string, RateLimitEntry>;
  global: RateLimitEntry;
}

// In-memory store (resets on server restart)
// For production with multiple servers, consider Redis
const store: RateLimitStore = {
  byIP: new Map(),
  byEmail: new Map(),
  global: { count: 0, firstAttempt: Date.now(), lastAttempt: Date.now() },
};

// Rate limit configuration
const RATE_LIMITS = {
  perIP: {
    maxAttempts: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  perEmail: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  global: {
    maxAttempts: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
};

/**
 * Clean up old entries to prevent memory leaks
 */
function cleanupOldEntries() {
  const now = Date.now();
  
  // Clean IP entries
  store.byIP.forEach((entry, ip) => {
    if (now - entry.firstAttempt > RATE_LIMITS.perIP.windowMs) {
      store.byIP.delete(ip);
    }
  });
  
  // Clean email entries
  store.byEmail.forEach((entry, email) => {
    if (now - entry.firstAttempt > RATE_LIMITS.perEmail.windowMs) {
      store.byEmail.delete(email);
    }
  });
  
  // Reset global if window expired
  if (now - store.global.firstAttempt > RATE_LIMITS.global.windowMs) {
    store.global = { count: 0, firstAttempt: now, lastAttempt: now };
  }
}

/**
 * Check if a submission is allowed based on rate limits
 * @param ip - Client IP address
 * @param email - Email from the form
 * @returns Object with allowed status and reason if blocked
 */
export function checkRateLimit(ip: string, email: string): {
  allowed: boolean;
  reason?: string;
  retryAfter?: number;
} {
  cleanupOldEntries();
  
  const now = Date.now();
  
  // Check global rate limit
  if (store.global.count >= RATE_LIMITS.global.maxAttempts) {
    const retryAfter = Math.ceil(
      (store.global.firstAttempt + RATE_LIMITS.global.windowMs - now) / 1000
    );
    return {
      allowed: false,
      reason: "Too many submissions from all users. Please try again later.",
      retryAfter,
    };
  }
  
  // Check IP rate limit
  const ipEntry = store.byIP.get(ip);
  if (ipEntry) {
    if (now - ipEntry.firstAttempt < RATE_LIMITS.perIP.windowMs) {
      if (ipEntry.count >= RATE_LIMITS.perIP.maxAttempts) {
        const retryAfter = Math.ceil(
          (ipEntry.firstAttempt + RATE_LIMITS.perIP.windowMs - now) / 1000
        );
        return {
          allowed: false,
          reason: `Too many submissions from your location. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`,
          retryAfter,
        };
      }
    } else {
      // Window expired, reset
      store.byIP.delete(ip);
    }
  }
  
  // Check email rate limit
  const emailEntry = store.byEmail.get(email.toLowerCase());
  if (emailEntry) {
    if (now - emailEntry.firstAttempt < RATE_LIMITS.perEmail.windowMs) {
      if (emailEntry.count >= RATE_LIMITS.perEmail.maxAttempts) {
        const retryAfter = Math.ceil(
          (emailEntry.firstAttempt + RATE_LIMITS.perEmail.windowMs - now) / 1000
        );
        return {
          allowed: false,
          reason: `Too many submissions with this email address. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`,
          retryAfter,
        };
      }
    } else {
      // Window expired, reset
      store.byEmail.delete(email.toLowerCase());
    }
  }
  
  return { allowed: true };
}

/**
 * Record a successful submission
 * @param ip - Client IP address
 * @param email - Email from the form
 */
export function recordSubmission(ip: string, email: string): void {
  const now = Date.now();
  
  // Record IP
  const ipEntry = store.byIP.get(ip);
  if (ipEntry) {
    ipEntry.count++;
    ipEntry.lastAttempt = now;
  } else {
    store.byIP.set(ip, { count: 1, firstAttempt: now, lastAttempt: now });
  }
  
  // Record email
  const emailLower = email.toLowerCase();
  const emailEntry = store.byEmail.get(emailLower);
  if (emailEntry) {
    emailEntry.count++;
    emailEntry.lastAttempt = now;
  } else {
    store.byEmail.set(emailLower, { count: 1, firstAttempt: now, lastAttempt: now });
  }
  
  // Record global
  store.global.count++;
  store.global.lastAttempt = now;
}

/**
 * Get current rate limit stats (for monitoring/debugging)
 */
export function getRateLimitStats() {
  return {
    ipCount: store.byIP.size,
    emailCount: store.byEmail.size,
    globalCount: store.global.count,
    limits: RATE_LIMITS,
  };
}
