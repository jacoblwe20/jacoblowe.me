(function($){

	var listTemp = null,
	  /* @Object 	page 			Function 	- Helper to keep track and load new pages
	   * @param 	start 		String 		- String that hold the current pages name or the start pages name
	   * @param 	container Object 		- Jquery object, from selector	
	   */
		page = function(start, container, nav){

			this.cache = {};
			this.current = start;
			this.container = container;
			this.nav = nav;
			this.temp = function(){

			}
			var that = this;

			this.nav.each(function(){
				var ele = $(this);
				ele.bind('click', function(e){
					e.preventDefault();
					that.get(ele.attr('id'));
				})
			})

		};

	/* @method 	load 			Function 	- Load new content  	
	 * @param 	url 			String 		- Url to load information from
	 * @param 	callback 	Function 	- Function to pass data to
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

	/* @method 	get 			Function 	-  Event to get a new page, also handles states
	 * @param 	pageName 	String 		-  String of the page name
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

	/* @method 	blur 	Function 	- Remove focus to container
	 */

	page.prototype.blur = function(){
		this.nav.each(function(){
			$(this).removeClass('current');
		});
		this.container.css({"opacity": "0.5"});
	};

	/* @method 	active 	Function 	- Adds focus to container
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

}(jQuery))