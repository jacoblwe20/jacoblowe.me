

/*
 * GET home page.
 */

var request = require('request'),
	moment = require('moment'),
	Github = require('github'),
	github = new Github({ version : '3.0.0' }),
	fs = require('fs'),
	tw_user = 'jacob2dot0',
	linkify = function(str){
		return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		}).replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var username = u.replace("@","")
			return u.link("http://twitter.com/"+username);
		}).replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tag = t.replace("#","%23")
			return t.link("http://search.twitter.com/search?q="+tag);
		});
	};

exports.index = function(req, res){
  if(/resume.html/.test(req.params.page)){
  	// I could probably do something cool with this
  	fs.readFile(__dirname + '/../public/resume.html', 'utf8', function(err, text){
        res.send(text);
    });
  }else{
  	res.cookie("__p__", req.params.page);
  	res.render('index');
  }
};


exports.api = {
	groups : function(req, res){
		res.json({
			title : 'Groups & Meetups',
			results : [
				{
					name : "Riverside.io",
					link : "http://riverside.io",
					icon : "icon-suitcase",
					desc : {
						p : 'This is a co-working spot in downtown Riverside, I am one of the founding memebers and am very active with Riverside.io\'s OSS.'
					}
				},
				{
					name : "riverside.js",
					link : "http://riversidejs.org",
					icon : "icon-code",
					desc : {
						p : 'Meetup with local Javascript Developers in the Inland Empire. We are a group of Riverside tech enthusiast, and the group is growing larger everyday. Come join us and together lets learn to build and hack javascript.'
					}
				},
				{
					name : "FoothillsJS",
					link : "http://foothillsjs.nodejitsu.com/",
					icon : "icon-code",
					desc : {
						p : 'We are a group of web technology advocates, that are trying to push the web forward and to inspire people to investing in the web.'
					}
				}
			],
			success : true
		});
	},
	projects : function(req, res){
		// just fetch from github
		console.log( typeof req.__repos );
		if ( req.__repos ) {
			console.log('cache hit')
			return res.json({
				title : 'Projects',
				results : req.__repos,
				success : true
			})
		}
		github.repos.getFromUser({
			type : 'owner',
			sort : 'created',
			user : 'jacoblwe20'
		}, function ( err, repos ) {
			if ( err ) return res.json({ error : err, success : false });
			repos.forEach(function( repo, index ){
				repos[index].desc = { p : repo.description };
				repos[index].link = repo.html_url;
				if ( repo.fork ) repos[ index ] = null;
			});
			repos = repos.filter(function( n ){ return n;});
			res.json({
				title : 'Projects',
				results : repos,
				success : true
			})
		});
	},
	contact : function(req, res){
		res.json({
			title : 'Get In Contact',
			results :[
				{
					name : "Twitter",
					link : "https://twitter.com/#!/jacob2dot0",
					icon : "icon-twitter"
				},
				{
					name : "Github",
					link : "https://github.com/jacoblwe20",
					icon : "icon-github"
				},
				{
					name : 'Google +',
					link : 'https://plus.google.com/102589001946394459745/',
					icon : 'icon-gplus'
				},
				{
					name : 'Codepen',
					link : 'http://codepen.io/jacoblwe20/',
					icon : 'icon-code'
				},
				{
					name : "ping@jacoblowe.me",
					link : "mailto:ping@jacoblowe.me",
					icon : "icon-mail"
				}
			],
			success : true
		});

	},
	about : function(req, res){
		res.json({
		    title : 'About Me',
		    results:[{
		      name : 'Just a snippet',
		      desc : {
		        p:'I make things. I am developer based out of the Inland Empire. The web is my passion and I continue to push the bar with web technologies. I am currently the co-organizer of <a href="http://riversidejs.org">riverside.js</a>. Proud to be a linux user!'
		      },
		      icon : 'icon-user',
		      link : '#'
		    },
		    {
		      name : 'I am a',
		      desc : {p:'<ul>\
		        <li>Javascript Ninja\
		        <li>CSS Tamer\
		        <li>HTML Carpenter\
		        <li>PHP Parter\
		        <li>Regular Expressions Wrangler\
		      </ul>'},
		      icon : 'icon-profile',
		      link : '#'
		    },
		    {
		      name : 'I currently work @ eGood',
		      icon : 'icon-suitcase',
		      link : 'http://www.egood.com'
		    },
		    {
		      name : 'My Resume',
		      icon : 'icon-resume',
		      link : '/resume.html'
		    }
		  ], success: true});
	},
	blog : function(req, res){
		request('http://redeyeoperations.com/?json=1&count=1', function(error, response, body){

			var posts = JSON.parse(body).posts;
				output = [];

			for(var i in posts){
				var post = posts[i];

				output.push({
					name : post.title_plain,
					link : post.url,
					icon : 'icon-share-alt',
					desc : {
						p : post.content
					}
				})

			}

			res.json({results : output, success : true});

		})
	},
	_404 : function(req, res){
		res.json({
			title : '404 Page Not Found!',
			results :[
				{
					name : "Maybe something is misspelled?",
					link : "#",
					icon : "",
					desc : {
						p : 'I misspell things all the time, or maybe its on error on my side. Just click the links above and that should get you to the page your looking for.'
					}
				}
			],
			success : true
		});
	},
	slides : function(req, res){
		fs.readdir(__dirname + "/../public/slides/", function(err, files){
			console.log(__dirname + "/../public/slides/");
			var html = [];
			for(var i = 0; i < files.length; i += 1){
				if(files[i].split(/\./).pop() === "html"){
					var split = files[i].split(/\./);
					html.push({
						name : split[0].replace(/(\-|\_)/g, " "),
						link : "/slides/" + files[i],
						icon : "icon-layout"
					})
				}
			};
			res.json({
				title : "Slides",
				results : html
			});
		})
	}
};