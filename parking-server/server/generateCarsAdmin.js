const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const accessDB = require('./Database/accessDB');
const tokenValidator = require('./validateUserToken');


router.post('/genCarsAdmin', async (req, res) => {
  console.log('Generating cars admin...')
  const {token} = req.body;
  const validation = tokenValidator.validateToken(token);
  
  if (!validation) { // invalid token
    res.status(401).json({ success: false, message: 'Invalid token' });
    return;
  }

  const username = validation.username;

  if (username !== 'admin') { // if user is noot admin
    res.status(401).json({ success: false, message: 'Invalid token' });
    return;
  }

  //console.log(username)
  sqlResult = await accessDB.accessDB(`select * from cars;`);
  console.log(sqlResult)
  res.send(JSON.stringify(sqlResult))
});
         
module.exports = router;
