var vid = $('#player');


var vLeft  = 0,
        vRight = 20;


var main = function(){


	
        
    $("#slider1").slider({
        range: true,
        min: 0,
        max: 120,
        values: [vLeft, vRight],
        start: function( event, ui ) {
            $(ui.handle).find('.ui-slider-tooltip').fadeIn();
        },

        stop: function( event, ui ) {
            $(ui.handle).find('.ui-slider-tooltip').fadeOut();
        },
        
        slide: function(event, ui) {
            //$(ui.handle).find('.ui-slider-tooltip').text(ui.value);

            var st = ui.values[0];
            var et = ui.values[1];
        	$('#st').attr("value",st);
        	$('#et').attr("value",et);
        	fillCav(st,et);
        },
      
        create: function( event, ui ) {
            var tooltip = $('<div class="ui-slider-tooltip" />').css({
                position: 'absolute',
                top: '-25px',
                left: '-25px'
            });
            $(event.target).find('.ui-slider-handle').append(tooltip);
            
            // get handles and set up values
           // var firstHandle  = $(event.target).find('.ui-slider-handle')[0];
            //var secondHandle = $(event.target).find('.ui-slider-handle')[1];
            //firstHandle.firstChild.innerText = vLeft;
            //secondHandle.firstChild.innerText = vRight;
            $('#st').attr("value",vLeft);
        	$('#et').attr("value",vRight);
        },
      
        change: function(event, ui) {
        	var st = ui.values[0];
            var et = ui.values[1];
        	$('#st').attr("value",st);
        	$('#et').attr("value",et);
        	fillCav(st,et);
        }
    });


    	$('#link1').click(function(){
		console.log("OK");
        vid.get(0).pause();
		vid.attr({"src":"videos/1.mp4"});
		vid.get(0).load();
		});
		$('#link2').click(function(){
			console.log("OK");
			vid.get(0).pause();
			vid.attr({"src":"videos/2.mp4"});
			vid.get(0).load();
       
        
        
        $("#slider2").slider({
	        range: true,
	        min: 0,
	        max: 120,
	        values: [vLeft, vRight],
	        start: function( event, ui ) {
	            $(ui.handle).find('.ui-slider-tooltip').fadeIn();
	        },

	        stop: function( event, ui ) {
	            $(ui.handle).find('.ui-slider-tooltip').fadeOut();
	        },
	        
	        slide: function(event, ui) {
	            //$(ui.handle).find('.ui-slider-tooltip').text(ui.value);

	            var st = ui.values[0];
	            var et = ui.values[1];
	        	$('#st').attr("value",st);
	        	$('#et').attr("value",et);
	        },
	      
	        create: function( event, ui ) {
	            var tooltip = $('<div class="ui-slider-tooltip" />').css({
	                position: 'absolute',
	                top: '-25px',
	                left: '-25px'
	            });
	            $(event.target).find('.ui-slider-handle').append(tooltip);
	            
	            // get handles and set up values
	           // var firstHandle  = $(event.target).find('.ui-slider-handle')[0];
	            //var secondHandle = $(event.target).find('.ui-slider-handle')[1];
	            //firstHandle.firstChild.innerText = vLeft;
	            //secondHandle.firstChild.innerText = vRight;
	            $('#st').attr("value",vLeft);
	        	$('#et').attr("value",vRight);
	        },
	      
	        change: function(event, ui) {
	        	var st = ui.values[0];
	            var et = ui.values[1];
	        	$('#st').attr("value",st);
	        	$('#et').attr("value",et);
	        }
        })
       

		});
		$('#link3').click(function(){
			console.log("OK");
			vid.get(0).pause();
			vid.attr({"src":"videos/3.mov"});
			vid.get(0).load();
			createSlider('#slider3')
		});
}

var cavObj = function (x,y,width,height){
	this.posX = x;
	this.posY = width;
	this.width = width;
	this.height = height;
};

var fillCav = function(start,end){
	
    var cavDraw = new cavObj();
    var cavClear = new cavObj();
    var cavClearTail = new cavObj();
    var c = document.getElementById("cav");
	var ctx = c.getContext("2d");


	cavDraw.posX = start;
	cavDraw.posY = 0;//the height of the canvas
	cavDraw.width = end - start;
	cavDraw.height = c.height;

	cavClear.posX = 0;
	cavClear.posY = 0;//the height of the canvas
	cavClear.width = start;
	cavClear.height = c.height;


	cavClearTail.posX = end;
	cavClearTail.posY = 0;//the height of the canvas
	cavClearTail.width = c.width-end;
	cavClearTail.height = c.height;



	//console.log(posX);
	//console.log(posY);
	//console.log(width);
	//console.log(height);

	
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(cavDraw.posX,cavDraw.posY,cavDraw.width,cavDraw.height);
    ctx.clearRect(cavClear.posX,cavClear.posY,cavClear.width,cavClear.height);
    ctx.clearRect(cavClearTail.posX,cavClearTail.posY,cavClearTail.width,cavClearTail.height);
};


var createSlider = function(selector){
      
     

	$(selector).slider({
	        range: true,
	        min: 0,
	        max: 120,
	        values: [vLeft, vRight],
	        start: function( event, ui ) {
	            $(ui.handle).find('.ui-slider-tooltip').fadeIn();
	        },

	        stop: function( event, ui ) {
	            $(ui.handle).find('.ui-slider-tooltip').fadeOut();
	        },
	        
	        slide: function(event, ui) {
	            //$(ui.handle).find('.ui-slider-tooltip').text(ui.value);

	            var st = ui.values[0];
	            var et = ui.values[1];
	        	$('#st').attr("value",st);
	        	$('#et').attr("value",et);
	        },
	      
	        create: function( event, ui ) {
	            var tooltip = $('<div class="ui-slider-tooltip" />').css({
	                position: 'absolute',
	                top: '-25px',
	                left: '-25px'
	            });
	            $(event.target).find('.ui-slider-handle').append(tooltip);
	            
	            // get handles and set up values
	           // var firstHandle  = $(event.target).find('.ui-slider-handle')[0];
	            //var secondHandle = $(event.target).find('.ui-slider-handle')[1];
	            //firstHandle.firstChild.innerText = vLeft;
	            //secondHandle.firstChild.innerText = vRight;
	            $('#st').attr("value",vLeft);
	        	$('#et').attr("value",vRight);
	        },
	      
	        change: function(event, ui) {
	        	var st = ui.values[0];
	            var et = ui.values[1];
	        	$('#st').attr("value",st);
	        	$('#et').attr("value",et);
	        }
        })
}

$(document).ready(main);