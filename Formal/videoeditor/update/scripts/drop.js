var afterDrop = function(gallery,ui) {
    var contextBeDragging = ui.draggable.text();
    console.log(contextBeDragging);
    console.log("*******************");
    console.log(gallery.items);
    console.log(gallery.count);
    $.each(gallery.items, function(i, thisMedia) {
        if (i >= 0) {///////////////////
            console.log(thisMedia.fileName);
             console.log(thisMedia.fileStreamGrp);
            if (contextBeDragging === thisMedia.fileName) {
                $.each(thisMedia.fileStreamGrp, function(i, thisStream) {

                    switch (thisStream.type) {
                        case "video":
                            videoTrack.push(JSON.parse(JSON.stringify(thisStream)));
                            $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.editID + "</p>" + "</li>").appendTo("#vidtrack");
                            break;
                        case "audio":
                            audioTrack.push(JSON.parse(JSON.stringify(thisStream)));
                            $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.editID + "</p>" + "</li>").appendTo("#audtrack");
                            break
                    }
                });
                return;
            };
        };
    });
};
var moveGalleryitem = function(gallery) {
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
            if (true) {
                afterDrop(gallery,ui);
            };
        }
    });
};


