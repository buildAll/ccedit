var curSys = new sysInfo("00000456", "ddd", 100, 40, "192.168.100.233", 80);
var gallery = new mediaGallery();

var main = function() {

    $(document).on('click', '#startBtn', function() {
        doStartup("http://localhost/quick/startup.php");
    });

    $(document).on('click', '#resourceList', function() {
        getMediaFiles("http://localhost/quick/resourcelist.php",gallery);
    });

    //doClick.getEdit();
    $(document).on('dblclick', '#orderlist li', function() {
        $(this).remove();
    });
    moveGalleryitem(gallery);

};
$(document).ready(main);