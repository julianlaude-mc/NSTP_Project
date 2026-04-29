import { Router } from 'express';
import { strictWriteLimiter } from '../middleware/rateLimit.js';
import { publishEvent } from '../services/eventBus.js';
import { chargePayment } from '../services/mockDb.js';

const router = Router();

router.post('/charge', strictWriteLimiter, async (req, res) => {
  const { userId, amount, currency = 'PHP' } = req.body || {};

  if (!userId || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid payment payload' });
  }

  const payment = await chargePayment({ userId, amount, currency });

  // Payments must never be stale-cached by downstream proxies.
  res.setHeader('Cache-Control', 'no-store');

  publishEvent('payment.succeeded', {
    paymentId: payment.id,
    userId,
    amount,
    currency,
    createdAt: payment.createdAt,
  });

  return res.status(201).json(payment);
});

export default router;
