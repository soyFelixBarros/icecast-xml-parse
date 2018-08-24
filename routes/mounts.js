var express = require('express');
var router = express.Router();

var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
const { exec } = require('child_process');
var icecast = '/etc/icecast2/icecast.xml';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('mounts');
});

// POST method route
router.post('/', function (req, res) {
  add_mount(req.body, icecast);
  res.status(201).json({ status: 'ok' });
})

function add_mount(mount, icecast) {
  // Leer el xml de icecast
  fs.readFile(icecast, 'utf-8', function (err, data) {
    if(err) console.log(err);

    // luego pasamos los datos a nuestro método aquí
    parseString(data, function(err, result) {
      if (err) console.log(err);
      var json = result;

      // Comprobar si hay motajes y la cantidad
      if (typeof json.icecast.mount  !== "undefined") {
        var keys = Object.keys(json.icecast.mount);

        // Agregamos nuevo punto de montaje
        json.icecast.mount[keys.length] = mount;

        // console.log(keys, keys.length);
      } else {
        json.icecast.mount = mount;
      }

      // Crear un nuevo objeto constructor y luego convertir
      // nuestro json vuelve a xml.
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(json);
      
      fs.writeFile(icecast, xml, function(err, data) {
        if (err) console.log(err);

        // Ejectuamos el comando reload de icecast2 para cargar 
        // el xml con el nuevo nuevo punto de montaje.
        exec('/etc/init.d/icecast2 reload');

        // console.log("Actualización xml al archivo :)");
      });
    });
  });
}

module.exports = router;
