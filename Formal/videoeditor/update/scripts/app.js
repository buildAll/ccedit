var curSys = new sysInfo("00000456", "ddd", 100, 40, "192.168.100.233", 8000);
var gallery = new mediaGallery();
var videoTrack = [];
var audioTrack = [];
var saveEdit = new output();

var mycp = CCPlayer('flash_context',640,360);

function cc_player_test(url){
        /* 160,90    320,180    640,360 */
        mycp = CCPlayer('flash_context',640,360);
        //var url = document.getElementById('urltxt').value;
        mycp.play(url);
        mycp.setdbg(cc_player_on_debug);
}

var main = function() {
    curSys.getStartupURL(); 
    $(document).on('click', '#startBtn', function() {
         //curSys.doStartup(curSys.startupURL);
         curSys.doStartup("http://localhost/quick/startup.php");
         mycp.play(curSys.playURL);
    });
     
    $(document).on('click', '#resourceList', function() {
         //gallery.addMediasToGallery(curSys.galleryURL);
         gallery.addMediasToGallery("http://localhost/quick/resourcelist.php",gallery);
    });
    $(document).on('click', '#output', function() {
        saveEdit.getOutput('#vidtrack',videoTrack, '#audtrack',audioTrack);
        console.log(saveEdit.result);
        saveEdit.postResult(curSys.configPutURL);
    });
    if (videoTrack.length === 0) {
        $(document).on('click', '#configget', function() {
            console.log(videoTrack.length);
            if (videoTrack.length !== 0) {return};
           // getVideoConfig(curSys.configPutURL,videoTrack);
            //getAudioConfig(curSys.configPutURL,audioTrack);
            getVideoConfig("http://localhost/quick/config.php",videoTrack);
            getAudioConfig("http://localhost/quick/config.php",audioTrack);
        });
    };

    $(document).on('click', '#fileplay', function() {
         curSys.filePlay();
    });
    

    $(document).on('dblclick', '.track li', function() {
        $(this).remove();
    });
    moveGalleryitem(gallery,videoTrack,audioTrack);
    editStream('#vidtrack', videoTrack,'#slider',curSys);
    editStream('#audtrack', audioTrack,'#slider',curSys);

    $("#vidtrack, #audtrack").sortable();
    
};
$(document).ready(main);