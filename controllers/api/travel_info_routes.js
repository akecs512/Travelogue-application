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

   router.get('/dashboard', async(req, res) => {
    try {
      const response = await fetch('/api/travel');
      const travelDatas = await response.json()
      res.render('dashboard', { travelDatas });
    } catch(err){
    res.status(500).json(err);
  }
   });

  router.post('/', async (req, res) => {
    try { 
      const travelData = await TravelInfo.create({
      destination: req.body.destination,
      note: req.body.note,
      date: new Date(req.body.date),
    });
    // if the dish is successfully created, the new response will be returned as json
    res.status(200).json(travelData)
  } catch (err) {
    res.status(400).json(err);
  }
  });
  

  module.exports = router;