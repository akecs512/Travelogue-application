const router = require('express').Router();
const User  = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/travelogue', withAuth, (req, res) => {
// router.get('/travelogue',  (req, res) => {
    console.log("useer_id in travel route");
    console.log(req.session);
    try {
        res.render('travelogue');
    } catch (err) {
        res.status(500).json(err);
    }
});

//router.get('/dashboard',  withAuth,(req, res) => {
router.get('/dashboard', (req, res) => {
    if (!req.session.logged_in) {
        res.render('login');
        return;
        }
    res.render('dashboard');
});

// router.get('/dashboard', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }
//     res.render('dashboard');
// });

module.exports = router;
