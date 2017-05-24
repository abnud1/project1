

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

const videos=document.getElementsByTagName("video");
if(videos.length !== 0)
{
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

