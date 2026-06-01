require('dotenv').config();
const mongoose = require('mongoose');

console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);
console.log('URI starts with:', process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 50) : 'undefined');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ Error:', err.message);
    process.exit(1);
  });
