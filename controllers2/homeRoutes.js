const router = require('express').Router();
const User  = require('../models');
const withAuth = require('../utils/auth');
const {TravelInfo} = require('../models/');

router.get('/travel/:id', async (req, res) => {
    try{ 
        const travelData = await TravelInfo.findByPk(req.params.id);
        if(!travelData) {
            res.status(404).json({message: 'No travel note with this id!'});
            return;
        }
        const plainTravelInfo = travelData.get({ plain: true });
        res.render('note', plainTravelInfo);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/travelogue', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('travelogue');
});

router.get('/dashboard',  (req, res) => {
    // if (!req.session.loggedIn) {
    //     res.redirect('/login');
    //     return;
    // }
    res.render('dashboard');
});

module.exports = router;
