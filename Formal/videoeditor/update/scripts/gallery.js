var stream = function(name, dur, type, startTime, endTime, len, editID, fileID, fileName) {
    this.name = name;
    this.duration = dur;
    this.type = type;
    this.startTime = startTime;
    this.endTime = endTime;
    this.len = len;
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
var media = function(fileName, fileID, fileStreamAddr, fileHtml) {
    this.fileName = fileName;
    this.fileID = fileID;
    this.fileStreamAddr = fileStreamAddr;
    this.fileStreamGrp = [];
    this.fileHtml = fileHtml;
    this.getStreamAddr = function(ip, port, workDir) {
        this.fileStreamAddr = "http://" + ip + ":" + port.toString() + "/stream.list?keyd=" + workDir + "\&fileid=" + this.fileID.toString();
    };
    this.getHtmlMedia = function() {
        this.fileHtml = "<li><p>" + this.fileName + "</p></li>";
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
    this.items = [];
    this.count = count;
    this.getCount = function() {
        this.count = this.items.length;
    }
};
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
            gallery.items[itemId].getStreamAddr(curSys.srv_ip, curSys.srv_port, curSys.wordDir);
            gallery.items[itemId].getHtmlMedia();
            gallery.items[itemId].mediaDraggable();
            gallery.items[itemId].getMediaStream(gallery.items[itemId]);
        });
        gallery.count += json.filelist.length;
    } else {
        alert("invalid request");
    }
};