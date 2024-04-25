const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const tokenValidator = require('./validateUserToken');
const accessDB = require('./Database/accessDB');
const sendEmail = require('./sendEmail')

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

  console.log(plate + " " + user);
  try{
    sqlResult = await accessDB.accessDB(`UPDATE cars SET status = 'accepted' WHERE plate = '${plate}' AND username = '${user}'`);
    
    sendEmail.sendEmail(user+'@go.minnstate.edu','Status of your car plate '+ plate + ' has been updated','Your car change has been accepted')
    }catch(error){
      console.log( error)
    }

  // sqlResult = await new Promise((resolve, reject) => {
  //   con.query(`UPDATE cars SET status = 'accepted' WHERE plate = '${plate}' AND username = '${user}'`
  //     , (err, result) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       else {
  //       //only execute this query if we succesfully inserted into the accepted table
  //         sendEmail.sendEmail(username+'@go.minnstate.edu','Status of your ' +make+" "+model+" has been updated",'Your car has been accepted')
  //         resolve(result);
  //       }
  //     });
  // });
  res.send(JSON.stringify(sqlResult));
});

//req needs to be sql info to be transferred
router.post('/reject', async (req, res) => {
  console.log('Reject admin...')
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

  console.log(plate + " " + user);
  try{
    sqlResult = await accessDB.accessDB(`UPDATE cars SET status = 'denied' WHERE plate = '${plate}' AND username = '${user}'`)
    sendEmail.sendEmail(user+'@go.minnstate.edu','Status of your car plate '+ plate + ' has been updated','Your car change has been denied')
    res.send(JSON.stringify(sqlResult));  
  }catch(error){
      console.log( error)
    }
  // sqlResult = await new Promise((resolve, reject) => {
  //   con.query(`UPDATE cars SET status = 'denied' WHERE plate = '${plate}' AND username = '${user}'`
  //     , (err, result) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       else {
  //       //only execute this query if we succesfully inserted into the accepted table
  //         sendEmail.sendEmail(username+'@go.minnstate.edu','Status of your ' +make+" "+model+" has been updated",'Your car has been rejected')
  //         resolve(result);
  //       }
  //     });
  // });
});

module.exports = router;
