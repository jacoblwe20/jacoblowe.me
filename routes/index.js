
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};


exports.api = {
	page : function(req, res){

	},
	twitter : function(req, res){

	},
	groups : function(req, res){
		res.json({
			results : [
				{
					name : "riverside.js",
					link : "http://riversidejs.org",
					icon : "icon-cloud",
					desc : {
						p : 'Meetup with local Javascript Developers in the Inland Empire. We are a group of Riverside tech enthusiast, and the group is growing larger everyday. Come join us and together lets learn to build and hack javascript.'
					}
				},
				{
					name : "riverside.io",
					link : "http://riverside.io",
					icon : "icon-certificate",
					desc : {
						p : 'Where people from all over the Inland Empire come to learn how to code, design & ship web apps.'
					}
				}
			],
			success : true
		});
	},
	projects : function(req, res){
		res.json({
			results : [
				{
					name : "Zoomy jQuery Plugin",
					link : "http://zoomy.me",
					icon : "icon-search",
					desc : {
						p : 'Zoomy is a quick and easy plugin that will zoom into a picture. Zoomy is a flexible zoom plugin and can be used with either, two copies of the same image, or one image linked to its self.'
					}
				},
				{
					name : "Zoomy Wordpress Plugin",
					link : "http://zoomy.me/wordpress",
					icon : "icon-zoom-in",
					desc : {
						p : 'Zoomy Wordpress Plugin is a plugin built for Wordpress that allows you to use Zoomy inside of your blog'
					}
				},
				{
					name : "Notify jQuery Plugin",
					link : "http://redeyeoperations.com/plugins/Notify",
					icon : "icon-exclamation-sign"
				},
				{
					name : "Scrollimate jQuery Plugin",
					link : "http://redeyeoperations.com/plugins/Scrollimate",
					icon : "icon-cogs"
				}
			],
			success : true
		});
	},
	contact : function(req, res){
		res.json({
			results :[
				{
					name : "ping@jacoblowe.me",
					link : "mailto:ping@jacoblowe.me",
					icon : "icon-envelope-alt"
					// desc : {
					// 	p : '<input type="text" placeholder="email@host.com"><br><input class="btn btn-alt" type="submit" value="submit"/>'
					// }
				}
			],
			success : true
		});

	}
};