const router = require('express').Router();
const User  = require('../models');
const withAuth = require('../utils/auth');
const Dish = require('../models/Dish');

router.get('/dish/:id', async (req, res) => {
    try{ 
        const dishData = await Dish.findByPk(req.params.id);
        if(!dishData) {
            res.status(404).json({message: 'No dish with this id!'});
            return;
        }
        const dish = dishData.get({ plain: true });
        res.render('dish', dish);
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
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('travelogue');
});

router.get('/dashboard', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('dashboard');
});

module.exports = router;
