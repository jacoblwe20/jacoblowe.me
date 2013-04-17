(function(){
	// small loop for els
	var listen = function(arr, event, listener){
		for(var i = 0; i < arr.length; i += 1){
			var ele = arr[i];
			ele.addEventListener(event, listener);
		}
	};
	// select elements
	var els = document.querySelectorAll(".demo-awesome");
	// adding event
	listen(els, "click", function(e){
		var ele = e.target;
		var classes = ele.className;
		if(!/\sawesome/.test(classes)){
			ele.className = classes + " awesome";
			setTimeout(function(){
				ele.className = classes;
			},1000)
		}
	});

	// timing demo

	var ele = document.getElementById("random");

	setInterval(function(){
	  var randX = Math.round(Math.random() * 100);
	  var randY = Math.round(Math.random() * 100);
	  ele.style.webkitTransform = "translate(" + randX + "px, " + randY + "px)";
	},500);

	var adv = document.getElementById("advancing");
	var ogClass = adv.className;

	adv.addEventListener("click", function(e){
	  var classNames = e.target.className;

	  if(!/first/g.test(classNames)){
	  	adv.className = classNames + " first";
	  }else if(!/second/g.test(classNames)){
	  	adv.className = classNames + " second";
	  }else if(!/third/g.test(classNames)){
	  	adv.className = classNames + " third";
	  }else{
	  	adv.className = ogClass;
	  }
	})

}())