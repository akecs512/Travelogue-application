const withAuth = (req, res , next) => {
    if (!req.session.logged_in){
        res.redirect('login');
    } else {
        next();
    }
    console.log('After withAuth:', req.session.loggedIn);
};

module.exports = withAuth;