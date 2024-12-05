const { registerHandler } = require('./auth.service');
const passport = require("passport");

const renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.render("login", { layout: "main" });
};
// Login controller
const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
};


const renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.render("register", { layout: "main" });
}
const register = (req, res) => {
    let { username, email, password, re_password } = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    re_password = re_password.trim();
    registerHandler(username, email, password, re_password, res);
};
const logout = (req, res, next) => { // Include next as a parameter
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });
};

module.exports = { login, register, renderLogin, renderRegister, logout };