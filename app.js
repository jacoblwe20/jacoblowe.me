
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , moment = require('moment')
  , gravatar = require('gravatar')
  , Github = require('github')
  , github = new Github({ version : '3.0.0' })
  , __repos
  , twt_u = 'jacob2dot0';

var app = express();

app.locals.title = "Jacob Lowe";
app.locals.image = gravatar.url("jacoblowe2.0@gmail.com", { s : 100 });
app.locals.location = "";
app.locals.update = "<small>Ouch!</small>";
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
  app.use(function(req, res, next){
    req.__repos = __repos;
    next();
  });
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

github.repos.getFromUser({
  type : 'owner',
  sort : 'created',
  user : 'jacoblwe20'
}, function ( err, repos ) {
  if ( err ) return res.json({ error : err, success : false });
  // switch to map
  repos.forEach(function( repo, index ){
    repos[index].desc = { p : repo.description };
    repos[index].link = repo.html_url;
    if ( repo.fork ) repos[ index ] = null;
  });
  repos = repos.filter(function( n ){ return n;});
  __repos = repos;
    
});
