var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();



// Setting View
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', process.cwd() + '/views');

// Setup static access folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//
mongoose.connect('mongodb://localhost/learning-heler');
var Schema = mongoose.Schema;

//
var learningPoints = new Schema({
    title:  String,
    description: String
});


//
mongoose.model('learningPoints', learningPoints);

//
app.get('/', function (req, res) {
    res.render('angular-layout.html',{
        layout: false,
        title: 'Revision Me - Home'
    });
});


//
app.post('/api/v1/learning-points/create', function(req, res) {

    //
    var learningPointsModel = mongoose.model('learningPoints');
    var learningPointForm = new learningPointsModel(req.body);

    //
    learningPointForm.save(function(err, data) {
        res.json({
            status: true,
            data: data
        });
    })
});


//
app.post('/api/v1/learning-points/edit:id', function(req, res) {
    
    //
    var learningPointsModel = mongoose.model('learningPoints');

    //
    learningPointsModel.update({
        _id: req.params.id
    }, {
        title: req.body.title,
        description: req.body.description
    }).exec(function(err, result) {

        //
        res.json(result);
    });
});


//
app.post('/api/v1/learning-points/get', function(req, res) {

    //
    var learningPointsModel = mongoose.model('learningPoints');

    //
    learningPointsModel.find({}).exec(function(err, data) {
        res.json(data);
    });
});


//
app.listen(process.env.PORT || 3000, function () {
  console.log('Ready');
});
