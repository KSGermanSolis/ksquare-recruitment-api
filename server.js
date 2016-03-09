/**
 * Created by gsolis on 3/8/16.
 */

require('dotenv').config();

var express         = require('express'),
    app             = express(),
    http            = require('http'),
    server          = http.createServer(app),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    expressJwt      = require('express-jwt'),
    cors            = require('cors'),
    whiteListRoutes = require('./config/white_list_routes'),
    path            = require('path'),
    glob            = require('glob'),
    port            = process.env.PORT || 9001;

app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({ secret: process.env.JWT_SECRET }).unless(whiteListRoutes));

//Connect to DB =================================================
mongoose.connect(process.env.DB_URL);

// Require all controllers ======================================
glob.sync('./app/controllers/*.js').forEach(function(file){
  require(path.resolve(file))(app);
});

// Start the server =============================================
server.listen(port);
console.log('App is running at port: ' + port);
