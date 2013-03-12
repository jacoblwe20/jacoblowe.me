
/*            __   __   __        __        ___         ___ 
 *    |  /\  /  ` /  \ |__) |    /  \ |  | |__    |\/| |__  
 * \__/ /~~\ \__, \__/ |__) |___ \__/ |/\| |___ . |  | |___ 
 *
 * Author : Jacob Lowe
 * Please feel free to copy use or distribute and code in this file :-)
 *
 */


 (function($, exports){

  var Cookies = function(){
    if(!(this instanceof Cookies)){
      return new Cookies();
    }
    var that = this;
    that.jar = function(name){
      name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

      var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)','i'),
        match = document.cookie.match(regex);
      return match && unescape(match[1]);
    };
  };

  exports.cookies = Cookies;

 }(jQuery, this));


(function($, exports){

  var listTemp = null;

  var section = function(container, title, data){
    this.container = container;
    this.page = data;
    this.id = title;
    this.ele = $("<section/>")
      .addClass(this.id);
    this.content = Mustache.render(listTemp, data);
    this.init();
  };

  section.prototype.getId = function(){
    return this.id;
  };

  section.prototype.add = function(){
    this.container.
      append(this.ele.
        html(this.content));
  };

  section.prototype.focus = function(){
    this.container.
      css({
        height : this.ele.height() + 25
      })
    this.ele.addClass("current");
  };

  section.prototype.init = function(){
    this.add();
  };

    /*  @Object   page    {Function}    - Helper to keep track and load new pages
    *   @param    start     {String}    - String that hold the current pages name or the start pages name
    *   @param    container   {Object}    - Jquery object, from selector  
    */

  var page = function(start, container, nav){

    var that = this;
    this.cache = {};
    this.current = start;
    this.container = container;
    this.nav = nav;
    this.Section = section;
    this.sections = [];
    this.pushState = ("pushState" in history) ? true : false;
    this.nav.on("click", function(e){
      var ele = $(this);  
      var pageName = ele.attr('id');
      e.preventDefault();
      that.get(pageName);
      if(that.pushState){
        history.pushState({}, pageName, pageName);
      }
      if(that.onNavigate) that.onNavigate();
    });

    this.init();
  };

  /* @method  load      {Function}  - Load new content    
   * @param   url       {String}    - Url to load information from
   * @param   callback  {Function}  - Function to pass data to
   */

  page.prototype.load = function(url, callback){
    var that =  this;

    if(typeof this.cache[url] === 'undefined'){
      $.ajax({
        url : url,
        type : 'GET',
        dataType : 'json',
        error : function(err){
          that.get("404");
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

  /* @method  get       {Function}  -  Event to get a new page, also handles states
   * @param   pageName  {String}    -  String of the page name
   */

  page.prototype.get = function(pageName){

    var that = this;
    this.blur();
    for(var i = 0; i < this.sections.length; i += 1){
      var section = this.sections[i];
      if(section.getId() === pageName){
        this.focus(section);
        return true;
      }
    }

    this.load('/v1/' + pageName, function(res){
      var section = new that.Section(that.container, pageName, res);
      that.sections.push(section);
      that.focus(section);
    });

  };

  /* @method  blur  {Function}  - Remove focus to container
   */

  page.prototype.blur = function(){
    this.nav.each(function(){
      $(this).removeClass('current');
    });
  };

  /* @method  active  {Function}  - Adds focus to container
   */

  page.prototype.focus = function(section){
    $("section").removeClass("current");
    section.focus();
    $("#" + section.getId()).addClass("current");
  };

  page.prototype.temp = function(callback){
    $.get('/partials/list.html', function(res){
      this.temp = res;
      listTemp = res;
      callback();
    });
  };

  page.prototype.init = function(){
    var that = this;
    this.temp(function(){
      that.get(that.current);
    })
  };

  exports.page = page;

}(jQuery, this));



(function($, exports){

  var container = $('.profile'),
    status = container.find('b').data('update');
    StatusUpdate = function(container, status){

        this.status = status;
        this.container = container;

        this.show = function(){
          this.status_bub.addClass('show');
        };

        this.hide = function(){
          this.status_bub.removeClass('show');
        };

        this.attach = function(){
          var that = this;
          this.container.on("click", ".icon-twitter", function(){
            if(that.onClick) that.onClick();
            that.hide();
          });
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
            $(this).find('img').removeClass('shake');
            if(that.status_bub.hasClass('show')){
              that.hide();
            }else{
              that.show();
            }
          });
          this.attach();
        };
        this.construct();
     };

     exports.Status = StatusUpdate;
     
     //new StatusUpdate(container, status);


}(jQuery, this));

(function($, exports){

  var content = $('.content');
  var items = $('.navigation').find('.item');
  var pageName = cookies().jar('__p__');
  var profile = $('.profile');
  var tweet = profile.find('b').data('update');
  var status = new Status(profile, tweet);

  console.log(pageName);

  if(pageName == "undefined" || 
      !(typeof pageName === "string") || 
      pageName === "" ||
      pageName === "null"){
    pageName = "about";
  };
  content = new page(pageName, content, items);
  status.onClick = function(){
    content.get("twitter");
  };
  content.onNavigate = function(){
    status.hide();
  };

}(jQuery, this));