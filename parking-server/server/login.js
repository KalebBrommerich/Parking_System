const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql');
const accessDB = require('./Database/accessDB');
const secretKey = '182397yasdbhp9g1280vu7gyfasdsdoy8bv6q9b7viubsado8231bv7898'; // this is really bad, should be in env, but here for testing


var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234"
  });
  

// Route to handle login requests
router.post('/login', async (req, res) => {
    console.log('entered login')


    const { username, password } = req.body;
    console.log(username + password);
    // Check if the user exists in the dummy user database
    try
    {
    
        const sqlResult = await accessDB.accessDB(`select * from login where (username = '${username}') and (password = '${password}');`);
        console.log("Result4 " + sqlResult)
        //if length is 2 that means empty array, which means not users found
        if (sqlResult.length == 2){
            console.log("good query pass not found")
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        //length != 2 so user found.
        else {
             console.log("pass found")
             const token = generateToken(username);
             res.status(200).json({ success: true, token });
        }
       
        //     }
        //     else{
        //     console.log("good query pass not found")
        //     res.status(401).json({ success: false, message: 'Invalid username or password' });
        //     }
        //     console.log(result);
            
        //   });
        //   console.log("SQL: "+sqlResult)
        //   console.log("Password: "+ user)
        //   console.log("Test: "+ test)
        
        }
    catch(error)
    {
        console.log("Error sql" + error)
    }
});

// Dummy token generation function 
function generateToken(user) {
    const token = jwt.sign({username: user}, secretKey, { expiresIn: '2h' });
    console.log("token: " + token);
    return token;
}

module.exports = router;
