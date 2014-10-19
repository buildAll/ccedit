var afterDrop = function(gallery, ui, vt, at) {
    var contextBeDragging = ui.draggable.text();
    $.each(gallery.items, function(i, thisMedia) {
        if (i >= 0) { ///////////////////
            if (contextBeDragging === thisMedia.fileName) {
                $.each(thisMedia.fileStreamGrp, function(i, thisStream) {
                    switch (thisStream.type) {
                        case "video":
                            thisStream.editID = vt.length;
                            vt.push(JSON.parse(JSON.stringify(thisStream)));
                            $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.type + thisStream.editID + "</p>" + "</li>").appendTo("#vidtrack");
                            break;
                        case "audio":
                            thisStream.editID = at.length;
                            at.push(JSON.parse(JSON.stringify(thisStream)));
                            $("<li>" + thisStream.name + "<p id=\"hid\">" + "*" + thisStream.type + thisStream.editID + "</p>" + "</li>").appendTo("#audtrack");
                            break
                    }
                });
                return;
            };
        };
    });
     ui.draggable.clone().remove(); 
};
var moveGalleryitem = function(gallery, vt, at) {
   /* $('#orderlist').sortable({
        axis: "x"
    });
    $('#list>li').draggable({
        helper: 'clone',
    });*/
    $('#order,#trackzone').droppable({
        tolerance: "touch",
        drop: function(event, ui) {
            if (true) {
                afterDrop(gallery, ui, vt, at);               
            };
        }
    });
};