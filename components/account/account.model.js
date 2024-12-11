const mongoose = require('mongoose');
const userDBConnection = require('../../config/userDBConnection');

const userSchema = new mongoose.Schema({
    //profile
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthday: Date,
    country: String,
    address: String,
    theater: String,
    avatar_url: String,

    //account
    id: String,
    password: String,
    accumulated_points: Number,
    level: String,
    notifications: Array,
    history: Array,
    vouchers: Array,
});

const User = userDBConnection.model('User', userSchema);

const getUserData = async () => {
    try {
        const user = await User.findOne();
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

module.exports = { getUserData, User };
