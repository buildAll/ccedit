var curSys = new sysInfo("00000456", "ddd", 100, 40, "192.168.100.233", 8000);
var gallery = new mediaGallery();
var videoTrack = [];
var audioTrack = [];
var saveEdit = new output();

var main = function() {

    $(document).on('click', '#startBtn', function() {
         curSys.getStartupURL();
         doStartup(curSys.startupAddr);
         //console.log(curSys.startupAddr);
         //doStartup("http://localhost/quick/startup.php");
    });
     
    $(document).on('click', '#resourceList', function() {
         curSys.getGalleryAddr();
         getMediaFiles(curSys.galleryAddr,gallery);
         console.log(curSys.galleryAddr);
       //getMediaFiles("http://localhost/quick/resourcelist.php",gallery);
    });
    $(document).on('click', '#output', function() {
        saveEdit.getOutput('#vidtrack',videoTrack, '#audtrack',audioTrack);
        console.log(saveEdit.result);
        curSys.getConfigPutAddr();
        saveEdit.postResult(curSys.configPutAddr);
    });
    if (videoTrack.length === 0) {
        $(document).on('click', '#configget', function() {
            console.log(videoTrack.length);
            if (videoTrack.length !== 0) {return};
            curSys.getConfigGetAddr();
           // getVideoConfig(curSys.configPutAddr,videoTrack);
            //getAudioConfig(curSys.configPutAddr,audioTrack);
            getVideoConfig("http://localhost/quick/config.php",videoTrack);
            getAudioConfig("http://localhost/quick/config.php",audioTrack);
        });
    };
    

    $(document).on('dblclick', '.track li', function() {
        $(this).remove();
    });
    moveGalleryitem(gallery,videoTrack,audioTrack);
    editStream('#vidtrack', videoTrack,'#slider',curSys);
    editStream('#audtrack', audioTrack,'#slider',curSys);

    $("#vidtrack, #audtrack").sortable();


    
};
$(document).ready(main);