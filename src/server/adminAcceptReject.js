const express = require('express');
const router = express.Router();
const mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "1234"
});

//req needs to be sql info to be transferred
router.post('/accept', async (req, res) => {
  con.query("use Parking;");
  console.log(req.body)
  const { username, plate, make, model, color, state, permitNum } = req.body
  console.log(1, username, plate, make, model, color, state, permitNum)

  sqlResult = await new Promise((resolve, reject) => {
    con.query(`insert into acceptedCars values
        ('${username}','${plate}','${make}','${model}','${color}','${state}', '${permitNum}');`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
        con.query(`delete from pendingCars where
        username='${username}' and plate='${plate}' and make='${make}' and model='${model}'and color='${color}'and state='${state}'and permitNum='${permitNum}'`
            , (err, result) => {
              if (err) {
                reject(err);
              }
              else {
                resolve(result);
              }
            });
        }
      });
  });
});

//req needs to be sql info to be transferred
router.post('/reject', async (req, res) => {
  con.query("use Parking;");
  const { username, plate, make, model, color, state, permitNum } = req.body
  sqlResult = await new Promise((resolve, reject) => {
    con.query(`insert into rejectedCars values
        ('${username}','${plate}','${make}','${model}','${color}','${state}', '${permitNum}');`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
        con.query(`delete from pendingCars where
        username='${username}' and plate='${plate}' and make='${make}' and model='${model}'and color='${color}'and state='${state}'and permitNum='${permitNum}'`
            , (err, result) => {
              if (err) {
                reject(err);
              }
              else {
                resolve(result);
              }
            });
        }
      });
  });
});

//req needs to be sql info to be transferred
router.post('/rejectToAccept', async (req, res) => {
  con.query("use Parking;");
  const { username, plate, make, model, color, state, permitNum } = req.body
  sqlResult = await new Promise((resolve, reject) => {
    con.query(`insert into acceptedCars values
        ('${username}','${plate}','${make}','${model}','${color}','${state}', '${permitNum}');`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
        con.query(`delete from rejectedCars where
        username='${username}' and plate='${plate}' and make='${make}' and model='${model}'and color='${color}'and state='${state}'and permitNum='${permitNum}'`
            , (err, result) => {
              if (err) {
                reject(err);
              }
              else {
                resolve(result);
              }
            });
        }
      });
  });
});

//req needs to be sql info to be transferred
router.post('/acceptToReject', async (req, res) => {
  con.query("use Parking;");
  const { username, plate, make, model, color, state, permitNum } = req.body
  sqlResult = await new Promise((resolve, reject) => {
    con.query(`insert into rejectedCars values
        ('${username}','${plate}','${make}','${model}','${color}','${state}', '${permitNum}');`
      , (err, result) => {
        if (err) {
          reject(err);
        }
        else {
        //only execute this query if we succesfully inserted into the accepted table
        con.query(`delete from acceptedCars where
        username='${username}' and plate='${plate}' and make='${make}' and model='${model}'and color='${color}'and state='${state}'and permitNum='${permitNum}'`
            , (err, result) => {
              if (err) {
                reject(err);
              }
              else {
                resolve(result);
              }
            });
        }
      });
  });
});

module.exports = router;
