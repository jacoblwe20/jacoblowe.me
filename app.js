
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.locals.title = "Jacob Lowe";
app.locals.tagline = "Expanding the nature of the web.";
app.locals.content = 'I build things. I am younge developer based out of the IE. HTML 5 and other web technologies (eg:node.js, angular.js), are my passions and I continue to push the bar with these technologies. I am currently the co-organizer of <a href="http://riversidejs.org">riverside.js</a>, and also a member of <a href="http://riverside.io">riverside.io</a>.';


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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/v1/projects', routes.api.projects);
app.get('/v1/groups', routes.api.groups);
app.get('/v1/contact-info', routes.api.contact);
app.get('/v1/about', function(req, res){
  res.json({results:[{
    name : 'About',
    desc : {p:app.locals.content},
    icon : 'icon-user',
    link : '#'
  }], success: true});
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
