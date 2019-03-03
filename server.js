// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://geotest:geotest1234@ds221155.mlab.com:21155/geovannytesting', { useNewUrlParser: true }); // connect to our database

var Persona     = require('./app/models/persona');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    //estas 2 lineas son muy importantes para que nuestro server tenga habilitado CORS y podamos recibir peticiones de cualquier fuente
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");    
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /personas
// ----------------------------------------------------
router.route('/personas')

    // create a bear (accessed at POST http://localhost:8080/api/personas)
    .post(function(req, res) {

        var persona = new Persona();      // create a new instance of the Persona model
       	persona.nombre = req.body.nombre;  // set the personas name (comes from the request)
        persona.apellidos = req.body.apellidos;
        persona.email = req.body.email;
        persona.telefono = req.body.telefono;
        persona.ciudad = req.body.ciudad;
        persona.pais = req.body.pais;

        // save the bear and check for errors
        persona.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Persona creada!' });
        });

    })		//quite el punto y coma y funciono

    // get all the personas (accessed at GET http://localhost:8080/api/personas)
    .get(function(req, res) {
        Persona.find(function(err, personas) {
            if (err)
                res.send(err);
            res.json(personas);
            //res.json({message:'Success', data: personas});
        });
    });

// on routes that end in /personas/:persona_id
// ----------------------------------------------------
router.route('/personas/:persona_id')

    // get the persona with that id (accessed at GET http://localhost:8080/api/personas/:persona_id)
    .get(function(req, res) {
        Persona.findById(req.params.persona_id, function(err, persona) {
            if (err)
                res.send(err);
            res.json(persona);
        });
    })        

    // update the persona with this id (accessed at PUT http://localhost:8080/api/personas/:persona_id)
    .put(function(req, res) {

        // use our persona model to find the persona we want
        Persona.findById(req.params.persona_id, function(err, persona) {

            if (err)
                res.send(err);

            persona.nombre = req.body.nombre;  // update the persona info
            persona.apellidos = req.body.apellidos;
            persona.email = req.body.email;
            persona.telefono = req.body.telefono;
            persona.ciudad = req.body.ciudad;
            persona.pais = req.body.pais;            

            // save the persona
            persona.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Persona updated!' });
            });

        });
    })

    // delete the persona with this id (accessed at DELETE http://localhost:8080/api/personas/:persona_id)
    .delete(function(req, res) {
        Persona.deleteOne({
            _id: req.params.persona_id
        }, function(err, persona) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });   


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);