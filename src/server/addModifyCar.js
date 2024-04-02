const express = require('express');
const router = express.Router();
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234"
  });

//because the records of all changes should be stored, insert a new entry for each
router.post('/addModify', async (req, res) => {
    con.query("use Parking;");
    const {username, plate, make, model, color, state, permitNum } = req.body
    sqlResult =  await new Promise((resolve, reject) => {
        con.query(`insert into pendingCars values
        ('${username}','${plate}','${make}','${model}','${color}','${state}', '${permitNum});`
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
    res.send(JSON.stringify(sqlResult))
});
  



module.exports = router;
