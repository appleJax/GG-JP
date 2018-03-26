// import { MongoClient } from 'mongodb';
import Mongoose from 'mongoose'

const {
  MONGODB_URI: url,
  MONGO_DB:    DB
} = process.env;

Mongoose.pluralize(null);

export function connectDB() {
   return new Promise((resolve, reject) => {
     Mongoose.connect(url);
     const db = Mongoose.connection;
     db.on('error', console.error);
     db.on('disconnect', connectDB);
     db.once('open', resolve);
   });
}
