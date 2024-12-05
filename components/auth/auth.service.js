const User = require("./auth.models");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({username});
        if (!user) return done(null, false, {message: 'Incorrect username.'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, {message: 'Incorrect password.'});

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
    User.findOne({username})
        .then(user => done(null, user))
        .catch(err => done(err));
});

function registerHandler(username, email, password, re_password, res) {
    if (!username || !email || !password || !re_password) {
        return res.render('register', {alert: 'Please enter all fields', alertType: 'danger'});
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        return res.render('register', {alert: 'Invalid email', alertType: 'danger'});
    } else if (password.length < 6) {
        return res.render('register', {alert: 'Password must be at least 6 characters', alertType: 'danger'});
    } else if (password !== re_password) {
        return res.render('register', {alert: 'Passwords do not match', alertType: 'danger'});
    } else {
        User.findOne({username}).then(user => {
            if (user) {
                const alertMessage = "Register failed, user already exists!";
                res.render('register', {alert: alertMessage, alertType: 'danger'});
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({username, email, password: hashedPassword});
                    newUser.save().then(user => {
                        const alertMessage = "Register successful!";
                        res.render('register', {alert: alertMessage, alertType: 'success'});
                    }).catch(err => {
                        const alertMessage = "Register failed";
                        res.render('register', {alert: alertMessage, alertType: 'danger'});
                    });
                }).catch(err => {
                    const alertMessage = "Register failed";
                    res.render('register', {alert: alertMessage, alertType: 'danger'});
                });
            }
        }).catch(err => {
            const alertMessage = "Register failed";
            res.render('register', {alert: alertMessage, alertType: 'danger'});
        });
    }
}

module.exports = {registerHandler};