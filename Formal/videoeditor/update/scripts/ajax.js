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
};

var stepPlay = function(targetURL) {
    if (targetURL !== "") {
        $.ajax({
            url: targetURL,
            success: function(res) {
                //initGallery(gallery, res);
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    } else {
        alert("invalid step play command!!");
    };
};
