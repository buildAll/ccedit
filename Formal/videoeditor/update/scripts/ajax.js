var doStartup = function(targetURL) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                getSysInfo(res);
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("invalid startup command!!");
    };
};
var getMediaFiles = function(targetURL, gallery) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                initGallery(gallery, res);
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("invalid startup command!!");
    };
}
/*
var getMediaStream = function(targetURL, theMedia) {
    $.ajax({
        url: targetURL;
        //url: "http://localhost/quick/streamlist.php",
        success: function(res) {
            var json = JSON.parse(res);
            if (json.result === "OK") {
                $.each(json.stream_list, function(i, subarr) {
                    theMedia.fileStreamGrp.push(new stream());
                    theMedia.fileStreamGrp[i].name = subarr[0];
                    theMedia.fileStreamGrp[i].duration = subarr[1];
                    theMedia.fileStreamGrp[i].type = subarr[2];
                    theMedia.fileStreamGrp[i].initStream(theMedia.fileName, theMedia.fileID);
                });
            } else {
                console.log("http request failed");
            }
        },
        error: function(xhr, desc, err) {
            getErr(xhr, desc, err)
        }
    });
};*/
/*
var doClick = {
    
    getEdit: function() {
        $(document).on('click', '#orderlist > li', function() {
            var curItem = $(this).text();
            //var curItemName = getEditName(curItem);
            var curItemId = getEditId(curItem);
            console.log(curItem);
            //curMediaPosition = 0;
            $.each(finalEditList, function(i, currentMedia) {
                if (curItemId == currentMedia.mediaID) {
                    console.log("****");
                    displaySlider(currentMedia);
                    $('#starttime').attr("value", currentMedia.startTime);
                    $('#endtime').attr("value", currentMedia.endTime);
                    $('#length').attr("value", currentMedia.streamLength);
                    return;
                };
            });
        });
    }
};*/