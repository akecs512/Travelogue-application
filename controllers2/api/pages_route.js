const router = require('express').Router();
const path = require('path');
const User  = require('../../models/Users');

// The `/api/pages` endpoint

router.get('/', (req, res) => {
  res.render('login', {});
});

// CREATE new user
router.post('/', async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

     // res.render(dbUserData);
     res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;