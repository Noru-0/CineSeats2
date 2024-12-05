const mongoose = require('mongoose');
const userDBConnection = require('../../config/userDBConnection');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});
const userModel = userDBConnection.model('user', userSchema);
module.exports = userModel;