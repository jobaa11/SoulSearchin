const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const db = await mongoose.connection;
        db.on('connected', function () {
            console.log(`Connected to ${db.name} MongoDB at ${db.host}:${db.port}`);
        });
    } catch (err) {
        console.error(err)
    }
})();


