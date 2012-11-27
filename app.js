
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request')
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

      app.locals.title = user.name;
      app.locals.image = user.profile_image_url;
      app.locals.location = user.location;
      app.locals.update = result.text;

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
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/resume', function(req, res){
  var body = require('./resume.json');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', body.length);
  res.end(body.content)
})
app.get('/users', user.list);
app.get('/v1/projects', routes.api.projects);
app.get('/v1/groups', routes.api.groups);
app.get('/v1/contact-info', routes.api.contact);
app.get('/v1/about', function(req, res){
  res.json({
    title : 'About Me',
    results:[{
      name : 'Just a snippet',
      desc : {p:'I build things. I am younge developer based out of the IE. The web is my passion and I continue to push the bar with web technologies. I am currently the co-organizer of <a href="http://riversidejs.org">riverside.js</a>, and also a member of <a href="http://riverside.io">riverside.io</a>. Proud to be a linux user!'},
      icon : 'icon-user',
      link : '#'
    },
    {
      name : 'Scripts I Know',
      desc : {p:'<ul>\
        <li>Javascript\
        <li>CSS\
        <li>HTML (All Versions)\
        <li>PHP\
        <li>Ruby\
        <li>Regular Expressions\
      </ul>'},
      icon : 'icon-cog',
      link : '#'
    },
    {
      name : 'I currently work @ iShieldz',
      icon : 'icon-briefcase',
      link : 'http://ishieldz.com'
    },
    {
      name : 'My Resume',
      icon : 'icon-book',
      link : '/resume'
    }
  ], success: true});
});
app.get('/v1/twitter', routes.api.twitter);
app.get('/v1/blog', routes.api.blog);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
