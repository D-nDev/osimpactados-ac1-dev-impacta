import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: ((process.env.RATE_LIMIT_WINDOW_MINUTES as unknown as number) ?? 20) * 60 * 1000,
  max: (process.env.RATE_LIMIT_MAX_REQUESTS as unknown as number) ?? 150,
  standardHeaders: true,
  message: { statusCode: 429, error: 'Too many requests, please try again later.' },
  legacyHeaders: false,
});
