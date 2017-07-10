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
              ,playPauseIcon = '<svg width="24px" height="24px" viewBox="0 0 36 36" version="1.1">'+
      '<defs>'+
         '<path id="playpausepath" fill="#000000" d="M 11 10 L 17 10 L 17 26 L 11 26 M 20 10 L 26 10 L 26 26 L 20 26">'+
            '<animate class="animation" begin="indefinite" attributeType="XML" attributeName="d" fill="freeze" from="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" dur="0.1s" keySplines=".4 0 1 1"'+
            'repeatCount="1"></animate>'+
         '</path>'+
      '</defs>'+
      '<use xlink:href="#playpausepath"></use>'+
      '<use xlink:href="#playpausepath"></use>'+
   '</svg>'
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
                    recorder.stopRecording(()=>{
                        recorder.save('video.mp4');
                    });
                }
                videoElement.onplay = () => recorder.resumeRecording();
                videoElement.onwaiting = () => recorder.pauseRecording();
                event.currentTarget.innerHTML = stopIcon;
            } else{
                recorder.stopRecording(()=>{
                    recorder.save('video.mp4');
                });
                event.currentTarget.innerHTML=recordIcon;                
            }
            isIconRecord = !isIconRecord;
        };
        let pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
            play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
        var pauseCallBack = function (event) {
            const animate = event.currentTarget.getElementsByClassName('animation')[0];
            if(isIconPause){
                recorder.pauseRecording();
            } else{
                recorder.resumeRecording();
            }
            isIconPause = !isIconPause;
            $(animate).attr({
                "from": isIconPause ? pause : play,
                "to": isIconPause ? play : pause
            }).get(0).beginElement();
        };
       
        var btnNames = [
            {
                name: "pauseBtn",
                order: 1,
                onclickAction: pauseCallBack,
                button: playPauseIcon
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
                "top: " + (videoElement.style.height.split('px')[0] / 2 - btnHeight * item.order) + "px; " +
                "left: " + (videoElement.style.width.split('px')[0] - btnWidth) + "px;" +
                "width: " + btnWidth + "px; padding-left:0px; " +
                "height: " + btnHeight + "px; padding-right:0px; ";
            element.onclick = item.onclickAction;
            videoElement.parentNode.insertBefore(element, videoElement.nextSibling);
        })
    }
}