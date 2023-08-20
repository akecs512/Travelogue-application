const router = require("express").Router();
const {TravelInfo} = require("../models");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_name: req.session.username,
    });
} catch (err) {
    res.status(500).json(err);
}
});



router.get('/login', (req, res) => {
    try {
        res.render('login', {
          logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/travelogue', withAuth, async (req, res) => {
    try {
     // find all travel info
    const dbtravelData = await TravelInfo.findAll({
      where:{user_id: req.session.user_id}
    });
    const travelDatas = dbtravelData.map((travel_info) =>
    travel_info.get({plain: true})
    );
        // res.render('travelogue', {travelDatas});
        res.render('travelogue', {
          travelDatas,
          logged_in: req.session.logged_in,
          user_name: req.session.username,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // find all travel info
    const latestTravelDataInfo = await TravelInfo.findOne({
      where:{user_id: req.session.user_id},
      order: [['createdAt', 'DESC']],
    });
    if (!latestTravelDataInfo) {
      return res.render('dashboard', {travelDatas: []});
    }
    const latestTravelData = latestTravelDataInfo.get();
   res.render("dashboard", {
    travelDatas: [latestTravelData],
    logged_in: req.session.logged_in,
    user_name: req.session.username,
  });
      
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
  }); 



module.exports = router;
