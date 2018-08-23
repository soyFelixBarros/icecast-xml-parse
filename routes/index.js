var express = require('express');
var router = express.Router();
var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
const { exec } = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile('/etc/icecast2/icecast.xml', 'utf-8', function (err, data){
    		if(err) console.log(err);
    		// we log out the readFile results    
    		//console.log(data);
    		// we then pass the data to our method here
    		parseString(data, function(err, result){
        		if(err) console.log(err);
        		// here we log the results of our xml string conversion
			var json = result;
			console.log(json.icecast);
			console.log("---");

			var mount = {
				"mount-name": "/example-complex.ogg",
				"username": "othersource",
				"password": "hackmemore"
			};

			// Editando
			json.icecast.mount = mount; 

			// create a new builder object and then convert
        		// our json back to xml.
        		var builder = new xml2js.Builder();
        		var xml = builder.buildObject(json);
        
       			fs.writeFile('/etc/icecast2/icecast.xml', xml, function(err, data){
            			if (err) console.log(err);
				exec('/etc/init.d/icecast2 reload');
            			console.log("successfully written our update xml to file");
        		});

    		});
	});
	res.render('index', { title: 'Express' });
});

module.exports = router;
