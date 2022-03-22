
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');




var monk = require('monk')
var db = monk('127.0.0.1:27017/SSChackathon')

var app = express();


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));;

app.use(function (req, res, next) {
    req.db = db;
    next();
})

app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/public/' + "login.html");
})

app.get('/handleLogin', function (req, res) {
    // access database
    var db = req.db;
    var col = db.get('userList');

    // variable
    var email = req.query.email;
    var password = req.query.password;

    col.find({ email: email }).then((docs) => {
        if (docs.length > 0) {
            if (docs[0].password === password) {
                res.cookie('userID', docs[0]._id, { maxAge: 900000 });
                res.send('login success');
            }
            else {
                res.send('Password is incorrect');
            }
        }
        else {
            res.send('This email is not registered');
        }
    })

})

app.get('/handleLogout', function (req, res) {
    res.clearCookie('userID');
    res.send('logout success');
})


app.get('/handleRegister', function (req, res) {
    // access database
    var db = req.db;
    var col = db.get('userList');

    // variable
    var email = req.query.email;
    var password = req.query.password;

    col.find({ email: email }).then((docs) => {
        if (docs.length === 0) {
            col.insert({ email: email, password: password });
            res.send(`
                <div id="registered">
                    <h1 id="registered_heading">Register Success</h1>
                    <button id="registered_button" onclick="location.href='login.html'">Back to Login</button>
                    </br>
                </div>`);
        }
        else {
            res.send('This email have already been registered');
        }
    })

})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
