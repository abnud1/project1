/**
 * 
 * @param {string} url 
 * @return {boolean}
 */
function isordinary(url){
   return url.startsWith('http') || url.startsWith('https')
}

/**
 * @param {Location|URL} url
 * @return {boolean} 
 */
function isYoutube(url){
    return url.hostname == "www.youtube.com"
}

/**
 * 
 * @param {Location|URL} url 
 * @return {string}
 */
function getvideoid(url) {
    url = (url instanceof Location) ? new URL(url) : url;    
    return url.searchParams.get('v') || (() => {
        const parts=url.pathname.split('/');
        return parts[parts.length-1];
    })();
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

const videos=document.getElementsByTagName("video");
if(videos.length !== 0)
{
    const firstvideo = videos[0];
    firstvideo.onloadeddata = (video) => {
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
    }
    if(isYoutube(window.location)){
        //تستدعى هذه التعليمة حين نريد تحميل الفيديو من اليوتوب
        //chrome.runtime.sendMessage({type: 'youtube',index: 0,'id': getvideoid(window.location)});
    }   
    else {
        const ordinaryvideos = Array.from(videos).filter(video => isordinary(video.src));
        for(const video of ordinaryvideos){
            //تستدعى هذه التعليمة حين نريد تحميل الفيديو العادي
            //chrome.runtime.sendMessage({type: 'ordinaryvideo',url: video.currentSrc});
        }
    }
}
console.log("iframes");
const iframes = document.getElementsByTagName('iframe');
const videosiniframes=[];
for(const iframe of iframes){
    if(isYoutube(iframe.contentWindow.location))
    {
         //تستدعى هذه التعليمة حين نريد تحميل الفيديو من اليوتوب
        //chrome.runtime.sendMessage({type: 'youtube',index: 0,'id': getvideoid(iframe.contentWindow.location)});
    }
    else{
        for(const video of iframe.contentDocument.getElementsByTagName('video')){
            videosiniframes.push(video);
        }
    }
}
const ordinaryvideosiniframes=videosiniframes.filter(video => isordinary(video.src));
for(const video of ordinaryvideosiniframes){
    //تستدعى هذه التعليمة حين نريد تحميل الفيديو العادي
    //chrome.runtime.sendMessage({type: 'ordinaryvideo',url: video.currentSrc});
}

