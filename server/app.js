const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const post_service =require('./get_post_service');

dotenv.config()

const my_app = express();

my_app.use(cors());
my_app.use(express.json());

// defing the get path for frontend to get the query result
my_app.get('/list', function (request, response){

    // extracting the offset information from the frontend
    const offset = request.query.offset;

    // getting the data from the database using the get_post service
    const res = post_service.get_post(offset);

    // sending the data asynchronously
    res.then(data => response.json(data));
})

my_app.listen(process.env.SERVER_PORT, () => {
    console.log('checking');
})