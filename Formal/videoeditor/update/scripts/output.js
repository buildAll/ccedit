var output = function() {
    this.result = [];
    this.videoTrack = [];
    this.audioTrack = [];
    this.getTrack = function(selector, track,targetTrack) {
    	var x = [];
        $(selector).find('li').each(function() {
            var item = $(this).text();
            var itemId = getEditId(item);
            var temp = [];
            $.each(track, function(i, thisStream) {
                var trackItemsArray = [];
                if (itemId === (thisStream.type + thisStream.editID.toString())) {
                    trackItemsArray.push(thisStream.fileID);
                    trackItemsArray.push(thisStream.name);
                    trackItemsArray.push(thisStream.startTime);
                    trackItemsArray.push(thisStream.endTime);
                    trackItemsArray.push(thisStream.fileName);
                    temp.push(trackItemsArray);
                };
            });
            x.push(temp);
        });
        $.each(x,function(i,item){
        	targetTrack[i] = item;
        });
    };
    this.getOutput = function(selectorVideo, trackVideo, selectorAudio, trackAudio) {
        this.getTrack(selectorVideo, trackVideo, this.videoTrack);
        this.getTrack(selectorAudio, trackAudio, this.audioTrack);
        this.result.push({
            "video_track": this.videoTrack,
            "audio_track": this.audioTrack,
            "effect_list": []
        });
    };
    this.postResult = function(addr){
         $.post(addr,this.result);
    };
};