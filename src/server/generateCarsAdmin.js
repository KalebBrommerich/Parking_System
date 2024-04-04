const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');

var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "1234"
  });

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
  con.query("use Parking;");
  sqlResultPending =  await new Promise((resolve, reject) => {
      //need to do for all tables
      con.query(`select * from cars;`
          , (err, result) => {
              if (err) {
                reject(err);
              }
              else {
                  // result.forEach(r => {
                  //     console.log(r)
                  // });
                resolve(result);
              }
      });    
   });
   
  res.send(JSON.stringify(sqlResultPending))
});
         
module.exports = router;
