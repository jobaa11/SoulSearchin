const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
// console.log(db.name)

db.on('connected', function() {
    console.log(`Connected to ${db.name} MongoDB at ${db.host}:${db.port}`);
});