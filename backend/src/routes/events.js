import { Router } from 'express';
import { attachEventClient } from '../services/eventBus.js';

const router = Router();

router.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });

  res.write('event: ready\\ndata: {"ok":true}\\n\\n');
  attachEventClient(res);
});

export default router;
