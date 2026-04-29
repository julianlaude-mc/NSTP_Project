import { Router } from 'express';
import { strictWriteLimiter } from '../middleware/rateLimit.js';
import { getAdminSummary, listCollection, upsertCollectionRecord } from '../services/nstpStore.js';

const router = Router();

router.get('/summary/admin', async (req, res) => {
  res.json(await getAdminSummary());
});

router.get('/:collection', async (req, res) => {
  const allowed = ['accounts', 'modules', 'assessments', 'students', 'grades', 'notices', 'supportTickets'];
  if (!allowed.includes(req.params.collection)) {
    return res.status(404).json({ error: 'Unknown collection' });
  }
  res.json(await listCollection(req.params.collection));
});

router.post('/:collection', strictWriteLimiter, async (req, res) => {
  const allowed = ['accounts', 'modules', 'assessments', 'students', 'grades', 'notices', 'supportTickets'];
  if (!allowed.includes(req.params.collection)) {
    return res.status(404).json({ error: 'Unknown collection' });
  }

  const payload = req.body || {};
  const lookup = payload.id
    ? { id: payload.id }
    : payload.studentId
      ? { studentId: payload.studentId }
      : payload.email
        ? { email: payload.email }
        : { id: `${req.params.collection}-${Date.now()}` };
  const record = await upsertCollectionRecord(req.params.collection, lookup, { ...lookup, ...payload });
  res.status(201).json(record);
});

export default router;
