const express = require('express');
const router = express.Router();
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234"
  });

//needs to send the username token
router.post('/genCars', async (req, res) => {
    console.log('Generating cars...')
    const {username} = req.body; 
    //console.log(username)
    con.query("use Parking;");
    sqlResult =  await new Promise((resolve, reject) => {
        con.query(`select * from carInfo where (username = '${username}');`
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
     })
    res.send(JSON.stringify(sqlResult))
})
         
module.exports = router;
