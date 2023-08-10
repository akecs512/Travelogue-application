const router = require('express').Router();
const { TravelInfo, User } = require('../../models');

// The `/api/user` endpoint

router.get('/', async (req, res) => {
    try{
      // find all travel info
      const userInfo = await User.findAll(
        {include:[
          {model: TravelInfo}]
        });
        res.status(200).json(userInfo);
    }catch(err) {
      // Handle errors
      res.status(500).json(err);
    }
})

module.exports = router;