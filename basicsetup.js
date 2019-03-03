// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


//======================Segundo PASO

// server.js

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();  
            // get an instance of the express Router
//desde aqui
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
//hasta aqui

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


//=================Tercer PASO

// more routes for our API will happen here

// on routes that end in /personas
// ----------------------------------------------------
router.route('/personas')

    // create a bear (accessed at POST http://localhost:8080/api/personas)
    .post(function(req, res) {

        var persona = new Persona();      // create a new instance of the Persona model
       	persona.nombre = req.body.nombre;  // set the personas name (comes from the request)

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


    //========================= Cuarto PASO

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


    //========================Ultimo paso
console.log('Something is happening.');
        //estas 2 lineas son muy importantes para que nuestro server tenga habilitado CORS y podamos recibir peticiones de cualquier fuente
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next(); // make sure we go to the next routes and don't stop here


    //https://www.npmjs.com/package/express-fileupload
    //https://dustinpfister.github.io/2018/06/01/express-session/