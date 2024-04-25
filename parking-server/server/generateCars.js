const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');
const accessDB = require('./Database/accessDB');


//needs to send the username token
router.post('/genCars', async (req, res) => {
    console.log('Generating cars...')
    const {token} = req.body;
    const validation = tokenValidator.validateToken(token);
    
    if (!validation) { // invalid token
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    const username = validation.username;
  sqlResult = await accessDB.accessDB(`select * from cars where (username = '${username}');`);
  //console.log("Result" + sqlResult)
  res.send(JSON.stringify(sqlResult))
});
         
module.exports = router;
