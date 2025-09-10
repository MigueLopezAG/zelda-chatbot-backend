import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

let mongoServer: MongoMemoryServer;

dotenv.config({ path: './.env.test' });

process.env.JWT_SECRET = process.env.JWT_SECRET;
process.env.NODE_ENV = process.env.NODE_ENV;
process.env.MONGODB_URI= process.env.MONGODB_URI 

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});