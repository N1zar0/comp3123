const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  const userData = require('./user.json');
  res.json(userData);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
*/
router.get('/login', (req, res) => {

  const { username, password } = req.query;

  const userData = require('./user.json');

  if (userData.username === username && userData.password === password) {
    res.json({
      status: true,
      message: "User Is valid"
    });
  } else if (userData.username !== username) {
    res.json({
      status: false,
      message: "User Name is invalid"
    });
  } else {
    res.json({
      status: false,
      message: "Password is invalid"
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  const { username} = req.query;
  res.send(`<b>${username} successfully logged out.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));