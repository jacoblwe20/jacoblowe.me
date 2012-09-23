
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
app.locals.content = 'Faworki soufflé chupa chups tootsie roll. Cake sugar plum dessert croissant pie marshmallow sugar plum cheesecake lollipop. Topping liquorice wypas. Candy canes tiramisu faworki apple pie pudding macaroon sesame snaps. Pudding marzipan lollipop. Biscuit donut sesame snaps gummies toffee gummies dragée wafer. Candy chupa chups cake croissant apple pie. Sweet macaroon candy canes icing. Wafer cookie gummi bears fruitcake jelly-o bear claw liquorice topping. Gummi bears jelly lollipop dessert gingerbread jujubes jelly wypas.Cheesecake cookie candy canes icing tiramisu jujubes gingerbread cupcake. Gingerbread dragée applicake icing macaroon macaroon pastry wafer. Sweet roll wafer sweet roll lollipop oat cake sweet macaroon ice cream. Gummies cupcake icing cookie cookie gummies. Apple pie toffee liquorice dessert faworki jelly beans sugar plum sweet. Caramels wypas jelly beans pastry halvah. Tiramisu cupcake cheesecake biscuit chupa chups lollipop candy canes donut tootsie roll. Sweet roll sweet roll sugar plum wypas toffee chocolate bar candy canes fruitcake bear claw. Caramels sesame snaps macaroon cookie tootsie roll faworki.Faworki soufflé chupa chups tootsie roll. Cake sugar plum dessert croissant pie marshmallow sugar plum cheesecake lollipop. Topping liquorice wypas. Candy canes tiramisu faworki apple pie pudding macaroon sesame snaps. Pudding marzipan lollipop. Biscuit donut sesame snaps gummies toffee gummies dragée wafer. Candy chupa chups cake croissant apple pie. Sweet macaroon candy canes icing. Wafer cookie gummi bears fruitcake jelly-o bear claw liquorice topping. Gummi bears jelly lollipop dessert gingerbread jujubes jelly wypas.Cheesecake cookie candy canes icing tiramisu jujubes gingerbread cupcake. Gingerbread dragée applicake icing macaroon macaroon pastry wafer. Sweet roll wafer sweet roll lollipop oat cake sweet macaroon ice cream. Gummies cupcake icing cookie cookie gummies. Apple pie toffee liquorice dessert faworki jelly beans sugar plum sweet. Caramels wypas jelly beans pastry halvah. Tiramisu cupcake cheesecake biscuit chupa chups lollipop candy canes donut tootsie roll. Sweet roll sweet roll sugar plum wypas toffee chocolate bar candy canes fruitcake bear claw. Caramels sesame snaps macaroon cookie tootsie roll faworki.';


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
