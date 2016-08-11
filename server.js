var express = require("express"); //Node module
var path = require("path");
var router = express.Router();

var app = express();
app.use(express.static(__dirname + '/public'));


var db = require('./database/db.js');

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
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
router.get('/contacts', db.getAllUsers);

module.exports = router;