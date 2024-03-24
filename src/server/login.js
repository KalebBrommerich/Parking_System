const express = require('express');
const router = express.Router();
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "1234"
  });
  

  
// Dummy user database (replace with your actual user authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Route to handle login requests
router.post('/login', async (req, res) => {

    // con.connect(function(err) { 
    //     if (err){
    //         console.log(err);
    //     }else console.log("Connected!");
    //   });
    console.log('entered login')
    const { username, password } = req.body;
    console.log(username + password);
    // Check if the user exists in the dummy user database
    try
    {
        //await con.connect(mysql);
        con.query("use Parking;");
        const sqlResult = con.query(`
        select * from login
        where (username = '${username}') and (password = '${password}');
        `, function (err, result) {
            if (err) console.log("errorsql")
            else if(result.length > 0){
                console.log("good query pass found")
                const token = generateToken(username);
                res.status(200).json({ success: true, token });
            }
            else{
            console.log("good query pass not found")
            res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
            console.log(result);
            
          });
          console.log("SQL: "+sqlResult)
          console.log("Password: "+ user)
          console.log("Test: "+ test)
        
        }
    catch(error)
    {
        console.log("Error sql" + error)

    }
    if (user) {
        // Generate and return a JWT token 
        
    } else {
       
    }
    
});

// Dummy token generation function 
function generateToken(user) {
    return user;
}

module.exports = router;
