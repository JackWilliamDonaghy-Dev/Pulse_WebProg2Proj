import {env} from '../config/env';

import mongoose from 'mongoose';
import { PersonModel } from '../models/people';

const uri = env.mongoURI ;

export const connectDB = async (): Promise<void> => {
  try {
    console.log(`Connecting to MongoDB at your uri`);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected (Mongoose): ${conn.connection.host}`);
    console.log("Database name:", conn.connection.name);
    console.log("Database host:", conn.connection.host);
    console.log("People collection:", PersonModel.collection.name);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();

  
}