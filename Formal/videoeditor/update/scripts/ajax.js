/*var getMediaFiles = function(targetURL, gallery) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                gallery.initGallery(res);
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("invalid startup command!!");
    };
};
*/

var getVideoConfig = function(targetURL,track) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                var json = JSON.parse(res);
                if (json.result === "OK") {
                    console.log("http request resource list ok");
                    $.each(json.video_track, function(i, subarr) {
                        var itemId = i;
                        track.push(new stream());
                        thisStream = track[itemId];
                        thisStream.fileID = subarr[0];
                        thisStream.name = subarr[1];
                        thisStream.startTime = subarr[2];
                        thisStream.endTime = subarr[3];
                        thisStream.fileName = subarr[4];
                        thisStream.type = "video";
                        thisStream.getLen();
                        thisStream.duration = thisStream.len;
                        thisStream.editID = track.length - 1 ;
                        $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.type + thisStream.editID + "</p>" + "</li>").appendTo("#vidtrack");
                    });
                } else {
                    alert("invalid request");
                }
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("can not getconfig!!");
    };
};

var getAudioConfig = function(targetURL,track) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                var json = JSON.parse(res);
                if (json.result === "OK") {
                    console.log("http request resource list ok");
                    $.each(json.audio_track, function(i, subarr) {
                        var itemId = i;
                        track.push(new stream());
                        thisStream = track[itemId];
                        thisStream.fileID = subarr[0];
                        thisStream.name = subarr[1];
                        thisStream.startTime = subarr[2];
                        thisStream.endTime = subarr[3];
                        thisStream.fileName = subarr[4];
                        thisStream.type = "audio";
                        thisStream.getLen();
                        thisStream.duration = thisStream.len;
                        thisStream.editID = track.length - 1;
                        $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.type + thisStream.editID + "</p>" + "</li>").appendTo("#audtrack");
                    });
                    console.log(track);
                } else {
                    alert("invalid request");
                }
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("can not getconfig!!");
    };
};



