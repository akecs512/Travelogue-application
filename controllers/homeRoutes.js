const router = require("express").Router();
const User = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
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

const { TravelInfo } = require('../models');

// The `/api/travel` endpoint

router.get('/travelogue', async (req, res) => {
 
  try {
    // find all travel info
    const dbtravelData = await TravelInfo.findAll();
    const travelDatas = dbtravelData.map((travel_info) =>
    travel_info.get({plain: true})
    );
    console.log(travelDatas);
    res.render('travelogue', {travelDatas})
      
  } catch(err) {
    // Handle errorsconsole.log(travelDatas)
    res.status(500).json(err);
  }
  }); 

 
 
  router.get('/dashboard', withAuth, async (req, res) => {
    console.log('Before route:', req.session.logged_in);
    try {
      // find all travel info
      const dbtravelData = await TravelInfo.findAll({
          where: {user_id: req.session.user_id}
      });
      const travelDatas = dbtravelData.map((travel_info) =>
      travel_info.get({plain: true}));
      // res.json(travelDatas);
      console.log(travelDatas);
      res.render('dashboard', {travelDatas});
        
    } catch(err) {
      // Handle errorsconsole.log(travelDatas)
      res.status(500).json(err);
    }
    }); 
module.exports = router;
