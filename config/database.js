const mongoose = require('mongoose');

// async () => {
    // try {
         mongoose.connect(process.env.DATABASE_URL);
        // await mongoose.connect(process.env.DATABASE_URL);
        const db =  mongoose.connection;
        db.on('connected', function () {
            console.log(`Connected to ${db.name} MongoDB at ${db.host}:${db.port}`);
        });
//     } catch (err) {
//         console.error(err)
//     }
// }


