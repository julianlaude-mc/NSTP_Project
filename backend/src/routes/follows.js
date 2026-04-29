import { Router } from 'express';
import { strictWriteLimiter } from '../middleware/rateLimit.js';
import { publishEvent } from '../services/eventBus.js';
import { followUser } from '../services/mockDb.js';

const router = Router();

router.post('/', strictWriteLimiter, async (req, res) => {
  const { followerId, targetUserId } = req.body || {};
  if (!followerId || !targetUserId) {
    return res.status(400).json({ error: 'Missing followerId or targetUserId' });
  }

  const followRecord = await followUser({ followerId, targetUserId });

  publishEvent('follow.created', {
    followerId,
    targetUserId,
    totalFollowers: followRecord.totalFollowers,
  });

  return res.status(201).json(followRecord);
});

export default router;
