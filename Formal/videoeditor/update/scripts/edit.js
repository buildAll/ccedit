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
var createEditSlider = function(selector, theMedia,curSys) {
	var vLeft;
	var vRight;
    $(selector).slider({
        range: true,
        min: 0,
        max: theMedia.duration,
        values: [theMedia.startTime, theMedia.endTime],
        start: function(event, ui) {
            vLeft = ui.values[0];
            vRight = ui.values[1];
        },
        slide: function(event, ui) {
            theMedia.startTime = ui.values[0];
            theMedia.endTime = ui.values[1];
            theMedia.len = ui.values[1] - ui.values[0];
            $('#starttime').attr("value", theMedia.startTime);
            $('#endtime').attr("value", theMedia.endTime);
            $('#length').attr("value", theMedia.len);
        },
        stop: function(event, ui) {
        	if (vLeft !== ui.values[0]) {
        		curSys.getStepPlayAddr(ui.values[0]);
        		stepPlay(curSys.step_addr);
        	}
        	else if (vRight !== ui.values[1]) {
        		curSys.getStepPlayAddr(ui.values[1]);
        		stepPlay(curSys.step_addr);
        	}
        }
    });
};
var showEidtSlider = function(sliderSelector, theMedia, curSys) {
    createEditSlider(sliderSelector, theMedia, curSys);
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




