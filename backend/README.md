# NSTP MERN Backend

This backend is now a MongoDB-ready Express API for the NSTP portal. It can run with MongoDB through `MONGODB_URI`, and it keeps a small local fallback dataset when MongoDB is unavailable so frontend development does not stop.

## What is implemented

- MongoDB/Mongoose-ready data layer for:
  - accounts
  - students
  - modules
  - assessments
  - grades
  - notices
  - support tickets
- Admin summary endpoint for dashboard visualizations.
- Smart caching layer for read-heavy legacy endpoints:
  - Module list and module detail endpoints are cached.
  - Cache hit/miss is exposed via the `X-Cache` response header.
- TTL policy per data shape:
  - `module:list`: 120s
  - `module:detail`: 300s
  - `leaderboard`: 30s
  - `feed`: 45s
  - `user:profile`: 600s
- Instant update handling:
  - On writes, related cache keys are invalidated immediately.
  - Server-Sent Events stream broadcasts updates (`module.updated`, `payment.succeeded`, `follow.created`).
- Rate limiting:
  - Read traffic limiter: 300 requests/minute per IP.
  - Write traffic limiter: 80 requests/minute per IP.
  - Returns HTTP 429 with retry metadata when over limit.

## Routes

- `GET /health`
- `GET /api/nstp/summary/admin`
- `GET /api/nstp/:collection`
- `POST /api/nstp/:collection`
- `GET /api/modules`
- `GET /api/modules/:id`
- `PUT /api/modules/:id`
- `POST /api/payments/charge`
- `POST /api/follows`
- `GET /api/events/stream` (SSE)

## Run

1. Install dependencies from project root:
   - `npm install`
2. Create `backend/.env` from `backend/.env.example` and set `MONGODB_URI`.
3. Start backend:
   - `npm run server`
4. Start backend with watch mode:
   - `npm run server:dev`

## Why this matters for scale

- Caching removes repeated database pressure for hot reads.
- TTL keeps data fresh enough while controlling backend load.
- Write invalidation prevents stale responses after updates.
- SSE gives near-instant UI updates without polling storms.
- Rate limiting protects backend saturation during spikes or abuse.

## Production next steps

- Replace in-memory cache with Redis.
- Add JWT auth + role-based authorization middleware.
- Hash passwords before production use.
- Move SSE to pub/sub fanout (Redis streams, Kafka, or NATS) for multi-instance consistency.
- Add distributed rate limiter (Redis token bucket) to enforce limits across instances.
