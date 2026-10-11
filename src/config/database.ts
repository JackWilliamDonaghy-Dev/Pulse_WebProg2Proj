import {env} from '../config/env';

import mongoose from 'mongoose';
import { PersonModel } from '../models/people';

const uri = env.mongoURI ;

export const connectDB = async (): Promise<void> => {
  try {
    console.log(`Connecting to MongoDB at your uri`);
    const conn = await mongoose.connect(uri, {
    dbName: "WP2Project"
    });
    const collections = await conn.connection.db!.listCollections().toArray();
console.log("Collections:", collections.map(c => c.name));

const count = await PersonModel.countDocuments();
console.log("People count:", count);

const db = conn.connection.db!;

for (const name of ["People", "people", "Interactions", "interactions"]) {
    const count = await db.collection(name).countDocuments();
    console.log(`${name}: ${count} documents`);
}

console.log("Connected database:", conn.connection.name);
console.log("Collection:", PersonModel.collection.name);

const people = await conn.connection.db!
    .collection("People")
    .find({})
    .limit(2)
    .toArray();

console.log("Sample documents:", people);
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