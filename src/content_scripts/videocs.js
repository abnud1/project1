window.addEventListener("load", myMain, false);

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

function myMain() {
    var videoElement = document.getElementsByTagName("video")[0];
    if(videoElement!==undefined && videoElement!==null){
        const recorder =  new RecordRTC(videoElement.captureStream(),{
            disableLogs : true,
            frameInterval : 24,          
        });
        const recordIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#ff0000" d="M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z" /></svg>'
              ,stopIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M18,18H6V6H18V18Z" /></svg>'
              ,pauseIcon = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#000000" d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>';
        let isIconRecord = true;
        let isIconPause = true;
        var recordCallBack = function (event) {
            if(isIconRecord){
                if(!videoElement.playing){
                    videoElement.onplaying = () => {
                        recorder.startRecording();
                    }
                }
                else{
                    recorder.startRecording();
                }
                videoElement.onseeking = () => recorder.pauseRecording();
                videoElement.onseeked = () => recorder.resumeRecording();
                videoElement.onpause = () => recorder.pauseRecording();
                videoElement.onended = () => {
                    recorder.stopRecording((blob)=>{
                        recorder.save('video.mp4');
                        console.log(blob);
                    });
                }
                videoElement.onplay = () => recorder.resumeRecording();
                videoElement.onwaiting = () => recorder.pauseRecording();
                event.currentTarget.innerHTML = stopIcon;
            } else{
                recorder.stopRecording((blob)=>{
                    recorder.save('video.mp4');
                    console.log(blob);                    
                });
                event.currentTarget.innerHTML=recordIcon;                
            }
            isIconRecord = !isIconRecord;
        };

        var pauseCallBack = function (event) {
            if(isIconPause){
                recorder.pauseRecording();
            } else{
                recorder.resumeRecording();
                event.currentTarget.innerHTML=pauseIcon;
            }
            isIconPause = !isIconPause;
        };
       
        var btnNames = [
            {
                name: "pauseBtn",
                order: 1,
                onclickAction: pauseCallBack,
                button: pauseIcon
            },
            {
                name: "recordBtn",
                order: 2,
                onclickAction: recordCallBack,
                button: recordIcon
            }
        ];
        
        var btnWidth = 30;
        var btnHeight = 30;

        btnNames.forEach(function (item) {
            var element = document.createElement("button");
            element.innerHTML = item.button;
            element.name = item.name;
            element.style = "position: absolute; " +
                "top: " + (videoElement.height / 2 - btnHeight * item.order) + "px; " +
                "left: " + (videoElement.width - btnWidth) + "px;" +
                "width: " + btnWidth + "px; padding-left:0px; " +
                "height: " + btnHeight + "px; padding-right:0px; ";
            element.onclick = item.onclickAction;
            videoElement.parentNode.insertBefore(element, videoElement.nextSibling);
        })
    }
}




const videos = document.getElementsByTagName("video");
if (videos.length !== 0) {
    const firstvideo = videos[0];
   
}

