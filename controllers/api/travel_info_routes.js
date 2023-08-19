const router = require('express').Router();
const { TravelInfo, User } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/travel` endpoint

// 



router.post('/', async (req, res) => {
  try { 
    console.log('POST Request to /:', req.session.user_id); // Log user_id
    console.log('Request Body:', req.body);
      let traveldata = {...req.body, "user_id":req.session.user_id}
      const travelData = await TravelInfo.create(traveldata);
    // if the post is successfully created, the new response will be returned as json
    res.status(200).json(travelData)
  } catch (err) {
    res.status(400).json(err);
  }
  });

  module.exports = router;