var fdo = null;
var __fd_w_ = null;
var __fd_c_ = null;
var __fd_i_ = null;
var fdo_max = 2000;

function cc_player_on_debug(_msg){
    var _pre=__fd_c_.createElement('pre');
    _pre.style.margin=0;
    _pre.innerHTML=_msg;
    if (fdo.children.length > fdo_max)
        fdo.children.item(0).remove();
    fdo.appendChild(_pre);
    __fd_w_.scrollTo(0,fdo_max*100);
}

/*
function timeformat(p_time){
    var tm_h = Math.floor(p_time/3600);
    var tm_m = p_time % 3600;
    var tm_s = tm_m % 60;
    tm_m = Math.floor(tm_m/60);
    return tm_h + (tm_m<9?":0"+tm_m:":"+tm_m) + (tm_s<10?":0":":") + tm_s.toFixed(3);
}
*/

var mycp = null;
var myst = false;
function cc_player_test(){
    /* 160,90    320,180    640,360 */
    mycp = CCPlayer('flash_context',640,360);
    var url = document.getElementById('urltxt').value;
    mycp.play(url);
    mycp.setdbg(cc_player_on_debug);
}

function cc_player_progress_report() {
    if (mycp) {
        var infobj = mycp.status();
        if (!infobj)
            return;
        var pr = document.getElementById('progress_rept');
        var s = "";
        var b = "                                             ";
        var m = 0;
        var n = [];
        var k,x;
        for (k in infobj) {
            if (k.length > m)
                m = k.length;
            n.push(k);
        }
        if (m > 0 && n.length > 0) {
            m ++;
            n.sort();
            for (k in n) {
                k = n[k];
                x = infobj[k];
                if (x instanceof Array) {
                    s += k + b.substr(0,m-k.length) + ": [" ;
                    s += x.join("\n"+b.substr(0,m+3));
                    s += "]\n";
                } else {
                    s += k + b.substr(0,m-k.length) + ": " + x + "\n";
                }
            }
        }
        pr.innerText = s;
    }
}

function start_progress_report() {
    setInterval(cc_player_progress_report, 500);
}

function cc_player_pause_resume(){
    if (mycp) {
        var mysw = document.getElementById('myswit');
        if (myst) {
            myst = false;
            mysw.value = "暂停";
            mycp.resume();
        } else {
            myst = true;
            mysw.value = "恢复";
            mycp.pause();
        }
    }
}

function player_seek_play() {
    if (mycp) {
        var pt = document.getElementById('postxt');
        var pn = parseFloat(pt.value);
        if (pn >= 0) {
            mycp.seek(pn);
        }
    }
}

function player_set_volume() {
    if (mycp) {
        var vt = document.getElementById('voltxt');
        var pn = parseFloat(vt.value);
        if (pn >= 0) {
            mycp.setvol(pn);
        }
    }
}

function cc_player_video_check(){
    if (mycp) {
        var mycb = document.getElementById('cbvideo');
        mycp.setve(mycb.checked);
    }
}

function cc_player_audio_check(){
    if (mycp) {
        var mycb = document.getElementById('cbaudio');
        mycp.setae(mycb.checked);
    }
}


function resize_iframe(){ if (__fd_i_) __fd_i_.style.height = document.body.offsetHeight-__fd_i_.offsetTop; }

var player_visual_status = 1;
function player_hide_show(mebtn) {
    var pldiv = document.getElementById('player_div');
    if (player_visual_status) {
        pldiv.style.display = "none";
        player_visual_status = 0;
        mebtn.value = "显示播放器";
    } else {
        pldiv.style.display = "";
        player_visual_status = 1;
        mebtn.value = "隐藏播放器";
    }
    resize_iframe();
}

function init_dbg_iframe(){
	if (document.all){//IE
		//__fd_i_ = document.frames('_dbg_i_');
		//__fd_w_ = __fd_i_.contentWindow;
		//__fd_c_ = __fd_i_.document;
		//fdo = __fd_c_.body;
		//__fd_i_ = fdo;
	} else {
		//__fd_i_ = document.getElementById('_dbg_i_');
		//__fd_w_ = __fd_i_.contentWindow;
		//__fd_c_ = __fd_i_.contentDocument;
		//fdo = __fd_c_.body;
	}
	//fdo.style.backgroundColor = "#eee";
	//fdo.style.margin = '0';
}