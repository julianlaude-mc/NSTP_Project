import { Router } from 'express';
import { getCached, invalidateKeys, setCached } from '../cache/cacheStore.js';
import { strictWriteLimiter } from '../middleware/rateLimit.js';
import { publishEvent } from '../services/eventBus.js';
import { getModule, listModules, updateModule } from '../services/mockDb.js';

const router = Router();

router.get('/', async (req, res) => {
  const cacheKey = 'module:list:v1';
  const cached = await getCached(cacheKey);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  const modules = await listModules();
  await setCached(cacheKey, modules);
  res.setHeader('X-Cache', 'MISS');
  return res.json(modules);
});

router.get('/:id', async (req, res) => {
  const cacheKey = `module:detail:${req.params.id}:v1`;
  const cached = await getCached(cacheKey);
  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(cached);
  }

  const moduleRecord = await getModule(req.params.id);
  if (!moduleRecord) {
    return res.status(404).json({ error: 'Module not found' });
  }

  await setCached(cacheKey, moduleRecord);
  res.setHeader('X-Cache', 'MISS');
  return res.json(moduleRecord);
});

router.put('/:id', strictWriteLimiter, async (req, res) => {
  const updated = await updateModule(req.params.id, req.body || {});
  if (!updated) {
    return res.status(404).json({ error: 'Module not found' });
  }

  await invalidateKeys([
    'module:list',
    `module:detail:${req.params.id}`,
  ]);

  publishEvent('module.updated', {
    moduleId: updated.id,
    updatedAt: updated.updatedAt,
  });

  return res.json(updated);
});

export default router;
