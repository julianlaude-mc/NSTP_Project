let mongooseModule = null;
let connectionPromise = null;
let mongoReady = false;

export async function connectMongo() {
  if (mongoReady) return true;
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('MONGODB_URI is not set. API will use local fallback data.');
      return false;
    }

    try {
      mongooseModule = await import('mongoose');
      await mongooseModule.default.connect(uri, {
        serverSelectionTimeoutMS: 2500,
      });
      mongoReady = true;
      console.log('MongoDB connected');
      return true;
    } catch (error) {
      console.warn(`MongoDB unavailable: ${error.message}`);
      mongoReady = false;
      return false;
    }
  })();

  return connectionPromise;
}

export function isMongoReady() {
  return mongoReady;
}

export async function getMongoose() {
  if (!mongooseModule) {
    mongooseModule = await import('mongoose');
  }
  return mongooseModule.default;
}
