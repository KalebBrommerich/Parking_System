const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "12345678"
})

//query should be a string
//returns results as JSON
async function accessDB(query){
    var sqlResult
    try
    {
        //await con.connect(mysql);
        con.query("use parking;");
        sqlResult = await new Promise((resolve, reject) => {
            //need to do for all tables
            console.log(query)
            con.query(query
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
    }
    catch(error)
    {
        console.log("Error sql" + error)
        return "Error: " + error
    }
    //console.log("Result = "+ JSON.stringify(sqlResult))
    return JSON.stringify(sqlResult)
}
module.exports = {accessDB}