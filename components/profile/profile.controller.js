const renderProfile = (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('profile', { user: req.user });
    } else {
        res.redirect('/login');
    }
}
module.exports = { renderProfile };