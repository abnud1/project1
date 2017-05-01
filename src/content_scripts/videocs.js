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
    return url.searchParams.get('v');
}



const videos=document.getElementsByTagName("video");
if(videos.length !== 0)
{
    if(isYoutube(window.location)){
        //تستدعى هذه التعليمة حين نريد تحميل الفيديو من اليوتوب
        //chrome.runtime.sendMessage({type: 'youtube','id': getvideoid(window.location)});
    }   
    else {
        const ordinaryvideos = Array.from(videos).filter(video => isordinary(video.src));
        for(const video of ordinaryvideos){
            //تستدعى هذه التعليمة حين نريد تحميل الفيديو العادي
            //chrome.runtime.sendMessage({type: 'ordinaryvideo',url: video.currentSrc});
        }
    }
}