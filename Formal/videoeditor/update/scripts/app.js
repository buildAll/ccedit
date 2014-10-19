var curSys = new sysInfo("00000456", "ddd", 100, 40, "192.168.100.233", 80);
var gallery = new mediaGallery();
var videoTrack = [];
var audioTrack = [];
var saveEdit = new output();

var main = function() {

    $(document).on('click', '#startBtn', function() {
        ///get startup addr....
        doStartup("http://localhost/quick/startup.php");
    });

    $(document).on('click', '#resourceList', function() {
        getMediaFiles("http://localhost/quick/resourcelist.php",gallery);
    });
    $(document).on('click', '#output', function() {
        saveEdit.getOutput('#vidtrack',videoTrack, '#audtrack',audioTrack);
        console.log(saveEdit.result);
        curSys.getConfigPutAddr();
        saveEdit.postResult(curSys.configPutAddr);
    });

    $(document).on('click', '#configget', function() {
        getVideoConfig("http://localhost/quick/config.php",videoTrack);
        getAudioConfig("http://localhost/quick/config.php",audioTrack);
    });

    //doClick.getEdit();
    $(document).on('dblclick', '.track li', function() {
        $(this).remove();
    });
    moveGalleryitem(gallery,videoTrack,audioTrack);
    editStream('#vidtrack', videoTrack,'#slider',curSys);
    editStream('#audtrack', audioTrack,'#slider',curSys);

    $("#vidtrack, #audtrack").sortable();


    
};
$(document).ready(main);