var getEditId = function(str) {
    var id = "";
    var getIdStart = false;
    $.each(str.split(''), function(i, ch) {
        if (ch === '*') {
            getIdStart = true;
        };
        if (getIdStart === true) {
            if (ch !== '*') {
                id += ch;
            };
        };
    });
    return id;
};
var createEditSlider = function(selector, theStream, curSys) {
	var vLeft;
	var vRight;
    $(selector).slider({
        range: true,
        min: 0,
        max: theStream.duration,
        values: [theStream.startTime, theStream.endTime],
        start: function(event, ui) {
            vLeft = ui.values[0];
            vRight = ui.values[1];
        },
        slide: function(event, ui) {
            theStream.startTime = ui.values[0];
            theStream.endTime = ui.values[1];
            theStream.len = ui.values[1] - ui.values[0];
            $('#starttime').attr("value", theStream.startTime);
            $('#endtime').attr("value", theStream.endTime);
            $('#length').attr("value", theStream.len);
        },
        stop: function(event, ui) {
            curSys.getFilePlayURL(theStream.fileID, ui.values[0], ui.values[1]); 
             
        	if (vLeft !== ui.values[0]) {

        		curSys.getStepPlayURL(theStream.fileID, theStream.name, ui.values[0]);
                console.log(curSys.playURL);
                console.log(curSys.stepPlayURL);
                console.log(curSys.stopPlayURL);

               // mycp.pause();
                curSys.stopPlay();
                mycp.play(curSys.playURL);
        		curSys.stepPlay();
        	}
        	else if (vRight !== ui.values[1]) {
                
        		curSys.getStepPlayURL(theStream.fileID, theStream.name, ui.values[1]);
                console.log(curSys.playURL);
                console.log(curSys.stepPlayURL);
                console.log(curSys.stopPlayURL);
               // mycp.pause();
                curSys.stopPlay();
                mycp.play(curSys.playURL)
                curSys.stepPlay();
        	}
        }
    });
};
var showEidtSlider = function(sliderSelector, theStream, curSys) {
    createEditSlider(sliderSelector, theStream, curSys);
};
var editStream = function(selector, track, slider, curSys) {
    var selector = selector + '>li';
    $(document).on('click', selector, function() {
        var curItem = $(this).text();
        var curItemId = getEditId(curItem);
        $.each(track, function(i, thisStream) {
            if (curItemId === (thisStream.type + thisStream.editID.toString())) {
                showEidtSlider(slider, thisStream, curSys);
                $('#starttime').attr("value", thisStream.startTime);
                $('#endtime').attr("value", thisStream.endTime);
                $('#length').attr("value", thisStream.len);
                return;
            };
        });
    });
};




