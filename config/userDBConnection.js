const mongoose = require('mongoose');

const userDBConnection = mongoose.createConnection(process.env.MONGO_URI_USERDB)

userDBConnection.on('connected', () => {
    console.log('Connected to UserDB');
});

userDBConnection.on('error', (err) => {
    console.log('Error connecting to UserDB', err);
});

module.exports = userDBConnection;