// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

/**
 * 
 * @param {string} url 
 * @return {string} 
 */
function getfileName(url){
    const pathsegments = new URL(url).pathname.split('/');
    return pathsegments[pathsegments.length -1];
}
/**
 * 
 * @param {string} url 
 */
function downloadordinaryvideo(url) {
    chrome.downloads.download({url: url,saveAs: true,filename: getfileName(url)});
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

chrome.runtime.onMessage.addListener((req) => {
    switch (req.type) {
        case 'youtube':            
            downloadyoutubevideo(req.id,req.index);
            break;    
        case 'ordinaryvideo':
            downloadordinaryvideo(req.url);
            break;    
        default:
            throw new Error("unsupported message type");
    }
});