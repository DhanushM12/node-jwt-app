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

    jwt.sign({user}, 'SECRET_KEY', { expiresIn: '60s'}, function(err, token) {
        res.json({
            token
        })
      });
})


app.post('/api/verify', takeToken, (req, res) => {

    jwt.verify(req.token, 'SECRET_KEY', function(err, data) {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'User access granted',
                data
            })
        }
    });
})


// format of token
// Authorization: Bearer token
function takeToken(req, res, next){
    const bearerHeader = req.headers['authorization']; //  Bearer token

    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');// array ['bearer', 'token']
        const bearerToken = bearer[1]; // token
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`)
})