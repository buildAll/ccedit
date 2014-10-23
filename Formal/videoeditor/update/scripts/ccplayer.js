var _cc_players_map_={};

function __cc_player_on_ready(_tag_id){
    var cc=_cc_players_map_[_tag_id];
    if (cc && cc.__callback_object) {
        if (cc.playcb_cmd == 'play'){
            cc.playcb_cmd = null;
            cc.play(cc.playcb_url);
            return;
        }
        console.log('Unknown CMD !');
        return;
    }
    console.log('WTF!');
}

function __cc_player_on_debug(_tag_id, msg){
    var cc=_cc_players_map_[_tag_id];
    if (cc && cc.__debug_callback_f) {
        cc.__debug_callback_f(msg);
    }
}

function _cc_player(_htmlelem){return {
    __tag_container     : _htmlelem,
    __display_width     : 0,
    __display_height    : 0,
    __player_version    : '1.01',
    __embed_fpversion   : '11.1.0',
    __embed_flashvars   : {
                            __tag_container_id  : _htmlelem.id,
                            __on_player_ready  : '__cc_player_on_ready',
                            __on_player_debug  : '__cc_player_on_debug'
                          },
    __embed_params      : {
                            wmode             : "opaque",
                            allowFullScreen   : "true",
                            allowScriptAccess : "always"
                          },
    __embed_attributes  : {},
    __callback_object   : null,
    __debug_callback_f  : null,
    __embed_callback_f  : function (cbobj){_cc_players_map_[cbobj.id].__callback_object=cbobj;},
    startup : function(){
        swfobject.embedSWF(
            "ccplayer/release/ccplayer.swf?_version="+this.__player_version, 
            this.__embed_flashvars.__tag_container_id,
            this.__display_width,
            this.__display_height,
            this.__embed_fpversion,
            "js/AdobeFlashPlayerInstall.swf",
            this.__embed_flashvars,
            this.__embed_params,
            this.__embed_attributes,
            this.__embed_callback_f
        );
    },
    playcb_cmd : null,
    playcb_url : null,
    play : function(url){
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_play(url);
            return;
        }
        this.playcb_url = url;
        this.playcb_cmd = 'play';
        this.startup();
    },
    pause : function(){
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_pause();
        }
    },
    resume : function(){
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_resume();
        }
    },
    seek : function(tms){
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_seek(tms);
        }
    },
    status : function(){
        if (this.__callback_object && this.__callback_object.ref.__ccpi_status){
            return this.__callback_object.ref.__ccpi_status();
        }
        return null;
    },
    setvol : function(level){
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_volume(level);
        }
    },
    setve : function(enable) {
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_video_enable(enable);
        }
    },
    setae : function(enable) {
        if (this.__callback_object){
            this.__callback_object.ref.__ccpi_audio_enable(enable);
        }
    },
    setdbg : function(callback) {
        this.__debug_callback_f = callback;
    }
}}

function CCPlayer(_html_tag, _width, _height){
    if (_html_tag in _cc_players_map_) {
        return _cc_players_map_[_html_tag];
    }
    if (!fdo) {
		init_dbg_iframe();
        resize_iframe();
    }
    htmlelem = document.getElementById(_html_tag);
    if (htmlelem) {
        // embed the flash.
        var player_obj = new _cc_player(htmlelem);
        if (player_obj) {
            player_obj.__display_width = _width;
            player_obj.__display_height = _height;
            _cc_players_map_[_html_tag] = player_obj;
            return player_obj;
        }
    }
    return null;
}

/*

1.Create the CCPlayer
    mycp = CCPlayer('flash_context',640,360);
    var url = document.getElementById('urltxt').value;
    mycp.play(url);
    mycp.setdbg(cc_player_on_debug); 


1. step play
   a. stop play
   b. mycp.play(url) //url = play_url
   c. step play request
   
   play_url = rtmp://192.168.100.233/edit/00000456/ or
              rtmp://192.168.100.233/edit/00000456/ccplayer.html or
              //192.168.100.233/ccplayer.html

*/




