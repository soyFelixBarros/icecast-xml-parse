var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
const { exec } = require('child_process');

class Icecast {
    constructor(path) {
        this.path = path;
        this.parseXml(path);
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data  = value;
    }

    // Parseamos el xml y guardamos la info como un objecto
    parseXml(path) {
        var xml = fs.readFileSync(path, 'utf-8');

        parseString(xml, (err, result) => {
            this.data = result;
        });
    }

    find(key) {
        var obj = this.data;
        return JSON.stringify(obj.icecast.mount[key]);
    }

    add(mount) {
        var obj = this.data;
        var key = 0;
        if (typeof obj.icecast.mount !== "undefined") {
            var keys = Object.keys(obj.icecast.mount);
            key = keys.length;
            // Agregamos nuevo punto de montaje
            obj.icecast.mount[key] = mount;
        } else {
            obj.icecast.mount = mount;
        }
        
        // Crear un nuevo objeto constructor y luego convertir
        // nuestro json vuelve a xml.
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj);
        
        fs.writeFile(this.path, xml, 'utf8', (err) => {
            if (err) throw err;
            // Ejectuamos el comando reload de icecast2 para cargar 
            // el xml con el nuevo nuevo punto de montaje.
            exec('/etc/init.d/icecast2 reload');
        });
        
        return key; 
    }
}

module.exports = Icecast;