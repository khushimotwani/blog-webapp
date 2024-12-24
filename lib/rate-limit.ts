import { rateLimit } from 'express-rate-limit';
import { NextResponse } from 'next/server';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

export const checkRateLimit = (req: Request) => {
  return new Promise((resolve, reject) => {
    rateLimiter(req as any, NextResponse as any, (result: any) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}; 