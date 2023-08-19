const router = require('express').Router();
const { TravelInfo, User } = require('../../models');

// The `/api/travel` endpoint

router.get('/', async (req, res) => {
  try {
    // find all travel info
    const dbtravelData = await TravelInfo.findAll();
    const travelDatas = dbtravelData.map((travel_info) =>
    travel_info.get({plain: true})
    );
    console.log(travelDatas);
    res.status(200).json(travelDatas)
      
  } catch(err) {
    // Handle errorsconsole.log(travelDatas)
    res.status(500).json(err);
  }
  }); 



  router.post('/', async (req, res) => {
    console.log(req.body);
    try { 
      const travelData = await TravelInfo.create({
      destination: req.body.destination,
      note: req.body.note,
      start_date: new Date(req.body.startDate),
      end_date: new Date(req.body.endDate),
    });
    // if the dish is successfully created, the new response will be returned as json
    res.status(200).json(travelData)
  } catch (err) {
    res.status(res.status).json(err);
  }
  });
  

  module.exports = router;