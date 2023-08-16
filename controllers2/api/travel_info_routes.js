const router = require('express').Router();
const { TravelInfo, User } = require('../../models');

// The `/api/travel` endpoint

router.get('/', async (req, res) => {
  try{
    // find all travel info
    const travelData = await TravelInfo.findAll({
      // include:[
      //   {
      //     model: User,
      //   }
      // ]
      });
      res.render('travel', {travelData});
  }catch(err) {
    // Handle errors
    res.status(500).json(err);
  }
  });

  module.exports = router;