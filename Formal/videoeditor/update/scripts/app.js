var vid = $('#player');

var vLeft  = 0;
var vRight = 120;


var content;

   
var main = function(){
    
     var ulctx = $('#list');
     console.log(ulctx[0]);
     console.log(ulctx[3]);
     
	//test drag and drop start
    $('#order').droppable({
    	scope: "d1",
        hoverClass: "ui-state-hover",
        //accept: 'img',
        scroll: true,
        //hoverClass:"hovercss",
        drop: function( event, ui ) {

			ui.draggable.clone().detach().appendTo("#orderlist");
		/*	ui.draggable.clone().css({
				"list-style-type": "none",
				"margin": "20px",
			    "border": "solid 2px red",
			    "width": "110px",
			    "height": "50px",
			    "position": "relative",
			    "right": "17px",
			    "background-color":"black" 
			});*/
        }
    });

    $('li').draggable({
    	 appendTo: "body",
    	 helper: "clone",
    	 //revert: true,
    	 scope: "d1",
    	 cursor: 'pointer',
    	 opacity: 0.50,
    	 connectToSortable: "#orderlist",
    	 drag: function(){
    	 	$('#order').css("background-color","#8bff9a");
    	 },
    	 stop: function(){
    	 	$('#order').css("background-color","#63B9DE");
    	 }
    });
    
    $('li').hover(function() {
        $(this).css('cursor','pointer');
    });



    $(document).on('dblclick','#orderlist li', function(){
	  $(this).remove();
	});

    $('#list').sortable({tolerance:"pointer" });
    $('#orderlist').sortable({tolerance:"pointer",axis: "x"});
    

    
	//end test


	createSlider("#slider");
	
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
};
	

$(document).ready(main);