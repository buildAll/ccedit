var afterDrop = function(gallery, ui, vt, at) {
    var contextBeDragging = ui.draggable.text();
    console.log(contextBeDragging);
    var id = getEditId(contextBeDragging);
    id = Number(id);
    console.log(id);
    $.each(gallery.items, function(i, thisMedia) {
        console.log(thisMedia.fileName); 
        console.log(thisMedia.editID);
        if (i >= 0) { ///////////////////
            if (id === thisMedia.editID) {
                console.log("FUCKING AWESOME!");
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
    $('#order,#trackzone').droppable({
        tolerance: "touch",
        drop: function(event, ui) {
            if (true) {
                afterDrop(gallery, ui, vt, at);               
            };
        }
    });
};