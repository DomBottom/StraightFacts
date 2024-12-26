// Dependencies
// ================================================
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Configuring body parser
// ================================================
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Connecting static directory
// ================================================
app.use('/static', express.static(__dirname + '/static'));

// Configuring templates
// ================================================
app.set('views', './views');
app.set('view engine', 'pug');

// Routes
// ================================================
app.get('/', function(req, res){
  res.render('home', {message: 'Welcome to StraightFacts!'})
});

app.post('/', function(req, res){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "straightfactsproject@gmail.com",
      pass: ""
    }
  });
  const mailFields = {
    to: req.body.Email,
    subject: "StraightFact of the Day",
    text: req.body.Fact
  };
  transporter.sendMail(mailFields, function(error, data){
    if (error){
      console.log(error);
    } else {
      console.log('Email sent: ' + data.response);
    }
  });
});

// Start the server
// ================================================
app.listen(port, hostname, () => console.log(`App listening on port ${port}`));
