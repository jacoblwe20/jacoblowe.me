
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , moment = require('moment')
  , twt_u = 'jacob2dot0'
  , githubUser = 'jacoblwe20';



var app = express();

app.locals.title = "Jacob Lowe";
app.locals.image = "https://si0.twimg.com/profile_images/3271414482/369578ab95444f013b7a81968e028233_bigger.jpeg";
app.locals.location = "";
app.locals.update = "<small>Twitter has changed their api yeah! *sarcasm*</small>";


request('https://api.github.com/users/' + githubUser + '/events', function( err, res, body ){
  if( !err && res.statusCode == 200 ){
    var 
    event = JSON.parse( body )[ 5 ],
    actor = event.actor,
    payload = event.payload,
    date = moment(event.created_at, "YYYY-MM-DD HH:mm:ss ");
    // date = moment(event.created_at, "ddd MMM DD HH:mm:ss Z YYYY");
    //"2013-07-17T13:51:08Z"

    app.locals.update = "<small>" +
      date.fromNow() +
      "</small><br />";

    if( event.type === "FollowEvent" ){
      var target = payload.target;
      app.locals.update += 'Started following ' + target.html_url;
    }

    if( event.type === "IssueCommentEvent" ){
      var comment = payload.comment;
      app.locals.update += comment.body + " " + comment.url;
    }

    if( event.type === "WatchEvent" ){
      var repo = event.repo;
      app.locals.update += "Started watching " + repo.url;
    }

    if( event.type === "PushEvent" ){
      var commit = payload.commits[ 0 ];
      app.locals.update += commit.message + " " + commit.url;
    }


    app.locals.update += "<br/><br/><small>on Github</small>"

    app.locals.image = actor.avatar_url;
    //console.log( events.length )

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
