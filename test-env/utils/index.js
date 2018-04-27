const Mongoose = require('mongoose');

export function connectDB() {
   return new Promise((resolve, reject) => {
     Mongoose.pluralize(null);
     Mongoose.connect(global.__MONGO_URI__);
     const db = Mongoose.connection;
     db.on('error', console.error);
     db.once('open', resolve);
   });
}
