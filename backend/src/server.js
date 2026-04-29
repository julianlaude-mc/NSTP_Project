import cors from 'cors';
import express from 'express';
import eventsRouter from './routes/events.js';
import followsRouter from './routes/follows.js';
import modulesRouter from './routes/modules.js';
import nstpRouter from './routes/nstp.js';
import paymentsRouter from './routes/payments.js';
import { connectMongo, isMongoReady } from './db/mongo.js';
import { softReadLimiter } from './middleware/rateLimit.js';

const app = express();
const PORT = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'nstp-mern-api', mongo: isMongoReady(), timestamp: new Date().toISOString() });
});

app.use('/api/modules', softReadLimiter, modulesRouter);
app.use('/api/nstp', softReadLimiter, nstpRouter);
app.use('/api/follows', followsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/events', eventsRouter);

app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

await connectMongo();

app.listen(PORT, () => {
  console.log(`NSTP backend listening on http://localhost:${PORT}`);
});
