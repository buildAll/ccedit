var sysInfo = function(workDir, resDir, width, height, srv_ip, srv_port, stepPlayURL, filePlayURL, stopPlayURL, playURL, startupURL, reStartupURL, galleryURL, configPutURL, configGetURL) {
    var me = this;

    me.workDir = workDir;
    me.resDir = resDir;
    me.width = width;
    me.height = height;
    me.srv_ip = srv_ip;
    me.srv_port = srv_port;
    me.stepPlayURL = stepPlayURL;
    me.filePlayURL = filePlayURL;
    me.playURL = playURL;
    me.stopPlayURL = stopPlayURL;
    me.startupURL = startupURL;
    me.reStartupURL = reStartupURL;
    me.galleryURL = galleryURL;
    me.configPutURL = configPutURL;
    me.configGetURL = configGetURL;
    me.getIPnPort = function(ip, port) {
        me.srv_ip = ip;
        me.srv_port = port;
    };
    me.getStartupURL = function() {
        me.startupURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/oledit.startup?keyd=" + me.workDir + "&startd=" + me.resDir + "\&width=" + me.width + "\&height=" + me.height;
    };
    me.getReStartupURL = function() {
        me.reStartupURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/oledit.startup?keyd=" + me.workDir;
    };
    me.getGalleryURL = function() {
        me.galleryURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/resource.list?keyd=" + me.workDir;
    };
    me.getStepPlayURL = function(id, name, time) {
        //http://srv_ip:srv_port/edit.step?keyd=<ONE_KEY>&fileid=<FILE_ID>&stream=<VIDEO_STREAM_NAME>&pos=<TIME_IN_SECONDS>
        me.stepPlayURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/step.play?keyd=" + me.workDir+"&fileid=" + id + "&stream=" + name + "&pos=" + time.toString();
    };
    me.getFilePlayURL = function(id, st, et){
        //http://srv_ip:srv_port/file.play?keyd=<ONE_KEY>&fileid=<FILE_ID>&pos=<TIME_IN_SECONDS>&end=<TIME_IN_SECONDS>
        me.filePlayURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/file.play?keyd=" + me.workDir+"&fileid=" + id+ "&pos=" + st.toString() + "&end=" + et.toString();
    };
    me.getConfigPutURL = function(){
        me.configPutURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/config.put?keyd=" + me.workDir;
    };
    me.getConfigGetURL = function(){
        me.configGetURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/config.get?keyd=" + me.workDir;
    };
    me.getPlayURL = function(str){
        me.playURL = str;
    };
    me.getStopPlayURL = function(){
        me.stopPlayURL = "http://" + me.srv_ip + ":" + me.srv_port.toString() + "/play.stop?keyd=" + me.workDir;
    }
    me.getSysInfo = function(res) {
        var json = JSON.parse(res);
        if (json.result === "OK") {
            console.log("http request startup ok");
            me.getIPnPort(json.srv_ip, json.srv_port);
            me.getGalleryURL();
            me.getPlayURL(json.play_url);
            //me.getPlayURL("http://192.168.100.233/live/playlist.m3u8");
            me.getStartupURL();
            me.getStopPlayURL();
            me.getConfigPutURL();
            me.getConfigGetURL();
        } else {
            if (json.message === "keyd already exist") {
                me.getReStartupURL();
                me.reStart(me.reStartupURL);
            }
        }
    };
    me.reStart = function(targetURL) {
        $.ajax({
            url: targetURL,
            success: function(res) {
                var json = JSON.parse(res);
                if (json.result === "OK") {
                    console.log("http re-startup ok");
                    me.getIPnPort(json.srv_ip, json.srv_port);
                    me.getIPnPort(json.srv_ip, json.srv_port);
                    me.getGalleryURL();
                    me.getPlayURL(json.play_url);
                   // me.getPlayURL("http://192.168.100.233/live/playlist.m3u8");
                    me.getStartupURL();
                    me.getStopPlayURL();
                    me.getConfigPutURL();
                    me.getConfigGetURL();
                } else {
                    console.log("http request startup failed");
                }
            },
            error: function(xhr, desc, err) {
                getErr(xhr, desc, err)
            }
        });
    };
    me.doStartup = function(targetURL) {
        if (targetURL !== "") {
            $.ajax({
                url: targetURL,
                success: function(res) {
                    me.getSysInfo(res);
                },
                error: function(xhr, desc, err) {
                    getErr(xhr, desc, err)
                }
            });
        } else {
            alert("invalid startup command!!");
        };
    };
    me.stepPlay = function() {
        if (me.stepPlayURL !== "") {
            $.ajax({
                url: me.stepPlayURL,
                success: function(res) {
                    //TDO sth
                },
                error: function(xhr, desc, err) {
                    getErr(xhr, desc, err)
                }
            });
        } else {
            alert("invalid step play command!!");
        };
    };
    me.filePlay = function() {
        if (me.filePlayURL !== "") {
            $.ajax({
                url: me.filePlayURL,
                success: function(res) {
                    //TDO sth
                },
                error: function(xhr, desc, err) {
                    getErr(xhr, desc, err)
                }
            });
        } else {
            alert("invalid file play command!!");
        };
    };
    me.stopPlay = function() {
        if (me.stopPlayURL !== "") {
            $.ajax({
                url: me.stopPlayURL,
                success: function(res) {
                    //TDO sth
                },
                error: function(xhr, desc, err) {
                    getErr(xhr, desc, err)
                }
            });
        } else {
            alert("invalid stop play command!!");
        };
    };
};


