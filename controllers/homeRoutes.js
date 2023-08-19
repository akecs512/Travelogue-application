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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
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

    res.render('travelogue', {travelDatas})
      
  } catch(err) {
    // Handle errorsconsole.log(travelDatas)
    res.status(500).json(err);
  }
  }); 


router.get("/dashboard", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("dashboard");
});

module.exports = router;
