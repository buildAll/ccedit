var stream = function(name, dur, type, startTime, endTime, len, editID, fileID, fileName) {
    this.name = name;
    this.duration = dur;
    this.type = type;
    this.startTime = startTime;
    this.endTime = endTime;
    this.len = len;
    this.editID = editID;
    this.fileID = fileID;
    this.fileName = fileName;
    this.getLen = function() {
        this.len = this.endTime - this.startTime;
    };
    this.initStream = function(name, id) {
        this.startTime = 0;
        this.endTime = this.duration;
        this.editID = -1;
        this.fileName = name;
        this.fileID = id;
        this.getLen();
    };
};
var media = function(fileName, fileID, editID, fileStreamAddr, fileHtml) {
    this.fileName = fileName;
    this.fileID = fileID;
    this.editID = editID;
    this.fileStreamAddr = fileStreamAddr;
    this.fileStreamGrp = [];
    this.fileHtml = fileHtml;
    this.getStreamAddr = function(ip, port, workDir) {
        this.fileStreamAddr = "http://" + ip + ":" + port.toString() + "/stream.list?keyd=" + workDir + "\&fileid=" + this.fileID.toString();
    };
    this.getHtmlMedia = function() {
        this.fileHtml = "<li><p>" + this.fileName + "<p id=\"hid\">" + "*" + this.editID + "</p>"+"</p></li>";
    };
    this.mediaDraggable = function() {
        if (typeof this.fileHtml !== "string") {
            return "parameter error";
        }
        $(this.fileHtml).appendTo('#list').draggable({
            appendTo: "body",
            helper: "clone",
            cursor: 'pointer',
            opacity: 0.50,
            containment: 'document',
            drag: function() {
                //$('#editzone').css("background-color", "#8bff9a");
            },
            stop: function() {
                //$('#editzone').css("background-color", "#63B9DE");
            }
        });
    };
    this.getMediaStream = function(me) {
        console.log(this.fileStreamAddr);
        $.ajax({
            //url: this.fileStreamAddr,
            url: "http://localhost/quick/streamlist.php",
            success: function(res) {
                var json = JSON.parse(res);
                if (json.result === "OK") {
                    $.each(json.stream_list, function(i, subarr) {
                        me.fileStreamGrp.push(new stream());
                        me.fileStreamGrp[i].name = subarr[0];
                        me.fileStreamGrp[i].duration = subarr[1];
                        me.fileStreamGrp[i].type = subarr[2];
                        me.fileStreamGrp[i].initStream(me.fileName, me.fileID);
                    });
                } else {
                    console.log("http request failed");
                }
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    };
};
var mediaGallery = function(count) {
    var me = this;
    me.items = [];
    me.count = count;
    me.getCount = function() {
        me.count = me.items.length;
    }
    me.initGallery = function(res) {
        var json = JSON.parse(res);
        if (json.result === "OK") {
            console.log("http request resource list ok");
            me.getCount();
            $.each(json.filelist, function(i, subarr) {
                var itemId = i + me.count;
                me.items.push(new media());
                me.items[itemId].fileName = subarr[0];
                me.items[itemId].fileID = subarr[1];
                me.items[itemId].editID = itemId;
                me.items[itemId].getStreamAddr(curSys.srv_ip, curSys.srv_port, curSys.workDir);
                me.items[itemId].getHtmlMedia();
                me.items[itemId].mediaDraggable();
                me.items[itemId].getMediaStream(me.items[itemId]);
            });
            me.count += json.filelist.length;
        } else {
            alert("invalid request");
        }
    };
    me.addMediasToGallery = function(targetURL) {
        if (targetURL !== "") {
            $.ajax({
                url: targetURL,
                success: function(res) {
                    me.initGallery(res);
                },
                error: function(xhr, desc, err) {
                    getErr(xhr, desc, err)
                }
            });
        } else {
            alert("invalid startup command!!");
        };
    };
};
/*
var initGallery = function(gallery, res) {
    var json = JSON.parse(res);
    if (json.result === "OK") {
        console.log("http request resource list ok");
        gallery.getCount();
        $.each(json.filelist, function(i, subarr) {
            var itemId = i + gallery.count;
            gallery.items.push(new media());
            gallery.items[itemId].fileName = subarr[0];
            gallery.items[itemId].fileID = subarr[1];
            gallery.items[itemId].editID = itemId;
            gallery.items[itemId].getStreamAddr(curSys.srv_ip, curSys.srv_port, curSys.workDir);
            gallery.items[itemId].getHtmlMedia();
            gallery.items[itemId].mediaDraggable();
            gallery.items[itemId].getMediaStream(gallery.items[itemId]);
        });
        gallery.count += json.filelist.length;
    } else {
        alert("invalid request");
    }
};*/