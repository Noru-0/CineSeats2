const mongoose = require('mongoose');
const userDBConnection = require('../../config/userDBConnection');
const { faker } = require('@faker-js/faker');

const userSchema = new mongoose.Schema({
    // Profile
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    birthday: Date,
    country: String,
    address: String,
    theater: String,
    avatar_url: String,

    // Account
    id: String,
    username: String,
    password: String,
    accumulated_points: Number,
    level: String,
    notifications: Array,
    history: Array,
    vouchers: Array,
    role: {
        type: String,
        default: 'user'
    }
});

const User = userDBConnection.model('User', userSchema);

const getUserData = async (userId) => {
    try {
        const user = await User.findOne(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

// Function to create random user data
const createRandomUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+84 #########'), // Adjust format as needed
        birthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
        country: faker.location.country(),
        address: faker.location.streetAddress(),
        theater: faker.word.words(2),
        avatar_url: faker.image.avatar(),

        id: faker.string.uuid(),
        username: faker.person.firstName(),
        password: faker.internet.password(),
        accumulated_points: faker.number.int({ min: 0, max: 1000 }),
        level: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum']),
        notifications: [
            { title: faker.lorem.words(3), date: faker.date.recent(), read: false },
            { title: faker.lorem.words(3), date: faker.date.recent(), read: true },
        ],
        history: [
            { movie: faker.word.words(2), date: faker.date.past() },
            { movie: faker.word.words(2), date: faker.date.past() },
        ],
        vouchers: [
            { code: faker.string.uuid(), discount: faker.number.int({ min: 5, max: 50 }) },
            { code: faker.string.uuid(), discount: faker.number.int({ min: 5, max: 50 }) },
        ],
    };
};

// Function to insert random user data into MongoDB
const insertRandomData = async (count = 10) => {
    try {
        const users = Array.from({ length: count }, createRandomUserData); // Generate `count` users
        await User.insertMany(users);
        console.log(`${count} random users inserted successfully!`);
    } catch (error) {
        console.error('Error inserting random data:', error);
    }
};

module.exports = { getUserData, User, insertRandomData };
