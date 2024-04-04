const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');

var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "1234"
  });

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

    //console.log(username)
    con.query("use Parking;");
    sqlResultPending =  await new Promise((resolve, reject) => {
        //need to do for all tables
        con.query(`select * from cars where (username = '${username}');`
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
})
         
module.exports = router;
