const express = require('express');
const jwt = require('jsonwebtoken');
const port = 8000;

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello Everyone'
    })
})


// generate a token
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'augustbatch',
        email: 'aug21@gmail.com'
    }

    jwt.sign({user}, 'SECRET_KEY', function(err, token) {
        res.json({
            token
        })
      });
})

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`)
})