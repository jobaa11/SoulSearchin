// Load the secrets in the .env module
require('dotenv').config();
// Connect to our database (line of code must be AFTER the above - .env)
require('./config/database');

const Instrument = require('./models/instrument');

async function createInstruments() {
    await Instrument.deleteMany({});
    const instruments = await Instrument.create([
        {name: 'Piano'},
        {name: 'Guitar'},
        {name: 'Percussion'},
        {name: 'Bass'},
        {name: 'Saxophone'},
        {name: 'Trumpet'},
    ])
    console.log('instruments', instruments);
}

createInstruments();