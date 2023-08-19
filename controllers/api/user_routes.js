const router = require('express').Router();
const User = require('../../models/Users');

// The `/api/user` endpoint

// CREATE new user

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      console.log ("1111   **************")
      console.log (req.session.user_id);
      console.log (req.session.logged_in)

      res.status(200).json(dbUserData);

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      console.log ("2222   **************")
      console.log (req.session.user_id);
      console.log (req.session.logged_in)

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!',
               alert: "welcome back, user!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // if (req.session.loggedIn) {
    if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;


// router.get('/', async (req, res) => {
//     try{
//       // find all travel info
//       const userInfo = await User.findAll(
//         {include:[
//           {model: TravelInfo}]
//         });
//         res.status(200).json(userInfo);
//     }catch(err) {
//       // Handle errors
//       res.status(500).json(err);
//     }
// })

// module.exports = router;

