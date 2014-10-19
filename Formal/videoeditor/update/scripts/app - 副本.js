/*
Video Editor User Interface
intial by zhao biao
Nanjing CCsing SW 
*/
var listAddress = "";
var streamAddress = "";
var targetURL = "http://192.168.100.233/oledit.startup?keyd=00000456&startd=ddd\&width=100\&height=40";
var meida = function(name, id, streamAddress, duration, streamName, streamType, startTime, endTime, streamLength, mediaID) {
    this.name = name;
    this.id = id;
    this.streamAddress = streamAddress;
    this.duration = duration;
    this.streamName = streamName;
    this.streamType = streamType;
    this.startTime = startTime;
    this.endTime = endTime;
    this.streamLength = streamLength;
    this.mediaID = mediaID
};
var mediaList = [];
var editList = [];
var finalEditList = []; /////////It needs further investigate to check if it can be removed!!! TBD  
var editListPosition = 0;
var mediaCount = 0;
var mediaListLength = 0;
//var curMediaPosition;
var main = function() {
    //getEditName("testGetEditName");
    initAction();
    clickHandle.startup();
    clickHandle.getResource();
    clickHandle.getEdit();
    $(document).on('dblclick', '#orderlist li', function() {
        $(this).remove();
    });
};
var clickHandle = {
    startup: function() {
        $('#startBtn').click(function() {
            $.ajax({
                //url: targetURL,
                url: "http://localhost/quick/startup.php",
                success: function(res) {
                    var json = JSON.parse(res);
                    if (json.result === "OK") {
                        console.log("http request startup ok");
                        console.log(json);
                        listAddress = "http://" + json.srv_ip + ":" + json.srv_port + "/resource.list?keyd=00000456";
                        streamAddress = "http://" + json.srv_ip + ":" + json.srv_port + "/stream.list?keyd=00000456\&fileid=";
                        console.log("listAddress is " + listAddress);
                    } else {
                        if (json.message === "keyd already exist") {
                            targetURL = "http://192.168.100.233/oledit.startup?keyd=00000456";
                            reAjax(targetURL);
                        }
                        console.log("http request startup failed");
                    }
                },
                error: function(xhr, desc, err) {
                    console.log(xhr);
                    console.log("Details: " + desc + "\nError:" + err);
                }
            });
        });
    },
    getResource: function() {
        var newVidoe = "";
        $('#resourceList').click(function() {
            if (listAddress !== "") {
                $.ajax({
                    url: "http://localhost/quick/resourcelist.php",
                    //url: listAddress,
                    success: function(res) {
                        var json = JSON.parse(res);
                        if (json.result === "OK") {
                            console.log("http request resource list ok");
                            mediaListLength = mediaList.length;
                            $.each(json.filelist, function(i, subarr) {
                                mediaList[i + mediaCount] = new meida(subarr[0], subarr[1], streamAddress + subarr[1].toString());
                                newVidoe = "<li><p>" + mediaList[i + mediaCount].name + "</p></li>";
                                addNewVideo(newVidoe);
                                i += 1;
                                console.log(mediaList);
                            });
                            $.each(mediaList, function(i, currentMedia) {
                                getStream(currentMedia);
                            });
                            mediaCount += json.filelist.length;
                        } else {
                            alert("invalid request");
                        }
                    },
                    error: function(xhr, desc, err) {
                        console.log(xhr);
                        console.log("Details: " + desc + "\nError:" + err);
                    }
                });
            } else {
                alert("resoure list dir error!!")
            };
        });
    },
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
};
var initAction = function() {
    $('#orderlist').sortable({
        axis: "x"
    });
    $('#list>li').draggable({
        helper: 'clone',
        //connectToSortable: "#dest"
    });
    $('#order').droppable({
        hoverClass: "put",
        tolerance: "touch",
        drop: function(event, ui) {
            var curItem = ui.draggable.text();
            $.each(mediaList, function(i, currentMedia) {
                if (i >= mediaListLength) {
                    if (curItem === currentMedia.name) {
                        editList[editListPosition] = currentMedia;
                        editList[editListPosition].mediaID = editListPosition;
                        finalEditList[editListPosition] = JSON.parse(JSON.stringify(editList[editListPosition]));
                        $("<p id=\"hid\">" + "*" + editListPosition + "</p>").appendTo(ui.draggable);
                        editListPosition += 1;
                        return;
                    };
                };
            });
        }
    });
};
var getEditName = function(str) {
    var name = "";
    $.each(str.split(''), function(i, ch) {
        if (ch !== '*') {
            name += ch;
        } else {
            console.log("the name is " + name);
            return name;
        }
    });
};
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
    return Number(id);
}
var displaySlider = function(theMedia) {
    createSlider("#slider", theMedia);
};
var getStream = function(theMedia) {
    $.ajax({B
        //url: theMedia.streamAddress,
        url: "http://localhost/quick/streamlist.php",
        success: function(res) {
            var json = JSON.parse(res);
            if (json.result === "OK") {
                theMedia.streamName = json.stream_list[0][0];
                theMedia.streamLength = json.stream_list[0][1];
                theMedia.streamType = json.stream_list[0][2];
                theMedia.startTime = 0;
                theMedia.endTime = json.stream_list[0][1];
                theMedia.duration = json.stream_list[0][1];
                console.log("in");
                console.log(theMedia);
            } else {
                console.log("http request failed");
            }
        },
        error: function(xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError:" + err);
        }
    });
};
var addNewVideo = function(src) {
    if (typeof src !== "string") {
        return "parameter error";
    }
    $(src).appendTo('#list').draggable({
        appendTo: "body",
        helper: "clone",
        scope: "d1",
        cursor: 'pointer',
        opacity: 0.50,
        connectToSortable: "#orderlist",
        containment: '#mainzone',
        drag: function() {
            $('#editzone').css("background-color", "#8bff9a");
        },
        stop: function() {
            $('#editzone').css("background-color", "#63B9DE");
        }
    });
};
var reAjax = function(targetURL) {
    $.ajax({
        url: targetURL,
        success: function(res) {
            var json = JSON.parse(res);
            if (json.result === "OK") {
                console.log("http request startup ok");
                listAddress = "http://" + json.srv_ip + ":" + json.srv_port + "/resource.list?keyd=00000456";
                console.log(listAddress);
            } else {
                console.log("http request startup failed");
            }
        },
        error: function(xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError:" + err);
        }
    });
};
var createSlider = function(selector, theMedia) {
    $(selector).slider({
        range: true,
        min: 0,
        max: theMedia.duration,
        values: [theMedia.startTime, theMedia.endTime],
        slide: function(event, ui) {
            theMedia.startTime = ui.values[0];
            theMedia.endTime = ui.values[1];
            theMedia.streamLength = ui.values[1] - ui.values[0];
            $('#starttime').attr("value", theMedia.startTime);
            $('#endtime').attr("value", theMedia.endTime);
            $('#length').attr("value", theMedia.streamLength);
        },
    });
};
$(document).ready(main);