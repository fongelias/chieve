var express = require("express"); //Node module
var path = require("path");
var pg = require("pg"); //Node module
var crypto = require('crypto'); //Node module


var app = express();
app.use(express.static(__dirname + '/public'));

// Starting the application server. 
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});    

//Placeholder Password, password: 5f4dcc3b5aa765d61d8327deb882cf99


// LOGIN API ROUTES BELOW

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

 app.get("/contacts", function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM users', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.json(result.rows) }
      });
    });
});

app.post()