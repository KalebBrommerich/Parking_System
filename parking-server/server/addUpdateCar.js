const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');
const accessDB = require('./Database/accessDB');
const sendEmail = require('./sendEmail')

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
  try{
    sqlResult = await accessDB.accessDB(`insert into cars values ('${username}','${plate}','${make}','${model}','${color}','${state}','${permitNum}','pending');`);
    sendEmail.sendEmail(validation.username+'@go.minnstate.edu','Status of your car plate ' +plate+' has been updated','Your car is currently pending')
    res.send(JSON.stringify(sqlResult))
  } catch(error){
      console.log( error)
    }
    //con.query("use Parking;");
    
    // sqlResult =  await new Promise((resolve, reject) => {
    //   accessDB.accessDB(`insert into cars values ('${username}','${plate}','${make}','${model}','${color}','${state}','${permitNum}','pending');`
    //         , (err, result) => {
    //         if (err) {
    //           reject(err);
    //         }
    //         else {
    //           resolve(result);
    //         }
    //     });    
    // }).then(
    //   (result) => {
    //     res.sendStatus(200);
    //   },
    //   (error) => {
    //     res.status(401).json({ success: false, message: 'Duplicate entry' });
    //   }
    // );
});
  
router.post('/update', async (req, res) => {
  const {token, plate, make, model, color, state, originalLiscense } = req.body;
  
  // validate user:
  const validation = tokenValidator.validateToken(token);
  const username  = validation.username
  if (!validation) { // invalid token
    res.status(401).json({ success: false, message: 'Invalid token' });
    return;
  }

  try{
    sqlResult = accessDB.accessDB(`UPDATE cars SET plate = '${plate}', make = '${make}', model = '${model}', color = '${color}', state = '${state}', status = 'pending' WHERE username = '${username}' AND plate = '${originalLiscense}';`)
    sendEmail.sendEmail(validation.username+'@go.minnstate.edu','Status of your car plate ' +plate+'has been updated','Your car is currently pending')
    res.sendStatus(200);
  }catch(error){
    console.log(error)
    res.status(401).json({ success: false, message: 'Duplicate entry' });
    }
 
});

module.exports = router;
