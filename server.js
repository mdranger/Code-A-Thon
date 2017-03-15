var express = require('express')
  , logger = require('morgan')
  , bodyParser= require('body-parser')
  , app = express()
  , JingtumSDK = require('jingtum-sdk')
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')

app.use(bodyParser.urlencoded({extended: true}))

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

var fingate = JingtumSDK.FinGate;
fingate.setMode(fingate.DEVELOPEMENT)

app.get('/', function (req, res, next) {
  try {
     //console.log(req);
     console.log("Get info in homepage");
     var html = template({ title: 'Home' })
    // res.sendFile(__dirname + '/index.html')
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.get('/patients', function (req, res, next) {
  try {
     console.log("Get info in patient page");
    res.sendFile(__dirname + '/patients_login.html')
  } catch (e) {
    next(e)
  }
})



app.get('/physicians', function (req, res, next) {
  try {
     console.log("Get info in patient page");
    res.sendFile(__dirname + '/physicians_login.html')
  } catch (e) {
    next(e)
  }
})

app.get('/about', function (req, res, next) {
  try {
    res.sendFile(__dirname + '/about.html')
  } catch (e) {
    next(e)
  }
})

app.post('/patients_login', function (req, res, next) {
  try {
     console.log("post info in patient page");
     console.log(req.body.user_name);
     console.log(req.body.password);
     if ( (req.body.user_name == 'user') || 
      (req.body.public_key == 'jHngNdXaGG4vDCvmTcM3VVskrhoXaj7iUN')){
        if( req.body.password == '111'){
          var wallet = new JingtumSDK.Wallet('ssRdGy4VSvN2jqQ4ro7ksNgBvoBSn');
          wallet.getBalance(function (err, data) {
              if(err) console.log(err);
              else console.log(data);
          });
          res.sendFile(__dirname + '/find_doctors.html')
        }
        else
          res.end('Error: wrong password!');
      }
      else{
        // res.sendFile(__dirname + '/patients_login.html')
        //var html = template({ title: 'Error: user does not exist!' });
        res.send('Error: user does not exist!');
      }
  } catch (e) {
    next(e)
  }
})

app.post('/physicians_login', function (req, res, next) {
  try {
      if ( (req.body.user_name == 'doctor') || 
      (req.body.public_key == 'jDwgntweYx4LqBXeUjewu6dzaB4M3abmeD')){
        if( req.body.password == '111')
          res.sendFile(__dirname + '/find_doctors_with_doctor_names.html')
        else
          res.send('Error: wrong password!');
      }
      else{
        // res.sendFile(__dirname + '/patients_login.html')
        //var html = template({ title: 'Error: user does not exist!' });
        res.sendFile(__dirname + '/PhysicianSignUp.html')
      }
    
  } catch (e) {
    next(e)
  }
})

app.post('/find_results', function (req, res, next) {
  try {
     console.log("post info in find results page");
     console.log(req.body);
     if (req.body)
    res.sendFile(__dirname + '/find_results.html')
  } catch (e) {
    next(e)
  }
})

app.post('/new_physician', function (req, res, next) {
  try {
     console.log("post info in find results page");
     console.log(req.body);
     var wallet = JingtumSDK.FinGate.createWallet();
     console.log(wallet);
     if (req.body){
       res.send('Welcome: Dr.'+req.body.firstname+' '+req.body.lastname+" Your public key is:"+wallet.address);
       // res.send('Your public key is: '+wallet.getAddress());
       // res.send('Your secret key is: '+wallet.getSecret());
     }
    // res.sendFile(__dirname + '/find_results.html')
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 2017, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 2017))
})
