const mongoose = require('mongoose');

const movieDBConnection = mongoose.createConnection(process.env.MONGO_URI_MOVIEDB)

movieDBConnection.on('connected', () => {
    console.log('Connected to MovieDB');
});

movieDBConnection.on('error', (err) => {
    console.log('Error connecting to MovieDB', err);
});

module.exports = movieDBConnection;