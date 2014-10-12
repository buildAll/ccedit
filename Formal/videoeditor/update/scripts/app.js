var vLeft  = 0;
var vRight = 500;


   
var main = function(){
    
     
    startup();
    getResourceList();

   
     //$( "ul" ).sortable({connectWith: ".connectedSortable"});

    $('#order').droppable({
    	scope: "d1",
       // hoverClass: "ui-state-hover",
        scroll: true,
        tolerance: "fit",
        drag:function(){
        	$('#list li').draggable({connectToSortable:"#orderlist"});
        },
        drop: function( event, ui ) {
        	ui.draggable.clone().draggable({disabled:true}).appendTo("#orderlist");
			//$('#list, #orderlist').sortable({tolerance:"pointer",axis: "x",connectWith: ".connectedSortable"});
        }
    });

  $('#list li').draggable({
    	 appendTo: "body",
    	 helper: "clone",
    	 scope: "d1",
    	 cursor: 'pointer',
    	 opacity: 0.50,
    	 containment:'#mainzone',
    	 connectToSortable:"#orderlist",
    	 drag: function(){
    	 	$('#editzone').css("background-color","#8bff9a");
    	 },
    	 stop: function(){
    	 	$('#editzone').css("background-color","#63B9DE");
    	 }
    });
    
    $('#list').sortable({tolerance:"pointer" });
    $('#orderlist').sortable({tolerance:"pointer",axis: "x"});

    $(document).on('dblclick','#orderlist li', function(){
	  $(this).remove();
	});


    
    
  

	createSlider("#slider");
	
};


var startup = function(){
	$('#startBtn').click(function(){
  

		$.ajax({
		    	url:"http://localhost/quick/startup.php",
	            success:function(res){

	              var json = JSON.parse(res);
	              var viewAddr;
	               reqList = "http://"+json.srv_ip+":"+json.srv_port+"/resource.list?keyd=<ONE_KEY>";
	              console.log("http request startup ok");
	              //console.log(json.filelist[0][1]); 
	              console.log(reqList );

	            },
	            error:function(xhr,desc,err){
	            	console.log(xhr);  
	                console.log("Details: " + desc + "\nError:" + err);
	            } 
	  	    });
     });
};

var getResourceList = function(){
	var newVidoe = "";

	$('#resourceList').click(function(){
		$.ajax({                           
		    	url:"http://localhost/quick/resourcelist.php",
	            success:function(res){

	              var json = JSON.parse(res);
	              var viewAddr;
	               //reqList = "http://"+json.srv_ip+":"+json.srv_port+"/resource.list?keyd=<ONE_KEY>";
	              console.log("http request resource list ok");
                   $.each(json.filelist,function(i,subarr){
                   	   newVidoe = "<li><p>"+subarr[0]+ "</p></li>";
                   	   console.log(newVidoe);
                   	   addNewVideo(newVidoe);
                   });   
                   
	            },
	            error:function(xhr,desc,err){
	            	console.log(xhr);  
	                console.log("Details: " + desc + "\nError:" + err);
	            } 
	  	    });
     });
};


var addNewVideo = function(src){
   
    if(typeof src !== "string"){
         return "parameter error";
    }

    

   $(src).appendTo('#list').draggable({
    	 appendTo: "body",
    	 helper: "clone",
    	 scope: "d1",
    	 cursor: 'pointer',
    	 opacity: 0.50,
    	 connectToSortable:"#orderlist",
    	 containment:'#mainzone',
    	 drag: function(){
    	 	$('#editzone').css("background-color","#8bff9a");
    	 },
    	 stop: function(){
    	 	$('#editzone').css("background-color","#63B9DE");
    	 }
    });

};






var createSlider = function(selector){


	$(selector).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ vLeft, vRight ],
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value );
            $(this).find('.ui-slider-handle').text(ui.values[0]);
            $(this).find('.ui-slider-handle').text(ui.values[1]);
        },
        create: function(event, ui) {
            var v=$(this).slider('value');
            $(this).find('.ui-slider-handle').text(v);
        }
    }); 
    var s=$('.ui-slider-range')
    console.log(s);  
	/*$(selector).slider({
		  range: true,
	      min: 0,
	      max: 500,
	      values: [ 75, 300 ],
	      slide: function( event, ui ) {
	        //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	      }
	      /*  range: true,
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
	         /*   var tooltip = $('<div class="ui-slider-tooltip" />').css({
	                position: 'absolute',
	                top: '-25px',
	                left: '-25px'
	            });*/
	           // $(event.target).find('.ui-slider-handle').append(tooltip);
	            
	            // get handles and set up values
	           // var firstHandle  = $(event.target).find('.ui-slider-handle')[0];
	            //var secondHandle = $(event.target).find('.ui-slider-handle')[1];
	            //firstHandle.firstChild.innerText = vLeft;
	            //secondHandle.firstChild.innerText = vRight;
	         //   $('#st').attr("value",vLeft);
	        	//$('#et').attr("value",vRight);
	       // },
	      /*
	        change: function(event, ui) {
	        	var st = ui.values[0];
	            var et = ui.values[1];
	        	$('#st').attr("value",st);
	        	$('#et').attr("value",et);
	        }*/
      //  })
};
	

$(document).ready(main);