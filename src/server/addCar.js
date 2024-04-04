const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "1234"
});

//because the records of all changes should be stored, insert a new entry for each
router.post('/add', async (req, res) => {
    const {token, plate, make, model, color, state, permitNum } = req.body;
    
    // validate user:
    const validation = tokenValidator.validateToken(token);
    if (!validation) { // invalid token
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }
    
    const username = validation.username;

    con.query("use Parking;");
    
    sqlResult =  await new Promise((resolve, reject) => {
        con.query(`insert into cars values ('${username}','${plate}','${make}','${model}','${color}','${state}','${permitNum}','pending');`
        , (err, result) => {
            if (err) {
              reject(err);
            }
            else {
              resolve(result);
            }
        });    
    }).then(
      (result) => {
        res.sendStatus(200);
      },
      (error) => {
        res.status(401).json({ success: false, message: 'Duplicate entry' });
      }
    );
});
  

module.exports = router;
