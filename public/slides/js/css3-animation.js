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

}())