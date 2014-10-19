var sysInfo = function(workDir, resDir, width, height, srv_ip, srv_port, view_addr, step_addr, startupAddr, reStartupAddr, galleryAddr) {
    this.workDir = workDir;
    this.resDir = resDir;
    this.width = width;
    this.height = height;
    this.srv_ip = srv_ip;
    this.srv_port = srv_port;
    this.view_addr = view_addr;
    this.step_addr = step_addr;
    this.startupAddr = startupAddr;
    this.reStartupAddr = reStartupAddr;
    this.galleryAddr = galleryAddr;
    this.getIPnPort = function(ip, port) {
        this.srv_ip = ip;
        this.srv_port = port;
    };
    this.getStartupURL = function() {
        this.startupAddr = "http://" + this.srv_ip + ":" + this.srv_port.toString() + "/oledit.startup?keyd=" + this.workDir + "&startd=" + this.resDir + "\&width=" + this.width + " \&height=" + this.height;
    };
    this.getReStartupURL = function() {
        this.reStartupAddr = "http://" + this.srv_ip + ":" + this.srv_port.toString() + "/oledit.startup?keyd=" + this.workDir;
    };
    this.getGalleryAddr = function() {
        this.galleryAddr = "http://" + this.srv_ip + ":" + this.srv_port.toString() + "/resource.list?keyd=" + workDir;
    };
};
var getSysInfo = function(res) {
    var json = JSON.parse(res);
    if (json.result === "OK") {
        console.log("http request startup ok");
        curSys.getIPnPort(json.srv_ip, json.srv_port);
        curSys.view_addr = json.view_addr;
        curSys.step_addr = json.step_addr;
    } else {
        if (json.message === "keyd already exist") {
            reStart(curSys.getReStartupURL());
        }
    }
};
var reStart = function(targetURL) {
    $.ajax({
        url: targetURL,
        success: function(res) {
            var json = JSON.parse(res);
            if (json.result === "OK") {
                console.log("http re-startup ok");
                curSys.getIPnPort(json.srv_ip, json.srv_port);
            } else {
                console.log("http request startup failed");
            }
        },
        error: function(xhr, desc, err) {
            getErr(xhr, desc, err)
        }
    });
};