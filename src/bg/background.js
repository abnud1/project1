// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });
/**
 * 
 * @param {string} url 
 */
function downloadordinaryvideo(url) {
    chrome.downloads.download({url: url});
}


/**
 * 
 * @param {string} video_id 
 * @param {number} videoindex
 */
function downloadyoutubevideo(video_id,videoindex){
  $.ajax({  
    url: "http://www.youtube.com/get_video_info?video_id="+video_id,  
    dataType: "text"  
  }).then(data => {  
      const info = new URLSearchParams(data);
      const streams = info.get('url_encoded_fmt_stream_map').split(',');
      const results = [];
      for(const stream of streams){
          const realstream = new URLSearchParams(stream);
          realstream.set('url',realstream.get('url')+'&signature='+realstream.get('sig'));
          results.push(realstream);
      }  
      return Promise.resolve(results);  
  }).then(streams => {
      chrome.downloads.download({url: streams[videoindex].get('url'),saveAs: true,filename: 'video.mp4'});
  })
}

function genericOnClick(info, tab) {
        /**
     * 
     * @param {string} url 
     * @return {boolean}
     */
    function isordinary(url){
        return url.startsWith('http') || url.startsWith('https') || url.startsWith('file');
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
    if(isordinary(info.srcUrl)){
        downloadordinaryvideo(info.srcUrl);
    }
    const url = new URL(info.frameUrl || info.pageUrl);
    if(isYoutube(url)){
        downloadyoutubevideo(getvideoid(url),0);
    }
}

// Create one test item for each context type.
var contexts = ["video"];

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "تحميل هذا الفيديو";
  var id = chrome.contextMenus.create({"id":"parent","title": title, "contexts":[context]});
//   var id = chrome.contextMenus.create({"id":"parent","title": title, "contexts":[context],"onclick": genericOnClick});
}

chrome.contextMenus.onClicked.addListener(genericOnClick)
