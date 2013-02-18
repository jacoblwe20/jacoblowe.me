
/*            __   __   __        __        ___         ___ 
 *    |  /\  /  ` /  \ |__) |    /  \ |  | |__    |\/| |__  
 * \__/ /~~\ \__, \__/ |__) |___ \__/ |/\| |___ . |  | |___ 
 *
 * Author : Jacob Lowe
 * Please feel free to copy use or distribute and code in this file :-)
 *
 */


(function($){

	var listTemp = null,
  /* @Object 	page 			{Function} 	- Helper to keep track and load new pages
   * @param 	start 		{String} 		- String that hold the current pages name or the start pages name
   * @param 	container {Object} 		- Jquery object, from selector	
   */
	page = function(start, container, nav){

		this.cache = {};
		this.current = start;
		this.container = container;
		this.nav = nav;

		var that = this;

		this.nav.each(function(){
			var ele = $(this);
			ele.bind('click', function(e){
				e.preventDefault();
				that.get(ele.attr('id'));
			})
		})

	};

	/* @method 	load 			{Function} 	- Load new content  	
	 * @param 	url 			{String} 		- Url to load information from
	 * @param 	callback 	{Function} 	- Function to pass data to
	 */

	page.prototype.load = function(url, callback){
		var that =  this;

		if(typeof this.cache[url] === 'undefined'){

			$.ajax({
				url : url,
				type : 'GET',
				dataType : 'json',
				error : function(err){
					alert('Error');
					that.focus();
				},
				success : function(res){
					callback(res);
					that.cache[url] = res;
				}
			});

		}else{

			callback(this.cache[url]);

		}
	};

	/* @method 	get 			{Function} 	-  Event to get a new page, also handles states
	 * @param 	pageName 	{String} 		-  String of the page name
	 */

	page.prototype.get = function(pageName){

		var that = this;
		this.blur();

		this.load('/v1/' + pageName, function(res){
			that.container.html(Mustache.render(listTemp, res));
			that.current = pageName;
			that.focus();
		});

	};

	/* @method 	blur 	{Function} 	- Remove focus to container
	 */

	page.prototype.blur = function(){
		this.nav.each(function(){
			$(this).removeClass('current');
		});
		this.container.css({"opacity": "0.5"});
	};

	/* @method 	active 	{Function} 	- Adds focus to container
	 */

	page.prototype.focus = function(){
		$('#' + this.current).addClass('current');
		this.container.css({"opacity" : "1"});
	};

	$.get('/partials/list.html', function(data){  
		var thisPage = new page('about', $('.content'), $('.navigation').find('.item'));

		thisPage.get('about');
		listTemp = data;
	});

}(jQuery));



(function($){

	var container = $('.profile'),
			status = container.find('b').data('update');
			StatusUpdate = function(container, status){

		  	this.status = status;
		  	this.container = container;
		  	this.statusBubble =

		  	this.show = function(){
		  		this.status_bub.addClass('show');
		  	};

		  	this.hide = function(){
		  		this.status_bub.removeClass('show');
		  	};

		  	this.linkify = function(str){
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
		  	this.construct = function(){
		  		var temp = '<i class="icon-twitter blue"></i><div class="triangle"></div><p>{{{status}}}</p>';
		  		var statusUpdate = $('<div/>').addClass('status-update');
		  		this.status_bub = statusUpdate.html(Mustache.render(temp, {status : this.linkify(this.status)}));
		  		this.container.prepend(this.status_bub).css({display:'block', position: 'relative'});
		  		this.events();
		  	};
		  	this.events = function(){
		  		var that = this;
		  		that.container.on('click', 'b', function(){
		  			if(that.status_bub.hasClass('show')){
		  				that.hide();
		  			}else{
		  				that.show();
		  			}
		  		});
		  	};
		  	this.construct();
		  };
		  new StatusUpdate(container, status);


}(jQuery))