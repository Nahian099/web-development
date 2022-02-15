const res = require('express/lib/response');
const db= require('./db');

// getting the post data from the database to the backend and sending it to the frontend
async function get_post(offset) {

    // checker for offset parameter
    if (!offset) {
        offset = 0;
    }

    //getting connected to the database
    const my_db = db.get_db_instance();
    const my_conn = my_db.get_conn();

    //querying the database with the offset to fetch the correct batch of data
    let my_query = "SELECT full_name,email FROM orange LIMIT 10 OFFSET " + offset;
    
    //getting the data from the query
    const response = await new Promise((resolve, reject) => {
        my_conn.query(my_query, function(error, results) {
            if (error) {
                reject(error);
            }
            resolve(results);
        })
    })
    
    return response;   
}

module.exports = { get_post }