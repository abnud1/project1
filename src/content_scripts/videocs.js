window.addEventListener("load", myMain, false);

function myMain(evt) {
    var videoElement = document.getElementsByTagName("video")[0];

    var recordCallBack = function () {
        alert("record button clicked");
    };

    var stopCallBack = function () {
        alert("stop button clicked");
    };

    var pauseCallBack = function () {
        alert("pause button clicked");
    };

    var btnNames = [
        {
            name: "stopBtn",
            order: 1,
            onclickAction: stopCallBack,
            button: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M18,18H6V6H18V18Z" /></svg>'
        },
        {
            name: "pauseBtn",
            order: 2,
            onclickAction: pauseCallBack,
            button: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>'
        },
        {
            name: "recordBtn",
            order: 3,
            onclickAction: recordCallBack,
            button: '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#ff0000" d="M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z" /></svg>'
        }
    ];
    
    var btnWidth = "30";
    var btnHeight = "30";

    btnNames.forEach(function (item) {
        var element = document.createElement("button");
        element.innerHTML = item.button;
        element.name = item.name;
        element.style = "position: absolute; " +
            "top: " + (videoElement.style.height.split("px")[0] / 2 - btnHeight * item.order) + "px; " +
            "left: " + (videoElement.style.width.split("px")[0] - btnWidth) + "px;" +
            "width: " + btnWidth + "px; padding-left:0px; " +
            "height: " + btnHeight + "px; padding-right:0px; ";
        element.onclick = item.onclickAction;
        videoElement.parentNode.insertBefore(element, videoElement.nextSibling);
    })
}


Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

const videos = document.getElementsByTagName("video");
if (videos.length !== 0) {
    const firstvideo = videos[0];
    /*firstvideo.onloadeddata = (video) => {
        const recorder = new RecordRTC(firstvideo.captureStream(),{
            disableLogs: true,
            frameInterval : 24,          
        });
        if(!video.playing){
            video.onplaying = () => {
                recorder.startRecording();
            }
        }
        else{
            recorder.startRecording();
        }
        video.onpause = () => recorder.pauseRecording();
        video.onended = () => {
            recorder.stopRecording(()=>{
                recorder.save('video.mp4');
            })
        }
        video.onplay = () => recorder.resumeRecording();
        video.onwaiting = () => recorder.pauseRecording();
    }*/
}

