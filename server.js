var express = require('express')
  , logger = require('morgan')
  , app = express()
  , template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

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
    res.sendFile(__dirname + '/patients.html')
  } catch (e) {
    next(e)
  }
})

app.post('/patients', function (req, res, next) {
  try {
     console.log("post info in patient page");
     console.log(req.body);
    res.sendFile(__dirname + '/patients_login.html')
  } catch (e) {
    next(e)
  }
})

app.get('/physicians', function (req, res, next) {
  try {
     console.log("Get info in patient page");
    res.sendFile(__dirname + '/PhysicianSignUp.html')
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

app.listen(process.env.PORT || 2017, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 2017))
})
