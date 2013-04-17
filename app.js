
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , moment = require('moment')
  , twt_u = 'jacob2dot0';



var app = express();

//Make this cachable and hold on to tweets without haveing to make a seperate request
request('http://api.twitter.com/1/statuses/user_timeline.json?count=1&screen_name='+twt_u, function(error, response, body){
  if(error){
      console.log(error);
      callback(error);
  }else if(response.statusCode == 200){
      var result = JSON.parse(body)[0],
        user = result.user;

      console.log('recieved information');
      var date = moment(result.created_at, "ddd MMM DD HH:mm:ss Z YYYY");

      app.locals.title = user.name;
      app.locals.image = user.profile_image_url;
      app.locals.location = user.location;
      app.locals.update = "<small>" +
        date.fromNow() +
        "</small><br />" +
        result.text;

  }
});

app.locals.tagline = "Expanding the nature of the web.";

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(require('connect-assets')());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/:page', routes.index);
app.get('/v1/projects', routes.api.projects);
app.get('/v1/groups', routes.api.groups);
app.get('/v1/contact-info', routes.api.contact);
app.get('/v1/about', routes.api.about);
app.get('/v1/twitter', routes.api.twitter);
app.get('/v1/blog', routes.api.blog);
app.get('/v1/slides', routes.api.slides);
app.get('/v1/404', routes.api._404);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
