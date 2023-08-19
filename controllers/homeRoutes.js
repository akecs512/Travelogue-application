const router = require("express").Router();
const {TravelInfo} = require("../models");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
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

router.get('/travelogue', withAuth, async (req, res) => {
// router.get('/travelogue',  (req, res) => {
    console.log("user_id in travel route");
    console.log(req.session);
    try {
     // find all travel info
    const dbtravelData = await TravelInfo.findAll({
      where:{user_id: req.session.user_id}
    });
    const travelDatas = dbtravelData.map((travel_info) =>
    travel_info.get({plain: true})
    );
        res.render('travelogue', {travelDatas});
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
   res.render("dashboard", {travelDatas: [latestTravelData]});
      
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
  }); 



module.exports = router;
