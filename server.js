var express = require("express"); //Node module
var path = require("path");
var pg = require("pg"); //Node module

var app = express();
app.use(express.static(__dirname + '/public'));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server. 
pg.connect(process.env.DATABASE_URL, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

//Placeholder Password: 5f4dcc3b5aa765d61d8327deb882cf99


// LOGIN API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

 app.get("/contacts", function (request, response) {
    response.send("hello world");
    /*db.query('SELECT * FROM users', function(err, result) {
      done();
      if (err)
       { handleError(res, err.message, "Failed to get contacts."); }
      else
       { res.status(200).json(result); }
    });*/

});