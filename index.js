const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});



// ExpressJS Configuration

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);




// // connect mongDB
// mongoose.connect(config.get('mongoDBURI'));

// require('./config/passport')(passport);
// require('./app/models/ib');