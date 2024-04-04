const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "1234"
});

//req needs to be sql info to be transferred
router.post('/accept', async (req, res) => {
  console.log('Accept admin...')
  const {token, user, plate} = req.body;
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

  con.query("use Parking;");
  console.log(plate + " " + user);
  sqlResult = await new Promise((resolve, reject) => {
    con.query(`UPDATE cars SET status = 'accepted' WHERE plate = '${plate}' AND username = '${user}'`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
          resolve(result);
        }
      });
  });
  res.send(JSON.stringify(sqlResult));
});

//req needs to be sql info to be transferred
router.post('/reject', async (req, res) => {
  console.log('Accept admin...')
  const {token, user, plate} = req.body;
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

  con.query("use Parking;");
  console.log(plate + " " + user);
  sqlResult = await new Promise((resolve, reject) => {
    con.query(`UPDATE cars SET status = 'denied' WHERE plate = '${plate}' AND username = '${user}'`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
          resolve(result);
        }
      });
  });
  res.send(JSON.stringify(sqlResult));
});

module.exports = router;
